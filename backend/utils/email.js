const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.EMAIL_API_KEY);

/**
 *  This function will use sendgrid API to get all the information needed
 *  to send the email for the user to verify their email account
 * @param {user} user - the user obj containing the information of that account
 * @param {token} token - a generated token associated with the id of the user
 */

const email = async (userData) => {
  try {
    console.log("email data", userData);
    await sgMail.send({
      from: process.env.SENDER_EMAIL,
      template_id: process.env.EMAIL_TEMPLATE_ID,
      // here we can add personalization's to the email template
      // including passing variables value into the template itself
      personalizations: [
        {
          to: `${userData.email}`,
          dynamic_template_data: {
            username: `${userData.name}`,
            // this url will be a GET request to the '/verify/:userId/:token'
            // to verify that it's really that user and that he owns the email provided
            url: `${process.env.BASE_URL}/users/reset-password/${userData._id}/${userData.token.token}`,
          },
        },
      ],
    });
  } catch (e) {
    // if some error occurs, we need to handle it otherwise it will bring our server done
    // notes: Implement logs
    console.error(e);
    if (e.response) {
      console.error(e.response.body);
    }
  }
};

const resetPwdEmail = async (userData) => {
  try {
    console.log("email data", userData);
    await sgMail.send({
      from: process.env.SENDER_EMAIL,
      template_id: process.env.EMAIL_TEMPLATE_ID,
      // here we can add personalization's to the email template
      // including passing variables value into the template itself
      personalizations: [
        {
          to: `${userData.email}`,
          dynamic_template_data: {
            username: `${userData.name}`,
            // this url will be a GET request to the '/verify/:userId/:token'
            // to verify that it's really that user and that he owns the email provided
            url: `http://localhost:3000/reset-password/${userData._id}/${userData.token.token}`,
          },
        },
      ],
    });
  } catch (e) {
    // if some error occurs, we need to handle it otherwise it will bring our server done
    // notes: Implement logs
    console.error(e);
    if (e.response) {
      console.error(e.response.body);
    }
  }
};

module.exports = { sendgridEmail: email, resetPwdEmail };
