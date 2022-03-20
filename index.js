const { app, BrowserWindow } = require("electron")
const path = require("path")
app.allowRendererProcessReuse = false

let win
const config = require("./config.json")
const renderScale = config.renderScale
const winSize = config.winSize

function createWindow() {
	win = new BrowserWindow({
		icon: 'src/app.png',
		width: parseInt(winSize[0] * renderScale),
		height: parseInt(winSize[1] * renderScale),
		frame: false,
		resizable: false,
		// alwaysOnTop: true,
		// transparent: true,
		webPreferences: {
			// transparent: true,
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: false,
		},
	})
	// win.setAspectRatio(winSize[0] / winSize[1]) // 왜 안될까요

	win.loadFile("src/index.html")

	win.on("closed", () => {
		win = null
	})
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
	app.quit()
})

app.on("activate", () => {
	if (win === null) {
		createWindow()
	}
})
