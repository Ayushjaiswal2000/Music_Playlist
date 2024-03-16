let songsArray = [
  { id: 1, name: "Song 1", artist: "Artist 1", img: "images/image1.jpg", genre: "Pop", source: "songs/songs1.mp3" },
  { id: 2, name: "Song 2", artist: "Artist 2", img: "images/image2.jpg", genre: "Pop", source: "songs/songs2.mp3" },
  { id: 3, name: "Song 3", artist: "Artist 3", img: "images/image3.jpg", genre: "Rock", source: "songs/songs3.mp3" },
  { id: 4, name: "Song 4", artist: "Artist 4", img: "images/image4.jpg", genre: "Rock", source: "songs/songs4.mp3" },
  { id: 5, name: "Song 5", artist: "Artist 5", img: "images/image5.jpg", genre: "Party", source: "songs/songs5.mp3" },
  { id: 6, name: "Song 6", artist: "Artist 6", img: "images/image6.jpg", genre: "Romantic", source: "songs/songs6.mp3" },
  { id: 7, name: "Song 7", artist: "Artist 7", img: "images/image7.jpg", genre: "Party", source: "songs/songs7.mp3" },
  { id: 8, name: "Song 8", artist: "Artist 8", img: "images/image8.jpg", genre: "Rock", source: "songs/songs8.mp3" },
  { id: 9, name: "Song 9", artist: "Artist 9", img: "images/image9.jpg", genre: "Pop", source: "songs/songs9.mp3" },
  { id: 10, name: "Song 10", artist: "Artist 10", img: "images/image10.jpg", genre: "Romantic", source: "songs/songs10.mp3" }
];

const allSongsDiv = document.querySelector(".all-song-div");
        const currentPlaying = document.querySelector(".card-div");
        const selectGenre = document.getElementById("selectGenre");
        const displaySongs = document.getElementById("Songs");
        const audioPlayer = new Audio();
        audioPlayer.controls = true;

        let currentSongIndex = 0;
        let selectedSongs = songsArray;

        function createOption(text) {
            const option = document.createElement("option");
            option.textContent = text;
            return option;
        }

        function createButton(className, text, clickHandler) {
            const button = document.createElement("button");
            button.classList.add(className);
            button.textContent = text;
            button.addEventListener("click", clickHandler);
            return button;
        }

        function displaySelectedSongs(selectedGenre) {
            displaySongs.innerHTML = '';

            if (selectedGenre === "All Songs") {
                selectedSongs = songsArray;
            } else {
                selectedSongs = songsArray.filter(song => song.genre === selectedGenre);
            }

            selectedSongs.forEach((song) => {
                const songDiv = document.createElement("div");
                songDiv.classList.add("song");
                songDiv.textContent = `${song.name}-${song.artist}`;
                displaySongs.appendChild(songDiv);

                const imageDiv = document.createElement("div");
                const imageCard = document.createElement("img");
                const artistSong = document.createElement("h3");
                const artistCard = document.createElement("p");
                const buttonCard = document.createElement("div");

                imageCard.src = song.img;
                artistSong.textContent = song.name;
                artistCard.textContent = song.artist;
                imageDiv.append(imageCard, artistSong, artistCard);
                const addToPlaylistButton = createButton("addPlaylistButton", "Add to Playlist", () => addToPlaylist(song));

                buttonCard.classList.add("playPause");
                buttonCard.append(
                    createButton("previous", "Previous", () => playPreviousSong()),
                    createButton("next", "Next", () => playNextSong()),
                  
                    
                );
                
                
                
               
                

                songDiv.addEventListener("click", () => {
                    currentPlaying.innerHTML = '';
                    currentPlaying.innerHTML = "<h2>Currently Playing </h2>";
                   
                    currentPlaying.append(imageDiv, buttonCard,addToPlaylistButton);
                    audioPlayer.src = song.source;

                    currentSongIndex = selectedSongs.findIndex(s => s.id === song.id);

                    audioPlayer.play();
                    if (imageDiv) {
                        imageDiv.appendChild(audioPlayer);
                    }
                });
            });
        }

        function playPreviousSong() {
            if (currentSongIndex > 0) {
                currentSongIndex--;
            } else {
                currentSongIndex = selectedSongs.length - 1;
            }
            playCurrentSong();
           
            
        }

        function playNextSong() {
            if (currentSongIndex < selectedSongs.length - 1) {
                currentSongIndex++;
            } else {
                currentSongIndex = 0;
            }
            playCurrentSong();
            
        }

        function playCurrentSong() {
            const selectedSong = selectedSongs[currentSongIndex];
            currentPlaying.innerHTML = '';
            

            const imageDiv = document.createElement("div");
            const imageCard = document.createElement("img");
            const artistSong = document.createElement("h3");
            artistSong.id=("artistSong");
            const artistCard = document.createElement("p");
            artistCard.id=("artistCard");
            const buttonCard = document.createElement("div");

            imageCard.src = selectedSong.img;
            artistSong.textContent = selectedSong.name;
            artistCard.textContent = selectedSong.artist;
            imageDiv.append(imageCard, artistSong, artistCard);

            buttonCard.classList.add("playPause");
            buttonCard.append(
                createButton("previous", "Previous", () => playPreviousSong()),
                createButton("next", "Next", () => playNextSong())
            );
            const addToPlaylistButton = createButton("addPlaylistButton", "Add to Playlist", () => addToPlaylist(selectedSong));

            currentPlaying.append(imageDiv, buttonCard,addToPlaylistButton);
            

            audioPlayer.src = selectedSong.source;
            audioPlayer.play();
            if (imageDiv) {
                imageDiv.appendChild(audioPlayer);
            }
        }

        function createAddToPlaylistButton(clickHandler) {
            const addToPlaylistButton = createButton("addToPlaylist", "Add to Playlist", clickHandler);
            return addToPlaylistButton;
        }

        const playlistDiv = document.querySelector(".playlist-div");

        const currentPlaylistDiv = document.createElement("div");
        currentPlaylistDiv.classList.add("current-Playlist-div");
        currentPlaylistDiv.innerHTML = "<h2>Current Playlist</h2>";
        const playlistHeading=document.createElement("h4");
        playlistHeading.textContent="My Playlist";
        playlistHeading.classList.add("playlistHeading");

        playlistDiv.appendChild(currentPlaylistDiv);

        const createPlaylistButton = createButton("buttonPlaylist", "Create Playlist", () => {
           
            const playlistName = prompt("Enter Playlist Name:");
            if (playlistName) {
               

                createPlaylist(playlistName);
            }
        });
        
        playlistDiv.appendChild(createPlaylistButton);
        playlistDiv.appendChild(playlistHeading);

       
   
        let playlistArray = [];
        let addedSongsArray = [];
        let originalPlaylistReference;

        function createPlaylist(playlistName) {
            const playlist = document.createElement("div");
           
            playlist.classList.add("playlist");
            playlist.innerHTML = `<h3>${playlistName}</h3> `;
        
            playlist.addEventListener("click", () => {
                
                currentPlaylistDiv.innerHTML = `<h2>Current Playlist</h2>`;
        
                const clonedPlaylist = playlist.cloneNode(true);
                originalPlaylistReference = playlist;
               
                currentPlaylistDiv.appendChild(clonedPlaylist);
                
        
                addedSongsArray = []; 
        
               
            });
        
            playlistDiv.appendChild(playlist);
            playlistArray.push(playlist);
        }



        function addToPlaylist(song) {
            const currentPlaylist = currentPlaylistDiv.querySelector(".playlist");
            
            if (currentPlaylist) {
                // Check if the song is already in the playlist
                const isSongAdded = addedSongsArray.some(addedSong => addedSong.id === song.id);
                
                if (!isSongAdded) {
                    addedSongsArray.push(song); 
                    
                    const songNameElement = document.createElement("p");
                    songNameElement.classList.add("songNameElement");
                    songNameElement.textContent = song.name;
                    
                    currentPlaylist.appendChild(songNameElement); 
                    
                    // Also add the song to the original playlist
                  
                    originalPlaylistReference.appendChild(songNameElement.cloneNode(true));
                    
                } else {
                    alert("Song is already in the playlist.");
                }
            } else {
               
                alert("Please select a playlist first.");
            }
        }
        


        selectGenre.append(createOption("All Songs"), ...[...new Set(songsArray.map(song => song.genre))].map(genre => createOption(genre)));
        selectGenre.value = "All Songs";
        displaySelectedSongs("All Songs");

        selectGenre.addEventListener("change", function () {
            displaySelectedSongs(this.value);
        });





const heading=document.getElementById("heading");

const theme=document.getElementById("toggleButton");


let isDarkMode = false;


theme.addEventListener("click",()=>{

    isDarkMode = !isDarkMode;
  
  
    heading.style.backgroundColor = isDarkMode ? "#282828" : "#ede3ad";
    heading.style.color=isDarkMode ? "white" : "black";
   
    allSongsDiv.style.backgroundColor=isDarkMode ? "#282828" : "#ede3ad";
    currentPlaying.style.backgroundColor=isDarkMode ? "#282828" : "#ede3ad";
    playlistDiv.style.backgroundColor=isDarkMode ? "#282828" : "#ede3ad";
   


});









