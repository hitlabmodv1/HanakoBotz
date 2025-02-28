const axios = require("axios");

let rinokumura = {
    command: "spotify",
    alias: ["spdl"],
    category: ["downloader"],
    settings: {
        limit: true
    },
    loading: true,
    async run(m, {
        sock,
        client,
        conn,
        DekuGanz,
        Func,
        Scraper,
        text,
        config
    }) {
        if (!text) return m.reply('> masukan link/query')

        if (/open.spotify.com/.test(text)) {
            await Scraper.spotify.download(text).then(async (a) => {
                let captions = `📁 Download Spotify
> • Title: ${a.metadata.album}
> • Artist: ${a.metadata.artist}
> • Date: ${a.metadata.releaseDate}
> • Link: ${a.download.file_url}`
                m.reply(captions)

                sock.sendMessage(m.cht, {
                    audio: {
                        url: a.download.file_url
                    },
                    mimetype: 'audio/mpeg',
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: !0,
                        forwardingScore: 127,
                        externalAdReply: {
                            title: a.metadata.album,
                            body: a.metadata.artist + ' / ' + a.metadata.releaseDate,
                            mediaType: 1,
                            thumbnailUrl: a.metadata.cover_url,
                            renderLargerThumbnail: false,
                            sourceUrl: a.download.file_url
                        }
                    }
                }, {
                    quoted: m
                })
            })
        } else if (text) {
            Scraper.spotify.search(text).then(async (a) => {
                let no = 1
                let captions = `🔍 Search Spotify\n\n`
                for (let i of a) {
                    captions += `Pilih Reply Nomor
[ ${no++} ]
> • Title: ${i.title}
> • Artist: ${i.artist}
> • Id: ${i.id}
> • Link: ${i.url}\n\n`
                }
                await sock.sendAliasMessage(m.cht, {
                    text: captions
                }, a.map((a, i) => ({
                    alias: `${i + 1}`,
                    response: `${m.prefix + m.command} ${a.url}`
                })), m);
            })
        } else m.reply('gagal dl sama metadata nya😂')
    }
}

module.exports = rinokumura
