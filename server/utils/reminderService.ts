import cron from "node-cron";
import { DocumentModel } from "../models/documents";
import transporter from "../config/mailer";
import logger from "../config/logger";

const sendReminderEmail = async (recipientEmail: string, material: any) => {
  if (!recipientEmail) {
    logger.error(`No recipient email found for material: ${material.title}`);
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: `Reminder: ${material.title} deadline approaching`,
    text: `The deadline for ${material.title} is at ${material.deadline}. Please make sure to complete it on time.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(
      `Reminder email sent to ${recipientEmail} for material: ${material.title}`
    );
  } catch (error) {
    logger.error(
      `Failed to send reminder email for material: ${material.title}`,
      error
    );
  }
};

cron.schedule("* * * * *", async () => {
  const now = new Date();
  const reminderTimeStart = new Date(now.getTime() + 59 * 60 * 1000);  
  const reminderTimeEnd = new Date(now.getTime() + 61 * 60 * 1000);  

  try {
    const materials = await DocumentModel.find({
      deadline: { $gte: reminderTimeStart, $lte: reminderTimeEnd },
    });

    for (const material of materials) {
      if (material.userEmail) {
        await sendReminderEmail(material.userEmail, material);
      } else {
        logger.warn(`No email found for task: ${material.title}`);
      }
    }
  } catch (error) {
    logger.error("Error fetching materials for reminders", error);
  }
});
