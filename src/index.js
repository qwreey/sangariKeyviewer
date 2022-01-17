// 메뉴 만들기
const menu = new Menu()
menu.append(
	new MenuItem({
		label: "다시로드",
		click() {
			window.location.reload()
		},
	}),
)
menu.append(
	new MenuItem({
		label: "종료",
		role: "quit",
	}),
)
window.addEventListener(
	"contextmenu",
	(e) => {
		e.preventDefault()
		menu.popup(remote.getCurrentWindow())
	},
	false,
)

// 키 인식부분
const ioHook = require("iohook")

ioHook.on("keydown", (event) => {
	console.log("Key down")
	document.querySelectorAll(".onKeys").forEach((item) => {
		item.classList.add("onDown")
	})
})
ioHook.on("keyup", (event) => {
	console.log("Key up")
	document.querySelectorAll(".onKeys").forEach((item) => {
		item.classList.remove("onDown")
	})
})

ioHook.start()
