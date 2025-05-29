/* Global Variables */
const ZEROPAD = (num, places) => String(num).padStart(places, '0')
let rVC
let sCTI

let tF, tC

let img = [], sound = [], soundInfo = []

let selInfo

/* Variables for Play Button */
let loaded, loadedData, 
playPauseBtn, 
playPauseImg, playPauseImgData, 
playPauseSong, playPauseSongInfo = [],
playPausePlaying = false, playToggle = false, 
playPausePosX, playPausePosY, playPauseSizeX, playPauseSizeY

/* Variables and data for frame */
let coordY, coordX
let frameActive = false, viewOld = false, coordXUpd = [], coordYUpd = []

/* Variables and Objects for Thumbnail */
let iSX, iSY

/* Variables for Information */
let sBW, sBH, sBX, sBY

let dBSX, dBSY, dBX, dBY, dBSW, dBSH
let descriptionTextArray

let scrubberDrags = false, soundWasPlaying = false
let scrubberVal = 0, sliderVal1 = 0, sliderVal2 = 0, sCT

let scrollPos = 0
let currLine, topLine

let aNSX, aNSY, aNX, aNY
let aNWI, aNW, aNHI, aNH

let aISX, aISY, aIX, aIY

let pfp = []

let s1 = [], s2 = [], s3 = [], s4 = [], s5 = [], s6 = [], s7 = [], s8 = [], s9 = []

/* Variables for Sound Visualizer */
let fft, played = false, level, initLevel, spectrum, atcx

/* Variables for Background */
let rot