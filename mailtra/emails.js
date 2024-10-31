
import { VERIFICATION_EMAIL_TEMPLATE ,
         PASSWORD_RESET_REQUEST_TEMPLATE ,
        PASSWORD_RESET_SUCCESS_TEMPLATE} from "./emailTemplates.js";

import { mailtrapclient , sender } from "./mailtrap.config.js";




export const sendVerificationEmail = async (email,verificationToken) =>{

    const recipient =[{email}]
    

    try{
        const response = await mailtrapclient.send({
            from :sender,
            to: recipient,
            subject:'verify yoer email ',
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category :'email verification'
        })


    } catch(error){
        console.error('errror sendinng verification',error)
        throw new Error(`Error sending verification: ${error}`);


    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapclient.send({
            from: sender,
            to: recipient,
            template_uuid: "7c1ea18f-daf1-499b-9fcf-bef1d3ec3145",
            template_variables: {
              "company_info_name": "Test_Company_info_name",
              "name": name
            }
          })
        
  
        return response;
    } catch (error) {
        console.error("Error sending welcome email:", error);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapclient.send({
			from: sender,
			to: recipient,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
			category: "Password Reset",
		});
	} catch (error) {
		console.error(`Error sending password reset email`, error);

		throw new Error(`Error sending password reset email: ${error}`);
	}
};

export const sendResetSuccessEmail = async (email) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapclient.send({
			from: sender,
			to: recipient,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		});

		
	} catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};
