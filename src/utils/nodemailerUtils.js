const config = require('../config');
const nodemailer = require('nodemailer')

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
        subject: 'Nuevo registro',
        html: `<p style="color: blue;">There has been a new signup! => ${userName} </p>`
    }

    transporter.sendMail(mailOptionsForRegistration, (err, info) => {
        if(err) {
            console.log(err)
            return err
        }
        console.log(info);
    })
} 

const sendNewOrderEmail = (cartMail) => {
    const mailOptionsForNewOrder = {
        from: 'App Node.js',
        to: 'aubree.kshlerin@ethereal.email',
        subject: 'Nueva Orden Generada',
        html: `<p style="color: blue;">There has been a new order! => ${cartMail} </p>`
    }

    transporter.sendMail(mailOptionsForNewOrder, (err, info) => {
        if(err) {
            console.log(err)
            return err
        }
        console.log(info);
    })
}

module.exports = {sendRegistrationEmail, sendNewOrderEmail};