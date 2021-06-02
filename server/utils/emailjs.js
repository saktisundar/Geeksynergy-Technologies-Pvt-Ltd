
const SMTPClient = require('emailjs').SMTPClient;
const client = new SMTPClient({
	host: 'service_bm4yshn',
	user: 'user_SulwzOrxynUQGIYd1yCfw',
	password: 'Lucky555$',
	ssl: true,
	port : 465
});

module.exports.dispatchResetPasswordLink = function(account, callback)
{
	const email = {
		from		: 'sakti.6cl@gmail.com'+' <user_SulwzOrxynUQGIYd1yCfw>',
		to			: account.email,
		subject		: 'Password Reset',
		attachment	: composeResetPasswordEmail(account)
	};
	client.send(email, (e) => {
		if (e && (e.code == 5 || e.smtp == undefined)){
			callback('emailjs is not setup correctly, did you set your env variables?');
		}	else{
			callback(null);
		}
	});
}

const composeResetPasswordEmail = function(o)
{
	let baseurl = 'http://localhost:8080';
	var html = "<html><body>";
		html += "Hi "+o.name+",<br><br>";
		html += "Your username is <b>"+o.user+"</b><br><br>";
		html += "<a href='"+baseurl+'/reset-password?key='+o.passKey+"'>Click here to reset your password</a><br><br>";
		html += "Cheers,<br>";
		html += "<a href='http://localhost:8080/reset-password'></a><br><br>";
		html += "</body></html>";
	return [{data:html, alternative:true}];
}