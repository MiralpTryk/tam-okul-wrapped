<template>
  <Transition name="modal">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black opacity-50" @click="closeModal"></div>
      <div class="relative bg-gradient-to-br from-black via-zinc-800 to-violet-600 w-full h-full overflow-hidden">
        <div class="emoji-pattern"></div>

        <!-- Progress Bar -->
        <div
          class="absolute top-0 sm:top-4 left-1/2 transform -translate-x-1/2 w-full h-1 bg-white/10 max-w-sm sm:max-w-4xl rounded-full">
          <div class="h-full bg-sky-500 transition-all duration-500"
            :style="{ width: `${(currentSlide / (totalSlides - 1)) * 100}%` }">
          </div>
        </div>

        <button @click="closeModal"
          class="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-gray-200 z-50 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-xl sm:text-3xl">
          &times;
        </button>

        <!-- Main Content Container -->
        <div class="relative h-full flex flex-col">
          <!-- Slides Container -->
          <div class="flex-1 overflow-hidden">
            <Transition :name="transitionName">
              <div :key="currentSlide"
                class="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8 text-white">

                <!-- Slide Content -->
                <!-- Slide 0: Intro -->
                <div class="w-full max-w-6xl mx-auto">
                  <h2 v-if="currentSlide === 0"
                    class="text-3xl sm:text-5xl md:text-6xl font-bold text-center mb-6 sm:mb-12">
                    <span class="text-sky-500">{{ new Date().getFullYear() }}</span> Öğrenme Yolculuğun
                  </h2>
                  <div v-if="currentSlide === 0" class="text-center">
                    <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8">
                      Öğrenme Yolculuğun hazır, peki ya sen görmeye hazır mısın
                      <span class="font-bold text-sky-500">{{ name }}</span>?
                    </h3>
                    <button @click="nextSlide"
                      class="text-lg sm:text-xl md:text-2xl px-6 py-3 rounded-full bg-white text-[#1A93BD] font-semibold animate-pulse">
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
                        <p v-if="showInitialSubtext" class="text-lg sm:text-xl md:text-2xl text-white/80 mb-8">
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
                            Bu yıl tam tamına
                          </h3>
                          <div class="text-5xl sm:text-7xl md:text-9xl font-bold text-sky-500">
                            {{ countedQuestions }}
                          </div>
                          <p class="text-lg sm:text-xl md:text-2xl">soru çözdün!</p>
                        </div>
                      </Transition>

                      <!-- Percentage Above Average -->
                      <Transition name="fade">
                        <div v-if="showTotalQuestions" class="space-y-4 sm:flex-1">
                          <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold">
                            Ve ortalamadan
                          </h3>
                          <div class="flex justify-center">
                            <CircularProgress :value="percentageAboveAverage" />
                          </div>
                          <p class="text-lg sm:text-xl md:text-2xl">
                            daha başarılıydın!
                          </p>
                        </div>
                      </Transition>
                    </div>
                  </div>

                  <!-- Slide 2: Top Subjects Combined -->
                  <div v-if="currentSlide === 2">
                    <div class="text-center mb-8">
                      <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8">
                        Çok sayıda farklı derste uzmanlaştın
                      </h3>
                      <p class="text-lg sm:text-xl md:text-2xl mb-8">
                        <span class="font-bold text-sky-500">En iyi 5'ini</span>
                        görelim! &#129300;
                      </p>
                    </div>

                    <Transition name="fade">
                      <div v-show="subjectsOpacity > 0" :style="{ opacity: subjectsOpacity }"
                        class="h-64 sm:h-80 overflow-hidden">
                        <TransitionGroup name="list" tag="ul" class="space-y-2 sm:space-y-4">
                          <li v-for="(subject) in visibleSubjects" :key="subject"
                            class="flex items-center text-xl sm:text-2xl md:text-3xl">
                            <span>{{ subject }}</span>
                          </li>
                        </TransitionGroup>
                      </div>
                    </Transition>
                  </div>

                  <!-- Slide 3: Outstanding Course Combined -->
                  <div v-if="currentSlide === 3" class="text-center">
                    <Transition name="fade" mode="out-in">
                      <div v-if="!showOutstandingCourse" key="teaser">
                        <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8">
                          Ama bir derste o kadar iyiydin ki,
                          <span class="italic text-sky-500">diğerlerinden öne çıktı... &#128077;</span>
                        </h3>
                      </div>
                      <div v-else key="content" class="space-y-4 sm:space-y-8">
                        <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold">
                          Öne çıkan dersin...
                        </h3>
                        <div v-if="!topSubjectRevealed" @click="revealTopSubject" class="cursor-pointer">
                          <div
                            class="text-4xl sm:text-5xl md:text-7xl font-bold bg-white/20 backdrop-blur-sm rounded-lg p-4">
                            Açmak için tıkla
                          </div>
                        </div>
                        <Transition name="fade">
                          <div v-if="topSubjectRevealed">
                            <div class="text-4xl sm:text-5xl md:text-7xl font-bold text-sky-500">
                              {{ topSubject }}
                            </div>
                            <p class="text-xl sm:text-2xl md:text-3xl mt-4">
                              Sen bir {{ topSubject }} <span class="text-sky-500"> uzmanısın! &#129395;</span>
                            </p>
                          </div>
                        </Transition>
                      </div>
                    </Transition>
                  </div>

                  <!-- Slide 4: Top Topics Combined -->
                  <div v-if="currentSlide === 4">
                    <div class="text-center mb-8">
                      <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8">
                        Öylesine maceracısın ki, konudan konuya atladın &#128521;
                      </h3>
                      <p class="text-lg sm:text-xl md:text-2xl mb-8">
                        <span class="font-bold text-sky-500">En iyi 5'ine</span> bakalım!
                      </p>
                    </div>

                    <Transition name="fade">
                      <div v-show="showTopics">
                        <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8 text-center">
                          &#128170; <span class="font-bold text-sky-500">En iyi</span> olduğun konular şunlardı:
                        </h3>
                        <div class="h-64 sm:h-80 overflow-hidden">
                          <TransitionGroup enter-active-class="transition-all duration-500 ease-out"
                            enter-from-class="opacity-0 scale-95 -translate-x-4"
                            enter-to-class="opacity-100 scale-100 translate-x-0"
                            move-class="transition-transform duration-500" tag="ul" class="space-y-2 sm:space-y-4">
                            <li v-for="(topic, index) in visibleTopics" :key="topic.name"
                              class="flex items-center text-lg sm:text-xl md:text-2xl transform"
                              :style="{ transitionDelay: `${index * 100}ms` }">
                              <span class="mr-2 sm:mr-4 font-bold opacity-50">{{ index + 1 }}.</span>
                              <div class="flex-1">
                                <span class="font-medium">{{ topic.name }}</span>
                                <span class="text-white/60 ml-2">({{ topic.subject }})</span>
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
                        Öğrenmeye <span class="font-bold text-sky-500">çoook</span> zaman ayırdın &#9200;
                      </h3>
                      <p class="text-lg sm:text-xl md:text-2xl">
                        Kaç saat olduğunu tahmin edebilir misin?
                      </p>
                    </div>

                    <!-- Total Hours and Comparison Container -->
                    <div class="sm:flex sm:justify-center sm:items-center sm:gap-12 sm:mx-auto">
                      <!-- Total Hours -->
                      <Transition name="fade">
                        <div v-if="studyTimePhase !== 'teaser'" class="space-y-4 sm:flex-1">
                          <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold">
                            Toplam öğrenme süren...
                          </h3>
                          <div class="text-5xl sm:text-7xl md:text-9xl font-bold text-sky-500">
                            {{ animatedHours }}
                          </div>
                          <p class="text-lg sm:text-xl md:text-2xl">saat!</p>
                        </div>
                      </Transition>

                      <!-- Comparison -->
                      <Transition name="fade">
                        <div v-if="studyTimePhase === 'comparison' || studyTimePhase === 'question'"
                          class="space-y-4 sm:flex-1 mt-8 sm:mt-0">
                          <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold">
                            Bu, yaklaşık olarak
                          </h3>
                          <div class="text-5xl sm:text-7xl md:text-9xl font-bold text-sky-500">
                            {{ animatedMovieCount }}
                          </div>
                          <p class="text-lg sm:text-xl md:text-2xl">
                            saat film izlemek demektir! &#127909;
                          </p>
                        </div>
                      </Transition>
                    </div>

                    <!-- Time Question -->
                    <Transition name="fade">
                      <div v-if="studyTimePhase === 'question'" class="space-y-4">
                        <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold">
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
                          Başarılarını kutlayalım! 🎉🎉🎉
                        </p>
                      </div>
                    </Transition>

                    <!-- Achievements List -->
                    <Transition name="fade">
                      <div v-if="achievementPhase === 'list' || achievementPhase === 'conclusion'"
                        class="overflow-hidden">
                        <TransitionGroup name="list" tag="ul" class="space-y-2 sm:space-y-4">
                          <li v-for="badge in visibleAchievements" :key="badge.id"
                            class="flex items-center text-lg sm:text-xl md:text-2xl bg-white/5 rounded-lg p-4 backdrop-blur-sm"
                            :class="[
                              'transition-all duration-500',
                              badge.isHighlighted ? 'scale-105 bg-white/10' : 'scale-100'
                            ]">
                            <div class="flex items-center space-x-4 w-full">
                              <span class="text-3xl sm:text-4xl md:text-5xl"
                                :class="{ 'animate-bounce': badge.isHighlighted }">
                                {{ badge.emoji }}
                              </span>
                              <div class="flex-1">
                                <div :class="[
                                  'font-medium transition-colors duration-300',
                                  badge.isHighlighted ? 'text-sky-400' : 'text-white'
                                ]">
                                  {{ badge.title }}
                                </div>
                              </div>
                            </div>
                          </li>
                          <!-- Streak'i ayrı bir koşulla gösterelim -->
                          <li v-if="visibleAchievements.some(b => b.type === 'streak')" :key="'streak'"
                            class="flex items-center text-lg sm:text-xl md:text-2xl bg-white/5 rounded-lg p-4 backdrop-blur-sm">
                            <div class="flex items-center space-x-4 w-full">
                              <span class="text-3xl sm:text-4xl md:text-5xl animate-bounce">🔥</span>
                              <div class="flex-1">
                                <div class="font-medium mb-1">En uzun başarı serin</div>
                                <div class="flex items-baseline space-x-2">
                                  <span :class="[
                                    'text-3xl sm:text-4xl md:text-5xl font-bold transition-all duration-300',
                                    streakHighlight ? 'text-yellow-400 scale-110 transform rotate-2' : 'text-sky-500 scale-100 rotate-0'
                                  ]">
                                    {{ animatedStreak }}
                                  </span>
                                  <span class="text-white/60">gün</span>
                                </div>
                              </div>
                              <div :class="[
                                'transition-transform duration-500',
                                streakHighlight ? 'scale-125' : 'scale-100'
                              ]">
                                🏆
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
                        :totalAnswers="totalQuestions" :minutesSpent="totalStudyHours * 60" :userName="name"
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
              class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full sm:text-base font-semibold transition-all duration-300 bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 flex items-center">
              <RefreshCwIcon class="w-3 h-3 sm:w-3 sm:h-3" />
              <span class="hidden sm:inline sm:ml-1">Yeniden Başlat</span>
            </button>

            <button v-if="currentSlide === totalSlides - 1" @click="handleShare"
              class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full sm:text-base font-semibold transition-all duration-300 bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 flex items-center">
              <Share2Icon class="w-3 h-3 sm:w-3 sm:h-3" />
              <span class="hidden sm:inline sm:ml-1">İstatistikleri Paylaş</span>
            </button>

            <button @click="prevSlide"
              class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full sm:text-base font-semibold transition-all duration-300 bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20">
              Geri
            </button>

            <button @click="nextSlide"
              class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full sm:text-base font-semibold transition-all duration-300 bg-white text-[#1A93BD] hover:bg-gray-200">
              {{ buttonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from "vue";
import Celebration from "@/components/Celebration.vue";
import WrappedStatsCard from "@/components/WrappedStatsCard.vue";
import domtoimage from 'dom-to-image';
import { RefreshCwIcon, Share2Icon } from "lucide-vue-next";
import CircularProgress from '@/components/CircularProgress.vue';

const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(["close"]);

const currentSlide = ref(0);
const totalSlides = 8;
const transitionName = ref("slide-right");
const showInitialSubtext = ref(false);
const longestStreak = ref(10);
const name = ref("Miralp");

const totalQuestions = 1384;
const percentageAboveAverage = 35;
const topSubjects = ["Matematik", "Fizik", "Tarih", "Kimya", "Biyoloji"];
const topSubject = "Matematik";
const topTopics = [
  { name: "Sayılar", subject: "Matematik" },
  { name: "Sıvıların Kaldırma Kuvveti", subject: "Fizik" },
  { name: "Bilimsel Metotlar", subject: "Tarih" },
  { name: "Organik Kimya", subject: "Kimya" },
  { name: "Genetik", subject: "Biyoloji" },
];
const totalStudyHours = 720;
const moviesWatched = Math.floor(totalStudyHours / 2);

const buttonText = computed(() =>
  currentSlide.value === totalSlides - 1 ? "Son" : "İleri"
);

const visibleSubjects = ref([]);
const visibleTopics = ref([]);
const visibleAchievements = ref([]);
const highlightedBadgeId = ref(null);

const countedQuestions = ref(0);
const percentageOpacity = ref(0);
const subjectsOpacity = ref(0);
const topSubjectRevealed = ref(false);
const showCelebration = ref(false);
const subjectTimeouts = ref([]);
const showTotalQuestions = ref(false);
const showOutstandingCourse = ref(false);
const showTopics = ref(false);
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

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const nextSlide = () => {
  if (currentSlide.value >= totalSlides - 1) return;

  // Önce mevcut slaytı temizle
  clearAllTimeouts();
  switch (currentSlide.value) {
    case 1: resetSlide1(); break;
    case 2: resetSlide2(); break;
    case 3: resetSlide3(); break;
    case 4: resetSlide4(); break;
    case 5: resetSlide5(); break;
    case 6: resetSlide6(); break;
  }

  transitionName.value = "slide-left";
  currentSlide.value++;
};

const prevSlide = () => {
  if (currentSlide.value <= 0) return;

  // Önce mevcut slaytı temizle
  clearAllTimeouts();
  switch (currentSlide.value) {
    case 1: resetSlide1(); break;
    case 2: resetSlide2(); break;
    case 3: resetSlide3(); break;
    case 4: resetSlide4(); break;
    case 5: resetSlide5(); break;
    case 6: resetSlide6(); break;
  }

  transitionName.value = "slide-right";
  currentSlide.value--;
};

const resetSlide1 = () => {
  showInitialSubtext.value = false;
  showTotalQuestions.value = false;
  percentageOpacity.value = 0;
  countedQuestions.value = 0;
};

const resetSlide2 = () => {
  subjectsOpacity.value = 0;
  visibleSubjects.value = [];
  subjectTimeouts.value.forEach(timeout => clearTimeout(timeout));
  subjectTimeouts.value = [];
};

const resetSlide3 = () => {
  showOutstandingCourse.value = false;
  topSubjectRevealed.value = false;
};

const resetSlide4 = () => {
  showTopics.value = false;
  visibleTopics.value = [];
};

const resetSlide5 = () => {
  studyTimePhase.value = 'teaser';
};

const resetSlide6 = () => {
  achievementPhase.value = 'initial';
  visibleAchievements.value = [];
  showCelebration.value = false;
};

// Basit debounce fonksiyonu
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

// Slide içeriğini başlatma fonksiyonu
const initializeSlide = (slideNumber) => {
  // Önce tüm timeout'ları temizle
  clearAllTimeouts();

  let shuffledSubjects;

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
        // Önce "Çok sayıda farklı derste uzmanlaştın" mesajını göster
        subjectsOpacity.value = 1;
        
        // 2 saniye sonra dersleri sırayla göstermeye başla
        safeSetTimeout(() => {
          shuffledSubjects = shuffleArray(topSubjects);
          shuffledSubjects.forEach((subject, index) => {
            safeSetTimeout(() => {
              visibleSubjects.value.push(subject);
            }, index * 1000);
          });
        }, 2000);
      }, 1000);
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
        showTopics.value = true;
        topTopics.forEach((topic, index) => {
          safeSetTimeout(() => {
            visibleTopics.value.push(topic);
          }, index * 200);
        });
      }, 1000);
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
          }, 3000);
        }, 3000);
      }, 2000);
      break;

    case 6:
      resetSlide6();
      safeSetTimeout(() => {
        achievementPhase.value = 'teaser';
        safeSetTimeout(() => {
          achievementPhase.value = 'list';
          
          const badges = calculateBadges(totalQuestions, 80, totalStudyHours);
          
          badges.forEach((badge, index) => {
            safeSetTimeout(() => {
              visibleAchievements.value.push({
                ...badge,
                isHighlighted: true
              });
              
              highlightedBadgeId.value = badge.id;
              
              safeSetTimeout(() => {
                highlightedBadgeId.value = null;
              }, 1000);

              if (index === badges.length - 1) {
                safeSetTimeout(() => {
                  achievementPhase.value = 'conclusion';
                  safeSetTimeout(() => {
                    showCelebration.value = true;
                  }, 1000);
                }, 2000);
              }
            }, index * 800);
          });
        }, 2000);
      }, 1000);
      break;
  }
};

// Debounced slayt başlatma fonksiyonu
const debouncedInitializeSlide = debounce((newSlide) => {
  initializeSlide(newSlide);
}, 300);

// Watch fonksiyonunu güncelle
watch(currentSlide, (newSlide) => {
  debouncedInitializeSlide(newSlide);
});

// Component unmount olduğunda timeout'ları temizle
onUnmounted(() => {
  clearAllTimeouts();
});

const revealTopSubject = () => {
  topSubjectRevealed.value = true;
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

const handleShare = async () => {
  try {
    const card = document.querySelector('.wrapped-stats-card');

    const scale = 4;
    await document.fonts.ready;

    const dataUrl = await domtoimage.toPng(card, {
      quality: 1,
      height: card.offsetHeight * scale,
      width: card.offsetWidth * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        margin: '0',
        padding: '0'
      },
      bgcolor: 'rgba(0,0,0,0)',
      imagePlaceholder: undefined,
      cacheBust: true,
      filter: (node) => {
        if (node.tagName === 'IMG') {
          return true;
        }
        if (node.nodeType === 1) {
          return node.classList?.contains('wrapped-stats-card') ||
            (node.closest && node.closest('.wrapped-stats-card'));
        }
        return true;
      },
      skipFonts: true,
    });

    if (navigator.canShare && navigator.canShare({ files: [new File([], 'test.png')] })) {
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      const file = new File([blob], "2024-degerlendirmesi.png", {
        type: "image/png",
      });

      try {
        await navigator.share({
          files: [file],
          title: "2024 Yılı Değerlendirmesi",
          text: "2024 yılındaki öğrenme istatistiklerime göz atın!",
        });
      } catch (shareError) {
        console.error("Paylaşım hatası:", shareError);
        downloadImage(dataUrl);
      }
    } else {
      downloadImage(dataUrl);
    }
  } catch (error) {
    console.error("Görüntü oluşturma hatası:", error);
  }
};

const downloadImage = (dataUrl) => {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "2024-degerlendirmesi.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

watch(
  () => props.show,
  (newShow) => {
    if (newShow) {
      currentSlide.value = 0;
      resetAllStates();
    }
  }
);

const statsCardRef = ref(null);

// Başarıları hesaplama fonksiyonu (WrappedStatsCard'dan alındı)
const calculateBadges = (totalQuestions, successRate, hoursSpent) => {
  const badges = [];

  // Soru Çözüm Rozetleri
  if (totalQuestions >= 1500) {
    badges.push({ emoji: '📚', title: 'Soru Çözüm Ustası (1500+ Soru)' });
  } else if (totalQuestions >= 1000) {
    badges.push({ emoji: '📖', title: 'Soru Çözüm Uzmanı (1000+ Soru)' });
  } else if (totalQuestions >= 500) {
    badges.push({ emoji: '📝', title: 'Soru Çözüm Acemisi (500+ Soru)' });
  }

  // Başarı Yüzdesi Rozetleri
  if (successRate >= 100) {
    badges.push({ emoji: '🎯', title: 'Tam İsabet (%100)' });
  } else if (successRate >= 85) {
    badges.push({ emoji: '🎪', title: 'Başarı Yıldızı (%85+)' });
  } else if (successRate >= 70) {
    badges.push({ emoji: '✨', title: 'Yükselen Yıldız (%70+)' });
  }

  // Çalışma Saati Rozetleri
  if (hoursSpent >= 300) {
    badges.push({ emoji: '⏰', title: 'Azimli Şampiyon (300+ Saat)' });
  } else if (hoursSpent >= 200) {
    badges.push({ emoji: '⌚', title: 'Çalışkan Arı (200+ Saat)' });
  } else if (hoursSpent >= 100) {
    badges.push({ emoji: '⏱️', title: 'Öğrenme Aşığı (100+ Saat)' });
  }

  return badges;
};

// Ref'leri ekleyelim
const animatedHours = ref(0);
const animatedMovieCount = ref(0);
const animatedStreak = ref(0);
const streakHighlight = ref(false);

// Animasyon fonksiyonu
const animateStudyHours = () => {
  let start = 0;
  const end = totalStudyHours;
  const duration = 2000; // 2 saniye
  const step = end / (duration / 16); // 60 FPS'e yakın

  const animate = () => {
    start += step;
    if (start >= end) {
      animatedHours.value = Math.round(end);
      return;
    }
    animatedHours.value = Math.round(start);
    requestAnimationFrame(animate);
  };

  animate();
};

// Film sayısı animasyon fonksiyonu
const animateMovieCount = () => {
  const end = moviesWatched;
  const duration = 1500; // 1.5 saniye
  const easeOutQuart = t => 1 - (--t) * t * t * t; // Easing fonksiyonu

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


// startSlide1Animations fonksiyonunu burada tutuyoruz
const startSlide1Animations = () => {
  const duration = 2000;
  const startTime = Date.now();
  
  const animate = () => {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    
    if (elapsed >= duration) {
      countedQuestions.value = totalQuestions;
      percentageOpacity.value = 1;
      return;
    }

    const easeOutQuart = t => 1 - (--t) * t * t * t;
    const progress = easeOutQuart(elapsed / duration);
    
    countedQuestions.value = Math.round(progress * totalQuestions);
    percentageOpacity.value = progress;
    
    requestAnimationFrame(animate);
  };
  
  animate();
};

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
</style>
