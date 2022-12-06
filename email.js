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
    text: "Dear " + fname + " " + lname + "\n" + "This is confirmation of your participation in DYPMUN as an Executive board member. \n Your Executive ID number is " + uniqueId + "  authorized by the organizing committee of DYPMUN for session 2023. \n " + fname + " " + lname + " you're an executive board member now. \n " + "Further details regarding the event will be shared soon.You can contact committee members regarding any queries." + "\n Thankyou\n ~regards"

};

transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
    console.log('Email Sent Successfully');
    console.log(info);
});


// app.listen(4005, () => {
//     console.log('server started on port 4005 as http://localhost:4005')
// })