// utils/mailer.js
module.exports.sendInviteEmail = (email, token, wishlistId) => {
    // In real life integrate SendGrid/Mailgun. Here we just log:
    console.log(`📧 Invite sent to ${email}: 
      Accept at: http://your-client/app/wishlists/${wishlistId}/invite/${token}`);
  };
  