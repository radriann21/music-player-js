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
const volumeControl = document.getElementById('volumeAudio')
const progressControl = document.getElementById('progress')
const svgPlay = ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
              class="icon icon-tabler icons-tabler-filled icon-tabler-player-play">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" />
            </svg>`
const svgPause = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-player-pause"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" /><path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" /></svg>`

// audio
const audio = new Audio()
let actual = 0
let pause = true

function updateProgress() {
  const progressValue = (audio.currentTime / audio.duration) * 100
  progressControl.value = progressValue
}

function init() {
  totalTracks.innerText = data.length
  currentTrack.innerText = actual + 1

  trackImg.src = data[actual].track_cover
  trackSongName.innerText = data[actual].track_name
  trackArtistName.innerText = data[actual].track_artist
  trackAlbumName.innerText = data[actual].track_album

  audio.src = data[actual].track_direction
  audio.volume = volumeControl.value
  playPause.innerHTML = svgPlay
}
init()

playPause.addEventListener('click', () => {
  playPause.innerHTML = ''
  if (pause) {
    audio.play()
    pause = false
    playPause.innerHTML = svgPause
  } else {
    audio.pause()
    pause = true
    playPause.innerHTML = svgPlay
  }
})

nextTrack.addEventListener('click', () => {
  if (actual >= data.length - 1) {
    actual = 0
    init()
  } else {
    actual++
    init()
  }
})

previousTrack.addEventListener('click', () => {
  if (actual > 0) {
    actual--
  } else {
    actual = data.length - 1
  }
  init()
})

volumeControl.addEventListener('input', () => {
  audio.volume = volumeControl.value
})

progressControl.addEventListener('input', () => {
  const newTime = (progressControl.value / 100) * audio.duration
  audio.currentTime = newTime
})

audio.addEventListener('timeupdate', updateProgress)

if (audio.ended) {
  playPause.innerHTML = ''
  playPause.innerHTML = svgPlay
}