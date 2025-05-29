/* Built-in Functions */
function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight)

    Thumbnail()
    Information()
    SoundVisualizer()
    FrameStructure(frameActive, viewOld)
    playPauseBtnReload()

}

function mousePressed() {
    viewOld = true
    
    let d = dist(mouseX, mouseY, sBX + scrubberVal+(coordXUpd[13]-coordXUpd[12]), sBY +((height-(800*(rVC)))/2))
    if(d < 10) {
        scrubberDrags = true
        if (playPausePlaying) {
            soundWasPlaying = true
            soundInfo[0].pause()
        }
    }

}

function mouseReleased() {
    viewOld = false

    scrubberDrags = false

    if (soundWasPlaying) {
        soundInfo[0].play()
        soundWasPlaying = false
    }
}

function mouseWheel(event) {
    if (mouseX >= coordXUpd[8] && mouseX <= coordXUpd[10] && mouseY >= coordYUpd[5] && mouseY <= coordYUpd[8]) {
        t = 0.1
        let delta = event.delta
        if(scrollPos < coordYUpd[5]-dBY+dBSY*(1/10)+5 && scrollPos > -descriptionTextArray.length*8.2+(dBSY/2)) {
            scrollPos += delta
        } else if (scrollPos >= coordYUpd[5]-dBY+dBSY*(1/10)+5) {
            scrollPos = coordYUpd[5]-dBY+dBSY*(1/10)
        } else if (scrollPos <= -descriptionTextArray.length*8.2+(dBSY/2)){
            scrollPos = -descriptionTextArray.length*8.2+(dBSY/2)+dBSY*(1/10)
        }
    }
    return false
}

function keyPressed() {
    if ( key === 'f') {
        frameActive = !frameActive
    }
}



/* Functions for Play Button */
function playPauseBtnPreload() {
    playPauseImgData = [loadImage("assets/a icons/play.png"), loadImage("assets/a icons/pause.png")]
    playPauseImg = ["assets/a icons/play.png", "assets/a icons/pause.png"]
    // playPauseSong = [sound[0]]
    playPauseSongInfo = [soundInfo[0]]
}

function playPauseBtnReload() {
    playPauseBtn.remove()
    playPauseBtn = createImg(loaded)
    playPauseBtn.position(playPausePosX, playPausePosY)
    playPauseBtn.size(playPauseSizeX, playPauseSizeY)
    playPauseBtn.mousePressed(playPauseBtnPressed)
}

function playPauseBtnSetup() {
    playPausePosX = coordXUpd[4]+(coordXUpd[13]-coordXUpd[12]), playPausePosY = coordYUpd[10]+((height-(800*(rVC)))/2)- 5
    loaded = playPauseImg[0]
    loadedData = playToggle ? playPauseImgData[0] : playPauseImgData[1]
    playPauseSizeX = loadedData.width*((coordXUpd[5]-coordXUpd[4])/loadedData.width)/2, playPauseSizeY = loadedData.height*((coordYUpd[11]-coordYUpd[9])/loadedData.height)/2
    playPauseBtn = createImg(loaded)
    playPauseBtn.position(playPausePosX, playPausePosY)
    playPauseBtn.size(playPauseSizeX, playPauseSizeY)
    playPauseBtn.mousePressed(playPauseBtnPressed)
}

function playPauseBtnPressed() {
    loaded = playToggle ? playPauseImg[0] : playPauseImg[1]
    loadedData = playToggle ? playPauseImgData[0] : playPauseImgData[1]
    playToggle = !playToggle
    playPauseBtn.remove()
    playPauseBtn = createImg(loaded)
    playPauseBtn.position(playPausePosX, playPausePosY)
    playPauseBtn.size(playPauseSizeX, playPauseSizeY)
    playPauseBtn.mousePressed(playPauseBtnPressed)
    playPauseSongInfo[0].showControls()
    if (playPausePlaying) {
        playPauseSongInfo[0].pause()
        soundWasPlaying = false
        playPausePlaying = !playPausePlaying

        // Sound Visualizer
        played = true

    } else if (!playPausePlaying) {
        playPauseSongInfo[0].play()
        playPausePlaying = !playPausePlaying
        soundWasPlaying = true

        // Sound Visualizer
        initLevel = level

    }
    sCTI = playPauseSongInfo[0].time()
    playPauseSongInfo[0].hideControls()
}



/* Framing and Measurements function */
function FrameStructure(on = false, original = false) {
    let nV = rVC
        coordY = [26, 46, 59, 73, 80, 96, 145, 171, 405, 456, 473, 490, 493, 507, 534, 558, 774]
        coordX = [53, 80, 425, 527, 556, 585, 681, 849, 895, 1206, 1275, 1294, 1320, 1348]
  
        for (let i=0; i < coordY.length; i++) {
            coordYUpd.push(coordY[i]*nV)
        }
        for (let i=0; i < coordX.length; i++) {
        coordXUpd.push(coordX[i]*nV)
        }

    if (on) {
        stroke(300, 90, 100)
        strokeWeight(1)

        if (original) {
        for (let i = 0; i < coordY.length; i++) {
            stroke(30, 90, 100)
            line(0, coordY[i], width, coordY[i])

        }

        // Vertical Frames
        for (let i = 0; i < coordX.length; i++) {
            stroke(30, 90, 100)
            line(coordX[i], 0, coordX[i], height)

        }

        // Screen Frame
        stroke(75, 90, 100)
        line(0, 0, 1400, 0)
        line(1400, 0, 1400, 800)
        line(1400, 800, 0, 800)
        line(0, 800, 0, 0)

        } else {

        // Horizontal Frames
        for (let i = 0; i < coordY.length; i++) {
            stroke(300, 90, 100)
            line(0, coordYUpd[i], width, coordYUpd[i])
        }

        // Vertical Frames
        for (let i = 0; i < coordX.length; i++) {
            stroke(300, 90, 100)
            line(coordXUpd[i], 0, coordXUpd[i], height)
        }

        // Screen Frame
        stroke(360, 90, 100)
        line(0, 0, width, 0)
        line(width, 0, width, 800*nV)
        line(width, 800*nV, 0, 800*nV)
        line(0, 800*nV, 0, 0)
        }
    }
    // print(`screen width is ${window.innerWidth}, screen height is ${window.innerHeight}`)
}



/* Functions for Thumbnail */
function Thumbnail() {
    let tSX = coordXUpd[2]-coordXUpd[1], tSY = coordYUpd[14]-coordYUpd[0]
    // let iSX, iSY
    CheckImageSize(img[0].width, img[0].height)
    stroke(0, 0, 50, 60)
    strokeWeight(3)
    noFill()
    rect(coordXUpd[1], coordYUpd[0], tSX, tSY, 10)
    image(img[0], coordXUpd[1]+tSX/2, coordYUpd[0]+tSY/2, iSX, iSY)
}

function CheckImageSize(imageWidth, imageHeight) {
    let tSX = coordXUpd[2]-coordXUpd[1], tSY = coordYUpd[14]-coordYUpd[0]
    let ratio, isLarger

    if (imageWidth > imageHeight) {
        if (imageWidth > tSX) {
        ratio = imageWidth/tSX
        isLarger = true
        } else if (imageWidth <= tSX) {
        ratio = tSX/imageWidth
        isLarger = false
        }
    } else if (imageHeight >= imageWidth) {
        if (imageHeight > tSY) {
        ratio = imageHeight/tSY
        if (imageWidth * ratio > tSX) {
            ratio = imageWidth/tSX
        } else {
            ratio = imageHeight/tSY
        }
        isLarger = true
        } else if (imageHeight <= tSY) {
        ratio = tSY/imageHeight
        if (imageWidth * ratio > tSX) {
            ratio = tSX/imageWidth
        } else {
            ratio = tSY/imageHeight
        }
        isLarger = false
        }
    }

    if (isLarger) {
        iSX = imageWidth/ratio-3
        iSY = imageHeight/ratio-3
    } else {
        iSX = imageWidth * ratio-3
        iSY = imageHeight * ratio-3
    }
    // print(imageWidth)
}



/* Functions for Information */
function Information() {

    // Background
    let dSX = coordXUpd[12]-coordXUpd[3], dSY = coordYUpd[14]-coordYUpd[0]

    stroke(0, 0, 50, 60)
    strokeWeight(3)
    noFill()
    rect(coordXUpd[3], coordYUpd[0], dSX, dSY, 10)

    // PlayPause Background
    push()
    translate(-(coordXUpd[13]-coordXUpd[12]), -((height-(800*(rVC)))/2))
    fill(0, 0, 100, 20)
    noStroke()
    rect(playPausePosX-2, playPausePosY-2, playPauseSizeX+4, playPauseSizeY+4, 5)
    pop()


    // Time
    let tBSX = coordXUpd[11]-coordXUpd[9], tBSY = coordYUpd[11]-coordYUpd[10]
    let tBX = coordXUpd[9]+(tBSX/2), tBY = coordYUpd[10]+(tBSY/2)

    TimeFormat(soundInfo[0])
    noStroke()
    fill(0, 0, 100, 80)
    textSize(tBSY*(4/5))
    text(`${tC} / ${tF}`, tBX, tBY)


    // Scrubber
    sBW = coordXUpd[11]-coordXUpd[4], sBH = coordYUpd[13]-coordYUpd[12], sBX = coordXUpd[4], sBY = coordYUpd[12]+(sBH/2)
        // Backing
    push()
    stroke(0, 0, 50, 50)
    strokeWeight(sBH-sBH/5)
    line(sBX, sBY, sBX+sBW, sBY)
    pop()

        // Shadow Line
    push()
    stroke(266, 100, 50, 50)
    strokeWeight(sBH-sBH/5)
    line(sBX, sBY, sBX+scrubberVal, sBY)
    pop()

        // Knob
    ellipseMode(CENTER)
    push()
    stroke(310, 30, 100)
    strokeWeight(2)
    ellipse(sBX + scrubberVal, sBY, sBH-sBH/5+5)
    pop()
    if (scrubberDrags) {
        scrubberVal = constrain(mouseX - sBX -(coordXUpd[13]-coordXUpd[12]), 0, sBW)
    }

        // Linking
        let sDur = soundInfo[0].duration()
        let sTi = soundInfo[0].time()
    sliderVal1 = scrubberVal.valueOf()
    sCT = constrain(map(sliderVal1, 0, sBW, 0, sDur), 0, sDur)
    scrubberVal.valueOf(map(sTi, 0, sDur, 0, sBW))
    scrubberVal = constrain(map(sTi, 0, sDur, 0, sBW), 0, sBW)

    if(isNaN(sCT)) {
        sCT = 0.0
    }

    if (sliderVal1 != sliderVal2) {
        soundInfo[0].time(sCT)
    }

    sliderVal2 = scrubberVal.valueOf()

    
    // sound[0].jump(sCT)


    // Description
    let dTSX = coordXUpd[10]-coordXUpd[8], dTSY = coordYUpd[4]-coordYUpd[2]
    let dTX = coordXUpd[8] + (dTSX/2), dTY = coordYUpd[2] + (dTSY/2)

    dBSX = coordXUpd[10]-coordXUpd[8], dBSY = coordYUpd[8]-coordYUpd[5]
    dBX = coordXUpd[8], dBY = coordYUpd[5]+dBSY*(1/10)

    descriptionTextArray = sINFO[0].getDescription().split(/\r|\n/)
    currLine = descriptionTextArray.length, topLine = []

    stroke(1)
    strokeWeight(1)
    fill(0, 0, 100, 80)
    textAlign(CENTER, CENTER)
    textSize(dTSY*(4/5))
    text("Description", dTX, dTY)
    noStroke()

    dBSH = descriptionTextArray.length*8.2
    dBSW = dBSX
    textAlign(LEFT, TOP)
    textSize(7.5)
    push()
    // translate(0, scrollPos)
    // fill(20)
    // rect(dBX, dBY, dBSW, dBSH)
    for(let i = 0; i<descriptionTextArray.length; i++){

        if (i*8.2+scrollPos > dBSY*(5/7)) {
        let check = i
        if (check <= currLine) {
            currLine = check
        }
        fill(0, 0, 80, map(-(dBSY*(5/7)-(i*8.2+scrollPos)), 0, dBSY*(2/7)-dBSY*(1/10), 100, 0))
        // print(`${i} is ${i*8.2+scrollPos} vs ${check <= currLine}`)
        // print(`${i} is ${i*8.2+scrollPos} vs ${-(dBSY*(5/7)-(i*8.2+scrollPos))} vs ${-(dBSY*(5/7)-((descriptionTextArray.length-1)*8.2+scrollPos))} to ${map(-dBSY*(5/7)-(i*8.2+scrollPos), 0, -(dBSY*(5/7)-((descriptionTextArray.length-1)*8.2+scrollPos)), 100, 0)}`)
        } else if (i*8.2+scrollPos < -dBSY*(1/30)) {
        topLine.unshift(((scrollPos+dBSY*(1/30))-i*8.2))
        fill(0, 0, 80, map(i*8.2+scrollPos+(dBSY*(1/30)), 0, -(dBSY*(1/30))*2.4, 100, 0))
        // print(`${i} is ${(scrollPos+dBSY*(1/30))} to ${(scrollPos+dBSY*(1/30))-i*8.2} or ${topLine[i]}, y = ${i*8.2+scrollPos+(dBSY*(1/30))}`/* , coord = ${topLine}, final = ${((-descriptionTextArray.length*8.2+(dBSY/2))+dBSY*(1/30))-64*8.2}, final = ${(-(scrollPos+dBSY*(1/30)))-(-(scrollPos+dBSY*(1/30))+(descriptionTextArray.length)*8.2)} */)
        
        } else {
        // let index = topLine.indexOf(i)
        // if (index > -1) {
        //   topLine.splice(i, 1)
        // }

        currLine = descriptionTextArray.length
        fill(0, 0, 100, 80)
        }
        // fill(0)
        text(`${descriptionTextArray[i]}`, dBX, dBY+i*8.2+scrollPos)
        // print(`${i} is ${i*8.2+scrollPos} vs ${dBSY*(7/8)} vs ${dBSY*(7/8)-(descriptionTextArray.length-currLine*8.2+scrollPos)}`)
        // print(topLine)
    }
    pop()

    // Author
        // Name
    aNSX = coordXUpd[7]-coordXUpd[6], aNSY = coordYUpd[6]-coordYUpd[3]
    aNX = coordXUpd[6], aNY = coordYUpd[3]
    aNWI = sINFO[0].getAuthor().split("")

    if (aNWI.length*20 > aNSX) {
        aNH = aNSX/aNWI.length
    } else {
        aNH = 20
    }
    textAlign(CENTER, CENTER)
    textSize(aNH)
    text(`${sINFO[0].getAuthor()}`, aNX+(aNSX/2), aNY+(aNSY/2))

    // print(`Size = ${aNSX}, InfoMult = ${8*20}, Width = ${aNW}, author name length: ${aNWI.length}`)

        // Pfp
    aISX = coordXUpd[6]-coordXUpd[4], aISY = coordYUpd[7]-coordYUpd[1]
    aIX = coordXUpd[4], aIY = coordYUpd[1]

    let ProfilePicture = createGraphics(aISX, aISY)

    push()
    ProfilePicture.ellipse(aISX/2, aISY/2, aISX, aISY)
    ellipseMode(CORNER)
    imageMode(CORNER)
    noFill()
    stroke(0)
    strokeWeight(3)
    pfp[0].mask(ProfilePicture)
    image(pfp[0], aIX, aIY, aISX, aISY)
    ellipse(aIX, aIY, aISX, aISY)
    pop()

}

function TimeFormat(t) {
    let mF, sF, mC, sC
    sF = (round(t.duration(), 0)) % 60
    sF = ZEROPAD(sF, 2)
    mF = ((round(t.duration(), 0))-sF)/60
    tF = `${mF}:${sF}`

    sC = (round(t.time(), 0)) % 60
    sC = ZEROPAD(sC, 2)
    mC = ((round(t.time(), 0))-sC)/60
    tC = `${mC}:${sC}`
}



/* Functions for Sound Visualizer */
function SoundVisSetup() {
    number = 100

    fft = new p5.FFT()
    fft.setInput(soundInfo[0])

    // fft.setInput(soundInfo[0])
    // actx = getAudioContext()
        
        // amplitude = new p5.Amplitude()
    // ampSI = soundInfo[0]
        // amplitude.setInput(ampSI) // causes lag
}
  
function SoundVisualizer() {
    let sVSX = coordXUpd[13]-coordXUpd[0], sVSY = coordYUpd[16]-coordYUpd[15]
    let spectrum = fft.analyze()
    let sVW = coordXUpd[12]-coordXUpd[1]

    number = spectrum.length/9
    // Sound Visualizer

    push()
    translate(coordXUpd[1], coordYUpd[15]+sVSY/2)
    for(let i=0; i<number+1;i++) {
        let spec = spectrum[i]
        size = sq(map(spec, 0, 255, 0, 1))
        if(!played) {
        level = map(fft.getEnergy(spectrum[i]), 0, 255, 0.0, 1.0)
        } else if (playPausePlaying) {
        level = map(fft.getEnergy(spectrum[i]), 0, 255, 0.0, 1.0)
        } else if (!playPausePlaying && level > 0) {
        level -= 0.00008
        }

        // print(size)

        x1 = sVW/number*i
        y1 = 1

        modifier = (1 + 20*size)*(1+20*level)

        x2 = x1
        y2 = map(y1 * modifier, 0, height, 0, ((y1 * modifier)/height)*sVSY)

        x3 = x2
        y3 = -y2

        strokeWeight((level+(number/(1.5*number)))*4)
        stroke(i*(360/number), 100, 55)
        line(x1, y1, x2, y2)
        stroke(i*(360/number), 360, 360)
        line(x1, y1, x3, y3)
    }
    pop()



    // Background
    noStroke()
    fill(0, 0, 50, 20)
    rect(coordXUpd[0], coordYUpd[15], sVSX, sVSY, 10)
    stroke(0, 0, 50, 60)
    line(coordXUpd[1], coordYUpd[15]+sVSY/2, coordXUpd[12], coordYUpd[15]+sVSY/2)

}

/* Functions for Background */
function BgSet() {
    for (let i = 0; i < 100; i++) {
        s1.push(random(width))
        s2.push(random(height))
        s3.push(random(width))
        s4.push(random(height))
        s5.push(random(1) < 0.2 ? true : false)
        s6.push(random(25))
        s7.push(random(1) < 0.7 ? true : false)
        s8.push(random(-0.5, 0.5))
        s9.push(random(-0.5, 0.5))
      }
}

function Background() {
    background(0, 0, 100)
    push()
    rectMode(CENTER)
    translate(width/2, height/2)
    rotate(rot)
        for(let i = 0; i< width/200; i++){
        let gradient = drawingContext.createLinearGradient(0, 0, width, height/2)
        let cVal = 0
        /* Color:  https://htmlcolorcodes.com/color-names/ */
        // gradient.addColorStop(0.0, 'Black')
        gradient.addColorStop(0.0, "DarkOrchid")
        gradient.addColorStop(0.3, "Orchid")
        gradient.addColorStop(0.5, "MediumVioletRed")
        gradient.addColorStop(0.7, "Orchid")
        gradient.addColorStop(1.0, "DarkOrchid")
        drawingContext.fillStyle = gradient
        // fill(0, 0, 100, 100-map(i, 0, width/200, 0, 100))
        rect(0, 0, sq(height), sq(height))
        }
    pop()
    fill(280.1, 9, 10, 100-map(level, 0, 1.0, 0, 40))
    rect(0, 0, width, height)
    push()
    for (let z = 0; z < s1.length; z++) {
        strokeWeight(level*z/10 + 2)
        stroke(0, 0, 100, 70-s6[z])
        point(s1[z], s2[z])
        if (s7[z]) {
            if(s3[z] <= width) {
                s3[z] += s8[z]
            } else if (s3[z] > width) {
                s3[z] = 0
            }
            if(s4[z] <= height) {
                s4[z] += s9[z]
            } else if (s4[z] > height) {
                s4[z] = 0
            }
        }
        point(s3[z], s4[z])
        if(s5[z]) {
        strokeWeight(2)
        stroke(0, 0, 60, 20)
        line(s1[z], s2[z], s1[z-1], s2[z-1])
        }
    }
    pop()
}
