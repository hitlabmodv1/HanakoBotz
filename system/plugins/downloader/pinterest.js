let deku = async (m, {
    sock,
    Func,
    Scraper,
    config,
    text,
    Uploader
}) => {
    if (!text) throw "> Masukan query/link dari pinterest !"
    if (Func.isUrl(text)) {
        if (!/pinterest.com|pin.it/.test(text)) throw "> Masukan link dari pinterest !";
        let data = await Scraper.pinterest.download(text);
        let cap = "*– 乂 Pinterest - Downloader*\n"
        cap += `> *-* Title : ${data.title}\n`
        cap += `> *-* Keyword : ${data.keyword.join(", ")}\n`
        cap += `> *-* Author : ${data.author.name}\n`

        sock.sendFile(m.cht, data.download, null, cap, m);
    } else {
        const pinsrch = await Scraper.pinterest.search(text)

        let pickget = pinsrch.result[Math.floor(Math.random() * pinsrch.result.length)]

        let cap = `🔍 Search [ ${text} ]`
        cap += `\n> Kalau Kamu Salah Dan Ga Suka\n> Ketik \`[ Next / Lanjut ]\``

        await sock.sendAliasMessage(m.cht, {
            image: {
                url: pickget
            },
            caption: cap
        }, [{
            alias: `next`,
            response: `${m.prefix + m.command} ${text}`
        }, {
            alias: `lanjut`,
            response: `${m.prefix + m.command} ${text}`
        }], m);
    }
}

deku.command = "pinterest"
deku.alias = ["pin", "pindl"]
deku.category = ["downloader", "tools"]
deku.settings = {
    limit: true
}
deku.description = "Mencari/download media dari pinterest !"
deku.loading = true

module.exports = deku
