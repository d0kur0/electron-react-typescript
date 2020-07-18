const { dialog } = require("electron");
const { BrowserWindow } = require("electron");
const fs = require("fs");
const fetch = require("node-fetch");
const { electron } = require("process");

const downloader = async (event, { url }) => {
  const request = await fetch(url);

  if (request.status !== 200) {
    return event.reply("download-response", { url, error: "Download error" });
  }

  const imageAsBlob = await request.blob();
  const dialogResponse = await dialog.showSaveDialog(BrowserWindow.getFocusedWindow(), {
    filters: [
      { name: "Изображения", extensions: ["jpg", "png", "gif"] },
      { name: "Все файлы", extensions: ["*"] },
    ],
  });

  if (dialogResponse.canceled) {
    return event.reply("download-response", { url });
  }

  fs.promises
    .writeFile(dialogResponse.filePath, imageAsBlob)
    .then(() => event.reply("download-response", { url, success: "Image downloaded" }))
    .catch(() => event.reply("download-response", { url, error: "Save file error" }));
};

module.exports = [
  {
    name: "download-image",
    callback: downloader,
  },
];
