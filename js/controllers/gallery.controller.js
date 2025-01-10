'use strict'

function onGallertInit() {
    onSelectCategory('all')
}

function renderImgs(imgs) {

    var strHtmls = imgs.map(img => `
        <img src="./${img.url}" alt="" data-id="${img.id}" onclick="onSelectImg(this, 'gallery')">
        `)
    document.querySelector('.grid-container').innerHTML = strHtmls.join('')
}

function onSelectImg(elImg, fromWhere) {
    console.log('fromWhere', fromWhere)
    const selectedImgId = elImg.dataset.id
    if (fromWhere === 'gallery') {
        setSelecredImgId(selectedImgId)
        saveToStorage(STORAGE_KEY_CHOSEN_IMG, getMeme())
    }
    if (fromWhere === 'memes') {
        console.log('elImg', elImg)
        const memesGallery = loadFromStorage(MY_MEMES_STORAGE_KEY)
        console.log('memesGallery', memesGallery)
        const memeId = elImg.dataset.id
        console.log('Dataset ID:', elImg.dataset.id)
        const selectedMeme = memesGallery.find(meme => meme.selectedImgId === memeId)
        console.log('Selected Meme:', selectedMeme)
        const curMeme = JSON.parse(JSON.stringify(selectedMeme)) //deep copy
        setGmem(curMeme)
        saveToStorage(STORAGE_KEY_CHOSEN_IMG, curMeme)
        renderMeme()

    }


    window.location.href = 'index.html'
    // coverCanvasWithImg(elImg)
}

function onSetFilterBy(category) {
    var imgs = getImgs(category)
    renderImgs(imgs)
}

function onClearSearch() {
    var elPlaceHolder = document.querySelector('.search-bar')
    elPlaceHolder.querySelector('input').value = ''
    var imgs = getImgs()
    renderImgs(imgs)
}

function onSelectCategory(category) {
    var imgs
    if (category === 'all') {
        imgs = getImgs()
    } else {
        imgs = getImgs(category)
    }
    renderImgs(imgs)
}