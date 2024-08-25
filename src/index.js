const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  Browsers,
  makeInMemoryStore
} = require("@whiskeysockets/baileys");
const path = require('path');
const pino = require('pino')
const fs = require('fs');
const Boom = require("@hapi/boom");

async function connectToWhatsApp() {

  const store = makeInMemoryStore({});
// can be read from a file
store.readFromFile("./baileys_store.json");
// saves the state to a file every 10s
setInterval(() => {
  store.writeToFile("./baileys_store.json");
}, 10_000);
  
  const {
        state,
        saveCreds
    } = await useMultiFileAuthState('./BotSession')
    const sock = makeWASocket({
        printQRInTerminal: true,
        logger: pino({
            level: 'silent'
        }),
        browser: Browsers.macOS("Desktop"),
        auth: state,       linkPreviewImageThumbnailWidth: 300,      generateHighQualityLinkPreview: true,
      syncFullHistory: true,
    });

  store.bind(sock.ev);

  sock.ev.on("chats.set", () => {
  // can use "store.chats" however you want, even after the socket dies out
  // "chats" => a KeyedDB instance
  console.log("got chats", store.chats.all());
});

sock.ev.on("contacts.set", () => {
  console.log("got contacts", Object.values(store.contacts));
});
  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect =
        (lastDisconnect.error instanceof Boom && lastDisconnect.error.output?.statusCode) !==
        DisconnectReason.loggedOut;
      console.log(
        "connection closed due to ",
        lastDisconnect.error,
        ", reconnecting ",
        shouldReconnect
      );
      // reconnect jika tidak logout
      if (shouldReconnect) {
        connectToWhatsApp();
      }
    } else if (connection === "open") {
      console.log("opened connection");
    }
  });

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on("messages.upsert", ({ messages }) => {
  console.log("got messages", messages);
});

}

// run bot
connectToWhatsApp();
             
