const config = require('../config');
const nodemailer = require('nodemailer');
const {loggerFile} = require('../services/logger');
const {loggerEthereal} = require('../services/logger');
const errorLog = loggerFile.GetLogger();
const etherealLog = loggerEthereal.GetLogger();

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: config.ETHEREAL_EMAIL,
        pass: config.ETHEREAL_PASS
    }
});

const sendRegistrationEmail = (userName) => {
    const mailOptionsForRegistration = {
        from: 'App Node.js',
        to: 'aubree.kshlerin@ethereal.email',
        subject: 'New User Registration!',
        html: `<p style="color: blue;"> There has been a new signup! => Welcome ${userName} </p>`
    }

    transporter.sendMail(mailOptionsForRegistration, (err, info) => {
        if(err) {
            errorLog.error(err);
            return err
        }
        etherealLog.info(info);
    })
} 

const sendNewOrderEmail = (orderMail) => {
    const mailOptionsForNewOrder = {
        from: 'App Node.js',
        to: 'aubree.kshlerin@ethereal.email',
        subject: 'New Order Submitted!',
        html: `<p style="color: blue;"> There has been a new order! => User email: ${orderMail} </p>`
    }

    transporter.sendMail(mailOptionsForNewOrder, (err, info) => {
        if(err) {
            errorLog.error(err);
            return err
        }
        etherealLog.info(info);
    })
}

module.exports = {sendRegistrationEmail, sendNewOrderEmail};