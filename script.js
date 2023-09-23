console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Suno Na Suno Na Sunlo Na",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Meri Tarah Tum Bhi",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "Deewana Hai Ye Mann",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Mera Ek Sapna Hai",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Yun Hi Kat Jaayega Safar",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Hawa Ke Saath Saath",
    filePath: "songs/6.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Chalte Chalte",
    filePath: "songs/7.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Trouble Is A Friend",
    filePath: "songs/8.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "dating myself",
    filePath: "songs/9.mp3",
    coverPath: "covers/3.jpg",
  },

  {
    songName: "Tujhe Kitna Chahne Lage (English Version)",
    filePath: "songs/10.mp3",
    coverPath: "covers/9.jpg",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});
// Listen to Events
audioElement.addEventListener("timeupdate", () => {
  // Update Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.addEventListener("click", (e) => {
        if (songIndex === parseInt(e.target.id) && !audioElement.paused) {
          // If the clicked song is the current song and it's playing, pause it
          audioElement.pause();
          e.target.classList.remove("fa-pause-circle");
          e.target.classList.add("fa-play-circle");
          gif.style.opacity = 0;
        } else {
          // Otherwise, play the clicked song
          makeAllPlays();
          songIndex = parseInt(e.target.id);
          e.target.classList.remove("fa-play-circle");
          e.target.classList.add("fa-pause-circle");
          audioElement.src = `songs/${songIndex + 1}.mp3`;
          masterSongName.innerText = songs[songIndex].songName;
          audioElement.currentTime = 0;
          audioElement.play();
          gif.style.opacity = 1;
          masterPlay.classList.remove("fa-play-circle");
          masterPlay.classList.add("fa-pause-circle");
        }
      });
    }
  );
};
// Add an event listener to the audio element to play the next song when the current one ends
audioElement.addEventListener("ended", () => {
  // Increment the song index to play the next song
  songIndex = (songIndex + 1) % songs.length;

  // Update the audio source and song name
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;

  // Reset the playback progress
  myProgressBar.value = 0;

  // Play the next song
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
//status bar show time in display
/*

// Update song duration when metadata is loaded
audioElement.addEventListener("loadedmetadata", () => {
  const durationElement = document.getElementById("duration");
  durationElement.innerText = formatTime(audioElement.duration);
});

// Update the current time and progress bar as the song plays
audioElement.addEventListener("timeupdate", () => {
  const currentTimeElement = document.getElementById("currentTime");
  const progressBar = document.getElementById("myProgressBar");

  const currentTime = audioElement.currentTime;
  const duration = audioElement.duration;

  currentTimeElement.innerText = formatTime(currentTime);
  durationElement.innerText = formatTime(duration);

  // Update the progress bar value
  if (duration > 0) {
    progressBar.value = (currentTime / duration) * 100;
  }
});

// Seek to a different time when the progress bar is interacted with
myProgressBar.addEventListener("input", () => {
  const progressBar = document.getElementById("myProgressBar");
  const duration = audioElement.duration;
  const newTime = (progressBar.value / 100) * duration;
  audioElement.currentTime = newTime;
});

// Function to format time in mm:ss format
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

// ...*/
