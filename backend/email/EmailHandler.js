import { resendClient, sender } from "../lib/resend";

// sendResetCodeEmail
export const sendResetCodeEmail = async (email, code, name) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Reset your Create Resume password",
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6;">
        <h2>Hello ${name || "there"},</h2>
        <p>We received a request to reset your password.</p>
        <p>Your reset code is:</p>
        <h3 style="color:#2563eb">${code}</h3>
        <p>This code will expire in <b>15 minutes</b>. If you didn't request a password reset, please ignore this email.</p>
        <p>The Create Resume Team</p>
      </div>
    `,
  });

  if (error) {
    console.error("Error sending reset email:", error);
    throw new Error("Failed to send reset password email");
  }

  console.log("Reset email sent successfully", data);
};
