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
            color: 'red'
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

_createImgs()

function getImgs(optionalFilter){
    var imgs = gImgs

    if(optionalFilter) imgs = _filterByCategory(optionalFilter)
        console.log('imgs from service', imgs)
    return imgs
}

function _filterByCategory(filterCateg){
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
    _saveCarsToStorage()
}

function _createImg(category, urlNum) {
    return {
        id: makeId(), 
        url: `/imgs/${urlNum}.jpg`, 
        keywords: [category]
    }
}

function _saveCarsToStorage() {
    saveToStorage(STORAGE_KEY, gImgs)
}

function setSelecredImg(selectedUrl){
    console.log('url', selectedUrl)
    const selected = gImgs.find(img => img.url === selectedUrl)
    gMeme.selectedImgId = selected.id   
}

function getMeme(){
    return gMeme
}