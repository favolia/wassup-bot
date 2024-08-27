module.exports = {
  name: "tag all members",
  aliases: ["tagall", "mentionall", "hidetag", "ht"],
  isAdmin: true,
  code: async (ctx) => {
    const membs = await ctx.group().members();
    let mem = membs.map((s) => s.id);
    await ctx.sendMessage(ctx._msg.key.remoteJid, {
      text: ctx._args.join(" "),
      mentions: mem,
    });
  },
};
