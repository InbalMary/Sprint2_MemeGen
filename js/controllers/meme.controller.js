'use strict'

var gFilterBy
let gElCanvas
let gCtx
var gMemesGallery = []

const STORAGE_KEY_CHOSEN_IMG = 'chosenImgDB'
const MY_MEMES_STORAGE_KEY = 'myMemsDB'

//render an img on the canvas with a text line
function renderMeme() {
    const curMeme = getMeme()
    const img = getImgById(curMeme.selectedImgId)
console.log('curMeme.lines[curMeme.selectedLineIdx].txt', curMeme)
    if (img) {
        img.onload = function () {
            clearCanvas()
            coverCanvasWithImg(img)

            curMeme.lines.forEach((line, idx) => {
                renderText(line.txt, idx)
            })
            
        }
    }
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderText(text, idx) {

    gCtx.font = getFontSize() + "px Arial"
    gCtx.fillStyle = getColor()
    gCtx.textAlign = "center"
    gCtx.textBaseline = "top"

    const x = gElCanvas.width / 2
    const y = 50 + idx*50
    gCtx.fillText(text, x, y);
}





function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}


///////////////////////////////////////////
function onResizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
}


//////////////////////////////////////////////////////////////////

/////////////////////////////


function renderMyMemesGallery(imgs) {
    var strHTML = imgs.map(img => {
        return `<article class="meme-gallery" onclick="onImgInput(${img})">  
        <button onclick="onRemoveImg('${img}')">X</button>
            <img src="${img}" onclick="onImgInput(event)">                   
        </article>`
    })

    document.querySelector('.my-memes-gallery-container').innerHTML = strHTML.join('')

}

function checkLoadMemeGallery() {
    var memesGallery = loadFromStorage(MY_MEMES_STORAGE_KEY)
    if (!memesGallery) return
    console.log('gallery', memesGallery)
    if (memesGallery.length) {
        gMemesGallery = memesGallery
    }
    saveToStorage(MY_MEMES_STORAGE_KEY, gMemesGallery)
    renderMyMemesGallery(gMemesGallery)
}

function onMemeInit(){
    checkLoadMemeGallery()
}

function onRemoveImg(data) {
    var idx = gMemesGallery.findIndex(img => img === data)
    gMemesGallery.splice(idx, 1)
    saveToStorage(MY_MEMES_STORAGE_KEY, gMemesGallery)
    renderMyMemesGallery(gMemesGallery)
}


// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    // document.querySelector('.share-container').innerHTML = ''
    const reader = new FileReader()

    reader.onload = function (event) {
        const img = new Image()
        img.onload = () => {
            onImageReady(img)
        }
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}
