require("module-alias/register")
const { Client, CommandHandler, Events, MessageType } = require("@mengkodingan/ckptw")
const { config } = require("@/config/config")
const path = require("path")

// docs: https://ckptw.mengkodingan.my.id/

const bot = new Client(config.client);

// Create command handlers and load commands.
const cmd = new CommandHandler(bot, path.resolve(__dirname, "commands"));
cmd.load();

bot.ev.once(Events.ClientReady, (m) => {
    console.log(`ready at ${m.user.id}`);
});

bot.command('hi', async (ctx) => ctx.reply('hello! you can use string as a first parameter in reply function too!'));

bot.hears('test', async (ctx) => ctx.reply('test 1 2 3 beep boop...'));
bot.hears(MessageType.stickerMessage, async (ctx) => ctx.reply('wow, cool sticker'));
bot.hears(['help', 'menu'], async (ctx) => ctx.reply('hears can be use with array too!'));
bot.hears(/(using\s?)?regex/, async (ctx) => ctx.reply('or using regex!'));

bot.launch();
