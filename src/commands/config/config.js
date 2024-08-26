/** @type {{client: import("@mengkodingan/ckptw").IClientOptions}} */
module.exports.config = {
    client: {
        prefix: "!",
        printQRInTerminal: false, // set ke false jika menggunakan pairing mode
        usePairingCode: true, // pairing mode
        phoneNumber: "62***********", // nomor target pairing
        readIncommingMsg: false,
        WAVersion: [2, 3000, 1015901307] // add this
    },
}
