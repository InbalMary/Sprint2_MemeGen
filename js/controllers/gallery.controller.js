'use strict'

function onGallertInit() {
    renderImgs()
}

function renderImgs() {
    var imgs = getImgs(gFilterBy)
    var strHtmls = imgs.map(img => `
        <img src="${img.url}" alt="" data-id="${img.id}" onclick="onSelectImg(this)">
        `)
    document.querySelector('.grid-container').innerHTML = strHtmls.join('')
}

function onSelectImg(elImg) {
    const selectedImgId = elImg.dataset.id
    setSelecredImgId(selectedImgId)
    // renderMeme()
    saveToStorage(STORAGE_KEY_CHOSEN_IMG, getMeme())
    window.location.href = 'index.html'
    // coverCanvasWithImg(elImg)
}

function onSetFilterBy(parameter){

}

function onClearSearch(){

}

function onSelectCategory(category){
    
}