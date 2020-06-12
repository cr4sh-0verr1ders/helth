// usage:

// const mail = require("./mail")
// mail("token", "to-email@domain.com", [ { "header": "Header 1", rows: [ {key: "Row Name", value: "Row Value"}, ... ] }, ... ])

const nodemailer = require("nodemailer")
const QRCode = require("qrcode")
const crypto = require("crypto")

const address = "prescription.noreply@gmail.com"
const password = "RMQJ6MTj"
const url = "http://helth.ralismark.xyz/dispense/"

const html = (token, cid, data) => `
    <html>
        <head><style>*{font-weight: normal;}</style></head>
        <body style="padding: 14px; font-weight: normal;">
            <div style="width: 100%; max-width: 610px; font-family: Arial; font-size: 18px; text-align: center;">
                <img style="width: 150px;" src="https://lukefl.me/helth.png">
                <h1 style="font-size: 22px; margin-bottom: 10px; margin-top: 0px;">Electronic Prescription</h1>
                <h2 style="font-size: 14px; margin-bottom: 20px; color: #666;">Present this email on your device, or printed, to your pharmacist. This is an electronic token only. The code below must be scanned by your pharmacist before dispensing.</h2>
                <img src="cid:${cid}">
                <h4 style="font-family: monospace; font-size: 14px; color: #666; margin-top: 0px; margin-bottom: 0px;">${token}</h4>
                ${data.map(group => `
                    <h3 style="font-size: 14px; margin-top: 20px; margin-bottom: 5px;">${group.header}</h3>
                    <table style="width: 100%; color: #666; border-collapse: collapse; font-size: 14px;">
                        ${group.rows.map(row => `
                            <tr style="border-top: 1px solid #bbb; border-bottom: 1px solid #bbb; font-size: 14px;">
                                <td style="width: 50%; padding: 8px; color: black; text-align: right; font-size: 14px;" class="header">${row.key}</td>
                                <td style="width: 50%; padding: 8px; text-align: left; font-size: 14px;">${row.value}</td>
                            </tr>
                        `).join("")}
                    </table>
                `).join("")}
            </div>
        </body>
    </html>
`

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: address,
        pass: password
    }
})

module.exports = (token, to, data) => {
    QRCode.toDataURL(token, {
        width: 300,
        height: 300,
        margin: 0
    }).then(qr => {
        const cid = `qr${crypto.randomBytes(8).toString("hex")}`
        transport.sendMail({
            from: `Prescription No-Reply <${address}>`,
            to: to, 
            subject: `Electronic Prescription ${token}`,
            html: html(token, cid, data),
            attachments: [{
                filename: "qr.png",
                content: qr.split("base64,")[1],
                encoding: "base64",
                cid: cid
            }]
        })
    })
}