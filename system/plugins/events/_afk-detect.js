async function events(m, {
    sock,
    Func
}) {
    try {
        let afk = [...new Set([...(m.mentions || []), ...(m.quoted ? [m.quoted.sender] : [])])]
        for (let jid of afk) {
            let is_user = db.list().user[jid].afk
            if (!is_user) continue
            if (!m.isGroup) return
            let aefka = is_user.afkTime
            if (!aefka || aefka < 0) continue
            let reason = is_user.afkReason || ''
            m.reply({
                text: `Jangan tag ${m.pushName}, Dia sedang AFK selama: *${Func.toTime(new Date - aefka)}*\n\n➠ *Reason:* ${reason ? reason : '-'}`,
            })
        }
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
    } catch (e) {
        throw e;
    }
    return true
}

module.exports = {
    events,
}
