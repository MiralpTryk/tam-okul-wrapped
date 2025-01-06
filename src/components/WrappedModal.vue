<template>
  <Transition name="modal">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black opacity-50" @click="closeModal"></div>
      <div class="relative bg-gradient-to-tr to-black via-black from-red-700 w-full h-full overflow-hidden">
        <div class="emoji-pattern"></div>

        <!-- Logo Container -->
        <a href="https://tamokul.com" target="_blank"
          class="absolute bottom-4 right-4 w-16 sm:w-24 md:w-24 h-16 sm:h-24 md:h-24 z-[9999] group hover:scale-110 duration-300 transition-all hover:drop-shadow-[0_0_0.75rem_#0794bc]">
          <img :src="LogoBack" alt="Tam Okul AI Logo" class="w-full h-full animate-spin-slow absolute inset-0"
            crossorigin="anonymous" loading="eager" />
          <img :src="LogoFront" alt="Tam Okul AI Logo" class="w-1/2 h-1/2 absolute top-1/4 left-1/4"
            crossorigin="anonymous" loading="eager" />
        </a>

        <!-- Progress Bar Buraya gelecek -->
        <div class="absolute top-0 sm:top-4 left-1/2 transform -translate-x-1/2 w-full px-4 sm:px-8">
          <div class="flex gap-1 w-full max-w-sm sm:max-w-3xl mx-auto">
            <div v-for="(bar, index) in progressBars" :key="index"
              class="overflow-hidden bg-white/25 transition-all duration-300 flex items-center" :class="{
                'h-1.5': currentSlide === index,
                'h-1': currentSlide !== index,
                'flex-[2]': currentSlide === index,
                'flex-1': currentSlide !== index
              }">
              <div class="bg-white transition-[width] duration-100" :class="{
                'h-1.5': currentSlide === index,
                'h-1': currentSlide !== index
              }" :style="{
                  transitionDuration: bar.isActive ? '5000ms' : '100ms',
                  width: `${bar.progress}%`
                }">
              </div>
            </div>
          </div>
        </div>

        <!-- Close Button -->
        <button @click="closeModal"
          class="absolute top-4 right-4 sm:top-6 sm:right-6 text-zinc-200 hover:text-gray-200 z-50 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-xl sm:text-3xl">
          &times;
        </button>

        <!-- Main Content Container -->
        <div class="relative h-full flex flex-col">
          <!-- Slides Container -->
          <div class="flex-1 overflow-hidden">
            <Transition :name="transitionName">
              <div :key="currentSlide"
                class="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8 text-zinc-200">

                <!-- Slide Content -->
                <!-- Slide 0: Intro -->
                <div>
                  <h2 v-if="currentSlide === 0" class="text-3xl sm:text-5xl md:text-6xl font-bold text-center mb-6">
                    Öğrenme Yolculuğun <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8 inline-block">hazır,</h3>
                  </h2>
                  <div v-if="currentSlide === 0" class="text-center">
                    <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8">
                    peki sen hazır mısın
                      <span class="font-bold text-red-600">{{ name }}</span>?
                    </h3>
                    <button @click="nextSlide"
                      class="text-lg sm:text-xl md:text-2xl px-6 py-3 rounded-full bg-white text-red-600 font-semibold">
                      Hadi başlayalım!
                    </button>
                  </div>

                  <!-- Slide 1: Questions and Percentage Combined -->
                  <div v-if="currentSlide === 1" class="text-center space-y-8">
                    <!-- Initial Text -->
                    <div>
                      <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8">
                        Zaman hızla geçiyor...
                      </h3>
                      <Transition name="fade">
                        <p v-if="showInitialSubtext" class="text-lg sm:text-xl md:text-2xl text-zinc-200/80 mb-8">
                          Neyse ki senin için her şeyi tarihe not düştük &#129323;
                        </p>
                      </Transition>
                    </div>

                    <!-- Questions and Percentage Container -->
                    <div class="sm:flex sm:justify-center sm:items-center sm:gap-12 sm:mx-auto">
                      <!-- Total Questions -->
                      <Transition name="fade">
                        <div v-if="showTotalQuestions" class="space-y-4 sm:flex-1">
                          <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold">
                            Toplam
                          </h3>
                          <div
                            class="text-5xl sm:text-7xl md:text-9xl font-bold text-red-600 min-w-[200px] sm:min-w-[300px] md:min-w-[350px] text-center">
                            {{ animatedQuestionCount }}
                          </div>
                          <p class="text-lg sm:text-xl md:text-2xl">soru çözdün!</p>
                        </div>
                      </Transition>

                      <!-- Connecting "ve" -->
                      <Transition name="fade">
                        <div v-if="showTotalQuestions" class="">
                          <span class="text-2xl sm:text-3xl md:text-4xl font-semibold">ve</span>
                        </div>
                      </Transition>

                      <!-- Percentage Above Average -->
                      <Transition name="fade">
                        <div v-if="showTotalQuestions" class="space-y-4 sm:flex-1">
                          <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold">
                            sorularda
                          </h3>
                          <div class="flex justify-center">
                            <CircularProgress :value="total_questions_solved_percentage" />
                          </div>
                          <p class="text-lg sm:text-xl md:text-2xl">
                            başarıya ulaştın!
                          </p>
                        </div>
                      </Transition>
                    </div>
                  </div>

                  <!-- Slide 2: Top Courses -->
                  <div v-if="currentSlide === 2">
                    <div class="text-center mb-8">
                      <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8">
                        Çok sayıda farklı derste uzmanlaştın
                      </h3>
                      <p class="text-lg sm:text-xl md:text-2xl mb-8">
                        <span class="font-bold text-red-600">En iyilerini</span>
                        görelim! &#129300;
                      </p>
                    </div>

                    <Transition name="fade">
                      <div v-show="coursesOpacity > 0" :style="{ opacity: coursesOpacity }"
                        class="h-72 overflow-hidden">
                        <TransitionGroup name="list" tag="ul" class="space-y-1 sm:space-y-2">
                          <li v-for="(course) in visibleCourses" :key="course"
                            class="flex items-center text-lg sm:text-xl md:text-2xl transform rounded-lg p-2">
                            <div class="flex items-center space-x-4 w-full">
                              <span class="font-medium">{{ course }}</span>
                            </div>
                          </li>
                        </TransitionGroup>
                      </div>
                    </Transition>
                  </div>

                  <!-- Slide 3: Outstanding Course Combined -->
                  <div v-if="currentSlide === 3" class="text-center">
                    <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8">
                      Ama bir derste o kadar iyiydin ki

                      <span class="text-red-600">diğerlerinden öne çıktı &#128077;</span>
                    </h3>

                    <Transition name="fade" mode="out-in">
                      <div v-if="showOutstandingCourse" class="space-y-4 sm:space-y-8">
                        <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold">
                          Öne çıkan dersin...
                        </h3>
                        <div v-if="!topCourseRevealed" @click="revealTopCourse"
                          class="cursor-pointer flex flex-col items-center justify-center gap-4 relative mx-auto animate-pulse hover:animate-none z-20">
                          <img :src="FingerPrint" alt="Fingerprint"
                            class="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 transition-all duration-300" />
                          <span
                            class="text-xl sm:text-2xl md:text-3xl transition-all duration-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-nowrap">
                            Açmak için tıkla
                          </span>
                        </div>
                        <Transition name="fade">
                          <div v-if="topCourseRevealed">
                            <div class="text-4xl sm:text-5xl md:text-7xl font-bold text-red-600">
                              {{ topCourse }}
                            </div>
                            <p class="text-xl sm:text-2xl md:text-3xl mt-4">
                              Sen bir {{ topCourse }} <span class="text-red-600"> uzmanısın! &#129395;</span>
                            </p>
                          </div>
                        </Transition>
                      </div>
                    </Transition>
                  </div>

                  <!-- Slide 4: Top Subjects -->
                  <div v-if="currentSlide === 4">
                    <div class="text-center mb-8">
                      <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8">
                        Konudan konuya atladın &#128521;
                      </h3>
                      <p class="text-lg sm:text-xl md:text-2xl mb-8">
                        &#128170; <span class="font-bold text-red-600">En iyi</span> olduğun konular şunlardı:
                      </p>
                    </div>

                    <Transition name="fade">
                      <div v-show="showSubjects">
                        <div class="h-96 overflow-hidden">
                          <TransitionGroup enter-active-class="transition-all duration-500 ease-out"
                            enter-from-class="opacity-0 scale-95 -translate-x-4"
                            enter-to-class="opacity-100 scale-100 translate-x-0"
                            move-class="transition-transform duration-500" tag="ul" class="space-y-1 sm:space-y-2">
                            <li v-for="(subject, index) in visibleSubjects" :key="subject.name"
                              class="flex items-center text-lg sm:text-xl md:text-2xl transform rounded-lg p-2"
                              :style="{ transitionDelay: `${index * 100}ms` }">
                              <div class="flex items-center space-x-2 w-full">
                                <span class="mr-1 font-bold opacity-50">{{ index + 1 }}.</span>
                                <div class="flex-1">
                                  <span class="font-medium">{{ truncateText(subject.name) }}</span>
                                  <span class="text-sm ml-2 opacity-75">{{ subject.course }}</span>
                                </div>
                              </div>
                            </li>
                          </TransitionGroup>
                        </div>
                      </div>
                    </Transition>
                  </div>

                  <!-- Slide 5: Study Time Combined -->
                  <div v-if="currentSlide === 5" class="text-center space-y-8">
                    <!-- Initial Teaser -->
                    <div>
                      <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8">
                        Öğrenmeye <span class="text-red-600">çok</span> zaman ayırdın &#9200;
                      </h3>
                      <p class="text-lg sm:text-xl md:text-2xl">
                        Kaç saat olduğunu tahmin edebilir misin?
                      </p>
                    </div>

                    <!-- Total Hours and Comparison Container -->
                    <div class="sm:flex sm:justify-center sm:items-center sm:gap-12 sm:mx-auto">
                      <!-- Total Hours -->
                      <Transition name="fade">
                        <div v-if="studyTimePhase !== 'teaser'" class="space-y-2 sm:space-y-4 sm:flex-1">
                          <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold">
                            Toplam öğrenme süren...
                          </h3>
                          <div class="text-5xl sm:text-7xl md:text-9xl font-bold text-red-600">
                            {{ animatedHours }}
                          </div>
                          <p class="text-lg sm:text-xl md:text-2xl">saat!</p>
                        </div>
                      </Transition>

                      <!-- Comparison -->
                      <Transition name="fade">
                        <div v-if="studyTimePhase === 'comparison' || studyTimePhase === 'question'"
                          class="space-y-2 sm:space-y-4 sm:flex-1 mt-8 sm:mt-0">
                          <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold">
                            Bu, yaklaşık olarak
                          </h3>
                          <div class="text-5xl sm:text-7xl md:text-9xl font-bold text-red-600">
                            {{ animatedMovieCount }}
                          </div>
                          <p class="text-lg sm:text-xl md:text-2xl">
                            film izlemek demektir! &#127909;
                          </p>
                        </div>
                      </Transition>
                    </div>

                    <!-- Time Question -->
                    <Transition name="fade">
                      <div v-if="studyTimePhase === 'question'" class="space-y-4">
                        <h3 class="text-lg sm:text-xl md:text-2xl font-semibold">
                          Bu kadar zamanı nereden buluyorsun? 🫢
                        </h3>
                      </div>
                    </Transition>
                  </div>

                  <!-- Slide 6: Achievements Combined -->
                  <div v-if="currentSlide === 6" class="text-center space-y-8">
                    <!-- Achievements Teaser -->
                    <Transition name="fade">
                      <div v-if="achievementPhase !== 'initial'">
                        <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8">
                          Çok şey başardın
                        </h3>
                        <p class="text-lg sm:text-xl md:text-2xl">
                          Başarılarını kutlayalım! 🎉
                        </p>
                      </div>
                    </Transition>

                    <!-- Achievements List -->
                    <Transition name="fade">
                      <div v-if="achievementPhase === 'list' || achievementPhase === 'conclusion'"
                        class="overflow-hidden">
                        <TransitionGroup name="list" tag="ul" class="space-y-2 sm:space-y-4">
                          <li v-for="(badge, index) in visibleAchievements" :key="`badge-${badge.id || index}`"
                            class="flex items-center text-lg sm:text-xl md:text-2xl bg-black/25 rounded-lg p-4 backdrop-blur-sm"
                            :class="[
                              'transition-all duration-500',
                              badge.isHighlighted ? 'scale-105 bg-white/10' : 'scale-100'
                            ]">
                            <div class="flex items-center space-x-4 w-full sm:mx-12 md:mx-24">
                              <span class="text-3xl sm:text-4xl md:text-5xl"
                                :class="{ 'animate-bounce': badge.isHighlighted }">
                                {{ badge.emoji }}
                              </span>
                              <div class="flex-1">
                                <div :class="[
                                  'font-medium transition-colors duration-300',
                                  badge.isHighlighted ? 'text-yellow-600' : 'text-zinc-200'
                                ]">
                                  {{ badge.title }}
                                </div>
                              </div>
                            </div>
                          </li>
                        </TransitionGroup>
                      </div>
                    </Transition>

                    <!-- Conclusion -->
                    <Transition name="fade">
                      <div v-if="achievementPhase === 'conclusion'" class="space-y-4">
                        <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8">
                          Harika bir öğrenme yılı için tebrikler!
                        </h3>

                        <p class="text-lg sm:text-xl md:text-2xl mt-4">
                          2025'te de harika işler yapmaya devam et!
                        </p>
                        <Celebration v-if="showCelebration" />
                      </div>
                    </Transition>
                  </div>

                  <!-- Slide 7: Share -->
                  <div v-if="currentSlide === 7" class="text-center">
                    <div class="relative">
                      <WrappedStatsCard class="wrapped-stats-card" :longestStreak="longestStreak"
                        :totalAnswers="total_questions_solved" :minutesSpent="totalStudyHours * 60" :userName="name"
                        ref="statsCardRef" />
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Navigation Buttons -->
          <div v-if="currentSlide !== 0"
            class="relative z-[55] p-4 flex justify-center gap-2 sm:gap-4 bg-gradient-to-t from-black/20">
            <button v-if="currentSlide === totalSlides - 1" @click="rewindPresentation"
              class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full sm:text-base font-semibold transition-all duration-300 bg-white/10 backdrop-blur-sm text-zinc-200 border border-white/20 hover:bg-white/20 flex items-center">
              <RefreshCwIcon class="w-3 h-3 sm:w-3 sm:h-3" />
              <span class="hidden sm:inline sm:ml-1">Yeniden Başlat</span>
            </button>

            <button v-if="currentSlide === totalSlides - 1" @click="handleShare"
              class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full sm:text-base font-semibold transition-all duration-300 bg-white/10 backdrop-blur-sm text-zinc-200 border border-white/20 hover:bg-white/20 flex items-center">
              <Share2Icon class="w-3 h-3 sm:w-3 sm:h-3" />
              <span class="hidden sm:inline sm:ml-1">İstatistikleri Paylaş</span>
            </button>

            <button @click="prevSlide"
              class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full sm:text-base font-semibold transition-all duration-300 bg-white/10 backdrop-blur-sm text-zinc-200 border border-white/20 hover:bg-white/20">
              Geri
            </button>

            <button @click="nextSlide"
              class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full sm:text-base font-semibold transition-all duration-300 bg-white text-red-600 hover:bg-gray-200">
              {{ buttonText }}
            </button>
          </div>

          <!-- Mobile Touch Navigation -->
          <div v-if="currentSlide !== 0" class="absolute inset-0 sm:hidden flex z-10">
            <!-- Previous Slide Button -->
            <button @click="prevSlide" class="w-1/2 h-full" aria-label="Önceki slayt">
            </button>

            <!-- Next Slide Button -->
            <button @click="nextSlide" class="w-1/2 h-full" aria-label="Sonraki slayt">
            </button>
          </div>

          <!-- Mobile Navigation Hints -->
          <Transition name="fade">
            <div v-if="currentSlide === 1" class="absolute inset-y-0 w-full sm:hidden pointer-events-none pt-16">
              <div class="h-full flex justify-between items-center px-4 text-zinc-200/50">
                <!-- Left Hint -->
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span class="text-sm">Geri</span>
                </div>

                <!-- Right Hint -->
                <div class="flex items-center gap-2">
                  <span class="text-sm">İleri</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Toast Notification -->
  <Transition name="toast">
    <div v-if="showToast" 
      class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[9999] px-4 py-2 rounded-lg shadow-lg text-white min-w-[200px] text-center"
      :class="{
        'bg-blue-600': toastType === 'info',
        'bg-red-600': toastType === 'error',
        'bg-green-600': toastType === 'success'
      }">
      {{ toastMessage }}
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch, onUnmounted, onMounted } from "vue";
import { useAnalysisStore } from '@/composables/useAnalysisStore';
import Celebration from "@/components/Celebration.vue";
import WrappedStatsCard from "@/components/WrappedStatsCard.vue";
import { RefreshCwIcon, Share2Icon } from "lucide-vue-next";
import CircularProgress from '@/components/CircularProgress.vue';
import FingerPrint from '@/assets/fingerprint.svg';
import LogoBack from '@/assets/tam-okul-ai-logo-back.svg';
import LogoFront from '@/assets/tam-okul-ai-logo-front.svg';
import { toPng } from 'html-to-image';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["close"]);

const analysisStore = useAnalysisStore();

const loadData = () => {
  total_questions_solved.value = analysisStore.totalQuestionsSolved.value;
};

const currentSlide = ref(0);
const totalSlides = 8;
const transitionName = ref("slide-right");
const showInitialSubtext = ref(false);
const longestStreak = ref(10);
const name = computed(() => analysisStore.userName?.value || 'Misafir');

const total_questions_solved = computed(() => analysisStore.totalQuestionsSolved?.value || 0);
const total_questions_solved_percentage = computed(() => analysisStore.totalQuestionsSolvedPercentage?.value || 0);

const topCourses = computed(() => analysisStore.bestCourses?.value || []);
const topCourse = computed(() => analysisStore.bestCourse?.value || '');
const bestSubjects = computed(() => {
  const subjects = analysisStore.bestSubjects?.value || [];
  return subjects.map(subject => {
    const [course, name] = Object.entries(subject)[0];
    return {
      course,
      name
    };
  });
});

const totalStudyHours = computed(() => analysisStore.totalHoursSpent?.value || 0);

const moviesWatched = computed(() =>
  Math.floor(totalStudyHours.value / 1.67)
);

const buttonText = computed(() =>
  currentSlide.value === totalSlides - 1 ? "Son" : "İleri"
);

const visibleCourses = ref([]);
const visibleSubjects = ref([]);
const visibleAchievements = ref([]);
const highlightedBadgeId = ref(null);

const animatedQuestionCount = ref(0);
const percentageOpacity = ref(0);
const coursesOpacity = ref(0);
const topCourseRevealed = ref(false);
const showCelebration = ref(false);
const showTotalQuestions = ref(false);
const showOutstandingCourse = ref(false);
const showSubjects = ref(false);
const studyTimePhase = ref('teaser');
const achievementPhase = ref('initial');

const activeTimeouts = ref([]);

const clearAllTimeouts = () => {
  activeTimeouts.value.forEach(timeout => clearTimeout(timeout));
  activeTimeouts.value = [];
};

const safeSetTimeout = (fn, delay) => {
  const timeoutId = setTimeout(fn, delay);
  activeTimeouts.value.push(timeoutId);
  return timeoutId;
};

const ANIMATION_CONSTANTS = {
  TOTAL_DURATION: 5000,    // Genel animasyon süresi
  INITIAL_DELAY: 1000,     // Başlangıç gecikmesi
  ANIMATION_DURATION: 4000, // Ana animasyon süresi
  PHASE_DURATION: 2000,    // Aşama süresi
  SLIDE_1_DURATION: 3000,  // Slayt 1 için özel süre
};

const nextSlide = () => {
  if (currentSlide.value >= totalSlides - 1) return;

  completeBar(currentSlide.value);

  transitionName.value = "slide-left";
  currentSlide.value++;
};

const prevSlide = () => {
  if (currentSlide.value <= 0) return;

  resetBar(currentSlide.value);

  transitionName.value = "slide-right";
  currentSlide.value--;
};

const resetSlide1 = () => {
  showTotalQuestions.value = false;
  percentageOpacity.value = 0;
  animatedQuestionCount.value = 0;
};

const resetSlide2 = () => {
  coursesOpacity.value = 0;
  visibleCourses.value = [];
};

const resetSlide3 = () => {
  showOutstandingCourse.value = false;
  topCourseRevealed.value = false;
};

const resetSlide4 = () => {
  showSubjects.value = false;
  visibleSubjects.value = [];
};

const resetSlide5 = () => {
  studyTimePhase.value = 'teaser';
};

const resetSlide6 = () => {
  achievementPhase.value = 'initial';
  visibleAchievements.value = [];
  showCelebration.value = false;
};

const initializeSlide = (slideNumber) => {
  clearAllTimeouts();

  switch (slideNumber) {
    case 1:
      resetSlide1();
      safeSetTimeout(() => {
        showInitialSubtext.value = true;
        safeSetTimeout(() => {
          showTotalQuestions.value = true;
          startSlide1Animations();
        }, 1000);
      }, 1000);
      break;

    case 2:
      resetSlide2();
      safeSetTimeout(() => {
        coursesOpacity.value = 1;
        const courseInterval = ANIMATION_CONSTANTS.ANIMATION_DURATION / topCourses.value.length;

        const shuffledCourses = shuffleArray([...topCourses.value]);

        shuffledCourses.forEach((course, index) => {
          safeSetTimeout(() => {
            visibleCourses.value.push(course);
          }, courseInterval * index);
        });
      }, ANIMATION_CONSTANTS.INITIAL_DELAY);
      break;

    case 3:
      resetSlide3();
      safeSetTimeout(() => {
        showOutstandingCourse.value = true;
      }, 2000);
      break;

    case 4:
      resetSlide4();
      safeSetTimeout(() => {
        showSubjects.value = true;
        const subjectInterval = ANIMATION_CONSTANTS.ANIMATION_DURATION / bestSubjects.value.length;

        bestSubjects.value.forEach((subject, index) => {
          safeSetTimeout(() => {
            visibleSubjects.value.push(subject);
          }, subjectInterval * index);
        });
      }, ANIMATION_CONSTANTS.INITIAL_DELAY);
      break;

    case 5:
      resetSlide5();
      safeSetTimeout(() => {
        studyTimePhase.value = 'hours';
        animateStudyHours();
        safeSetTimeout(() => {
          studyTimePhase.value = 'comparison';
          animateMovieCount();
          safeSetTimeout(() => {
            studyTimePhase.value = 'question';
          }, ANIMATION_CONSTANTS.PHASE_DURATION / 2);
        }, ANIMATION_CONSTANTS.PHASE_DURATION / 2);
      }, ANIMATION_CONSTANTS.INITIAL_DELAY);
      break;

    case 6:
      resetSlide6();
      safeSetTimeout(() => {
        achievementPhase.value = 'teaser';
        safeSetTimeout(() => {
          achievementPhase.value = 'list';

          const badges = calculateBadges(total_questions_solved.value, total_questions_solved_percentage.value, totalStudyHours.value);
          const duration = 2500;
          const badgeInterval = duration / badges.length;

          badges.forEach((badge, index) => {
            safeSetTimeout(() => {
              visibleAchievements.value.push({
                ...badge,
                isHighlighted: true
              });

              highlightedBadgeId.value = badge.id;

              safeSetTimeout(() => {
                highlightedBadgeId.value = null;
              }, badgeInterval / 2);

              if (index === badges.length - 1) {
                safeSetTimeout(() => {
                  achievementPhase.value = 'conclusion';
                  showCelebration.value = true;
                }, badgeInterval);
              }
            }, badgeInterval * index);
          });
        }, 1500);
      }, 1000);
      break;
  }
};

const revealTopCourse = () => {
  topCourseRevealed.value = true;
};

const closeModal = () => {
  emit("close");
};

const rewindPresentation = () => {
  currentSlide.value = 0;
  transitionName.value = "slide-right";
  resetAllStates();
};

const resetAllStates = () => {
  resetSlide1();
  resetSlide2();
  resetSlide3();
  resetSlide4();
  resetSlide5();
  resetSlide6();
};

const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('info');

const displayToast = (message, type = 'info', duration = 3000) => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, duration);
};

const handleShare = async () => {
  try {
    if (!statsCardRef.value) {
      displayToast('Kart bulunamadı', 'error');
      return;
    }

    const card = statsCardRef.value.$el;
    
    const dataUrl = await toPng(card, {
      quality: 1.0,
      backgroundColor: '#000000',
      style: {
        transform: 'none',
        borderRadius: '0',
      },
      cacheBust: true,
      pixelRatio: 2
    });

    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const file = new File([blob], 'ogrenme-yolculugum.png', { type: 'image/png' });

    if (navigator.share) {
      await navigator.share({
        files: [file],
        title: 'Tam Okul KÖKSİS Öğrenme Yolculuğum',
        text: 'İşte benim Tam Okul KÖKSİS Öğrenme Yolculuğum! 🎓✨'
      });
    } else {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'ogrenme-yolculugum.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (error) {
    displayToast('Paylaşım sırasında bir hata oluştu', 'error');
  }
};

watch(
  () => props.show,
  (newShow) => {
    if (newShow) {
      currentSlide.value = 0;
      resetAllStates();
      startBarProgress(0);
    }
  }
);

const statsCardRef = ref(null);

const calculateBadges = (totalQuestions, successRate, hoursSpent) => {
  const badges = [];
  let id = 1;

  // Soru Çözüm Rozetleri
  if (totalQuestions >= 500) {
    badges.push({ id: id++, emoji: '📚', title: 'Soru Çözüm Ustası (500+ Soru)' });
  } else if (totalQuestions >= 250) {
    badges.push({ id: id++, emoji: '📖', title: 'Soru Çözüm Uzmanı (250+ Soru)' });
  } else if (totalQuestions >= 100) {
    badges.push({ id: id++, emoji: '📝', title: 'Soru Çözüm Acemisi (100+ Soru)' });
  }

  // Başarı Yüzdesi Rozetleri
  if (successRate >= 90) {
    badges.push({ id: id++, emoji: '🎯', title: 'Tam İsabet (%90+ Başarı)' });
  } else if (successRate >= 75) {
    badges.push({ id: id++, emoji: '🎪', title: 'Başarı Yıldızı (%75+ Başarı)' });
  } else if (successRate >= 60) {
    badges.push({ id: id++, emoji: '✨', title: 'Yükselen Yıldız (%60+ Başarı)' });
  }

  // Çalışma Saati Rozetleri
  if (hoursSpent >= 100) {
    badges.push({ id: id++, emoji: '⏰', title: 'Azimli Şampiyon (100+ Saat)' });
  } else if (hoursSpent >= 50) {
    badges.push({ id: id++, emoji: '⌚', title: 'Çalışkan Arı (50+ Saat)' });
  } else if (hoursSpent >= 25) {
    badges.push({ id: id++, emoji: '⏱️', title: 'Öğrenme Aşığı (25+ Saat)' });
  }

  return badges;
};

const animatedHours = ref(0);
const animatedMovieCount = ref(0);

const animateStudyHours = () => {
  const duration = ANIMATION_CONSTANTS.PHASE_DURATION;
  const end = totalStudyHours.value;
  const easeOutQuart = t => 1 - (--t) * t * t * t;
  const startTime = Date.now();

  const animate = () => {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;

    if (elapsed >= duration) {
      animatedHours.value = end;
      return;
    }

    const progress = easeOutQuart(elapsed / duration);
    animatedHours.value = Math.round(progress * end);
    requestAnimationFrame(animate);
  };

  animate();
};

const animateMovieCount = () => {
  const duration = ANIMATION_CONSTANTS.PHASE_DURATION;
  const end = moviesWatched.value;
  const easeOutQuart = t => 1 - (--t) * t * t * t;
  const startTime = Date.now();

  const animate = () => {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;

    if (elapsed >= duration) {
      animatedMovieCount.value = end;
      return;
    }

    const progress = easeOutQuart(elapsed / duration);
    animatedMovieCount.value = Math.round(progress * end);
    requestAnimationFrame(animate);
  };

  animate();
};

const startSlide1Animations = () => {
  const duration = ANIMATION_CONSTANTS.TOTAL_DURATION * 0.6;
  const startTime = Date.now();

  const animate = () => {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;

    if (elapsed >= duration) {
      animatedQuestionCount.value = total_questions_solved.value;
      percentageOpacity.value = 1;
      return;
    }

    const easeOutQuart = t => 1 - (--t) * t * t * t;
    const progress = easeOutQuart(elapsed / duration);

    animatedQuestionCount.value = Math.round(progress * total_questions_solved.value);
    percentageOpacity.value = progress;

    requestAnimationFrame(animate);
  };

  animate();
};

watch(currentSlide, (newSlide) => {
  initializeSlide(newSlide);
});

onUnmounted(() => {
  clearAllTimeouts();
});

const progressBars = ref(Array(8).fill().map(() => ({
  progress: 0,
  isActive: false,
  isCompleted: false
})));

const startBarProgress = (index) => {
  const startTime = Date.now();
  progressBars.value[index].isActive = true;
  progressBars.value[index].progress = 0;

  const animate = () => {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;

    if (elapsed < ANIMATION_CONSTANTS.TOTAL_DURATION && progressBars.value[index].isActive) {
      progressBars.value[index].progress = (elapsed / ANIMATION_CONSTANTS.TOTAL_DURATION) * 100;
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

const completeBar = (index) => {
  progressBars.value[index].progress = 100;
  progressBars.value[index].isActive = false;
  progressBars.value[index].isCompleted = true;
};

const resetBar = (index) => {
  progressBars.value[index].progress = 0;
  progressBars.value[index].isActive = false;
  progressBars.value[index].isCompleted = false;
};

watch(currentSlide, (newSlide) => {
  for (let i = 0; i < newSlide; i++) {
    completeBar(i);
  }
  for (let i = newSlide + 1; i < progressBars.value.length; i++) {
    resetBar(i);
  }
  startBarProgress(newSlide);
});

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const truncateText = (text) => {
  if (text.length <= 57) return text;

  const truncateIndex = text.substring(0, 57).lastIndexOf(' ');

  if (truncateIndex === -1) return text.substring(0, 57) + '...';

  return text.substring(0, truncateIndex) + '...';
};

const loadFabric = () => {
  return new Promise((resolve, reject) => {
    if (window.fabric) {
      resolve(window.fabric);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js';
    script.onload = () => resolve(window.fabric);
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

onMounted(async () => {
  loadData();
  await loadFabric();
});

</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.slide {
  position: absolute;
  width: 100%;
  transition: all 0.5s ease;
}

.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 0.5s ease;
}

.slide-up-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.emoji-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.2;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 100 100'%3E%3Ctext x='50%25' y='18%25' font-size='20' text-anchor='middle' dominant-baseline='middle' fill='white'%3E📚%3C/text%3E%3Ctext x='0%25' y='20%25' font-size='20' text-anchor='middle' dominant-baseline='middle' fill='white'%3E🎓%3C/text%3E%3Ctext x='100%25' y='20%25' font-size='20' text-anchor='middle' dominant-baseline='middle' fill='white'%3E🎓%3C/text%3E%3Ctext x='25%25' y='50%25' font-size='20' text-anchor='middle' dominant-baseline='middle' fill='white'%3E✏️%3C/text%3E%3Ctext x='75%25' y='50%25' font-size='20' text-anchor='middle' dominant-baseline='middle' fill='white'%3E🔖%3C/text%3E%3Ctext x='0%25' y='80%25' font-size='20' text-anchor='middle' dominant-baseline='middle' fill='white'%3E🧠%3C/text%3E%3Ctext x='100%25' y='80%25' font-size='20' text-anchor='middle' dominant-baseline='middle' fill='white'%3E🧠%3C/text%3E%3Ctext x='50%25' y='80%25' font-size='20' text-anchor='middle' dominant-baseline='middle' fill='white'%3E🔬%3C/text%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 300px 300px;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 100%);
}
</style>
