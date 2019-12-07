const axios = require("axios");
const qs = require("qs");
const consoleInput = require("./input");
const opn = require("opn");

// make sure to replace these with your own values from your LinkedIn App
const ID = "YOUR CLIENT ID HERE";
const SECRET = "YOUR CLIENT SECRET HERE";
const REDIRECT_URI = "YOUR REDIRECT URI HERE";

const params = {
  response_type: "code",
  client_id: ID,
  redirect_uri: REDIRECT_URI,
  scope: "r_liteprofile%20r_emailaddress%20w_member_social",
  state: "anyThingWillWor"
};

const url =
  "https://www.linkedin.com/oauth/v2/authorization?" +
  "response_type=" +
  params.response_type +
  "&client_id=" +
  params.client_id +
  "&redirect_uri=" +
  params.redirect_uri +
  "&scope=" +
  params.scope +
  "&state=" +
  params.state;

console.log("The Login/Authorization URL is: " + url);
opn(url);

console.log(
  "After you've logged in and got redirected to your redirect URI, copy and paste the link here: "
);

consoleInput()
  .then(d => {
    const auth_code = d.match(/code=[^&]*/g)[0].substring(5);
    console.log("Authorization code extracted: " + auth_code);

    const data = {
      grant_type: "authorization_code",
      code: auth_code,
      redirect_uri: REDIRECT_URI,
      client_id: ID,
      client_secret: SECRET
    };

    const options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    return axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      qs.stringify(data),
      options
    );
  })
  .then(res => {
    console.log("Successfully got access token from Linkedin!");
    console.log(res.data);
  })
  .catch(err => {
    console.log("Error occured");
    console.log(err.response.status);
    console.log(err.response.data);
    console.log(err.message);
  });
