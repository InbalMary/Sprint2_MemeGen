'use strict'

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

function onTextInput(elInput) {
    console.log('elInput', elInput.value)
    setMemeText(elInput)
    renderMeme()
}

function onSetColor(color){
    setColor(color)
    renderMeme()
}

function onUpdateFontSize(sign){
    let fontSize = getFontSize()
    if(sign === '+') fontSize += 2
    if(sign === '-') fontSize -= 2
    setFontSize(fontSize)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

//memes handel- download work- but save stil not

function onDownloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()

    elLink.href = dataUrl
    // Set a name for the downloaded file
    elLink.download = 'my-perfect-img'
    elLink.click()
    // console.log('dataUrl', dataUrl)
    // gMemesGallery.push(dataUrl)
    // console.log('gMemesGallery', gMemesGallery)
    // saveToStorage(MY_MEMES_STORAGE_KEY, gMemesGallery)
    // renderMyMemesGallery(gMemesGallery)
}