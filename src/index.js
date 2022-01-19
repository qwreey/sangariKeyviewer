// 난수 함수
function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

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

// 숨쉬기 부분
const brHoldMs = config.breathHoldMs
const brReleaseMs = config.breathReleaseMs
const breaths = document.querySelectorAll(".whenBreath")
function breath() {
	breaths.forEach((item) => {
		item.classList.add("onBreath")
	})
	setTimeout(() => {
		breaths.forEach((item) => {
			item.classList.remove("onBreath")
		})
		setTimeout(breath, brReleaseMs)
	}, brHoldMs)
}
setTimeout(breath, 1)

// 눈감기 부분
const blinkMin = config.blinkWaitMs.min
const blinkMax = config.blinkWaitMs.max
const blinkHold = config.blinkHoldMs
const whenBlink = document.querySelectorAll(".whenBlink")
function blink() {
	setTimeout(() => { 
		whenBlink.forEach((item) => { 
			item.classList.add("onBlink")
		})
		setTimeout(() => { 
			whenBlink.forEach((item) => { 
				item.classList.remove("onBlink")
			})
			blink()
		}, blinkHold)
	}, rand(blinkMin, blinkMax))
}
setTimeout(blink, 1)

const ioHook = require("iohook")

// 키 인식부분
const whenKeys = document.querySelectorAll(".whenKeys")
let downKeys = []
ioHook.on("keydown", (event) => {
	let keycode = event.keycode
	if (downKeys.indexOf(keycode) == -1) {
		downKeys.push(keycode)
	}

	whenKeys.forEach((item) => {
		item.classList.add("onKeys")
	})
})
ioHook.on("keyup", (event) => {
	let keycode = event.keycode
	let pos = downKeys.indexOf(keycode)
	if (pos != -1) downKeys.splice(pos)

	if (downKeys.length == 0) {
		if (downKeys == 0) {
			whenKeys.forEach((item) => {
				item.classList.remove("onKeys")
			})
		}
	}
})

/* 마우스 움직이는 부분 */
const mouse = document.querySelector("#hand_mouse")
const moveMutX = config.mouseMoveMultiplier[0] * 2
const moveMutY = config.mouseMoveMultiplier[1] * 2
const mouseOffX = config.mouseOffset[0]
const mouseOffY = config.mouseOffset[1]
const mouseRotX = config.mouseRotateX
const mouseRotY = config.mouseRotateY
const bodyMoveX = config.bodyMove[0]
const bodyMoveY = config.bodyMove[1]
const faceMoveX = config.faceMove[0]
const faceMoveY = config.faceMove[1]
const body = document.querySelector("#body")
const face = document.querySelector("#face")
function whenMouse(event) {
	let x = event.x / screen.width - 0.5
	let y = event.y / screen.height - 0.5
	
	// 마우스 움직이기
	mouse.style.left = parseInt((x * -moveMutX) + mouseOffX + (y * mouseRotY)) + "px"
	mouse.style.top  = parseInt((y * -moveMutY) + mouseOffY + (x * mouseRotX)) + "px"
	
	// 몸 움직이기
	body.style.left = parseInt(bodyMoveX * x) + "px"
	body.style.top  = parseInt(bodyMoveY * y) + "px"
	face.style.left = parseInt(faceMoveX * x) + "px"
	face.style.top  = parseInt(faceMoveY * y) + "px"
}
ioHook.on("mousedrag", whenMouse)
ioHook.on("mousemove", whenMouse)

ioHook.start()

/* 창 닫기 버튼 */
document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        document.querySelector(".button#close").addEventListener("click", event => {
			window.close();
		});		
    }
};
