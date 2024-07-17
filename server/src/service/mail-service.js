const nodemailer = require("nodemailer");
require('dotenv').config();

class MailService{

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EmailAccountLogin,
                pass: process.env.EmailAccountPassword,
            },
        })
    }

    async sendActivationMail(mail, link){
        try{
            await this.transporter.sendMail({
                from:process.env.EmailAccountLogin,
                to:mail,
                subject: "Активируйте акканут сайта:" + process.env.API_URL,
                text: '',
                html:
                `
                    <div>
                        <h1>Перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
            })
        }
        catch(e){

        }
    }
}

module.exports = new MailService();