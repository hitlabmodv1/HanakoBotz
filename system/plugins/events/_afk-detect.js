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
    } catch (e) {
        throw e;
    }
    return true
}

module.exports = {
    events,
}
