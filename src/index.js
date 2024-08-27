require("module-alias/register");
const {
  Client,
  CommandHandler,
  Events,
  MessageType,
} = require("@mengkodingan/ckptw");
const { config } = require("@/config/config");
const path = require("path");
const util = require("util");
const { exec } = require("child_process");

// docs: https://ckptw.mengkodingan.my.id/

const bot = new Client(config.client);

// Create command handlers and load commands.
const cmd = new CommandHandler(bot, path.resolve(__dirname, "commands"));
cmd.load();
bot.ev.on(Events.MessagesUpsert, async (m, ctx) => {
  if (
    m.content.startsWith(">") &&
    config.opts.owner.includes(m.key.remoteJid)
  ) {
    console.log(m.content.split("> ")[1]);
    try {
      const eva = await eval(`(async () => { ${m.content.split("> ")[1]} })()`);
      await ctx.reply(await util.format(eva));
    } catch (err) {
      console.log(err);
      ctx.reply(String(err));
    }
  }
});

bot.ev.once(Events.ClientReady, (m) => {
  console.log(`ready at ${m.user.id}`);
});

bot.launch();
