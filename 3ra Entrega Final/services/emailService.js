const { createTransport } = require("nodemailer");
const { logger } = require("../src/utils/loggers");
const path = require("path");

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.TEST_MAIL,
    pass: process.env.TEST_MAIL_PASS,
  },
});

const sendEmail = async ({ username, name, age, address, phone, image }) => {
  try {
    const mailOptions = {
      from: process.env.TEST_MAIL,
      to: process.env.TEST_MAIL,
      subject: `Nuevo Usuario Registrado:`,
      html: `
      <h1>NUEVO USUARIO REGISTRADO</h1>
      <h2>El Sr/Sra ${name} se ha registrado exitosamente con su usuario: ${username}</h2>
      <p>Edad: ${age}</p>
      <p>Direccion: ${address}</p>
      <p>Telefono Celular: ${phone}</p>
      <img src="${path.join(__dirname, "../public/uploads/") + image}" />
      `,
      attachments: [
        {
          filename: `${image}`,
          path: path.join(__dirname, "../public/uploads/") + image,
        },
      ],
    };
    const info = await transporter.sendMail(mailOptions);
    logger.info({ message: "mail enviado", info });
  } catch (err) {
    errorLogger.error(err);
  }
};

module.exports = { sendEmail };
