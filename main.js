import { data } from "./data.js";

// info
const trackImg = document.getElementById('track-img')
const trackSongName = document.getElementById('name')
const trackArtistName = document.getElementById('artist')
const trackAlbumName = document.getElementById('album')
const currentTrack = document.getElementById('current')
const totalTracks = document.getElementById('total')

// controls
const previousTrack = document.getElementById('back')
const playPause = document.getElementById('playPause')
const nextTrack = document.getElementById('forward')

// audio
const audio = new Audio()
let actual = 0
let pause = true

function init() {
  totalTracks.innerText = data.length
  currentTrack.innerText = actual + 1

  trackImg.src = data[actual].track_cover
  trackSongName.innerText = data[actual].track_name
  trackArtistName.innerText = data[actual].track_artist
  trackAlbumName.innerText = data[actual].track_album

  audio.src = data[actual].track_direction
}
init()

playPause.addEventListener('click', () => {
  if (pause) {
    audio.play()
    pause = false
  } else {
    audio.pause()
    pause = true
  }
})