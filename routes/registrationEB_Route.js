const express = require("express")
const { google } = require('googleapis');
const { assuredworkloads } = require("googleapis/build/src/apis/assuredworkloads")
const router = express.Router();

router.get('/', (req, res) => {
    res.render('registration_for_EB');
})
router.post('/', async (req, res) => {

    const { fname, lname, email, phone, dob, gender_eb, institution, city_of_residence, nationality, diet, accomodation, comm_preference1, comm_preference2, comm_preference3, country_preference1, country_preference2, country_preference3, suggestion, past_dele, past_exec, past_ps } = req.body;

    let genderEB, uniqueId = (new Date()).getTime();
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
                [uniqueId, fname, lname, email, phone, dob, genderEB, institution, city_of_residence, nationality, diet, accomodation, comm_preference1, comm_preference2, comm_preference3, country_preference1, country_preference2, country_preference3, suggestion, past_dele, past_exec, past_ps],

            ]
        }
    })

    res.redirect("thankyou")

})

module.exports = router;
