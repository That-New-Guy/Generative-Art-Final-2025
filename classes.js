class PlayPauseBtn {
    constructor(inX, inY, inImg) {
        this.x = inX
        this.y = inY
        this.img = inImg
    }
      
    display() {
        stroke(0)
        
        // mousePressed()
        
        image(this.img, this.x, this.y)
    }
    
}