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

let email = "yashladekar001@gmail.com"
let fname = 'yash'
let lname = "ladekar"
let uniqueId = "12345"

const mailConfigurations = {
    from: 'dyppunemun@gmail.com',
    to: email,
    subject: 'executive board confirmation mail',
    text: "Dear " + fname + " " + lname + "\n" + "This is confirmation of your participation in DYPIMUN as a Delegate. Your Delegate ID number is " + uniqueId + " authorized by organization committee of DYPMUN for session 2023.\n Congratulations " + fname + " " + lname + " you're a Delegate now .\n Further details regarding delegation will be shared soon.You can contact  committee members regarding any queries. \n Thank you \n ~regards \n Meghna Desai +91 7385083351 \n Areeb Ansari - +91 9423338493 \n Mail - dypmun2k23@gmail.com"

};

transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
    console.log('Email Sent Successfully');
    console.log(info);
});


// app.listen(4005, () => {
//     console.log('server started on port 4005 as http://localhost:4005')
// })