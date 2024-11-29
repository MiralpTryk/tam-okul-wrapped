<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        class="absolute inset-0 bg-black opacity-50"
        @click="closeModal"
      ></div>
      <div
        class="relative bg-gradient-to-br from-slate-900 to-violet-600 w-full h-full overflow-hidden"
      >
        <div class="emoji-pattern"></div>
        <button
          @click="closeModal"
          class="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-gray-200 z-50 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-xl sm:text-3xl"
        >
          &times;
        </button>

        <!-- Main Content Container -->
        <div class="relative h-full flex flex-col">
          <!-- Slides Container -->
          <div class="flex-1 overflow-hidden">
            <Transition :name="transitionName">
              <div
                :key="currentSlide"
                class="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8 text-white"
              >
                <!-- Slide Content -->
                <div class="w-full max-w-6xl mx-auto">
                  <h2
                    v-if="currentSlide === 0"
                    class="text-3xl sm:text-5xl md:text-6xl font-bold text-center mb-6 sm:mb-12"
                  >
                    Öğrenme Yolculuğun {{ new Date().getFullYear() }}
                  </h2>

                  <!-- Slide 1: Intro -->
                  <div v-if="currentSlide === 0" class="text-center">
                    <h3
                      class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8"
                    >
                      Öğrenme Yolculuğunu Görmeye Hazır mısın
                      <span class="font-bold">{{ name }}</span
                      >? 🧠
                    </h3>
                    <p class="text-lg sm:text-xl md:text-2xl">
                      Hazırsan başlayalım!
                    </p>
                  </div>

                  <!-- Slide 2: Total Questions -->
                  <div v-if="currentSlide === 1" class="text-center">
                    <h3
                      class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8"
                    >
                      Bu yıl tam tamına
                    </h3>
                    <div
                      class="text-5xl sm:text-7xl md:text-9xl font-bold mb-3 sm:mb-6 text-orange-500"
                    >
                      {{ countedQuestions }}
                    </div>
                    <p class="text-lg sm:text-xl md:text-2xl">soru çözdün!</p>
                    <Celebration v-if="showCelebration" />
                  </div>

                  <!-- Slide 3: Percentage Above Average -->
                  <div v-if="currentSlide === 2" class="text-center">
                    <h3
                      class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8"
                    >
                      Ve bu kadar değil... Ortalama bir öğrenciden
                    </h3>
                    <Transition name="fade">
                      <div
                        v-show="percentageOpacity > 0"
                        :style="{ opacity: percentageOpacity }"
                      >
                        <div
                          class="text-5xl sm:text-7xl md:text-9xl font-bold mb-3 sm:mb-6 text-orange-500"
                        >
                          {{ percentageAboveAverage }}%
                        </div>
                        <p class="text-lg sm:text-xl md:text-2xl">
                          daha fazla!
                        </p>
                      </div>
                    </Transition>
                  </div>

                  <!-- Slide 4: Top Subjects Teaser -->
                  <div v-if="currentSlide === 3" class="text-center">
                    <h3
                      class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8"
                    >
                      Çok sayıda farklı derste uzmanlaştın
                    </h3>
                    <p class="text-lg sm:text-xl md:text-2xl">
                      <span class="font-bold text-orange-500"
                        >En iyi 5'ini</span
                      >
                      tahmin edebilir misin?
                    </p>
                  </div>

                  <!-- Slide 5: Top Subjects -->
                  <div v-if="currentSlide === 4">
                    <h3
                      class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8 text-center"
                    >
                      En iyi olduğun dersler şunlardı:
                    </h3>
                    <Transition name="fade">
                      <div
                        v-show="subjectsOpacity > 0"
                        :style="{ opacity: subjectsOpacity }"
                        class="h-64 sm:h-80 overflow-hidden"
                      >
                        <TransitionGroup
                          name="list"
                          tag="ul"
                          class="space-y-2 sm:space-y-4"
                        >
                          <li
                            v-for="(subject, index) in visibleSubjects"
                            :key="subject"
                            class="flex items-center text-xl sm:text-2xl md:text-3xl"
                          >
                            <span class="mr-2 sm:mr-4 font-bold"
                              >{{ index + 1 }}.</span
                            >
                            <span>{{ subject }}</span>
                          </li>
                        </TransitionGroup>
                      </div>
                    </Transition>
                  </div>

                  <!-- Slide 6: Outstanding Subject Teaser -->
                  <div v-if="currentSlide === 5" class="text-center">
                    <h3
                      class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8"
                    >
                      Ama bir ders
                      <span class="italic">diğerlerinden öne çıktı...</span>
                    </h3>
                    <p class="text-lg sm:text-xl md:text-2xl">
                      Hangisi olduğunu tahmin edebilir misin?
                    </p>
                  </div>

                  <!-- Slide 7: Outstanding Subject -->
                  <div
                    v-if="currentSlide === 6"
                    class="text-center space-y-4 sm:space-y-8"
                  >
                    <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold">
                      Öne çıkan dersin...
                    </h3>
                    <div
                      v-if="!topSubjectRevealed"
                      @click="revealTopSubject"
                      class="cursor-pointer"
                    >
                      <div
                        class="text-4xl sm:text-5xl md:text-7xl font-bold bg-white/20 backdrop-blur-sm rounded-lg p-4"
                      >
                        Açmak için tıkla
                      </div>
                    </div>
                    <Transition name="fade">
                      <div v-if="topSubjectRevealed">
                        <div class="text-4xl sm:text-5xl md:text-7xl font-bold">
                          {{ topSubject }}
                        </div>
                        <p class="text-xl sm:text-2xl md:text-3xl mt-4">
                          Sen bir {{ topSubject }} uzmanısın!
                        </p>
                      </div>
                    </Transition>
                  </div>

                  <!-- Slide 8: Top Topics Teaser -->
                  <div v-if="currentSlide === 7" class="text-center">
                    <h3
                      class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8"
                    >
                      Çeşitli konuları keşfettin
                    </h3>
                    <p class="text-lg sm:text-xl md:text-2xl">
                      En iyi 5'ine bakalım!
                    </p>
                  </div>

                  <!-- Slide 9: Top Topics -->
                  <div v-if="currentSlide === 8">
                    <h3
                      class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8 text-center"
                    >
                      En iyi olduğun konular şunlardı:
                    </h3>
                    <div class="h-64 sm:h-80 overflow-hidden">
                      <TransitionGroup
                        name="list"
                        tag="ul"
                        class="space-y-2 sm:space-y-4"
                      >
                        <li
                          v-for="(topic, index) in visibleTopics"
                          :key="topic.name"
                          class="flex items-center text-lg sm:text-xl md:text-2xl"
                        >
                          <span class="mr-2 sm:mr-4 font-bold"
                            >{{ index + 1 }}.</span
                          >
                          <span
                            >{{ topic.name }}
                            <span class="text-white/80"
                              >({{ topic.subject }})</span
                            ></span
                          >
                        </li>
                      </TransitionGroup>
                    </div>
                  </div>

                  <!-- Slide 10: Study Time Teaser -->
                  <div v-if="currentSlide === 9" class="text-center">
                    <h3
                      class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8"
                    >
                      Öğrenmeye çok zaman ayırdın
                    </h3>
                    <p class="text-lg sm:text-xl md:text-2xl">
                      Kaç saat olduğunu tahmin edebilir misin?
                    </p>
                  </div>

                  <!-- Slide 11: Study Time -->
                  <div v-if="currentSlide === 10" class="text-center">
                    <h3
                      class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8"
                    >
                      Toplam öğrenme süren...
                    </h3>
                    <div
                      class="text-5xl sm:text-7xl md:text-9xl font-bold mb-3 sm:mb-6"
                    >
                      {{ totalStudyHours }}
                    </div>
                    <p class="text-lg sm:text-xl md:text-2xl">saat!</p>
                  </div>

                  <!-- Slide 12: Study Time Comparison -->
                  <div v-if="currentSlide === 11" class="text-center">
                    <h3
                      class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8"
                    >
                      Bu, yaklaşık olarak
                    </h3>
                    <div
                      class="text-5xl sm:text-7xl md:text-9xl font-bold mb-3 sm:mb-6"
                    >
                      {{ moviesWatched }}
                    </div>
                    <p class="text-lg sm:text-xl md:text-2xl">
                      saat film izlemek demektir!
                    </p>
                  </div>

                  <!-- Slide 13: Achievements Teaser -->
                  <div v-if="currentSlide === 12" class="text-center">
                    <h3
                      class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8"
                    >
                      Çok şey başardın
                    </h3>
                    <p class="text-lg sm:text-xl md:text-2xl">
                      Başarılarını kutlayalım!
                    </p>
                  </div>

                  <!-- Slide 14: Achievements -->
                  <div v-if="currentSlide === 13">
                    <h3
                      class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8 text-center"
                    >
                      Başarıların:
                    </h3>
                    <div class="h-64 sm:h-80 overflow-hidden">
                      <TransitionGroup
                        name="list"
                        tag="ul"
                        class="space-y-2 sm:space-y-4"
                      >
                        <li
                          v-for="(achievement, index) in visibleAchievements"
                          :key="achievement"
                          class="flex items-center text-lg sm:text-xl md:text-2xl"
                        >
                          <span
                            class="mr-2 sm:mr-4 text-2xl sm:text-3xl md:text-4xl"
                            >{{ achievementEmojis[index] }}</span
                          >
                          <span>{{ achievement }}</span>
                        </li>
                      </TransitionGroup>
                    </div>
                  </div>

                  <!-- Slide 15: Conclusion -->
                  <div v-if="currentSlide === 14" class="text-center">
                    <h3
                      class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-8"
                    >
                      Harika bir öğrenme yılı için tebrikler!
                    </h3>
                    <p class="text-lg sm:text-xl md:text-2xl">
                      2024'te de harika işler yapmaya devam et!
                    </p>
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Navigation Buttons -->
          <div
            class="relative z-50 p-4 sm:p-8 flex justify-center gap-4 sm:gap-6 bg-gradient-to-t from-black/20"
          >
            <button
              @click="rewindPresentation"
              v-if="currentSlide === totalSlides - 1"
              class="px-4 sm:px-8 py-2 sm:py-4 rounded-full text-base sm:text-xl font-semibold transition-all duration-300 active:scale-95 bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 flex items-center"
            >
              <RefreshCwIcon class="w-5 h-5 mr-2" />
              Yeniden Başlat
            </button>
            <button
              @click="prevSlide"
              :disabled="currentSlide === 0"
              class="px-4 sm:px-8 py-2 sm:py-4 rounded-full text-base sm:text-xl font-semibold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20"
            >
              Geri
            </button>
            <button
              @click="nextSlide"
              class="px-4 sm:px-8 py-2 sm:py-4 rounded-full text-base sm:text-xl font-semibold transition-all duration-300 active:scale-95 bg-white text-purple-600 hover:bg-gray-200"
            >
              {{ buttonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import Celebration from "@/components/Celebration.vue";
import { RefreshCwIcon } from "lucide-vue-next";

const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(["close"]);

const currentSlide = ref(0);
const totalSlides = 15;
const transitionName = ref("slide-right");

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
const achievements = [
  "50 dersi tamamladın",
  "100 günlük çalışma döngüsünü başardın",
  "Matematik Büyücüsü ödülünü kazandın",
  "Fizik quiz'de %5'i geçtin",
  "10 öğrenciyi mentorluyordun",
];
const achievementEmojis = ["🏆", "🔥", "🧙‍♂️", "🚀", "🤝"];

const buttonText = computed(() =>
  currentSlide.value === totalSlides - 1 ? "Son" : "İleri"
);

const visibleSubjects = ref([]);
const visibleTopics = ref([]);
const visibleAchievements = ref([]);
const showSlide6Content = ref(false);

const countedQuestions = ref(0);
const countingInterval = ref(null);
const percentageOpacity = ref(0);
const subjectsOpacity = ref(0);
const topSubjectRevealed = ref(false);
const showCelebration = ref(false);

const startCounting = () => {
  countedQuestions.value = 0;
  showCelebration.value = false;
  clearInterval(countingInterval.value);
  countingInterval.value = setInterval(() => {
    if (countedQuestions.value < totalQuestions) {
      countedQuestions.value += Math.ceil(
        (totalQuestions - countedQuestions.value) / 200
      );
      if (countedQuestions.value >= totalQuestions) {
        countedQuestions.value = totalQuestions;
        showCelebration.value = true;
        clearInterval(countingInterval.value);
      }
    }
  }, 10);
};

const revealPercentage = () => {
  percentageOpacity.value = 0;
  const interval = setInterval(() => {
    if (percentageOpacity.value < 1) {
      percentageOpacity.value += 0.1;
    } else {
      clearInterval(interval);
    }
  }, 100);
};

const revealSubjects = () => {
  subjectsOpacity.value = 0;
  const interval = setInterval(() => {
    if (subjectsOpacity.value < 1) {
      subjectsOpacity.value += 0.1;
    } else {
      clearInterval(interval);
    }
  }, 100);
};

watch(currentSlide, (newSlide) => {
  if (newSlide === 1) {
    startCounting();
  } else if (newSlide === 2) {
    revealPercentage();
  } else if (newSlide === 4) {
    revealSubjects();
    visibleSubjects.value = [];
    topSubjects.forEach((subject, index) => {
      setTimeout(() => {
        visibleSubjects.value.push(subject);
      }, index * 1000);
    });
  } else if (newSlide === 6) {
    showSlide6Content.value = false;
    topSubjectRevealed.value = false;
  } else if (newSlide === 8) {
    visibleTopics.value = [];
    topTopics.forEach((topic, index) => {
      setTimeout(() => {
        visibleTopics.value.push(topic);
      }, index * 500);
    });
  } else if (newSlide === 13) {
    visibleAchievements.value = [];
    achievements.forEach((achievement, index) => {
      setTimeout(() => {
        visibleAchievements.value.push(achievement);
      }, index * 500);
    });
  }
});

const revealTopSubject = () => {
  topSubjectRevealed.value = true;
};

const nextSlide = () => {
  if (currentSlide.value < totalSlides - 1) {
    transitionName.value = "slide-left";
    currentSlide.value++;
  } else {
    closeModal();
  }
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    transitionName.value = "slide-right";
    currentSlide.value--;
  }
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
  visibleSubjects.value = [];
  visibleTopics.value = [];
  visibleAchievements.value = [];
  showSlide6Content.value = false;
  countedQuestions.value = 0;
  percentageOpacity.value = 0;
  subjectsOpacity.value = 0;
  topSubjectRevealed.value = false;
  showCelebration.value = false;
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
  opacity: 0.3;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 100 100'%3E%3Ctext x='50%25' y='50%25' font-size='20' text-anchor='middle' dominant-baseline='middle' fill='white'%3E📚%3C/text%3E%3Ctext x='25%25' y='25%25' font-size='20' text-anchor='middle' dominant-baseline='middle' fill='white'%3E🎓%3C/text%3E%3Ctext x='75%25' y='25%25' font-size='20' text-anchor='middle' dominant-baseline='middle' fill='white'%3E✏️%3C/text%3E%3Ctext x='25%25' y='75%25' font-size='20' text-anchor='middle' dominant-baseline='middle' fill='white'%3E🧠%3C/text%3E%3Ctext x='75%25' y='75%25' font-size='20' text-anchor='middle' dominant-baseline='middle' fill='white'%3E🔬%3C/text%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
}
</style>
