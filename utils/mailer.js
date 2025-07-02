import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "asaqlain228@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

export async function sendEmail({ from, to, subject, text, html }) {
  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });
    return info;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}
