module.exports = function sendMail(data, cb) {
    const sendpulse = require('sendpulse-api');

    const API_USER_ID = process.env.SENDPULSE_USER_ID;
    const API_SECRET = process.env.SENDPULSE_SECRET;
    const SENDER_NAME = process.env.SENDPULSE_SENDER;
    const EMAIL_FROM = process.env.SENDPULSE_FROM;
    const TOKEN_STORAGE = 'file';
    const MAILING_LIST_ID = process.env.MAILING_LIST_ID;

    sendpulse.init(API_USER_ID,API_SECRET,TOKEN_STORAGE);

    function answerGetter(res){
        console.log(res);
    };

    let email = {
        "html" : data.html,
        "text" : data.text,
        "subject" : data.subj,
        "from" : {
            "name" : SENDER_NAME,
            "email" : EMAIL_FROM
        },
        "to" : [
            {
                "name" : data.to,
                "email" : data.to
            },
        ],
        "bcc" : []
    };

    sendpulse.addEmails(console.log, MAILING_LIST_ID, [{email:data.to,variables:{message:data.subj}}]);

    cb(sendpulse.smtpSendMail(answerGetter,email));
};
