import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

import { mailtrapclient, sender } from "./mailtrap.config.js";




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