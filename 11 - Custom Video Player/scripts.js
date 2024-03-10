// most of this code I wrote it mostly myself, except for the progressBar functions

const video = document.querySelector('video');
const toggleButton = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const sliderButtons = document.querySelectorAll('.player__slider');
const progressBar = document.querySelector('.progress__filled');

const volumeButton = sliderButtons[0];
const playbackRateButton = sliderButtons[1];


// functions 

function toggleEvent(){
    if(video.paused) {
        video.play();
        toggleButton.innerHTML  = '||';
        return;
    }

    toggleButton.innerHTML  = '►';
    video.pause();
}

function skipEvent() {
    var time = this.dataset.skip;
    video.currentTime += parseFloat(time);
}

function volumeSliderEvent() {
    let sliderValue = parseFloat(this.value);

    video.volume = sliderValue;
}

function playbackRateSliderEvent() {
    let sliderValue = this.value;

    video.playbackRate = sliderValue;
}

function progressBarClickedEvent(e) {   
    const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function progressEvent() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// adding event listeners

video.addEventListener('click', toggleEvent);
video.addEventListener('timeupdate', progressEvent);
toggleButton.addEventListener('click', toggleEvent);

skipButtons.forEach(button => {
    button.addEventListener('click', skipEvent)
});

volumeButton.addEventListener('click', volumeSliderEvent);
playbackRateButton.addEventListener('click', playbackRateSliderEvent);

let mouseDown = false;
progressBar.addEventListener('click', scrub);
progressBar.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressBar.addEventListener('mousedown', mousedown = true);
progressBar.addEventListener('mouseup', mousedown = false);