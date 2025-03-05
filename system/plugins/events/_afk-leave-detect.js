async function events(m, {
    sock
}) {
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
}

module.exports = {
    events
}
