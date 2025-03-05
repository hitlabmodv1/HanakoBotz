async function events(m, {
    sock
}) {
    let group = db.list().group[m.cht]
    if (typeof group !== 'object') db.list().group[m.cht] = {}
    if (group) {
        if (!('antilink' in group)) group.antilink = false
        if (!('antilinkgc' in group)) group.antilinkgc = false
        if (!('antilinkch' in group)) group.antilinkch = false
        if (!('antilinknumber' in group)) group.antilinknumber = false
    } else {
        db.list().group[m.cht] = {
            antilink: false,
            antilinkgc: false,
            antilinkch: false,
            antilinknumber: false
        }
    }
    if (group.antilink) {
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

    if (group.antilinkgc) {
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
    }

    if (group.antilinkch) {
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

    if (group.antilinknumber) {
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

module.exports = {
    events
}
