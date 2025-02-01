import nodemailer from 'nodemailer';
import logger from './logger';
import * as dotenv from 'dotenv';
dotenv.config();

const emailUser = process.env.EMAIL_USER as string;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser as string,
    pass: "bape vwck kswi wcnj",
  },
});

transporter.verify((error, success) => {
  if (error) {
    logger.error('Error with email transporter:', error);
  } else {
    logger.info('Email transporter is ready.');
  }
});

export default transporter;
