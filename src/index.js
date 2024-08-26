import { Client, Events, MessageType } from "@mengkodingan/ckptw";

// docs: https://ckptw.mengkodingan.my.id/

const bot = new Client({
    prefix: "!",
    printQRInTerminal: true, // set ke false jika menggunakan pairing mode
    // usePairingCode: true, // pairing mode
    // phoneNumber: "62**********", // nomor target pairing
    readIncommingMsg: true,
    WAVersion: [2, 3000, 1015901307] // add this
});

bot.ev.once(Events.ClientReady, (m) => {
    console.log(`ready at ${m.user.id}`);
});

bot.command('ping', async (ctx) => ctx.reply({ text: 'pong!' }));
bot.command('hi', async (ctx) => ctx.reply('hello! you can use string as a first parameter in reply function too!'));

bot.hears('test', async (ctx) => ctx.reply('test 1 2 3 beep boop...'));
bot.hears(MessageType.stickerMessage, async (ctx) => ctx.reply('wow, cool sticker'));
bot.hears(['help', 'menu'], async (ctx) => ctx.reply('hears can be use with array too!'));
bot.hears(/(using\s?)?regex/, async (ctx) => ctx.reply('or using regex!'));

bot.launch();
