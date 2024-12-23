<template>
  <Transition name="modal">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black opacity-50" @click="closeModal"></div>
      <div class="relative bg-gradient-to-tr to-black via-black from-red-700 w-full h-full overflow-hidden">
        <div class="emoji-pattern"></div>
        <!-- Logo Container -->
        <a href="https://tamokul.com" target="_blank" class="absolute bottom-4 right-4 w-16 sm:w-24 md:w-24 h-16 sm:h-24 md:h-24 z-[9999] group hover:scale-110 duration-300 transition-all hover:drop-shadow-[0_0_0.75rem_#0794bc]">
          <img :src="LogoBack" alt="Tam Okul AI Logo" class="w-full h-full animate-spin-slow absolute inset-0" crossorigin="anonymous" loading="eager" />
          <img :src="LogoFront" alt="Tam Okul AI Logo" class="w-1/2 h-1/2 absolute top-1/4 left-1/4" crossorigin="anonymous" loading="eager" />
        </a>
        <!-- Progress Bar -->
        <div
          class="absolute top-0 sm:top-4 left-1/2 transform -translate-x-1/2 w-full h-2 bg-white/25 max-w-sm sm:max-w-3xl rounded-full">
          <div class="h-full bg-red-600 transition-all duration-500 rounded-full"
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
                <div>
                  <h2 v-if="currentSlide === 0"
                    class="text-3xl sm:text-5xl md:text-6xl font-bold text-center mb-6 sm:mb-12">
                    <span class="text-red-600">{{ new Date().getFullYear() }}</span> Öğrenme Yolculuğun
                  </h2>
                  <div v-if="currentSlide === 0" class="text-center">
                    <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8">
                     hazır, peki sen görmeye hazır mısın
                      <span class="font-bold text-red-600">{{ name }}</span>?
                    </h3>
                    <button @click="nextSlide"
                      class="text-lg sm:text-xl md:text-2xl px-6 py-3 rounded-full bg-white text-red-600 font-semibold animate-pulse hover:animate-none">
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
                          <div class="text-5xl sm:text-7xl md:text-9xl font-bold text-red-600">
                            {{ animatedQuestionCount }}
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
                            <CircularProgress :value="total_questions_solved_percentage" />
                          </div>
                          <p class="text-lg sm:text-xl md:text-2xl">
                            daha başarılıydın!
                          </p>
                        </div>
                      </Transition>
                    </div>
                  </div>

                  <!-- Slide 2: Top Courses Combined -->
                  <div v-if="currentSlide === 2">
                    <div class="text-center mb-8">
                      <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8">
                        Çok sayıda farklı derste uzmanlaştın
                      </h3>
                      <p class="text-lg sm:text-xl md:text-2xl mb-8">
                        <span class="font-bold text-red-600">En iyi 5'ini</span>
                        görelim! &#129300;
                      </p>
                    </div>

                    <Transition name="fade">
                      <div v-show="coursesOpacity > 0" :style="{ opacity: coursesOpacity }"
                        class="h-64 sm:h-80 overflow-hidden">
                        <TransitionGroup name="list" tag="ul" class="space-y-2 sm:space-y-4">
                          <li v-for="(course) in visibleCourses" :key="course"
                            class="flex items-center text-xl sm:text-2xl md:text-3xl">
                            <span>{{ course }}</span>
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
                          Ama bir derste o kadar iyiydin ki 
                          <br>
                          <span class="italic text-red-600">diğerlerinden öne çıktı... &#128077;</span>
                        </h3>
                      </div>
                      <div v-else key="content" class="space-y-4 sm:space-y-8">
                        <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold">
                          Öne çıkan dersin...
                        </h3>
                        <div v-if="!topCourseRevealed" @click="revealTopCourse"
                          class="cursor-pointer flex flex-col items-center justify-center gap-4 relative mx-auto animate-pulse hover:animate-none">
                          <img :src="FingerPrint" alt="Fingerprint"
                            class="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 transition-all duration-300" />
                          <span
                            class="text-xl sm:text-2xl md:text-3xl transition-all duration-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-nowrap">Açmak
                            için tıkla</span>
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

                  <!-- Slide 4: Top Subjects Combined -->
                  <div v-if="currentSlide === 4">
                    <div class="text-center mb-8">
                      <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8">
                        Öylesine maceracısın ki, konudan konuya atladın &#128521;
                      </h3>
                      <p class="text-lg sm:text-xl md:text-2xl mb-8">
                        &#128170; <span class="font-bold text-red-600">En iyi</span> olduğun konular şunlardı:
                      </p>
                    </div>

                    <Transition name="fade">
                      <div v-show="showSubjects">
                        <div class="h-64 sm:h-80 overflow-hidden">
                          <TransitionGroup enter-active-class="transition-all duration-500 ease-out"
                            enter-from-class="opacity-0 scale-95 -translate-x-4"
                            enter-to-class="opacity-100 scale-100 translate-x-0"
                            move-class="transition-transform duration-500" tag="ul" class="space-y-2 sm:space-y-4">
                            <li v-for="(subject, index) in visibleSubjects" :key="subject.name"
                              class="flex items-center text-lg sm:text-xl md:text-2xl transform"
                              :style="{ transitionDelay: `${index * 100}ms` }">
                              <span class="mr-2 sm:mr-4 font-bold opacity-50">{{ index + 1 }}.</span>
                              <div class="flex-1">
                                <span class="font-medium">{{ subject.name }}</span>
                                <span class="text-sm ml-2 opacity-75">{{ subject.course }}</span>
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
                        <div v-if="studyTimePhase !== 'teaser'" class="space-y-4 sm:flex-1">
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
                          class="space-y-4 sm:flex-1 mt-8 sm:mt-0">
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
                                  badge.isHighlighted ? 'text-yellow-600' : 'text-white'
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
              class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full sm:text-base font-semibold transition-all duration-300 bg-white text-red-600 hover:bg-gray-200">
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
import html2canvas from 'html2canvas';
import { RefreshCwIcon, Share2Icon } from "lucide-vue-next";
import CircularProgress from '@/components/CircularProgress.vue';
import FingerPrint from '@/assets/fingerprint.svg';
import LogoBack from '@/assets/tam-okul-ai-logo-back.svg';
import LogoFront from '@/assets/tam-okul-ai-logo-front.svg';
import wrappedData from '@/data/wrapped.json';

const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(["close"]);

const currentSlide = ref(0);
const totalSlides = 8;
const transitionName = ref("slide-right");
const showInitialSubtext = ref(false);
const longestStreak = ref(10);
const name = computed(() => wrappedData.data.user.name);

const total_questions_solved = computed(() => 
  wrappedData?.data?.user?.student?.learning_journey?.total_questions_solved ?? 0
);
const total_questions_solved_percentage = computed(() => 
  wrappedData?.data?.user?.student?.learning_journey?.total_questions_solved_percentage ?? 0
);

const topCourses = computed(() => {
  const courses = wrappedData?.data?.user?.student?.learning_journey?.best_courses;
  return Array.isArray(courses) ? courses : [];
});
const topCourse = computed(() => 
  wrappedData?.data?.user?.student?.learning_journey?.best_course ?? '—'
);
const bestSubjects = computed(() => {
  const subjects = wrappedData?.data?.user?.student?.learning_journey?.best_subjects ?? [];
  return subjects.map(subjectObj => {
    const [course, name] = Object.entries(subjectObj)[0];
    return {
      course,
      name
    };
  });
});

const totalStudyHours = computed(() => 
  wrappedData?.data?.user?.student?.learning_journey?.total_hours_spent ?? 0
);

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
const courseTimeouts = ref([]);
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

const shuffleArray = (array) => {
  if (!Array.isArray(array)) return [];
  
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const nextSlide = () => {
  if (currentSlide.value >= totalSlides - 1) return;

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
  showTotalQuestions.value = false;
  percentageOpacity.value = 0;
  animatedQuestionCount.value = 0;
};

const resetSlide2 = () => {
  coursesOpacity.value = 0;
  visibleCourses.value = [];
  courseTimeouts.value.forEach(timeout => clearTimeout(timeout));
  courseTimeouts.value = [];
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

const initializeSlide = (slideNumber) => {
  clearAllTimeouts();

  let shuffledCourses;

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

        safeSetTimeout(() => {
          shuffledCourses = shuffleArray(topCourses.value);
          shuffledCourses.forEach((course, index) => {
            safeSetTimeout(() => {
              visibleCourses.value.push(course);
            }, index * 1000);
          });
        }, 1000);
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
        showSubjects.value = true;
        bestSubjects.value.forEach((subject, index) => {
          safeSetTimeout(() => {
            visibleSubjects.value.push(subject);
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
      }, 500);
      break;

    case 6:
      resetSlide6();
      safeSetTimeout(() => {
        achievementPhase.value = 'teaser';
        safeSetTimeout(() => {
          achievementPhase.value = 'list';

          const badges = calculateBadges(total_questions_solved.value, 80, totalStudyHours.value);

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

const debouncedInitializeSlide = debounce((newSlide) => {
  initializeSlide(newSlide);
});

watch(currentSlide, (newSlide) => {
  debouncedInitializeSlide(newSlide);
});

onUnmounted(() => {
  clearAllTimeouts();
});

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

const handleShare = async () => {
  try {
    const card = document.querySelector('.wrapped-stats-card');
    
    const elements = card.querySelectorAll('*');
    const originalStyles = new Map();
    
    elements.forEach(el => {
      originalStyles.set(el, el.style.cssText);
      el.style.transition = 'none';
      el.style.animation = 'none';
    });

    await document.fonts.ready;
    await new Promise(resolve => setTimeout(resolve, 500));

    const canvas = await html2canvas(card, {
      scale: 4,
      backgroundColor: null,
      logging: false,
      useCORS: true,
      allowTaint: true
    });

    elements.forEach(el => {
      el.style.cssText = originalStyles.get(el);
    });

    const dataUrl = canvas.toDataURL('image/png');

    if (navigator.canShare && navigator.canShare({ files: [new File([], 'test.png')] })) {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], "2023-degerlendirmesi.png", {
        type: "image/png",
      });
      
      try {
        await navigator.share({
          files: [file],
          title: "2023 Yılı Değerlendirmesi",
          text: "2023 yılındaki öğrenme istatistiklerime göz atın!",
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
  link.download = "2023-degerlendirmesi.png";
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

const calculateBadges = (totalQuestions, successRate, hoursSpent) => {
  const badges = [];
  let id = 1;

  // Soru Çözüm Rozetleri
  if (totalQuestions >= 1500) {
    badges.push({ id: id++, emoji: '📚', title: 'Soru Çözüm Ustası (1500+ Soru)' });
  } else if (totalQuestions >= 1000) {
    badges.push({ id: id++, emoji: '📖', title: 'Soru Çözüm Uzmanı (1000+ Soru)' });
  } else if (totalQuestions >= 500) {
    badges.push({ id: id++, emoji: '📝', title: 'Soru Çözüm Acemisi (500+ Soru)' });
  }

  // Başarı Yüzdesi Rozetleri
  if (successRate >= 100) {
    badges.push({ id: id++, emoji: '🎯', title: 'Tam İsabet (%100 Başarı)' });
  } else if (successRate >= 85) {
    badges.push({ id: id++, emoji: '🎪', title: 'Başarı Yıldızı (%85+ Başarı)' });
  } else if (successRate >= 70) {
    badges.push({ id: id++, emoji: '✨', title: 'Yükselen Yıldız (%70+ Başarı)' });
  }

  // Çalışma Saati Rozetleri
  if (hoursSpent >= 300) {
    badges.push({ id: id++, emoji: '⏰', title: 'Azimli Şampiyon (300+ Saat)' });
  } else if (hoursSpent >= 200) {
    badges.push({ id: id++, emoji: '⌚', title: 'Çalışkan Arı (200+ Saat)' });
  } else if (hoursSpent >= 100) {
    badges.push({ id: id++, emoji: '⏱️', title: 'Öğrenme Aşığı (100+ Saat)' });
  }

  return badges;
};

const animatedHours = ref(0);
const animatedMovieCount = ref(0);

const animateStudyHours = () => {
  let start = 0;
  const end = totalStudyHours.value;
  const duration = 2000; 
  const step = end / (duration / 16);

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

const animateMovieCount = () => {
  const end = moviesWatched.value;
  const duration = 1500;
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
  const duration = 3000;
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
