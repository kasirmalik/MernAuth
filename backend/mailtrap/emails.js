import { mailtrapClient,sender } from "./mailtrap.js"
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE} from "./emailTemplates.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipent = [{email}]
    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recipent,
            subject: "Verify your email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("verificationCode",verificationToken),
            category:"Email verification"
        })
        console.log("verification sent sucessfully",response)
    } catch (error) {
        console.log("Error sending verification email", error)
       throw new Error("Error sending verification email")
    }
};


export const sendWelcomeEmail = async (email, name) => {
    const recipent = [{ email }];
    try {
       const response = await mailtrapClient.send({
            from: sender,
            to: recipent,
            template_uuid:"b82bf304-1226-4445-b6e7-fa3d65b01148",
            template_variables:{
                "company_info_name": "MY company",
                "name": name,
            }
        });
        console.log("welcome sent sucessfully", response)
    } catch (error) {
        console.log("Error sending email", error);
        throw new Error("Error sending email");
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipent = [{ email }];
    try {
       const response = await mailtrapClient.send({
        from: sender,
        to: recipent,
        subject: "Reset your password",
        html:  PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
        category: "Password reset"
       }) 
    } catch (error) {
        console.log("Error sending password reset email", error);
        throw new Error("Error sending password reset email");
    }
};

export const sendPasswordResetSuccessEmail = async (email, resetURL) => {
    const recipent = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipent,
            subject: "Password reset successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password reset",

        })
        console.log("password reset email sent sucessfully",response)
    } catch{
        console.log("Error sending password reset success email", error);
        throw new Error("Error sending password reset success email");
    }
}