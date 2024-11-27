<template>
    <div class="flex flex-col lg:flex-row w-full items-center justify-between gap-4">
        <div class="flex flex-row gap-4">
            <button @click="showAnswer"
                class="mt-4 px-4 py-2 bg-violet-900 hover:bg-violet-950 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold text-sm flex flex-row rounded text-nowrap items-center justify-center gap-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9ZM12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z"
                        fill="white" />
                </svg>Cevabı göster
            </button>
            <button @click="showVideoSolution"
                class="mt-4 px-4 py-2 bg-violet-900 hover:bg-violet-950 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold text-sm flex flex-row rounded text-nowrap items-center justify-center gap-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.5 12C20.5006 12.2546 20.4353 12.5051 20.3105 12.727C20.1856 12.949 20.0055 13.1348 19.7875 13.2665L6.28 21.5297C6.05227 21.6691 5.79144 21.7452 5.52445 21.7502C5.25746 21.7551 4.99399 21.6887 4.76125 21.5578C4.53073 21.4289 4.3387 21.2409 4.2049 21.0132C4.07111 20.7855 4.00039 20.5263 4 20.2622V3.73779C4.00039 3.47368 4.07111 3.21445 4.2049 2.98673C4.3387 2.75902 4.53073 2.57106 4.76125 2.44217C4.99399 2.31124 5.25746 2.24482 5.52445 2.24977C5.79144 2.25471 6.05227 2.33084 6.28 2.47029L19.7875 10.7334C20.0055 10.8651 20.1856 11.051 20.3105 11.2729C20.4353 11.4949 20.5006 11.7453 20.5 12Z"
                        fill="white" />
                </svg> Video Çözüm
            </button>
        </div>
        <div class="flex flex-row text-xl text-white gap-1 sm:gap-3 justify-end mt-4">
            <div
                class="flex items-center justify-center gap-2 pl-2 pr-1 border border-slate-700 rounded bg-violet-900 dark:bg-slate-900 hover:bg-violet-950 dark:hover:bg-slate-700">
                <input type="radio" id="option1" name="answer" value="A" v-model="selectedAnswer"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                <label for="option1">A</label><br>
            </div>
            <div
                class="flex items-center justify-center gap-2 pl-2 pr-1 border border-slate-700 rounded bg-violet-900 dark:bg-slate-900 hover:bg-violet-950 dark:hover:bg-slate-700">
                <input type="radio" id="option2" name="answer" value="B" v-model="selectedAnswer"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                <label for="option2">B</label><br>
            </div>
            <div
                class="flex items-center justify-center gap-2 pl-2 pr-1 border border-slate-700 rounded bg-violet-900 dark:bg-slate-900 hover:bg-violet-950 dark:hover:bg-slate-700">
                <input type="radio" id="option3" name="answer" value="C" v-model="selectedAnswer"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                <label for="option3">C</label><br>
            </div>
            <div
                class="flex items-center justify-center gap-2 pl-2 pr-1 border border-slate-700 rounded bg-violet-900 dark:bg-slate-900 hover:bg-violet-950 dark:hover:bg-slate-700">
                <input type="radio" id="option4" name="answer" value="D" v-model="selectedAnswer"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                <label for="option4">D</label><br>
            </div>
            <div
                class="flex items-center justify-center gap-2 pl-2 pr-1 border border-slate-700 rounded bg-violet-900 dark:bg-slate-900 hover:bg-violet-950 dark:hover:bg-slate-700">
                <input type="radio" id="option5" name="answer" value="E" v-model="selectedAnswer"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                <label for="option5">E</label><br>
            </div>
            <button @click="handleAnswer" :disabled="!selectedAnswer"
                :class="{ 'bg-gray-500 cursor-not-allowed': !selectedAnswer, 'bg-sky-500 hover:bg-sky-700': selectedAnswer }"
                class="text-white font-semibold py-2 px-4 rounded text-sm">Cevapla</button>
        </div>
    </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import "sweetalert2/dist/sweetalert2.min.css";
import { ref, /* reactive, */ computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const selectedQuestion = computed(() => store.state.selectedQuestion);
const selectedAnswer = ref(null);

const showAnswer = () => {
    Swal.fire({
        title: 'Doğru cevap:',
        text: formattedAnswer.value,
        icon: 'success',
        confirmButtonText: 'Tamam',
    })
}

const formattedAnswer = computed(() => {
    const correctAnswer = selectedQuestion.value.correct_answer;
    if (correctAnswer === '0') {
        return 'A';
    } else if (correctAnswer === '1') {
        return 'B';
    } else if (correctAnswer === '2') {
        return 'C';
    } else if (correctAnswer === '3') {
        return 'D';
    } else if (correctAnswer === '4') {
        return 'E';
    }
    return '';
});

const showVideoSolution = () => {
    if (!videoUrlWithTimestamp.value) {
        Swal.fire({
            title: ':(',
            text: 'Bu sorunun henüz video çözümü yok. Çözümü biliyorsanız, kayıt butonuna basıp çözümünüzü arkadaşlarınızla paylaşabilirsiniz.',
            icon: 'info',
            confirmButtonText: 'Tamam'
        });
        return;
    }
    Swal.fire({
        title: 'Video Çözüm',
        html: `<iframe width="100%" height="490" src="${videoUrlWithTimestamp.value}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        showCloseButton: true,
        showConfirmButton: false,
        width: '61%',
        customClass: {
            popup: 'video-popup',
        },
        didOpen: () => {
            const iframe = document.querySelector('iframe');
            if (iframe) {
                iframe.addEventListener('load', () => {
                });
            }
        }
    });
}

const videoUrlWithTimestamp = computed(() => {
    if (!selectedQuestion.value || !selectedQuestion.value.external_video_solution || !selectedQuestion.value.video_meta) {
        return null;
    }

    const videoMeta = selectedQuestion.value.video_meta.split(',');
    const videoId = videoMeta[0];
    let embedUrl = `https://www.youtube.com/embed/${videoId}`;

    if (videoMeta.length > 1) {
        const startTime = videoMeta[1];
        embedUrl += `?start=${startTime}`;
    }

    embedUrl += `&rel=0&modestbranding=1&autoplay=1`;

    return embedUrl;
});

const handleAnswer = () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        const userAnswer = selectedOption.value;
        const correctAnswer = formattedAnswer.value;
        const isCorrect = userAnswer === correctAnswer;
        Swal.fire({
            title: isCorrect ? 'Doğru!' : 'Yanlış!',
            text: isCorrect ? 'Doğru cevapladınız!' : 'Yanlış cevapladınız!',
            icon: isCorrect ? 'success' : 'error',
            confirmButtonText: 'Tamam'
        });
        return isCorrect;
    } else {
        Swal.fire({
            title: 'No Answer Selected',
            text: 'Please select an answer before submitting.',
            icon: 'warning',
            confirmButtonText: 'Tamam'
        });
        return false;
    }
}

// const fullScreenIconURL = new URL('@/assets/icon-vid-fs.svg', import.meta.url).href;
// const exitFullScreenIconURL = new URL('@/assets/icon-vid-exit-fs.svg', import.meta.url).href;
// const playIconURL = new URL('@/assets/icon-vid-play.svg', import.meta.url).href;
// const pauseIconURL = new URL('@/assets/icon-vid-pause.svg', import.meta.url).href;
// const volumeUpIconURL = new URL('@/assets/icon-volume-up.svg', import.meta.url).href;
// const volumeDownIconURL = new URL('@/assets/icon-volume-down.svg', import.meta.url).href;
// const volumeOffIconURL = new URL('@/assets/icon-volume-off.svg', import.meta.url).href;

/*
let isDragging = false;
let progressInterval; */

/* const handleProgressDrag = (event) => {
    const progressBarContainer = document.querySelector('.progress-bar-container');
    const rect = progressBarContainer.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const progressPercentage = offsetX / rect.width;
    const newTime = startSeconds + (progressPercentage * (endSeconds - startSeconds));
    if (isDragging && player && typeof player.seekTo === 'function') {
        player.seekTo(newTime);
    }
}; */

/* const clearProgressInterval = () => {
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
}; */

/* const isYouTubeAPIReady = ref(false);
let player;
const videoState = reactive({
    isPlaying: false,
    isFullScreen: false,
});

const updateVolumeIcon = (volume) => {
    let iconSrc;
    if (volume == 0) {
        iconSrc = volumeOffIconURL;
    } else if (volume < 50) {
        iconSrc = volumeDownIconURL;
    } else {
        iconSrc = volumeUpIconURL;
    }
    document.getElementById('volume-icon').src = iconSrc;
};

const updatePlayPauseIcon = () => {
    const icon = document.getElementById('play-pause-icon');
    if (icon) {
        icon.src = videoState.isPlaying ? pauseIconURL : playIconURL;
    }
};

const updateFullScreenIcon = () => {
    const icon = document.getElementById('full-screen-icon');
    if (icon) {
        icon.src = videoState.isFullScreen ? exitFullScreenIconURL : fullScreenIconURL;
    }
};

const updateProgressBar = () => {
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeElement = document.querySelector('.current-time');
    const totalTimeElement = document.querySelector('.total-time');
    if (progressBar && player && typeof player.getCurrentTime === 'function') {
        const currentTime = player.getCurrentTime();
        const duration = endSeconds - startSeconds;
        const progress = (currentTime - startSeconds) / duration * 100;
        progressBar.style.width = `${progress}%`;
        if (currentTimeElement) {
            currentTimeElement.textContent = formatTime(currentTime - startSeconds);
        }
        if (totalTimeElement) {
            totalTimeElement.textContent = formatTime(endSeconds - startSeconds);
        }
    }
};

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}; */

/* const startSeconds = 3;
const endSeconds = 7;
const videoURL = 'snYu2JUqSWs?vq=hd720' */


/* const showVideoSolution = () => {
    Swal.fire({
        title: 'Video Çözüm',
        html: `<div id="container"><div id="player"></div>
               <div class="progress-bar-container"><div class="progress-bar"></div>
               </div>
               <div class="controls">
                       <button id="play-pause-btn" class="play-pause-btn">
                           <img id="play-pause-icon" src="${playIconURL}" alt="Play/Pause">
                       </button>
                       <img id="volume-icon" src="${volumeUpIconURL}" alt="Volume">
                       <input type="range" id="volume-range" min="0" max="100" step="1" value="80">
                       <div class="progress-time progress-time-start current-time"></div>
                       <span class="slash">/</span>
                        <div class="progress-time progress-time-end total-time"></div>
                        <button id="full-screen-btn" class="full-screen-btn">
                       <img id="full-screen-icon" src="${fullScreenIconURL}" alt="Full Screen">
                    </button>
                </div>
                   </div>`,
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
            popup: 'video-popup'
        },
        didOpen: () => {
            if (typeof window.YT !== 'undefined' && window.YT.Player) {
                player = new window.YT.Player('player', {
                    videoId: videoURL,
                    height: '60vh',
                    width: '100%',
                    events: {
                        'onReady': (event) => {
                            event.target.seekTo(startSeconds);
                            event.target.playVideo();
                            videoState.isPlaying = true;
                            updateProgressBar();
                            progressInterval = setInterval(updateProgressBar, 100);
                        },
                        'onStateChange': (event) => {
                            if (event.data == window.YT.PlayerState.PLAYING) {
                                videoState.isPlaying = true;
                                updatePlayPauseIcon();
                                progressInterval = setInterval(updateProgressBar, 100);
                            } else if (event.data == window.YT.PlayerState.ENDED) {
                                player.seekTo(startSeconds);
                                player.pauseVideo();
                                setTimeout(() => {
                                    updatePlayPauseIcon();
                                }, 200);
                            } else {
                                videoState.isPlaying = false;
                                clearProgressInterval();
                            }
                        }
                    },
                    playerVars: {
                        start: startSeconds,
                        end: endSeconds,
                        autoplay: 1,
                        controls: 0,
                        showinfo: 0,
                        loop: 1,
                        fs: 1,
                        cc_load_policy: 0,
                        iv_load_policy: 3,
                        autohide: 1,
                        rel: 0,
                    }
                });

                document.querySelector('.progress-bar-container').addEventListener('click', (event) => {
                    const progressBarContainer = document.querySelector('.progress-bar-container');
                    const rect = progressBarContainer.getBoundingClientRect();
                    const offsetX = event.clientX - rect.left;
                    const progressPercentage = offsetX / rect.width;
                    const newTime = startSeconds + (progressPercentage * (endSeconds - startSeconds));
                    if (player && typeof player.seekTo === 'function') {
                        player.seekTo(newTime);
                    }
                });

                document.querySelector('.progress-bar-container').addEventListener('mousedown', (event) => {
                    isDragging = true;
                    handleProgressDrag(event);
                });

                document.querySelector('.progress-bar-container').addEventListener('mousemove', (event) => {
                    if (isDragging) {
                        handleProgressDrag(event);
                    }
                });

                document.addEventListener('mouseup', () => {
                    isDragging = false;
                });

                document.getElementById('volume-range').addEventListener('input', (event) => {
                    const volume = event.target.value;
                    player.setVolume(volume);
                    updateVolumeIcon(volume);
                });

                document.getElementById('volume-icon').addEventListener('click', () => {
                    const volume = player.getVolume();
                    if (volume > 0) {
                        player.setVolume(0);
                        document.getElementById('volume-range').value = 0;
                        updateVolumeIcon(0);
                    } else {
                        player.setVolume(80);
                        document.getElementById('volume-range').value = 80;
                        updateVolumeIcon(80);
                    }
                });

                document.getElementById('play-pause-btn').addEventListener('click', () => {
                    const playerCurrentState = player.getPlayerState();
                    if (playerCurrentState === window.YT.PlayerState.PLAYING) {
                        player.pauseVideo();
                        videoState.isPlaying = false;
                    } else {
                        player.playVideo();
                        videoState.isPlaying = true;
                    }
                    updatePlayPauseIcon();
                });

                document.getElementById('full-screen-btn').addEventListener('click', toggleFullScreen);
            }
        },
        willClose: () => {
            if (player && typeof player.destroy === 'function') {
                player.destroy();
                player = null;
                clearProgressInterval();
            }
        }
    });
} */

// const toggleFullScreen = () => {
//     const playerElement = document.getElementById('player');
//     const containerElement = document.getElementById('container');
//     if (!document.fullscreenElement) {
//         if (containerElement.requestFullscreen) {
//             containerElement.requestFullscreen();
//         } else if (containerElement.mozRequestFullScreen) { /* Firefox */
//             containerElement.mozRequestFullScreen();
//         } else if (containerElement.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
//             containerElement.webkitRequestFullscreen();
//         } else if (containerElement.msRequestFullscreen) { /* IE/Edge */
//             containerElement.msRequestFullscreen();
//         }
//         playerElement.style.height = '100vh';
//         videoState.isFullScreen = true;
//     } else {
//         if (document.exitFullscreen) {
//             document.exitFullscreen();
//         } else if (document.mozCancelFullScreen) { /* Firefox */
//             document.mozCancelFullScreen();
//         } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
//             document.webkitExitFullscreen();
//         } else if (document.msExitFullscreen) { /* IE/Edge */
//             document.msExitFullscreen();
//         }
//         playerElement.style.height = '490px';
//         videoState.isFullScreen = false;
//     }
//     updateFullScreenIcon();
// }

// const onShowVideoSolutionClick = () => {
//     if (isYouTubeAPIReady.value) {
//         showVideoSolution();
//     } else {
//         console.error('YouTube API is not ready yet.');
//     }
// }

// const loadYouTubeAPI = () => {
//     if (typeof YT === 'undefined' || typeof window.YT.Player === 'undefined') {
//         window.onYouTubeIframeAPIReady = () => {
//             isYouTubeAPIReady.value = true;
//         };

//         const tag = document.createElement('script');
//         tag.src = "https://www.youtube.com/iframe_api";
//         const firstScriptTag = document.getElementsByTagName('script')[0];
//         firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//     } else {
//         isYouTubeAPIReady.value = true;
//     }
// }

</script>

<style>
.custom-class {
    width: 100% !important;
    height: 100% !important;
}

/* #container {
    background-color: white;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.controls {
    z-index: 99999;
    position: absolute;
    bottom: 8px;
    width: 100%;
    display: flex;
    justify-content: center;
}

#player {
    width: 100%;
    height: 490px;
}

.video-popup {
    width: 80% !important;
    height: 600px !important;
    max-width: 800px !important;
}

.video-popup .swal2-title {
    font-size: 1.5rem;
}

.progress-bar-container {
    position: relative;
    height: 8px;
    bottom: 48px;
    background-color: #e0e0e063;
    overflow: hidden;
    cursor: pointer;
}

.progress-bar {
    height: 100%;
    background-color: #ff4500;
    width: 0;
    transition: width 0.1s;
}

.progress-time {
    position: absolute;
    bottom: 7px;
    left: 50%;
    font-size: 18px;
    color: gray;
}

.progress-time-start {
    left: 180px;
}

.progress-time-end {
    left: 222px;
}

.play-pause-btn {
    position: absolute;
    bottom: 1px;
    left: 0;
    width: 36px;
    height: 36px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    margin-left: 24px;
}

#volume-range {
    position: absolute;
    left: 92px;
    bottom: 18px;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
    width: 80px;
    height: 6px;
    accent-color: #ff4400;
}

#volume-icon {
    position: absolute;
    bottom: 8px;
    left: 64px;
    cursor: pointer;
}

.full-screen-btn {
    position: absolute;
    bottom: 0;
    right: 128px;
    width: 36px;
    height: 36px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
}

.full-screen-btn img {
    width: 100%;
    height: 100%;
}

.play-pause-btn img {
    width: 70%;
    height: 70%;
}

.slash {
    position: absolute;
    bottom: 8px;
    left: 214px;
    font-size: 18px;
    color: gray;
} */
</style>
