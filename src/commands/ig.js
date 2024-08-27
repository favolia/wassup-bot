const { downloader } = require("scrape-websitee");

module.exports = {
  name: "Instagram Reels/Posts/Story downloader",
  aliases: ["igs", "igstory", "ig", "insta", "instagram"],
  code: async (ctx) => {
    const body = ctx._args;
    const cmd = ctx._used.command;
    if (cmd === "igs") {
      const data = await downloader.igStory(body[0]);
      console.log(data);
    }
    if (cmd === "ig" || cmd === "insta" || cmd === "instagram") {
      const data = await downloader.igdl(body[0]);
      console.log(data);
    }
  },
};
