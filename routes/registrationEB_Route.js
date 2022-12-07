const express = require("express")
const router = express.Router();
const { google } = require('googleapis');
const { assuredworkloads } = require("googleapis/build/src/apis/assuredworkloads")
const nodemailer = require("nodemailer");
router.get('/', (req, res) => {
    res.render('registration_for_EB');
})
router.post('/', async (req, res) => {

    const { fname, lname, email, phone, dob, gender_eb, institution, city_of_residence, nationality, diet, accomodation, comm_preference1, comm_preference2, comm_preference3, country_preference1, country_preference2, country_preference3, suggestion, past_dele, past_exec, past_ps } = req.body;

    let genderEB, uniqueId = (new Date()).getTime()-5;
    if (gender_eb[0] === "other") {
        genderEB = gender_eb[1];
    }
    else genderEB = gender_eb[0];

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentails.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = process.env.spreadsheetId_env

    
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "EBregistration",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                [uniqueId, fname, lname, email, phone, dob, genderEB, city_of_residence, nationality, diet, accomodation, comm_preference1, comm_preference2, comm_preference3, country_preference1, country_preference2, country_preference3, suggestion, past_dele, past_exec, past_ps],

            ]
        }
    })
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.PASSWORD
        }
    });
    const mailConfigurations = {
        from: 'dyppunemun@gmail.com',
        to: email,
        subject: 'Executive board confirmation mail',
        text: "Dear " + fname + " " + lname + "\n" + "This is confirmation of your participation in DYPIMUN as an Executive board member. \n Your Executive ID number is " + uniqueId + "  authorized by the organizing committee of DYPIMUN for session 2023. \n " + fname + " " + lname + " you're an executive board member now. \n " + "Further details regarding the event will be shared soon.You can contact committee members regarding any queries." + "\n Thankyou\n ~regards \n Meghna Desai +91 7385083351 \n Areeb Ansari - +91 9423338493 \n Mail - dypmun2k23@gmail.com"
    };

    transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) throw Error(error);
        console.log('Email Sent Successfully');
        console.log(info);
        // res.redirect('404')
    });

    res.redirect("thankyou")

})

module.exports = router;
