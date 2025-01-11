'use strict'

var gFilterBy
let gElCanvas
let gCtx
var gMemesGallery = []
var gCurFramePos = []

var gIsMouseDown = false
var gCurrImoji = { shape: '', isOn: false }
// var gStartPos = null

const STORAGE_KEY_CHOSEN_IMG = 'chosenImgDB'
const MY_MEMES_STORAGE_KEY = 'myMemsDB'

function onMemeInit() {
    checkLoadMemeGallery()
}

//render an img on the canvas with a text line
function renderMeme() {
    const curMeme = getMeme()
    console.log('curmeme', curMeme)
    console.log('gCurFramePos', gCurFramePos)
    const img = getImgById(curMeme.selectedImgId)
    console.log('curMeme.lines[curMeme.selectedLineIdx].txt', curMeme)
    if (img) {
        img.onload = function () {
            clearCanvas()
            coverCanvasWithImg(img)

            curMeme.lines.forEach((line, idx) => {
                renderText(line.txt, idx, line.x, line.y)
            })

        }
    }
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderText(text, idx, x, y) {

    var curMeme = getMeme()
    const line = curMeme.lines[idx]

    const fontSize = getFontSize(idx)
    const fontFamily = getFontFamily(idx)
    const textAlignment = getTxtAlignment(idx)
    // const upOrDown = getUpOrDown(idx)
    // console.log('upOrDown', upOrDown)

    gCtx.font = `${fontSize}px ${fontFamily}`
    gCtx.fillStyle = line.color
    // gCtx.textAlign = "center"
    gCtx.textBaseline = "top"

    // const x = gElCanvas.width / 2
    // let x
    // const y = 50 + idx*50
    // let y
    // if(upOrDown === 'middle'){
    //     y = 50 + idx*50
    // } else 
    // if (upOrDown === 'up'){
    //     // y = 50 + idx*50 -30
    //     curMeme.lines[idx].y -30
    // } else if (upOrDown === 'down'){
    //     curMeme.lines[idx].y +30
    //     // y = 50 + idx*50 +30
    // }
    // console.log('y in render', y)
    if (textAlignment === 'center') {
        gCtx.textAlign = 'center'
        x = gElCanvas.width / 2
    } else if (textAlignment === 'left') {
        gCtx.textAlign = 'left'
        x = 20
    } else if (textAlignment === 'right') {
        gCtx.textAlign = 'right'
        x = gElCanvas.width - 20
    }

    // const y = line.y

    var curIdx = getCurLineIdx()
    // setUpdatedPos(curIdx, x, y)
    if (idx === curIdx) {

        gCtx.strokeStyle = 'blue'
        gCtx.lineWidth = 2
        const textWidth = gCtx.measureText(text).width
        const textHeight = fontSize


        // gCtx.strokeRect(x - textWidth / 2 - 10, y - 10, textWidth + 20, textHeight + 20)
        // const frame = {
        //     x: x - textWidth / 2 - 10,
        //     y: y - 10,
        //     width: textWidth + 20,
        //     height: textHeight + 20
        // }
        let frameX
        if (textAlignment === 'center') {
            frameX = x - textWidth / 2 - 10
        } else if (textAlignment === 'left') {
            frameX = x - 10
        } else if (textAlignment === 'right') {
            frameX = x - textWidth - 10
        }

        gCtx.strokeRect(frameX, y - 10, textWidth + 20, textHeight + 20)
        gCurFramePos[curIdx] = {
            x: frameX,
            y: y - 10,
            width: textWidth + 20,
            height: textHeight + 20,
        }

        // console.log('frame', frame)
        // gCurFramePos[curIdx] = frame
    }

    // gCtx.fillStyle = gMeme.lines[idx].color

    gCtx.fillText(text, x, y)


    // setTxtPosition(getCurFramPos(curIdx))
}


////////////////////////////////////////////////////////////

function onMove(ev) {

}

function onDown(ev) {
    gIsMouseDown = true

    if(gIsMouseDown && gCurrImoji.isOn){
        gCurrImoji.isOn = false
        const pos = getEvPos(ev)

        drawImoji(gCurrImoji.shape, pos.x, pos.y)
        gIsMouseDown = false
    }
    const { offsetX, offsetY, clientX, clientY } = ev
    console.log('gCurFramePos 155', gCurFramePos)
    const txtBox = gCurFramePos.find(txtBox => {
        return offsetX > txtBox.x && offsetX < txtBox.x + txtBox.width &&
            offsetY > txtBox.y && offsetY < txtBox.y + txtBox.height
    })

    if (txtBox) {
        const curFrameIdx = gCurFramePos.findIndex(item =>
            item.x === txtBox.x &&
            item.y === txtBox.y &&
            item.width === txtBox.width &&
            item.height === txtBox.height
        )
        console.log('curFrameIdx', curFrameIdx)
        setCurLineIdx(curFrameIdx)
        renderMeme()
    }
}

function drawImoji(imoji, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(imoji, x, y)
    gCtx.strokeText(imoji, x, y)
    setTxtPosition(x, y)
}

function onSetImoji(shape) {
    gCurrImoji = { shape, isOn: true }
    addLine(shape)
}

function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

    console.log('ev.offset', ev.offsetX, ev.offsetY)
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        // Prevent triggering the mouse ev
        ev.preventDefault()
        // Gets the first touch point
        ev = ev.changedTouches[0]
        // Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}
////////////////////////////////////////////////////////////


function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}


///////////////////////////////////////////
function onResizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
}


function onResize() {
    resizeCanvas()
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}
//////////////////////////////////////////////////////////////////

/////////////////////////////

function onSaveMeme() {
    const savedMemes = loadFromStorage(MY_MEMES_STORAGE_KEY) || []

    const curMeme = getMeme()
    const curMemeDeepCopy = JSON.parse(JSON.stringify(curMeme))
    // curMemeDeepCopy.id = makeId()
    curMemeDeepCopy.image = saveMemeToImg()

    savedMemes.push(curMemeDeepCopy)
    console.log('gMemesGallery', gMemesGallery)
    saveToStorage(MY_MEMES_STORAGE_KEY, savedMemes)
    gMemesGallery = savedMemes
}

function saveMemeToImg() {
    return gElCanvas.toDataURL('image/png')
}


function renderMyMemesGallery(memes) {
    const strHTML = memes.map(meme => {
        return `
        <article class="meme-gallery">  
            <button onclick="onRemoveImg('${meme.selectedImgId}')">X</button>
            <img src="${meme.image}" alt="Saved Meme" data-id="${meme.selectedImgId}" onclick="onSelectImg(this, 'memes')">                  
        </article>`
    })
    document.querySelector('.my-memes-gallery-container').innerHTML = strHTML.join('')
}


function onRemoveImg(memeId) {
    console.log('memeId on remove', memeId)
    var savedMemes = loadFromStorage(MY_MEMES_STORAGE_KEY)
    savedMemes = savedMemes.filter(meme => meme.selectedImgId !== memeId);
    saveToStorage(MY_MEMES_STORAGE_KEY, savedMemes)
    renderMyMemesGallery(savedMemes)
    gMemesGallery = savedMemes
}

function checkLoadMemeGallery() {
    const memesGallery = loadFromStorage(MY_MEMES_STORAGE_KEY)
    if (!memesGallery) return
    console.log('gallery', memesGallery)
    if (memesGallery.length) {
        gMemesGallery = memesGallery
    }
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


function getgCurFramePos() {
    return gCurFramePos
}

/////////////////////////////////////////////////////////////
function onUploadImg(ev) {
    ev.preventDefault()
    const canvasData = gElCanvas.toDataURL('image/jpeg')

    // After a succesful upload, allow the user to share on Facebook
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)

        // document.querySelector('.share-container').innerHTML = `
        // <a href="${uploadedImgUrl}">Uploaded picture</a>
        // <p>Image url: ${uploadedImgUrl}</p>
        // <button class="btn-facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}')">
        //    Share on Facebook  
        // </button>`
    }

    uploadImg(canvasData, onSuccess)
}