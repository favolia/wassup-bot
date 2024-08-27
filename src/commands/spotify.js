const { search, downloadTrack } = require("@nechlophomeriaa/spotifydl");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "spotify",
  aliases: ["spdl", "spotify", "spotifys"],
  code: async (ctx) => {
    if (ctx._used.command === "spotifys") {
      if (ctx._args.length === 0) return ctx.reply("please input a query");
      const data = await search(ctx._args.join(" "));
      console.log(data);
    }
    if (ctx._used.command === "spdl" || ctx._used.command === "spotify") {
      if (ctx._args.length === 0) return ctx.reply("input query");
      const data = await downloadTrack(ctx._args.join(" "));
      console.log(data);
      await ctx.reply({
        image: {
          url: data.imageUrl,
        },
        caption: `title: ${data.title}\nartists: ${data.artists}\nduration: ${data.duration} seconds\nexplicit: ${data.explicit}\npopularity: ${data.popularity}\nalbum name: ${data.album.name}\nrelease date: ${data.album.releasedDate}`,
      });
      const date = Date.now();
      fs.writeFileSync(path.resolve() + `/temp/${date}.mp3`, data.audioBuffer);
      await ctx
        .reply({
          audio: { url: path.resolve() + `/temp/${date}.mp3` },
          mimetype: "audio/mpeg",
          ptt: false,
        })
        .then(() => {
          fs.unlinkSync(path.resolve() + `/temp/${date}.mp3`);
        });
    }
  },
};
