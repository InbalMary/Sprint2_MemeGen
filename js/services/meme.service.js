'use strict'

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'black',
            isDrag: false
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function setTxtDrag(idx, isDrag) {
    gMeme.lines[idx].isDrag = isDrag
}

function isTxtDragging(idx) {
    return gMeme.lines[idx]?.isDragging || false
}

function setUpdatedPos(curIdx, dx, dy){
    if (!gMeme.lines[idx]) return
    gMeme.lines[curIdx].pos.x += dx
    gMeme.lines[curIdx].pos.y += dy
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

function setFontSize(fontSize, idx = gMeme.selectedLineIdx) {
    console.log('onsetsize', fontSize)
    gMeme.lines[idx].size = fontSize
}

function getFontSize(idx = gMeme.selectedLineIdx) {
    return gMeme.lines[idx].size
}

function addLine(txt = 'I sometimes eat Falafel', size = 20, color = 'black') {
    gMeme.lines.push({
        txt,
        size,
        color,
        isDrag: false
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function getCurLineIdx() {
    return gMeme.selectedLineIdx
}

function getTotalLinesCount() {
    return gMeme.lines.length
}

function setCurLineIdx(newIdx) {
    gMeme.selectedLineIdx = newIdx
}

function getCurTxt(idx) {
    return gMeme.lines[idx].txt
}