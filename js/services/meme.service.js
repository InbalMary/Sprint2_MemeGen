'use strict'

const STORAGE_KEY = 'imgsDB'

var gImgs
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'black'
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

_createImgs()

function getImgs(optionalFilter) {
    var imgs = gImgs

    if (optionalFilter) imgs = _filterByCategory(optionalFilter)
    console.log('imgs from service', imgs)
    return imgs
}

function _filterByCategory(filterCateg) {
    return gImgs.filter(img => img.keywords.includes(filterCateg))
}

function _createImgs() {
    gImgs = loadFromStorage(STORAGE_KEY)
    if (gImgs && gImgs.length) return

    gImgs = []

    const categories = ['happy', 'sad', 'crazy', 'sarcastic', 'funny']

    for (let i = 0; i < 12; i++) {
        var category = categories[getRandomInt(0, categories.length)]
        gImgs.push(_createImg(category, i + 1))
    }
    _saveImgsToStorage()
}

function _createImg(category, urlNum) {
    return {
        id: makeId(),
        url: `imgs/${urlNum}.jpg`,
        keywords: [category]
    }
}

function _saveImgsToStorage() {
    saveToStorage(STORAGE_KEY, gImgs)
}

function setSelecredImgId(selecteId) {
    gMeme.selectedImgId = selecteId
}

function getMeme() {
    return gMeme
}

function setGmem(meme) {
    gMeme = meme
}

function getImgById(imgId) {
    const imgData = gImgs.find(img => img.id === imgId)
    console.log('imgData', imgData)
    if (imgData) {
        const elImg = new Image()
        elImg.src = imgData.url

        console.log('Image URL:', elImg.src)

        return elImg
    }
    return null
}

function setMemeText(txt) {
    if (gMeme.lines[gMeme.selectedLineIdx]) {
        gMeme.lines[gMeme.selectedLineIdx].txt = txt
    }
}


function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function getColor() {
    return gMeme.lines[gMeme.selectedLineIdx].color
}

function setFontSize(fontSize) {
    console.log('onsetsize', fontSize)
    gMeme.lines[gMeme.selectedLineIdx].size = fontSize
}

function getFontSize() {
    return gMeme.lines[gMeme.selectedLineIdx].size
}

function addLine(txt = 'I sometimes eat Falafel', size = 20, color = 'black') {
    gMeme.lines.push({
        txt,
        size,
        color
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function getCurLineIdx(){
    return gMeme.selectedLineIdx
}