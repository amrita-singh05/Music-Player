const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const songTitle = document.getElementById("songTitle");
const artist = document.getElementById("artist");

const progress = document.getElementById("progress");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

const playlistContainer =
    document.getElementById("playlist");

const disc = document.querySelector(".disc");


// -----------------------------
// Songs
// -----------------------------

const songs = [

    {
        title: "Maan Mera",
        artist: "Gajendra Verma",
        file: "songs/song1.mp3"
    },

    {
        title: "Sanson Ki Mala Pe",
        artist: "Nusrat Fateh Ali Khan",
        file: "songs/song2.mp3"
    },

    {
        title: "Tere Liye",
        artist: "Atif Aslam",
        file: "songs/song3.mp3"
    }

];


let songIndex = 0;


// -----------------------------
// Load Song
// -----------------------------

function loadSong(index) {

    const song = songs[index];

    songTitle.textContent = song.title;

    artist.textContent = song.artist;

    audio.src = song.file;

    updatePlaylist();

}


// -----------------------------
// Play Song
// -----------------------------

function playSong() {

    audio.play();

    playBtn.textContent = "⏸";

    disc.classList.add("playing");

}


// -----------------------------
// Pause Song
// -----------------------------

function pauseSong() {

    audio.pause();

    playBtn.textContent = "▶";

    disc.classList.remove("playing");

}


// -----------------------------
// Play / Pause
// -----------------------------

playBtn.addEventListener("click", () => {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


// -----------------------------
// Next
// -----------------------------

nextBtn.addEventListener("click", () => {

    songIndex++;

    if (songIndex >= songs.length) {

        songIndex = 0;

    }

    loadSong(songIndex);

    playSong();

});


// -----------------------------
// Previous
// -----------------------------

prevBtn.addEventListener("click", () => {

    songIndex--;

    if (songIndex < 0) {

        songIndex = songs.length - 1;

    }

    loadSong(songIndex);

    playSong();

});


// -----------------------------
// Progress Bar
// -----------------------------

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) {
        return;
    }

    const percentage =
        (audio.currentTime / audio.duration) * 100;

    progress.value = percentage;

    currentTime.textContent =
        formatTime(audio.currentTime);

    duration.textContent =
        formatTime(audio.duration);

});


// -----------------------------
// Change Progress
// -----------------------------

progress.addEventListener("input", () => {

    if (!audio.duration) {
        return;
    }

    audio.currentTime =
        (progress.value / 100) * audio.duration;

});


// -----------------------------
// Volume
// -----------------------------

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});


// -----------------------------
// Auto Next
// -----------------------------

audio.addEventListener("ended", () => {

    nextBtn.click();

});


// -----------------------------
// Format Time
// -----------------------------

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60);

    return `${minutes}:${secs
        .toString()
        .padStart(2, "0")}`;

}


// -----------------------------
// Playlist
// -----------------------------

function updatePlaylist() {

    playlistContainer.innerHTML = "";

    songs.forEach((song, index) => {

        const songElement =
            document.createElement("div");

        songElement.classList.add("song");

        if (index === songIndex) {

            songElement.classList.add("active");

        }

        songElement.innerHTML = `

            <div>

                <div class="song-name">
                    ${song.title}
                </div>

                <div class="song-artist">
                    ${song.artist}
                </div>

            </div>

            <div class="song-number">
                ${index + 1}
            </div>

        `;

        songElement.addEventListener("click", () => {

            songIndex = index;

            loadSong(songIndex);

            playSong();

        });

        playlistContainer.appendChild(songElement);

    });

}


// -----------------------------
// Theme
// -----------------------------

const themeBtn =
    document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {

        themeBtn.textContent = "☀";

    } else {

        themeBtn.textContent = "☾";

    }

});


// -----------------------------
// Initial Setup
// -----------------------------

audio.volume = 0.7;

loadSong(songIndex);