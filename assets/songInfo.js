class PushSongInfo {
    constructor(author, pfp, description, thumbnail, song) {
        this.author = author
        this.pfp = pfp
        this.description = description
        this.thumbnail = thumbnail
        this.song = song
    }

    getAuthor() {
        return this.author
    }

    getPfp() {
        return this.pfp
    }

    getDescription() {
        return this.description
    }

    getThumbnail() {
        return this.thumbnail
    }

    getSong() {
        return this.song
    }
}

let sINFO = []
