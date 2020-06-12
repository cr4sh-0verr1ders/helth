const nodemailer = require("nodemailer")
const QRCode = require("qrcode")
const crypto = require("crypto")

const address = "prescription.noreply@gmail.com"
const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: address,
        pass: "RMQJ6MTj"
    }
})

module.exports = test = (to, token) => {
    QRCode.toDataURL("hello").then(qr => {
        const cid = `qr${crypto.randomBytes(20).toString("hex")}`
        transport.sendMail({
            from: `Prescription No-Reply <${address}>`,
            to: to, 
            subject: "Subject",
            html: `<img src="cid:${cid}">`,
            attachments: [{
                filename: "qr.png",
                content: qr.split("base64,")[1],
                encoding: "base64",
                cid: cid
            }]
        }, (error, response) => {
            if (error) {
                console.log(error)
            } else {
                console.log(response)
            }
        })
    })
}

test("luke.fisklennon@gmail.com")