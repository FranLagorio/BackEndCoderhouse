// import { createTransport } from "nodemailer";
// import fs from "fs";
// const TEST_MAIL = "franlagorio@gmail.com";
// const PASS = "oijhivbiebooeaue";

// const transporter = createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   auth: {
//     user: TEST_MAIL,
//     pass: PASS,
//   },
// });

// try {
//   const mailOptions = {
//     from: TEST_MAIL,
//     to: TEST_MAIL,
//     subject: "PROBAAAANDOO",
//     html: '<h1 style="color: red;"> Probando el html que manda!! </h1>',
//   };
//   const info = await transporter.sendMail(mailOptions);
//   console.log(info);
// } catch (err) {
//   console.log(err);
// }

// const transporter = createTransport({
//   service: "gmail",
//   port: 587,
//   auth: {
//     user: TEST_MAIL,
//     pass: PASS,
//   },
// });
// try {
//   const mailOptions = {
//     from: TEST_MAIL,
//     to: "maildeguille@gmail.com",
//     subject: "PROBAAAANDOO",
//     html: '<h1 style="color: red;"> Probando el html que manda!! </h1>',
//     attachments: [
//       {
//         // stream as an attachment
//         filename: "gatito.jpg",
//         content: fs.createReadStream("gatito.jpg"),
//       },
//     ],
//   };
//   const info = await transporter.sendMail(mailOptions);
//   console.log(info);
// } catch (err) {
//   console.log(err);
// }

// const accountSid = "AC2eb0e3f5a1971a3bd72c0b3693542e70";
// const authToken = "3d61cb2035891ce5c676d933eccf29c4";
// const client = require("twilio")(accountSid, authToken);

// client.messages
//   .create({
//     body: "hola, este soy yo probando !! ",
//     messagingServiceSid: "MG091da582e2029287cbb4eeffaab5e0b6",
//     to: "+543513080077",
//   })
//   .then((message) => console.log(message.sid))
//   .done();

const express = require("express");
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const accountSid = "AC2eb0e3f5a1971a3bd72c0b3693542e70";
const authToken = "3d61cb2035891ce5c676d933eccf29c4";
const client = require("twilio")(accountSid, authToken);

app.post("/", (req, res) => {
  if (req.body.Body == "hola") {
    client.messages
      .create({
        body: "Gracias por saludar",
        from: "whatsapp:+14155238886",
        to: "whatsapp:+5493513080077",
      })
      .then((message) => console.log("la respuesta es" + message.body))
      .done();
  } else {
    client.messages
      .create({
        body: "Saludame primero",
        from: "whatsapp:+14155238886",
        to: "whatsapp:+5493513080077",
      })
      .then((message) => console.log("la respuesta es" + message.body))
      .done();
  }
  console.log(req.body);
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// client.messages
//   .create({
//     body: "Probando desde el codigo",
//     from: "whatsapp:+14155238886",
//     to: "whatsapp:+59897076870",
//   })
//   .then((message) => console.log(message.sid))
//   .done();

// const MessagingResponse = require("twilio").twiml.MessagingResponse;
