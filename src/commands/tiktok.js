const { downloader } = require("scrape-websitee");

module.exports = {
  name: "Tiktok Downloader",
  aliases: ["tiktok", "tt", "tik"],
  code: async (ctx) => {
    const bodyMsg = ctx._args;
    if (bodyMsg.length === 0) return ctx.reply("input a url");
    const data = await downloader.tiktokdl2(bodyMsg[0]);
    console.log(data);
    if (!data.status) return ctx.reply(data.message);
    if (data.type === "video") {
      await ctx.reply({ video: { url: data.video.server1 }, caption: data.caption })
    }
    if (data.type === "image") {
      for (let i = 0; i < data.images.length; i++) {
        await ctx.reply({ image: { url: data.images[i] }})
      }
    }
  },
};
