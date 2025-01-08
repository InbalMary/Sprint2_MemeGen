'use strict'
var gFilterBy
let gElCanvas
let gCtx
const STORAGE_KEY_CHOSEN_IMG = 'chosenImgDB'

function onGallertInit() {
    renderImgs()
}

function onIndexInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    console.log('gCtx', gCtx)
    onResizeCanvas()
    renderMeme()

}

//render an img on the canvas with a text line
function renderMeme() {
    const selectedImage = loadFromStorage(STORAGE_KEY_CHOSEN_IMG)
    if (selectedImage) {
        const img = new Image()
        img.src = selectedImage
        img.onload = function () {
            coverCanvasWithImg(img)
            renderText("Enter Your Text Here")
        }
    }
}

function onSelectImg(elImg) {
    saveToStorage(STORAGE_KEY_CHOSEN_IMG, elImg.src)
    window.location.href = 'index.html'
    // coverCanvasWithImg(elImg)
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}


function renderImgs() {
    var imgs = getImgs(gFilterBy)
    var strHtmls = imgs.map(img => `
        <img src="${img.url}" alt="" onclick="onSelectImg(this)">
        `)
    document.querySelector('.grid-container').innerHTML = strHtmls.join('')
}

function renderText(text) {

    gCtx.font = "30px Arial"
    gCtx.fillStyle = "white"
    gCtx.textAlign = "center"
    gCtx.textBaseline = "top"


    const x = gElCanvas.width / 2
    const y = 50
    gCtx.fillText(text, x, y);
}




///////////////////////////////////////////
function onResizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
}