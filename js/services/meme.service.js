'use strict'

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



function setSelecredImgId(selecteId) {
    gMeme.selectedImgId = selecteId
}

function getMeme() {
    return gMeme
}

function setGmem(meme) {
    gMeme = meme
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

function getTotalLinesCount(){
    return gMeme.lines.length
}

function setCurLineIdx(newIdx){
    gMeme.selectedLineIdx = newIdx
}