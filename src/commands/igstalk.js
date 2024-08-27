const { search } = require("scrape-websitee");

module.exports = {
  name: "instagram stalk",
  aliases: "igstalk",
  code: async (ctx) => {
    let msgg = ctx._args;
    console.log(msgg.join(" "));
    if (msgg.length === 0) return ctx.reply("input a username");
    const data = await search.igStalk2(msgg.join(" "));
    console.log(data);
    if (!data.status) return ctx.reply(data.message);
    if (!data.pronouns) {
      var pron = "\n";
    } else {
      var pron = `\npronouns: ${data.pronouns}\n`;
    }
    if (data.externalUrl === undefined || data.externalUrl === "") {
      var bioh = `bio: ${data.bio}`;
    } else {
      var bioh = `bio: ${data.bio}\n${data.externalUrl}`;
    }
    await ctx.reply({
      image: { url: data.profilePic },
      caption: `username: ${data.username}\nnickname: ${data.fullName}\nfollowers: ${data.followers} followers\nfollowing: ${data.following} following${pron}verified: ${data.verified}\nprivate: ${data.private}\nposts: ${data.totalPosts}\n${bioh}`,
    });
  },
};
