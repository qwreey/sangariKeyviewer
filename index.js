const { app, BrowserWindow } = require("electron")
app.allowRendererProcessReuse = false

let win

function createWindow() {
	win = new BrowserWindow({
		width: 360,
		height: 200,
		frame: false,
		// alwaysOnTop: true,
		resizable: false,
		// transparent: true,
		webPreferences: {
			transparent: true,
			preload: require("path").join(__dirname, "preload.js"),
			nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: false,
		},
	})

	win.loadFile("src/index.html")

	win.on("closed", () => {
		win = null
	})
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit()
	}
})

app.on("activate", () => {
	if (win === null) {
		createWindow()
	}
})
