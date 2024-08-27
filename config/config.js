/** @type {{client: import("@mengkodingan/ckptw").IClientOptions}} */
module.exports.config = {
  opts: {
    owner: ["62895334951166@s.whatsapp.net", "628875090455@s.whatsapp.net"]
  },
  client: {
    prefix: ["/", "!", "#", ''],
    selfReply: true,
    authDir: "session",
    printQRInTerminal: false, // set ke false jika menggunakan pairing mode
    usePairingCode: true, // pairing mode
    phoneNumber: "62895334951166", // nomor target pairing
    readIncommingMsg: false,
    WAVersion: [2, 3000, 1015901307], // add this
  },
};
