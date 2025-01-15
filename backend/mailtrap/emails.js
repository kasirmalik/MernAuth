import { mailtrapClient,sender } from "./mailtrap.js"
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"

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
}