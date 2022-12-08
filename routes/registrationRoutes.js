const express = require('express')
const router = express.Router();
const { google } = require('googleapis');
const { assuredworkloads } = require("googleapis/build/src/apis/assuredworkloads")
const nodemailer = require("nodemailer");
router.get('/', (req, res) => {
    res.render('registration')
})

router.post('/', async (req, res) => {

    const { fname, lname, email, phone, dob, gender, institution, city_of_residence, nationality, diet, accomodation, cod_fname, cod_lname, cod_email, cod_phone, cod_dob, cod_gender,
        cod_institution, cod_city_of_residence, cod_nationality, comm_preference1, comm_preference2, comm_preference3,
        country_preference1, country_preference2, country_preference3, suggestion, past_del, past_exec, past_ps, cod_past_del, cod_past_exec, cod_past_ps } = req.body;

    var Gender, codGender;
    let uniqueId = (new Date()).getTime() + 10;
    if (gender[0] === "other") {
        Gender = gender[1];
    }
    else Gender = gender[0];
    if (cod_gender[0] === "other") {
        codGender = cod_gender[1];
    }
    else codGender = cod_gender[0];

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentails.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = process.env.spreadsheetId_env

    // const metaData = await googleSheets.spreadsheets.get({
    //     auth,
    //     spreadsheetId,
    // })

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                [uniqueId, fname, lname, email, phone, dob, Gender, institution, city_of_residence, nationality, diet, accomodation, cod_fname, cod_lname, cod_email, cod_phone, cod_dob, codGender,
                    cod_institution, cod_city_of_residence, cod_nationality, comm_preference1, comm_preference2, comm_preference3,
                    country_preference1, country_preference2, country_preference3, suggestion, past_del, past_exec, past_ps, cod_past_del, cod_past_exec, cod_past_ps],
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
        subject: 'Delegate confirmation',
        text: "Dear " + fname + " " + lname + "\n" + "This is confirmation of your participation in DYPIMUN as a Delegate. Your Delegate ID number is " + uniqueId + " authorized by organization committee of DYPIMUN for session 2023.\n Congratulations " + fname + " " + lname + " you're a Delegate now .\n Further details regarding delegation will be shared soon.You can contact  committee members regarding any queries. \n Thank you \n ~regards \n Meghna Desai +91 7385083351 \n Areeb Ansari - +91 9423338493 \n Mail - dypmun2k23@gmail.com"
    };

    transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) throw Error(error);
        console.log('Email Sent Successfully');
        console.log(info);
    });

    res.redirect("index")
})
module.exports = router;
