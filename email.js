const express = require("express")
const app = express();
const nodemailer = require("nodemailer");
require('dotenv').config();
const { google } = require('googleapis');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.PASSWORD
    }
});


const mailConfigurations = {
    from: 'dyppunemun@gmail.com',
    to: 'gunjan.binjola211@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'Hi! There, You know I am using the NodeJS '
        + 'Code along with NodeMailer to send this email.'
};

transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
    console.log('Email Sent Successfully');
    console.log(info);
});


// app.listen(4005, () => {
//     console.log('server started on port 4005 as http://localhost:4005')
// })