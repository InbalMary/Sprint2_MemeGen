'use strict'

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            fontFamily: 'Ariel',
            txtDir: 'center',
            upOrDown: 'middle',
            color: 'black',
            isDrag: false,
            x: 50,
            y: 50
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

function setUpdatedPos(curIdx, x, y) {
    if (!gMeme.lines[curIdx]) return
    gMeme.lines[curIdx].pos.x = x
    gMeme.lines[curIdx].pos.y = y
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
    // console.log('onsetsize', fontSize)
    gMeme.lines[idx].size = fontSize
}

function getFontSize(idx = gMeme.selectedLineIdx) {
    return gMeme.lines[idx].size
}

function setFontFamily(fontFamily, idx = gMeme.selectedLineIdx) {
    // console.log('onsetfamily', fontFamily)
    gMeme.lines[idx].fontFamily = fontFamily
}

function getFontFamily(idx = gMeme.selectedLineIdx) {
    return gMeme.lines[idx].fontFamily
}

function setTxtAlignment(txtDir, idx = gMeme.selectedLineIdx) {
    // console.log('txtDir', txtDir)
    gMeme.lines[idx].txtDir = txtDir
}

function getTxtAlignment(idx = gMeme.selectedLineIdx) {
    return gMeme.lines[idx].txtDir
}

function setUpOrDown(upOrDown, idx = gMeme.selectedLineIdx){
    gMeme.lines[idx].upOrDown = upOrDown
    if(upOrDown === 'up') {
        gMeme.lines[idx].y -= 30
    } else if (upOrDown === 'down'){
        gMeme.lines[idx].y += 30
    }
}

function getUpOrDown(idx) {
    // console.log('gMeme.lines[idx].upOrDown', gMeme.lines[idx].upOrDown)
    return gMeme.lines[idx].upOrDown
}

function addLine(txt = 'I sometimes eat Falafel', size = 20, color = 'black', x= 50, y = 50 + gMeme.lines.length * 50 ) {
    gMeme.lines.push({    
        txt,
        size,
        fontFamily: 'Ariel',
        txtDir: 'center',
        upOrDown: 'middle',
        color,
        isDrag: false,
        x,
        y
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

function deleteSelectedLine(idx){
    console.log('idx at del selected', idx)
    if (idx < 0 || idx >= gMeme.lines.length) return
    gMeme.lines.splice(idx, 1)
    var curFramePos = getgCurFramePos()
    console.log('curFramePos-before splice', curFramePos)
    curFramePos.splice(idx, 1)
    console.log('curFramePos-AFTER splice', curFramePos)

}

function setTxtPosition(x, y){
    gMeme.lines[gMeme.selectedLineIdx].x = x
    gMeme.lines[gMeme.selectedLineIdx].y = y
}

function getTxtPosition(idx){
    console.log('gMeme.lines[idx].y', gMeme.lines[idx].y)
    var x = gMeme.lines[idx].x
    var y = gMeme.lines[idx].y 
    return ({x,y})
}

function setXcurPos(x){
    gMeme.lines[gMeme.selectedLineIdx].x = x
}

function setLineDragable(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
  }

function getLineDrag(){
    return gMeme.lines[gMeme.selectedLineIdx].isDrag
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].x += dx
    gMeme.lines[gMeme.selectedLineIdx].y += dy
  
  }