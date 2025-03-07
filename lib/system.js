const cron = require("node-cron");
const chalk = require("chalk");
const Func = require("./function");
const Uploader = require("./uploader");
const config = require(process.cwd() + "/settings");
const moment = require("moment-timezone")
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const fakeUserAgent = require("fake-useragent");

module.exports = async (m, sock, store) => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const sentMessages = {};
    const users = db.list().user[m.sender];
    const groups = db.list().group[m.cht];
    const settings = db.list().settings;

    if (groups.antilink) {
        if (m.body.match("http") && m.body.match("https")) {
            bvl = `Admin Mah Boleh Kirim Link Lain`
            if (m.isAdmin) return m.reply(bvl)
            if (m.key.fromMe) return m.reply(bvl)
            if (m.isOwner) return m.reply(bvl)
            await sock.sendMessage(m.cht, {
                delete: {
                    remoteJid: m.cht,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            })
            sock.sendMessage(m.cht, {
                text: `Woi Kontol Gausah Promosi Link Anjg Kek Punya Lu Aja Nih Grup😹`,
                contextInfo: {
                    mentionedJid: [m.sender]
                }
            }, {
                quoted: m
            })
        }
    };

    if (groups.antilinkgc) {
        if (m.body.match("chat.whatsapp.com")) {
            bvl = `Admin Mah Boleh Kirim Link Lain`
            if (m.isAdmin) return m.reply(bvl)
            if (m.key.fromMe) return m.reply(bvl)
            if (m.isOwner) return m.reply(bvl)
            await sock.sendMessage(m.cht, {
                delete: {
                    remoteJid: m.metadata.id,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            })
            sock.sendMessage(m.cht, {
                text: `Woi Kontol Gausah Promosi Link Anjg Kek Punya Lu Aja Nih Grup😹`,
                contextInfo: {
                    mentionedJid: [m.sender]
                }
            }, {
                quoted: m
            })
        }
    };

    if (groups.antilinkch) {
        if (m.body.match("whatsapp.com")) {
            bvl = `Admin Mah Boleh Kirim Link Lain`
            if (m.isAdmin) return m.reply(bvl)
            if (m.key.fromMe) return m.reply(bvl)
            if (m.isOwner) return m.reply(bvl)
            await sock.sendMessage(m.cht, {
                delete: {
                    remoteJid: m.cht,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            })
            sock.sendMessage(m.cht, {
                text: `Woi Kontol Gausah Promosi Link Anjg Kek Punya Lu Aja Nih Grup😹`,
                contextInfo: {
                    mentionedJid: [m.sender]
                }
            }, {
                quoted: m
            })
        }
    };

    if (groups.antilinknumber) {
        if (m.body.match("wa.me")) {
            bvl = `Admin Mah Boleh Kirim Link Lain`
            if (m.isAdmin) return m.reply(bvl)
            if (m.key.fromMe) return m.reply(bvl)
            if (m.isOwner) return m.reply(bvl)
            await sock.sendMessage(m.cht, {
                delete: {
                    remoteJid: m.cht,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            })
            sock.sendMessage(m.cht, {
                text: `Woi Kontol Gausah Promosi Link Anjg Kek Punya Lu Aja Nih Grup😹`,
                contextInfo: {
                    mentionedJid: [m.sender]
                }
            }, {
                quoted: m
            })
        }
    };

        if (db.list().user[m.sender].afk.afkTime > -1) {
            let is_user = db.list().user[m.sender].afk
            if (!m.isGroup) return
            let aefka = is_user.afkTime
            let reason = is_user.afkReason || ''
            db.list().user[m.sender].afk.afkTime = -1
            m.reply({
                text: `Anda Kembali ${m.pushName}, Afk selama: *${Func.toTime(new Date - aefka)}*\n\n➠ *Reason:* ${reason ? reason : '-'}`,
            })
        }

    cron.schedule("* * * * *", () => {
        let user = Object.keys(db.list().user);
        let time = moment.tz(config.tz).format("HH:mm");
        if (db.list().settings.resetlimit == time) {
            for (let i of user) {
                db.list().user[i].limit = 100;
            }
        }
    });
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log("- Terjadi perubahan pada files case.js");
    delete require.cache[file];
});