<template>
    <div class="flex flex-col lg:flex-row w-full items-center justify-between">
        <div class="flex flex-row gap-4 mt-4 md:w-1/3">
            <button @click="showAnswer"
                class="px-4 py-2 bg-violet-900 hover:bg-violet-950 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold text-sm flex flex-row rounded text-nowrap items-center justify-center gap-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9ZM12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z"
                        fill="white" />
                </svg>Cevabı göster
            </button>
            <button @click="showVideoSolution"
                class="px-4 py-2 bg-violet-900 hover:bg-violet-950 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold text-sm flex flex-row rounded text-nowrap items-center justify-center gap-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.5 12C20.5006 12.2546 20.4353 12.5051 20.3105 12.727C20.1856 12.949 20.0055 13.1348 19.7875 13.2665L6.28 21.5297C6.05227 21.6691 5.79144 21.7452 5.52445 21.7502C5.25746 21.7551 4.99399 21.6887 4.76125 21.5578C4.53073 21.4289 4.3387 21.2409 4.2049 21.0132C4.07111 20.7855 4.00039 20.5263 4 20.2622V3.73779C4.00039 3.47368 4.07111 3.21445 4.2049 2.98673C4.3387 2.75902 4.53073 2.57106 4.76125 2.44217C4.99399 2.31124 5.25746 2.24482 5.52445 2.24977C5.79144 2.25471 6.05227 2.33084 6.28 2.47029L19.7875 10.7334C20.0055 10.8651 20.1856 11.051 20.3105 11.2729C20.4353 11.4949 20.5006 11.7453 20.5 12Z"
                        fill="white" />
                </svg> Video Çözüm
            </button>
        </div>
        <div class="md:w-1/3 flex flex-row justify-center gap-4 mt-4 order-first md:order-none">
            <button @click="previousQuestion"
                class="p-2 bg-violet-900 hover:bg-violet-950 dark:bg-sky-500 dark:hover:bg-sky-600 rounded text-white">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                    </g>
                </svg>
            </button>
            <button @click="nextQuestion"
                class="p-2 bg-violet-900 hover:bg-violet-950 dark:bg-sky-500 dark:hover:bg-sky-600 text-white rounded">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 rotate-180">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                    </g>
                </svg>
            </button>
        </div>
        <div class="flex flex-row text-xl text-white gap-1 sm:gap-3 justify-end mt-4 md:w-1/3">
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
import { ref, computed } from 'vue';

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
    const correctAnswer = 'A';
    return correctAnswer;
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
    return null;
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

const previousQuestion = () => {
    console.log('Previous question clicked');
}

const nextQuestion = () => {
    console.log('Next question clicked');
}
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
