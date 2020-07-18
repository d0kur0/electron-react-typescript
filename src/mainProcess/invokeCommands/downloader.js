const { dialog } = require("electron");
const { BrowserWindow } = require("electron");
const fs = require("fs");
const fetch = require("node-fetch");

const downloader = async (event, { url }) => {
  const request = await fetch(url);

  if (!request.ok) {
    return event.reply("download-response", { url, error: "Download error" });
  }

  const imageBuffer = await request.buffer();
  const dialogResponse = await dialog.showSaveDialog(BrowserWindow.getFocusedWindow(), {
    filters: [
      { name: "PNG Изображения", extensions: ["png"] },
      { name: "Все файлы", extensions: ["*"] },
    ],
  });

  if (dialogResponse.canceled) {
    return event.reply("download-response", { url });
  }

  fs.promises
    .writeFile(dialogResponse.filePath, imageBuffer)
    .then(() => event.reply("download-response", { url, success: "Image downloaded" }))
    .catch(() => event.reply("download-response", { url, error: "Save file error" }));
};

module.exports = [
  {
    name: "download-image",
    callback: downloader,
  },
];
