'use strict'

function onIndexInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    console.log('gCtx', gCtx)
    // onResizeCanvas()
    onResize()

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
    let curIdxLine = getCurLineIdx()
    if(sign === '+') {
        fontSize += 2
        setFontSize(fontSize, curIdxLine)
    }
    if(sign === '-') {
        fontSize -= 2
        setFontSize(fontSize, curIdxLine)
    }
    
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

function onToggeleLine(){
    var elSearchWindow = document.querySelector('.textInput')

    var curIdxLine = getCurLineIdx()
    var totalLinesCount = getTotalLinesCount()

    var nextIdx = (curIdxLine + 1) % totalLinesCount

    elSearchWindow.value = getCurTxt(nextIdx)

    setCurLineIdx(nextIdx)
    renderMeme()
}

function onSetFont(elFont){    
    var curIdxLine = getCurLineIdx()
    setFontFamily( elFont.value, curIdxLine)
    var txt = getCurTxt(curIdxLine)
    // console.log('elFont.value- txt- idxcur', elFont.value, txt, curIdxLine)
    renderMeme()
    // renderText(txt, curIdxLine, elFont.value)
    
}

function onSetAlignment(direction){
    var curIdxLine = getCurLineIdx()
    setTxtAlignment(direction, curIdxLine)
    renderMeme()
}