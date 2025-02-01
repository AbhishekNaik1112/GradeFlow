import cron from 'node-cron';
import Material from '../models/materialSchema';
import transporter from '../config/mailer';
import logger from '../config/logger';

const sendReminderEmail = async (material: any) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'recipient@example.com',
    subject: `Reminder: ${material.title} deadline approaching`,
    text: `The deadline for ${material.title} is at ${material.deadline}. Please make sure to complete it on time.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Reminder email sent for material: ${material.title}`);
  } catch (error) {
    logger.error(`Failed to send reminder email for material: ${material.title}`, error);
  }
};

cron.schedule('* * * * *', async () => {
  const now = new Date();
  const reminderTime = new Date(now.getTime() + 30 * 60 * 1000); 

  try {
    const materials = await Material.find({
      deadline: { $gte: now, $lte: reminderTime },
    });

    materials.forEach((material) => {
      sendReminderEmail(material);
    });
  } catch (error) {
    logger.error('Error fetching materials for reminders', error);
  }
});
