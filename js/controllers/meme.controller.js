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

    const storedMeme = loadFromStorage(STORAGE_KEY_CHOSEN_IMG)
    if (storedMeme) {
        setGmem(storedMeme)
    }
    renderMeme()
}

//render an img on the canvas with a text line
function renderMeme() {
    const curMeme = getMeme()
    const img = getImgById(curMeme.selectedImgId)
console.log('curMeme.lines[curMeme.selectedLineIdx].txt', curMeme)
    if (img) {
        img.onload = function () {
            clearCanvas()
            coverCanvasWithImg(img)
            renderText(curMeme.lines[curMeme.selectedLineIdx].txt)
        }
    }
}

function onSelectImg(elImg) {
    const selectedImgId = elImg.dataset.id
    setSelecredImgId(selectedImgId)
    // renderMeme()
    saveToStorage(STORAGE_KEY_CHOSEN_IMG, getMeme())
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
        <img src="${img.url}" alt="" data-id="${img.id}" onclick="onSelectImg(this)">
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


function onTextInput(elInput) {
    console.log('elInput', elInput.value)
    setMemeText(elInput)
    renderMeme()
}


function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}


///////////////////////////////////////////
function onResizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
}