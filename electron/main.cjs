const { app, BrowserWindow, shell } = require("electron");
const fs = require("fs");
const http = require("http");
const path = require("path");

const isDev = !app.isPackaged;
const startUrl = process.env.ELECTRON_START_URL;
const distPath = path.join(__dirname, "..", "dist");
let staticServer;

const mimeTypes = {
  ".css": "text/css",
  ".html": "text/html",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript",
  ".json": "application/json",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
};

function getSafeFilePath(urlPathname) {
  const decodedPath = decodeURIComponent(urlPathname);
  const requestedPath = decodedPath === "/" ? "/index.html" : decodedPath;
  const filePath = path.normalize(path.join(distPath, requestedPath));

  if (!filePath.startsWith(distPath)) {
    return null;
  }

  return filePath;
}

function startStaticServer() {
  if (staticServer) {
    return staticServer;
  }

  // Expo web exports reference assets from root paths, so packaged Electron
  // serves dist through localhost instead of loading index.html with file://.
  staticServer = http.createServer((request, response) => {
    const requestUrl = new URL(request.url, "http://127.0.0.1");
    const filePath = getSafeFilePath(requestUrl.pathname);

    if (!filePath) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        fs.readFile(path.join(distPath, "index.html"), (indexError, indexData) => {
          if (indexError) {
            response.writeHead(404);
            response.end("Not found");
            return;
          }

          response.writeHead(200, { "Content-Type": "text/html" });
          response.end(indexData);
        });
        return;
      }

      response.writeHead(200, {
        "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream"
      });
      response.end(data);
    });
  });

  return staticServer;
}

function listen(server) {
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      server.off("error", reject);
      const address = server.address();
      resolve(`http://127.0.0.1:${address.port}`);
    });
  });
}

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 390,
    minHeight: 700,
    backgroundColor: "#ffffff",
    title: "Health Age",
    icon: path.join(__dirname, "..", "assets", "healthAge_Icon.png"),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.setMenuBarVisibility(false);

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  if (isDev && startUrl) {
    mainWindow.loadURL(startUrl);
    mainWindow.webContents.openDevTools({ mode: "detach" });
    return;
  }

  const appUrl = await listen(startStaticServer());
  mainWindow.loadURL(appUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
