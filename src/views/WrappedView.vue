<template>
  <div class="text-white min-h-screen overflow-x-hidden">
    <AppHeader />

    <!-- Error State -->
    <div v-if="error" class="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="text-center max-w-md">
        <svg class="w-12 h-12 text-red-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2 class="text-xl font-bold mb-2">Bir Hata Oluştu</h2>
        <p class="text-zinc-400 mb-4">{{ error }}</p>
        <button @click="window.location.reload()" 
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
          Tekrar Dene
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <template v-else>
      <!-- Content Modal -->
      <ContentModal :show="showContentModal" @close="closeContentModal">
        <template v-if="selectedLesson">
          <LessonContent v-if="selectedLesson.type === 'lesson'" :lesson="selectedLesson" />
          <MusicContent v-else-if="selectedLesson.type === 'music'" :music="selectedLesson" />
          <QuoteContent v-else-if="selectedLesson.type === 'quote'" :quote="selectedLesson" />
          <BookContent v-else-if="selectedLesson.type === 'book'" :book="selectedLesson" />
          <StoryContent v-else-if="selectedLesson.type === 'story'" :story="selectedLesson" />
        </template>
      </ContentModal>

      <!-- Analysis Modal -->
      <Transition name="modal">
        <div v-if="showAnalysisModal" class="fixed inset-0 z-[60]">
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-0 sm:p-4" @click="closeAnalysisModal">
              <div
                class="max-w-3xl relative transform sm:rounded-2xl bg-zinc-900 p-4 sm:p-6 text-left shadow-xl transition-all overflow-y-auto z-50 sm:max-h-[80vh] md:rounded-2xl sm:m-4 h-screen w-screen m-0 rounded-none sm:h-auto sm:w-auto">
                <div class="absolute top-0 right-0">
                  <button v-if="isMobile" @click="showAnalysisModal = false"
                    class="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-gray-200 z-50 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-xl sm:text-3xl">
                    &times;
                  </button>
                </div>
                <h3 class="text-base sm:text-lg font-medium leading-6 text-white mb-4">
                  {{ selectedCourse }} Dersi Analizi
                </h3>
                <div class="mt-2">
                  <p class="text-xs sm:text-sm text-zinc-300">
                    Tam Okul'da yapılan detaylı analizler sonucunda, öğrenme stilinize ve akademik ihtiyaçlarınıza en
                    uygun içerikler sizin için özel olarak seçildi. Bu içerikler, başarınızı artırmak ve öğrenme
                    sürecinizi desteklemek için özenle hazırlandı.
                  </p>
                </div>
                <table class="table-auto w-full mt-1 mb-1 sm:mt-4 sm:mb-4 overflow-auto">
                  <thead>
                    <tr class="border-b border-zinc-700">
                      <th class="sm:px-4 sm:py-2 px-2 py-1 text-left text-xs sm:text-sm font-medium text-zinc-400">Konu
                      </th>
                      <th class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm font-medium text-zinc-400">Doğru
                      </th>
                      <th class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm font-medium text-zinc-400">
                        Yanlış</th>
                      <th class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm font-medium text-zinc-400">Boş
                      </th>
                      <th class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm font-medium text-zinc-400">Net
                      </th>
                      <th class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm font-medium text-zinc-400">
                        Başarı Oranı</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Çok İyi (>= 80%) -->
                    <template v-if="sortedData.excellent.length > 0">
                      <tr class="bg-green-500/5">
                        <td colspan="6" class="sm:px-4 sm:py-2 px-2 py-1 text-xs sm:text-sm font-medium text-green-500">Çok İyi</td>
                      </tr>
                      <tr v-for="(item, itemIndex) in sortedData.excellent" :key="`excellent-${item.subject}-${itemIndex}`" class="border-b border-zinc-800">
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-xs sm:text-sm text-white">{{ item.subject }}</td>
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm" :class="getColorClass(item)">{{ item.correct ?? '—' }}</td>
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-red-600">{{ item.wrong ?? '—' }}</td>
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-zinc-400">{{ item.empty ?? '—' }}</td>
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-zinc-400">{{ item.net ?? '—' }}</td>
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm">
                          <span v-if="item.successRate != null" class="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">%{{ item.successRate }}</span>
                          <span v-else class="text-zinc-400">—</span>
                        </td>
                      </tr>
                    </template>

                    <!-- Daha İyi Olabilir (50-80%) -->
                    <template v-if="sortedData.good.length > 0">
                      <tr class="bg-yellow-500/5">
                        <td colspan="6" class="sm:px-4 sm:py-2 px-2 py-1 text-xs sm:text-sm font-medium text-yellow-500">Daha İyi Olabilir</td>
                      </tr>
                      <tr v-for="(item, itemIndex) in sortedData.good" :key="`good-${item.subject}-${itemIndex}`" class="border-b border-zinc-800">
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-xs sm:text-sm text-white">{{ item.subject }}</td>
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm" :class="getColorClass(item)">{{ item.correct ?? '—' }}</td>
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-red-600">{{ item.wrong ?? '—' }}</td>
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-zinc-400">{{ item.empty ?? '—' }}</td>
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-zinc-400">{{ item.net ?? '—' }}</td>
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm">
                          <span v-if="item.successRate != null" class="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-500">%{{ item.successRate }}</span>
                          <span v-else class="text-zinc-400">—</span>
                        </td>
                      </tr>
                    </template>

                    <!-- Geliştirilmeli (< 50%) -->
                    <template v-if="sortedData.needsImprovement.length > 0">
                      <tr class="bg-red-600/5">
                        <td colspan="6" class="sm:px-4 sm:py-2 px-2 py-1 text-xs sm:text-sm font-medium text-red-600">Geliştirilmeli</td>
                      </tr>
                      <tr v-for="(item, itemIndex) in sortedData.needsImprovement" :key="`needs-improvement-${item.subject}-${itemIndex}`" class="border-b border-zinc-800">
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-xs sm:text-sm text-white">{{ item.subject }}</td>
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm" :class="getColorClass(item)">{{ item.correct ?? '—' }}</td>
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-red-600">{{ item.wrong ?? '—' }}</td>
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-zinc-400">{{ item.empty ?? '—' }}</td>
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-zinc-400">{{ item.net ?? '—' }}</td>
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm">
                          <span v-if="item.successRate != null" class="px-2 py-1 rounded-full text-xs bg-red-600/20 text-red-600">%{{ item.successRate }}</span>
                          <span v-else class="text-zinc-400">—</span>
                        </td>
                      </tr>
                    </template>

                    <!-- Veri Yok -->
                    <template v-if="sortedData.noData.length > 0">
                      <tr class="bg-zinc-500/5">
                        <td colspan="6" class="sm:px-4 sm:py-2 px-2 py-1 text-xs sm:text-sm font-medium text-zinc-400">Veri Yok</td>
                      </tr>
                      <tr v-for="(item, itemIndex) in sortedData.noData" :key="`no-data-${item.subject}-${itemIndex}`" class="border-b border-zinc-800">
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-xs sm:text-sm text-white">{{ item.subject }}</td>
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-zinc-400">—</td>
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-zinc-400">—</td>
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-zinc-400">—</td>
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-zinc-400">—</td>
                        <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm">
                          <span class="text-zinc-400">—</span>
                        </td>
                      </tr>
                    </template>

                    <!-- Hiç veri yoksa -->
                    <template v-if="!sortedData.excellent.length && !sortedData.good.length && !sortedData.needsImprovement.length && !sortedData.noData.length">
                      <tr>
                        <td colspan="6" class="text-center py-4 text-zinc-400">Bu ders için henüz veri bulunmuyor.</td>
                      </tr>
                    </template>
                  </tbody>
                </table>
                <div class="mt-6">
                  <button type="button"
                    class="inline-flex items-center justify-center rounded-md bg-red-600 px-6 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
                    @click="closeAnalysisModal">
                    Anladım
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Hero Section -->
      <section class="relative h-screen flex items-center">
        <img :src="HeroImage" alt="Hero"
          class="absolute inset-0 w-full h-full object-cover object-[70%] sm:object-center" />
        <div class="absolute inset-0 bg-red-600 mix-blend-multiply opacity-60"></div>
        <div class="absolute inset-0"></div>
        <div class="px-4 sm:px-6 lg:px-16 2xl:px-24 relative z-10 flex flex-col justify-center h-full">
          <div class="max-w-[720px] mb-8">
            <h1 class="text-2xl sm:text-3xl font-bold mb-4">
              Merhaba
              <span class="inline-flex items-center -mr-2">
                <DecodeText :text="userName" :interval="5000" />
              </span>
              , senin için tasarlanan eşsiz öğrenme deneyimine hoş geldin!
            </h1>
            <p class="text-sm sm:text-base bg-black/50 sm:bg-transparent rounded-lg px-4 py-2 sm:px-0">
              Tam Okul ile öğrenme yolculuğun tamamen sana özel.
              Başarı durumuna göre YouTube'dan seçilen konu anlatım videoları ile eksiklerini tamamla, kişisel duvarında
              müzik dinle, kitap önerilerini keşfet ve motivasyon sözleriyle ilham al.
              <br />
              <br />
              Videolar hakkında daha fazla bilgi almak için konu başlığının yanındaki
              <Info class="w-5 h-5 inline" />
              butonuna tıklayabilirsin.
            </p>
          </div>
          <div>
            <div class="relative inline-flex">
              <button @click="openWrappedModal"
                class="relative inline-flex items-center justify-center px-6 py-2 text-base sm:text-lg text-black transition-all bg-white hover:bg-white/70 focus:ring-red-600 active:scale-95 rounded"
                role="button">
                <Play class="w-6 h-6 mr-2 fill-black" />Öğrenme Yolculuğun
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Content Sections -->
      <div class="sm:-mt-[3.5rem] relative z-10 bg-gradient-to-t from-[#141414] from-95% to-transparent">
        <section v-for="(section, index) in sections" :key="`section-${section.title}-${index}`" class="pb-8 pt-0 sm:pt-4">
          <div class="px-4 sm:px-6 lg:px-16 2xl:px-24">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <h2 class="text-sm sm:text-xl font-semibold tracking-wide">{{ section.title }}</h2>

                <!-- Mobile Button -->
                <button v-if="!['music', 'quote', 'story', 'book'].includes(section.type)"
                  class="sm:hidden b   text-white rounded-full w-8 h-8 flex items-center justify-center z-10"
                  @click="showAnalysisForCourse(section.title)">
                  <span class="text-sm flex-shrink-0 flex items-center justify-center">
                    <Info class="w-4 h-4" />
                  </span>
                </button>

                <!-- Desktop Button -->
                <button 
                  v-if="!['music', 'quote', 'story', 'book'].includes(section.type)"
                  class="hidden sm:flex text-[#54b9c5] font-semibold rounded-full items-center justify-end transition-all duration-500 ease-in-out overflow-hidden z-10 relative"
                  :class="{ 
                    'w-8': !hoveredSection[index], 
                    'w-[250px]': hoveredSection[index] 
                  }"
                  @mouseenter="hoveredSection[index] = true" 
                  @mouseleave="hoveredSection[index] = false"
                  @click="showAnalysisForCourse(section.title)"
                >
                  <div class="absolute inset-0 bg-[#54b9c5]/20 transition-transform duration-500 ease-in-out origin-right"
                    :class="{ 'scale-x-0': !hoveredSection[index] }">
                  </div>
                  
                  <div class="flex items-center w-full h-8 justify-end relative">
                    <span 
                      class="whitespace-nowrap text-xs overflow-hidden transition-all duration-500 ease-in-out absolute"
                      :class="{ 
                        'opacity-0 translate-x-4 right-8': !hoveredSection[index], 
                        'opacity-100 translate-x-0 right-10': hoveredSection[index] 
                      }"
                    >
                      Neden bu videoları görüyorum?
                    </span>
                    <span class="text-sm flex-shrink-0 mr-2 flex items-center justify-center relative">
                      <Info class="w-4 h-4" />
                    </span>
                  </div>
                </button>
              </div>
              
              <RouterLink v-if="section.type === 'lesson'" :to="{ 
                name: 'browse', 
                params: { code: route.params.code }, 
                query: { course: section.title }
              }">
                <button class="text-xs sm:text-sm text-white hover:text-zinc-300">
                  Daha Fazla Göster
                </button>
              </RouterLink>
            </div>
          </div>

          <div class="relative w-screen -ml-[50vw] left-1/2">
            <!-- Left scroll button -->
            <button 
              v-show="showLeftScrollButton[index]"
              @click="() => handleCarouselScroll(index, 'left')"
              class="absolute h-full top-1/2 transform -translate-y-1/2 bg-black bg-opacity-75 text-white px-4 py-2 z-10 hidden sm:block">
              <ChevronLeftIcon class="w-6 h-6" />
            </button>

            <!-- Right scroll button -->
            <button 
              v-show="showRightScrollButton[index]"
              @click="() => handleCarouselScroll(index, 'right')"
              class="absolute right-0 h-full top-1/2 transform -translate-y-1/2 bg-black bg-opacity-75 text-white px-4 py-2 z-10 hidden sm:block">
              <ChevronRightIcon class="w-6 h-6" />
            </button>

            <!-- Content container -->
            <div 
              :ref="(el) => { if (el) scrollContainers[index] = el }"
              class="flex space-x-2 overflow-x-auto scrollbar-hide select-none pl-4 sm:pl-6 lg:pl-16 2xl:pl-24 pr-4 sm:pr-6 lg:pr-16 2xl:pr-24"
              @scroll="() => checkScrollPosition(index)"
              @touchstart.passive="startDrag" 
              @touchmove.passive="drag" 
              @touchend.passive="endDrag">
              <div v-for="(item, itemIndex) in section.items" :key="`${section.type}-${item.id}-${itemIndex}`">
                <ContentCard 
                  :item="item" 
                  :type="section.type" 
                  @click="() => {
                    openContentModal(item, section.type);
                  }" 
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Footer -->
      <footer class="bg-[#141414] text-zinc-400 py-6 px-4 sm:px-6 lg:px-8">
        <div class="container mx-auto">
          <p class="text-center text-sm">
            &copy; {{ new Date().getFullYear() }} Tam Okul. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>

      <!-- Spotify Wrapped Style Modal -->
      <WrappedModal :show="showModal" @close="closeModal" />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue"
import { ChevronLeftIcon, ChevronRightIcon, Info } from "lucide-vue-next"
import { useAnalysisStore } from '@/composables/useAnalysisStore'
import { useLoading } from '@/composables/useLoading'
import AppHeader from "@/components/AppHeader.vue"
import WrappedModal from "@/components/WrappedModal.vue"
import ContentModal from "@/components/ContentModal.vue"
import LessonContent from "@/components/LessonContent.vue"
import DecodeText from "@/components/DecodeText.vue"
import HeroImage from "@/assets/hero-img.webp"
import { Play } from "lucide-vue-next"
import MusicContent from "@/components/MusicContent.vue"
import QuoteContent from "@/components/QuoteContent.vue"
import BookContent from "@/components/BookContent.vue"
import StoryContent from "@/components/StoryContent.vue"
import ContentCard from '@/components/ContentCard.vue'
import { useContent } from '@/composables/useContent'
import { useScroll } from '@/composables/useScroll'
import { useModal } from '@/composables/useModal'
import { useRoute } from 'vue-router'

const route = useRoute()
const analysisStore = useAnalysisStore()
const isMobile = ref(false)
const hoveredSection = ref({})
const showLeftScrollButton = ref({})
const showRightScrollButton = ref({})
const userName = ref('')

// Loading state yönetimini useLoading composable'ından al
const { 
  loading,
  error,
  startLoading,
  stopLoading,
  setError,
} = useLoading();

const loadWrappedData = () => {
  checkMobile()
  window.addEventListener('resize', checkMobile)

  const setVH = () => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)
  }
  setVH()
  window.addEventListener("resize", setVH)

  const lastShownTime = localStorage.getItem('wrappedModalLastShown')
  const currentTime = Date.now()
  const tenMinutes = 10 * 60 * 1000

  if (!lastShownTime || currentTime - parseInt(lastShownTime) > tenMinutes) {
    openWrappedModal()
    localStorage.setItem('wrappedModalLastShown', currentTime.toString())
  }

  // Her section için başlangıç scroll durumunu kontrol et
  nextTick(() => {
    sections.value.forEach((_, index) => {
      checkScrollPosition(index)
    })
  })
}

const { otherSections } = useContent()
const {
  scrollContainers,
  scroll,
  startDrag,
  drag,
  endDrag,
  cleanup: scrollCleanup
} = useScroll()

// Modal yönetimini useModal composable'ından al
const {
  showModal,
  showContentModal,
  showAnalysisModal,
  selectedLesson,
  selectedCourse,
  openWrappedModal,
  closeModal,
  openContentModal: originalOpenContentModal,
  closeContentModal,
  showAnalysisForCourse,
  closeAnalysisModal,
  cleanup: modalCleanup
} = useModal()

const formatTitle = (title) => {
  return title
    .toLowerCase()
    .split(' ')
    .map(word => {
      if (word.includes('.')) {
        const cleanWord = word.replace(/\.+/g, '.')
        return cleanWord
          .split('.')
          .filter(part => part.length > 0)
          .map((part, index, array) => {
            return part.charAt(0).toUpperCase() + part.slice(1) + (index < array.length ? '.' : '')
          })
          .join('')
      }
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

const generateVideos = (subjectName, subjectData) => {

  const subjectVideos = subjectData?.videos;

  // videos array ise ve dolu ise
  if (Array.isArray(subjectVideos)) {
    const videos = subjectVideos
      .filter(video => video && video.video_id) // Null olmayan videoları filtrele
      .map((video, index) => {
        const processedVideo = {
          ...video,
          id: `${video.id || video.video_id}-${subjectName}-${index}`,
          type: "lesson",
          subjectName,
          description: video.description || 'Video açıklaması bulunmuyor.',
          summary: video.summary || 'Video özeti bulunmuyor.',
          channel_title: video.channel_title || 'Tam Okul'
        };
        return processedVideo;
      });

    return videos;
  }

  // Video yoksa boş array döndür
  return [];
};

const generateItemsFromSubjects = (subjects) => {
  if (!subjects) return []

  // Tüm videoları topla
  const allVideos = Object.entries(subjects).flatMap(([name, data]) => {
    return generateVideos(name, data)
  })

  // Video ID'lerine göre tekrarlananları filtrele
  const uniqueVideos = allVideos.reduce((acc, video) => {
    const videoId = video.video_id;
    // Eğer bu video_id daha önce eklenmemişse, ekle
    if (!acc.some(v => v.video_id === videoId)) {
      acc.push(video);
    }
    return acc;
  }, []);

  // Rastgele sırala ve ilk 20'yi al
  return uniqueVideos
    .sort(() => Math.random() - 0.5)
    .slice(0, 20)
}

const lessonSections = computed(() => {


  // Eğer courses verisi varsa ve loading false ise
  const courses = analysisStore.courses.value;
  if (courses && !loading.value) {
    return courses.map(course => ({
      title: formatTitle(course.title || course.title_uppercase),
      type: "lesson",
      items: generateItemsFromSubjects(course.subjects || {})
    }));
  }

  // Loading durumunda veya courses verisi yoksa skeleton göster
  return Array(3).fill().map((_, index) => ({
    title: 'Loading...',
    type: 'lesson',
    items: Array(5).fill().map((_, itemIndex) => ({
      id: `skeleton-${index}-${itemIndex}`,
      type: 'lesson',
      title: 'Loading...',
      thumbnail_url: '',
      isLoading: true
    }))
  }));
});

const sections = computed(() => [...lessonSections.value, ...otherSections.value])

const analysisData = computed(() => {
  if (!selectedCourse.value) return [];
  
  const course = analysisStore.courses.value?.find(course => 
    (course.title || course.title_uppercase || '').toLowerCase() === selectedCourse.value.toLowerCase()
  );
  
  if (!course) return [];

  const transformedData = [];

  if (!course.subjects || Object.keys(course.subjects).length === 0) {
    return [{
      subject: 'Henüz veri yok',
      correct: null,
      wrong: null,
      empty: null,
      net: null,
      successRate: null
    }];
  }

  Object.entries(course.subjects).forEach(([subjectName, data]) => {
    const analysis = Array.isArray(data.analysis) ? data.analysis[0] : data.analysis;
    
    if (analysis) {
      transformedData.push({
        subject: subjectName,
        correct: analysis.correct || 0,
        wrong: analysis.incorrect || 0,
        empty: analysis.empty || 0,
        net: analysis.net || 0,
        successRate: analysis.success_ratio || 0
      });
    }
  });

  return transformedData;
});

const getColorClass = (item) => {
  if (!item.successRate) return 'text-zinc-400'
  if (item.successRate >= 80) return 'text-green-500'
  if (item.successRate >= 50) return 'text-yellow-500'
  return 'text-red-600'
}

const sortedData = computed(() => {
  const excellent = analysisData.value
    .filter(item => item.successRate >= 80)
    .sort((a, b) => b.successRate - a.successRate)

  const good = analysisData.value
    .filter(item => item.successRate >= 50 && item.successRate < 80)
    .sort((a, b) => b.successRate - a.successRate)

  const needsImprovement = analysisData.value
    .filter(item => item.successRate !== null && item.successRate < 50)
    .sort((a, b) => b.successRate - a.successRate)

  const noData = analysisData.value
    .filter(item => item.successRate === null)

  return { excellent, good, needsImprovement, noData }
})

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const handleCarouselScroll = (index, direction) => {
  scroll(index, direction)
  setTimeout(() => checkScrollPosition(index), 100)
}

const checkScrollPosition = (index) => {
  if (scrollContainers.value[index]) {
    const container = scrollContainers.value[index]
    const scrollLeft = Math.round(container.scrollLeft)
    const clientWidth = Math.round(container.clientWidth)
    const scrollWidth = Math.round(container.scrollWidth)
    
    showLeftScrollButton.value[index] = scrollLeft > 0
    
    const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1
    showRightScrollButton.value[index] = !isAtEnd && scrollWidth > clientWidth
  }
}

const openContentModal = (video, type) => {
  originalOpenContentModal(video, type);
};

onMounted(async () => {
  const code = route.params.code
  try {
    startLoading()
    const data = await analysisStore.fetchAnalysisData(code)
    userName.value = data.data.user.name
    loadWrappedData()
  } catch (err) {
    setError(err)
    console.error('Error loading data:', err)
  } finally {
    stopLoading()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  scrollCleanup()
  modalCleanup()
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
  /* -webkit-overflow-scrolling: touch; */
  /* scroll-behavior: smooth; */
  /* scroll-snap-type: x mandatory; */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.dragging {
  cursor: grabbing !important;
}

.group:hover img {
  opacity: 0.75;
}

.select-none {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

img {
  pointer-events: none;
}

.h-screen {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
}

.decode-text {
  display: inline-block;
  font-size: inherit;
  line-height: inherit;
  word-spacing: normal;
}

/* .flex-shrink-0 {
    scroll-snap-align: start;
  } */

@keyframes tilt {

  0%,
  50%,
  100% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(0.5deg);
  }

  75% {
    transform: rotate(-0.5deg);
  }
}

.animate-tilt {
  animation: tilt 10s infinite linear;
}

header {
  transition: background-color 1s ease;
}

@media (max-width: 640px) {
  .mobile\:h-screen {
    height: 100vh !important;
  }

  .mobile\:w-screen {
    width: 100vw !important;
  }

  .mobile\:m-0 {
    margin: 0 !important;
  }

  .mobile\:rounded-none {
    border-radius: 0 !important;
  }
}
</style>
