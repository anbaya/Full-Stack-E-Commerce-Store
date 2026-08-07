const mailservices = require('./mail.services');

const emailSend = async (req, res) => {
  try {
    await mailservices.sendMail(
      req.body.email,
      req.body.subject,
      undefined, // no plain text body provided
      '<h1>Hello World</h1>' // send HTML content
    );
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error sending email', error: error.message });
  }
};

module.exports = {
  emailSend,
};
