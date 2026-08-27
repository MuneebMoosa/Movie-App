import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Movie App",
    link: process.env.CLIENT_URL,
  },
});

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_SMTP_HOST,
  port: Number(process.env.MAILTRAP_SMTP_PORT),
  auth: {
    user: process.env.MAILTRAP_SMTP_USER,
    pass: process.env.MAILTRAP_SMTP_PASS,
  },
});

export const sendEmail = async (options) => {
  const emailTextual = mailGenerator.generatePlaintext( options.mailgenContent );

  const emailHtml = mailGenerator.generate( options.mailgenContent );

  const mail = {
    from: process.env.MAIL_FROM,
    to: options.to,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    const info = await transporter.sendMail(mail);
    return info;
  } catch (error) {
    console.error("Email service failed:", error);
    throw new Error("Failed to send email");
  }
};

export const emailVerificationMailgenContent = ( username, verificationUrl ) => {
  return {
    body: {
      name: username,

      intro:
        "Welcome to Movie App! We're very excited to have you on board.",

      action: {
        instructions:
          "To verify your email address, please click the button below:",

        button: {
          color: "#22BC66",
          text: "Verify your email",
          link: verificationUrl,
        },
      },

      outro:
        "This verification link will expire in 20 minutes. If you did not create this account, you can safely ignore this email.",
    },
  };
};

export const forgotPasswordMailgenContent = ( username, passwordResetUrl ) => {
  return {
    body: {
      name: username,

      intro:
        "We received a request to reset your Movie App password.",

      action: {
        instructions:
          "To reset your password, please click the button below:",

        button: {
          color: "#cb2121",
          text: "Reset your password",
          link: passwordResetUrl,
        },
      },

      outro:
        "This password reset link will expire in 20 minutes. If you did not request a password reset, you can safely ignore this email.",
    },
  };
};