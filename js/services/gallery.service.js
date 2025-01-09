'use strict'

const STORAGE_KEY = 'imgsDB'

var gImgs

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

    for (let i = 0; i < 18; i++) {
        var category = categories[getRandomInt(0, categories.length)]
        gImgs.push(_createImg(category, i + 1))
    }
    _saveImgsToStorage()
}

function _createImg(category, urlNum) {
    return {
        id: makeId(),
        url: `./imgs/${urlNum}.jpg`,
        keywords: [category]
    }
}

function _saveImgsToStorage() {
    saveToStorage(STORAGE_KEY, gImgs)
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