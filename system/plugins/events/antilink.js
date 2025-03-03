async function events(m, { sock }) {
    if (db.list().group[m.cht].antilink) {
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
    }

    if (db.list().group[m.cht].antilinkgc) {
        if (m.body.match("chat.whatsapp.com")) {
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
    }

    if (db.list().group[m.cht].antilinkch) {
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
    }

    if (db.list().group[m.cht].antilinknumber) {
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
    }
}

module.exports = { events }
