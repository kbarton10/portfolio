// CLOCK

function updateClock() {
  const now = new Date();

  const time = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit"
  });

  document.getElementById("clock").textContent = time;
}

updateClock();
setInterval(updateClock, 1000);

// DIALOG SYSTEM

document.addEventListener("DOMContentLoaded", () => {
  const dialogSettings = {
    "welcome-dialog": {
      left: 300,
      top: 150,
      center: true,
      openOnLoad: true
    },

    "how-to-dialog": {
      left: 750,
      top: 150,
      center: false
    },

    "view-dialog": {
      left: 350,
      top: 130,
      center: false
    },

    "about-dialog": {
      left: 250,
      top: 100,
      center: false
    },

    "work-dialog": {
      left: 300,
      top: 100,
      center: false
    },

    "writing-dialog": {
      left: 700,
      top: 60,
      center: false
    },

    "playground-dialog": {
      left: 600,
      top: 70,
      center: false
    },

    "contact-dialog": {
      left: 350,
      top: 150,
      center: false
    },

    "games-dialog": {
      left: 700,
      top: 250,
      center: false
    },

    "music-dialog": {
      left: 200,
      top: 300,
      center: false
    },

    "photos-dialog": {
      left: 700,
      top: 70,
      center: false
    },

    "AOIN-dialog": {
      left: 150,
      top: 200,
      center: false
    },

    "semify-dialog": {
      left: 450,
      top: 110,
      center: false
    },

    "CCSWCD-dialog": {
      left: 400,
      top: 90,
      center: false
    },

    "NORA-dialog": {
      left: 100,
      top: 100,
      center: false
    },

    "moon-dialog": {
      left: 750,
      top: 300,
      center: false
    },

    "future-great-dialog": {
      left: 400,
      top: 400,
      center: false
    }
  };

  // stacking

  let highestZIndex = 1000;

  function bringToFront(dialog) {
    dialog.style.zIndex = ++highestZIndex;
  }

  // positioning

  function centerDialog(dialog) {
    dialog.style.left = `${(window.innerWidth - dialog.offsetWidth) / 2}px`;

    dialog.style.top = `${(window.innerHeight - dialog.offsetHeight) / 2}px`;
  }

  function positionDialog(dialog, settings) {
    if (settings.center) {
      centerDialog(dialog);
    } else {
      dialog.style.left = `${settings.left}px`;
      dialog.style.top = `${settings.top}px`;
    }
  }

  // global dragging

  let draggedDialog = null;
  let draggedHeader = null;

  let offsetX = 0;
  let offsetY = 0;

  document.addEventListener("mousedown", (e) => {
    const header = e.target.closest("dialog > *");

    if (!header) {
      return;
    }

    const dialog = header.closest("dialog");

    if (!dialog) {
      return;
    }

    if (!header.id.endsWith("-header")) {
      return;
    }

    if (e.target.closest(".close-button")) {
      return;
    }

    if (!dialog.open) {
      return;
    }

    bringToFront(dialog);

    const rect = dialog.getBoundingClientRect();

    draggedDialog = dialog;
    draggedHeader = header;

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    draggedHeader.style.cursor = "grabbing";

    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!draggedDialog) {
      return;
    }

    draggedDialog.style.left = `${e.clientX - offsetX}px`;

    draggedDialog.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => {
    if (!draggedDialog) {
      return;
    }

    draggedHeader.style.cursor = "";

    draggedDialog = null;
    draggedHeader = null;
  });

  // initialize dialogs

  Object.entries(dialogSettings).forEach(([dialogId, settings]) => {
    const dialog = document.getElementById(dialogId);

    if (!dialog) {
      return;
    }

    const closeButton = document.getElementById(`close-${dialogId}-btn`);

    const openButtons = document.querySelectorAll(
      `[id="open-${dialogId}-btn"], [id^="open-${dialogId}-btn-"]`
    );

    positionDialog(dialog, settings);

    openButtons.forEach((openButton) => {
      openButton.addEventListener("click", () => {
        dialog.show();

        positionDialog(dialog, settings);

        bringToFront(dialog);
      });
    });

    if (closeButton) {
      closeButton.addEventListener("click", () => {
        dialog.close();
      });
    }

    dialog.addEventListener("mousedown", () => {
      bringToFront(dialog);
    });


    if (settings.openOnLoad) {
      dialog.show();

      positionDialog(dialog, settings);

      bringToFront(dialog);
    }
  });
});

// MUSIC PLAYER

const tracks = [
  {
    title: "Plague Accomodations",
    artist: "Thank You Scientist",
    src: "music/Plague Accommodations.mp3"
  },
  {
    title: "Backstabber",
    artist: "Ke$ha",
    src: "music/Kesha - Backstabber (Official Audio).mp3"
  },
  {
    title: "The Art of Suffering",
    artist: "Dead Poet Society",
    src: "music/Dead Poet Society - The Art Of Suffering (Official Visualizer).mp3"
  },
  {
    title: "Riot",
    artist: "lolwtfitsjake",
    src: "music/🎵 Riot – lolwtfitsjake (Lyrics).mp3"
  },
  {
    title: "Impossible",
    artist: "Nothing But Thieves",
    src: "music/Impossible.mp3"
  },
  {
    title: "What Now?",
    artist: "KARLEE GIRL",
    src: "music/KARLEE GIRL - what now (Official Lyric Video).mp3"
  },
  {
    title: "Desperate Pleasures",
    artist: "Boston Manor",
    src: "music/Boston Manor - Desperate Pleasures (Lyric Video).mp3"
  },
  {
    title: "Never Find My Place",
    artist: "Poppy",
    src: "music/Poppy - Never Find My Place (Official Audio).mp3"
  },
  {
    title: "Headlock",
    artist: "Imogen Heap",
    src: "music/Imogen Heap - Headlock.mp3"
  },
  {
    title: "Baby Steps",
    artist: "Quadeca",
    src: "music/Baby steps.mp3"
  },
  {
    title: "Let's Get Acquainted",
    artist: "James the Seventh",
    src: "music/James the Seventh - Let's Get Acquainted (Lyric Video).mp3"
  },
  {
    title: "Boys",
    artist: "ADELA",
    src: "music/Boys.mp3"
  },
  {
    title: "INFATUATION",
    artist: "I DON'T KNOW BUT THEY FOUND ME",
    src: "music/INFATUATION - I DONT KNOW HOW BUT THEY FOUND ME.mp3"
  }
];

let index = 0;
let isPlaying = false;

const audioPlayer = new Audio(tracks[index].src);

const songTitle = document.getElementById("song-title");
const artistName = document.getElementById("artist-name");
const skipButton = document.getElementById("skip-btn");
const prevButton = document.getElementById("previous-btn");
const playButton = document.getElementById("play-btn");
const pauseButton = document.getElementById("pause-btn");
const stopButton = document.getElementById("stop-btn");
const closeDialogButton = document.getElementById("close-music-dialog-btn");
const progressFill = document.getElementById("progress-fill"); 

audioPlayer.addEventListener("timeupdate", () => {
  if (audioPlayer.duration) {
    const progressPercent =
      (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressFill.style.width = `${progressPercent}%`;
  }
});

playButton.addEventListener("click", () => {
  audioPlayer.play();
  isPlaying = true;
});

pauseButton.addEventListener("click", () => {
  audioPlayer.pause();
  isPlaying = false;
});

stopButton.addEventListener("click", () => {
  stopMusic();
});

closeDialogButton.addEventListener("click", () => {
  stopMusic();
});

skipButton.addEventListener("click", () => {
  index = (index + 1) % tracks.length;
  changeTrack();
});

prevButton.addEventListener("click", () => {
  index = (index - 1 + tracks.length) % tracks.length;
  changeTrack();
});

function changeTrack() {
  songTitle.textContent = tracks[index].title;
  artistName.textContent = tracks[index].artist;

  audioPlayer.src = tracks[index].src;
  resetProgressBar(); 

  if (isPlaying) {
    audioPlayer.play();
  }
}

function stopMusic() {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
  isPlaying = false;
  resetProgressBar(); 
}

function resetProgressBar() {
  progressFill.style.width = "0%";
}
