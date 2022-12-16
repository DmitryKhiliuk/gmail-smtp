const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')
const {request} = require("express");
const app = express()
const port = process.env.PORT || 3010
const smtp_login = process.env.SMTP_LOGIN
const smtp_password = process.env.SMTP_PASSWORD


app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})



app.post('/sendMessage', async (req, res) => {
    res.send('send message!')

    let {name, email, message} = req.body

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: smtp_login, // generated ethereal user
            pass: smtp_password, // пароль приложения express https://support.google.com/accounts/answer/185833?hl=ru

        },
    });

    let info = await transporter.sendMail({
        from: 'mailforapp0000', // sender address
        to: "khiliukbrest@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>Проснись! Кто-то ответил!</b>
<div>name: ${name}</div>
<div>email: ${email}</div>
<div>message: ${message}</div>`, // html body
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})