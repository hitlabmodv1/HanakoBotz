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
        if (!text) throw '⚠️ Mau Query/Link?'
        let isAudio = text.includes("--audio")
        let isVideo = text.includes("--video")

        let videoUrl;
        if (text.startsWith("http")) {
            const getid = await dist.getVideoID(text);
            video = await yts({
                videoId: getid,
                hl: 'id',
                gl: 'ID'
            });
        } else {
            let search = await yts(text);
            if (!search.videos.length) return m.reply("❌ Video tidak ditemukan!");
            video = search.videos[0];
        }

        client.yt[m.sender] = {
            url: video.url
        };

        const UrlYt = client.yt[m.sender].url || video.url
        let metadata = `> • Title: ${video.title}
> • Id: ${video.videoId}
> • Ago: ${video.ago}
> • Durasi: ${video.timestamp}
> • Url: ${video.url}
`
        let infoMessage = `📁 Download YouTube
${metadata}

 ℹ️ Pilih Options
> • 1. video download 
> • 2. audio download`

        if (!isAudio && !isVideo) {
            await client.sendAliasMessage(m.cht, {
                image: {
                    url: video.thumbnail
                },
                caption: infoMessage
            }, [{
                alias: `1`,
                response: `${m.prefix + m.command} ${UrlYt} --video`
            }, {
                alias: `2`,
                response: `${m.prefix + m.command} ${UrlYt} --audio`
            }], m);
        }

        const finalUrl = client.yt[m.sender].url || video.url

        if (isAudio) {
            const savetubea = await Scraper.SaveTube.download(finalUrl, "mp3")

            let audio;
            if (savetubea.result.download) {
                audio = savetubea.result.download;
            } else {
                const ytdowna = await Scraper.ytdown(finalUrl, "mp4", 720)
                audio = ytdown.result;
            }

            const getid = await dist.getVideoID(finalUrl);
            const audiom = await yts({
                videoId: getid,
                hl: 'id',
                gl: 'ID'
            });

            const sizea = await Func.getSize(audio)
            if (sizea > 10 * 1024 * 1024) {
                return sock.sendMessage(m.cht, {
                    document: {
                        url: audio
                    },
                    mimetype: "audio/mpeg",
                    fileName: `${audiom.title}.mp3`,
                }, {
                    quoted: m
                });
            } else {
                return sock.sendMessage(m.cht, {
                    audio: {
                        url: audio
                    },
                    mimetype: "audio/mpeg",
                }, {
                    quoted: m
                });
            }
        } else if (isVideo) {
            const savetubev = await Scraper.SaveTube.download(finalUrl, "720")

            const getid = await dist.getVideoID(finalUrl);
            const videom = await yts({
                videoId: getid,
                hl: 'id',
                gl: 'ID'
            });

            let video;
            if (savetubev.result.download) {
                video = savetubev.result.download;
            } else {
                const ytdownv = await Scraper.ytdown(finalUrl, "mp4", 720)
                video = ytdownv.result;
            }

            let response = await fetch(video, {
                method: "HEAD"
            });
            let fileSizeInBytes = parseInt(response.headers.get("content-length"));
            if (fileSizeInBytes > 10 * 1024 * 1024) {
                return sock.sendMessage(m.cht, {
                    document: {
                        url: video
                    },
                    mimetype: "video/mp4",
                    fileName: `${videom.title}.mp4`,
                }, {
                    quoted: m
                });
            } else {
                return sock.sendMessage(m.cht, {
                    video: {
                        url: video
                    },
                    mimetype: "video/mp4",
                    caption: `📁 Download YouTube\n${metadata}`
                }, {
                    quoted: m
                });
            }
        }
        setTimeout(() => delete sock.yt[m.sender], 5000);
    }
}

module.exports = rinokumura
