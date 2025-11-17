// initiate variables
  let track_name = document.querySelector(".songtitle");
  let playpause_btn = document.querySelector(".playpause-track");
  let next_btn = document.querySelector(".next-track");
  let prev_btn = document.querySelector(".prev-track");
  let seek_slider = document.querySelector(".seek_slider");
  let curr_time = document.querySelector(".current-time");
  let total_duration = document.querySelector(".total-duration");
  let track_index = 0;
  let isPlaying = false;
  let updateTimer;
  // create new audio element
  let curr_track = document.getElementById("music");
  //
  // DEFINE YOUR SONGS HERE!!!!!
  // MORE THAN FOUR SONGS CAN BE ADDED!!
  // JUST ADD ANOTHER BRACKET WITH NAME AND PATH
  // CATBOX.MOE IS RECOMMENDED FOR UPLOADING MP3 FILES
  let track_list = [{
      name: "Padi - Sesuatu Yang Indah",
      path: "../musik/musik/padi/mp3/Sesuatu-Yang-Indah.mp3"
    },
    {
      name: "Noah - Bintang_Di_Surga",
      path: "../musik/musik/noah/mp3/1_Bintang_Di_Surga.mp3"
    },
    {
      name: "Ungu - Dengan_NafasMu",
      path: "../musik/musik/ungu/mp3/Dengan_NafasMu.mp3"
    },
    {
      name: "Wali - Puaskah",
      path: "../musik/musik/wali/mp3/2_Puaskah.mp3"
    },
     {
      name: "DEWA -  Separuh-Nafas",
      path: "../musik/musik/dewa/mp3/Separuh-Nafas.mp3"
    },
    {
      name: "JAMRUD - Pelangi_Dimatamu",
      path: "../musik/musik/jamrud/mp3/Pelangi_Dimatamu.mp3"
    },
    {
      name: "DENNY CAKNAN - Kartonyono_Medot_Janji",
      path: "../musik/musik/denny/mp3/Kartonyono_Medot_Janji.mp3"
    },
    {
      name: "PADI -  Begitu-Indah",
      path: "../musik/musik/padi/mp3/Begitu-Indah.mp3"
    }
  ];
  //
  //
  //
  //
  //
  function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();
    // load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    // update details of the track
    track_name.textContent = track_list[track_index].name;
    // set an interval of 1000 milliseconds for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
    // move to the next track if the current one finishes playing 
    curr_track.addEventListener("ended", nextTrack);
  }
  // reset values
  function resetValues() {
    curr_time.textContent = "0:00";
    total_duration.textContent = "0:00";
    seek_slider.value = 0;
  }
  // checks if song is playing
  function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
  }
  // plays track when play button is pressed
  function playTrack() {
    curr_track.play();
    isPlaying = true;
    // Update the button class directly
    let playButton = document.querySelector(".playpause-track");
    playButton.className = "playpause-track fas fa-pause";
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    // Update the button class directly  
    let playButton = document.querySelector(".playpause-track");
    playButton.className = "playpause-track fas fa-play";
}
  // moves to the next track
  function nextTrack() {
    if (track_index < track_list.length - 1)
      track_index += 1;
    else track_index = 0;
    loadTrack(track_index);

      if (isPlaying) playTrack(); 
  }
  // moves to the previous track
  function prevTrack() {
    if (track_index > 0)
      track_index -= 1;
    else track_index = track_list.length;
    loadTrack(track_index);
      if (isPlaying) playTrack(); 
  }
  
  //volume control
  var audio = document.getElementById("music");
var currentVolume = audio.volume;

function volumeUp() {
    if (currentVolume < 1.0) {
        currentVolume += 0.2;
        audio.volume = currentVolume;
    }
}

function volumeDown() {
    if (currentVolume > 0.0) {
        currentVolume -= 0.2;
        audio.volume = currentVolume;
    }
}
  
  // seeker slider
  function seekTo() {
    seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
  }

  function seekUpdate() {
    let seekPosition = 0;
    // check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      seek_slider.value = seekPosition;
      // calculate the time left and the total duration
      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
      // adding a zero to the single digit time values
      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      }
      if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
      }
      if (currentMinutes < 10) {
        currentMinutes = currentMinutes;
      }
      if (durationMinutes < 10) {
        durationMinutes = durationMinutes;
      }
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }
  // load the first track in the tracklist
  loadTrack(track_index);
