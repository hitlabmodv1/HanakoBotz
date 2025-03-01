const {
    writeExif
} = require(process.cwd() + "/lib/sticker");
const {
    execSync
} = require("child_process");
const fs = require("fs");
const path = require("path");
const axios = require('axios');

let deku = async (m, {
    sock,
    Func,
    Scraper,
    Uploader,
    store,
    text,
    config
}) => {
    if (!text) return m.reply("> Reply/Masukan pessn");
    let media = await axios.get(`https://aqul-brat.hf.space/api/brat?text=${text}`, {
        responseType: 'arraybuffer'
    }).then(a => a.data);
    let sticker = await writeExif({
        mimetype: "image",
        data: media,
    }, {
        packName: config.sticker.packname,
        packPublish: config.sticker.author,
    });
    await m.reply({
        sticker
    });
}

deku.command = "brat"
deku.alias = []
deku.category = ["main"]
deku.settings = {
    limit: true
}
deku.loading = true

module.exports = deku
