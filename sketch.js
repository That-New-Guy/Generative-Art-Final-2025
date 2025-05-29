let textbox

function preload() {
  img.push(loadImage(sINFO[0].getThumbnail()))
  pfp.push(loadImage(sINFO[0].getPfp()))
  sound.push(loadSound(sINFO[0].getSong()))
  soundInfo.push(createAudio(sINFO[0].getSong()))
  playPauseBtnPreload()
  
}

function setup() {
  colorMode(HSB, 360, 100, 100, 100)
  imageMode(CENTER)
  textAlign(CENTER, CENTER)
  // rectMode(CENTER)
  createCanvas(window.innerWidth, window.innerHeight)

  atcx = getAudioContext()

  rVC = width/1400
  rot = random(360)

  BgSet()

  Thumbnail()
  SoundVisSetup()
  SoundVisualizer()
  FrameStructure(frameActive, viewOld)
  playPauseBtnSetup()
  Information()

  // textbox = createInput(`${binfo.author}`)
  // textbox.position(0,0)

  noStroke()
  // noLoop()

}

function draw() {
  Background()
  translate(0, (height-(800*(rVC)))/2)

  push()
  translate(-(coordXUpd[1]-coordXUpd[0]), 0)
  Thumbnail()
  pop()

  push()
  translate(coordXUpd[13]-coordXUpd[12], 0)
  Information()
  pop()

  SoundVisualizer()
  FrameStructure(frameActive, viewOld)
  // text(`Value: ${int(map(scrubberVal, 0, sBW, 0, 100))}`, width/2, height/2+10)
  // soundInfo[0].showControls()
}