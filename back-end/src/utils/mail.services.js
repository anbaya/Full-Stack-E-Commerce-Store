const mailer = require('./mailer');

const sendMail = async (to, subject, text) => {
	try {
			await mailer.sendEmail({
				from    : '"My Store" <from@example.com>',
				to,
				subject,
				text
			});
			console.log('Email sent successfully to', to);
		} catch (error) {
			console.error('Error sending email:', error);
			throw error;
		}
};

module.exports = {
	sendMail
};