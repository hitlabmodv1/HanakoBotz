const dist = require('@distube/ytdl-core')
const yts = require('yt-search')
const fetch = require("node-fetch");

let rinokumura = {
    command: "play",
    alias: [
        "ply",
        "playvd",
        "playms"
    ],
    category: [
        "downloader"
    ],
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
        client.yt = client.yt || {}
        if (!text) throw '⚠️ mana? link/query nya?'
        let isAudio = text.includes("--audio")
        let isVideo = text.includes("--video")

        let videoUrl;
        if (text.startsWith("http")) {
            videoUrl = text;
        } else {
            let search = await yts(text);
            if (!search.videos.length) return m.reply("❌ Video tidak ditemukan!");
            videoUrl = search.videos[0].url;
        }

        client.yt[m.sender] = {
            url: videoUrl
        };

        const getid = await dist.getVideoID(client.yt[m.sender].url || videoUrl)

        const getmetadata = await yts({
            videoId: getid,
            hl: 'id',
            gl: 'ID'
        });
        const UrlYt = client.yt[m.sender].url || videoUrl
        let metadata = `> • Title: ${getmetadata.title}
> • Id: ${getmetadata.videoId}
> • Ago: ${getmetadata.ago}
> • Durasi: ${getmetadata.timestamp}
> • Url: ${getmetadata.url}
`
        let infoMessage = `📁 Download YouTube
${metadata}

 - Pilih Mau Yang mana !
 - 1 video download 
 - 2 audio download
`

        if (!isAudio && !isVideo) {
            await client.sendAliasMessage(m.cht, {
                text: infoMessage
            }, [{
                alias: `1`,
                response: `${m.prefix + m.command} ${UrlYt} --video`
            }, {
                alias: `2`,
                response: `${m.prefix + m.command} ${UrlYt} --audio`
            }], m);
        }

        const finalUrl = client.yt[m.sender].url || videoUrl

        if (isAudio) {
            const audio = await Scraper.SaveTube.download(finalUrl, "mp3")
            const sizea = await Func.getSize(audio.result.download)
            if (audio.size > 10 * 1024 * 1024) {
                return sock.sendMessage(m.cht, {
                    document: {
                        url: audio.result.download
                    },
                    mimetype: "audio/mpeg",
                    fileName: `${audio.result.title}.mp3`,
                }, {
                    quoted: m
                });
            } else {
                return sock.sendMessage(m.cht, {
                    audio: {
                        url: audio.result.download
                    },
                    mimetype: "audio/mpeg",
                }, {
                    quoted: m
                });
            }
        } else if (isVideo) {
            let video = await Scraper.SaveTube.download(finalUrl, "720")
            let response = await fetch(video.result.download, {
                method: "HEAD"
            });
            let fileSizeInBytes = parseInt(response.headers.get("content-length"));
            if (fileSizeInBytes > 10 * 1024 * 1024) {
                return sock.sendMessage(m.cht, {
                    document: {
                        url: video.result.download
                    },
                    mimetype: "video/mp4",
                    fileName: `${video.result.title}.mp4`,
                }, {
                    quoted: m
                });
            } else {
                return sock.sendMessage(m.cht, {
                    video: {
                        url: video.result.download
                    },
                    mimetype: "video/mp4",
                    caption: `📁 YouTube Dl Video\n${metadata}`
                }, {
                    quoted: m
                });
            }
        }
        setTimeout(() => delete sock.yt[m.sender], 5000);
    }
}

module.exports = rinokumura
