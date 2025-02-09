import cron from "node-cron";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import mongoose, { Document, Schema } from "mongoose";
import { DocumentModel } from "../models/documents";

import dotenv from "dotenv";
dotenv.config();

interface Material {
  title: string;
  deadline: Date;
  userEmail: string;
  type: string;
}

const addMinutes = (date: Date, minutes: number): Date => {
  const newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return newDate;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendReminderEmail = async (
  recipientEmail: string,
  material: Material
): Promise<void> => {
  const logoPath = path.join(__dirname, "../public/gradeflow-logo.png");
  const logo = fs.readFileSync(logoPath);
  const logoBase64 = logo.toString("base64");
  const logoCid = "logo_cid";

  const mailOptions = {
    from: "gradeflow4@gmail.com",
    to: recipientEmail,
    subject: `Reminder: ${material.title} deadline approaching`,
    html: `
<html>
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
    <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4;">
      <tr>
        <td align="center">
          <table width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
            <!-- Header -->
            <tr>
              <td style="background-color: #000000; padding: 20px; text-align: center;">
                <img src="cid:${logoCid}" alt="Logo" style="width: 100px; height: auto;"/>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding: 20px; color: #000000;">
                <h2 style="color: #000000;">Hello,</h2>
                <p>This is a friendly reminder that the deadline for <strong>${
                  material.title
                }</strong> is approaching on <strong>${new Date(
      material.deadline
    ).toLocaleString()}</strong>.</p>
                <p>Please ensure that all necessary tasks are completed on time.</p>
                <p>If you have any questions or need further assistance, feel free to contact us.</p>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #888888;">
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
    `,
    attachments: [
      {
        filename: "logo.png",
        content: logoBase64,
        encoding: "base64",
        cid: logoCid,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(
      `Reminder email sent to ${recipientEmail} for material: ${material.title}`
    );
  } catch (error) {
    console.error(
      `Failed to send reminder email for material: ${material.title}`,
      error
    );
  }
};

const mongoLink: string | undefined = process.env.MONGO_URI;
if (!mongoLink) {
  console.error("MongoDB URI is not defined in the .env file.");
  process.exit(1);
}

mongoose
  .connect(mongoLink)
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

cron.schedule("0 * * * *", async () => {
  const now = new Date();

  try {
    const materials: Material[] = await DocumentModel.find(
      { deadline: { $gt: now }, type: "material" },
      "title content deadline userEmail type"
    );

    materials.forEach((material) => {
      const timeDifference =
        new Date(material.deadline).getTime() - now.getTime();
      const oneMinute = 60 * 1000;

      if (timeDifference > 0 && timeDifference <= oneMinute) {
        sendReminderEmail(material.userEmail, material);
      }
    });
  } catch (error) {
    console.error("Error fetching materials from the database", error);
  }
});

console.log("Cron job scheduled to run every hour.");
