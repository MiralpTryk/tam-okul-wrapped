<template>
  <div class="text-white min-h-screen overflow-x-hidden">
    <!-- Header -->
    <header :class="[
      'fixed top-0 left-0 right-0 z-20 transition-all duration-1000',
      isScrolled ? 'bg-black backdrop-blur-sm' : 'bg-gradient-to-t from-transparent to-black'
    ]">
      <nav class=" mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-16 2xl:px-24">
        <a href="/">
          <img src="https://tamokul.com/new-landing/assets/images/logo/header-logo.webp" alt="Tam Okul" class="h-8" />
        </a>
        <div class="flex items-center space-x-4">
          <RouterLink to="/optic-form">
            <button
              class="bg-[#E50914] hover:bg-[#E50914]/90 text-white px-6 py-2 rounded text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-[#E50914]/20">
              Optik İşaretle
            </button>
          </RouterLink>
        </div>
      </nav>
    </header>

    <!-- Analysis Modal -->
    <Transition name="modal">
      <div v-if="showAnalysisModal" class="fixed inset-0 z-[60]">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <!-- Modal Content -->
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
                  <tr class="bg-green-500/5">
                    <td colspan="6" class="sm:px-4 sm:py-2 px-2 py-1 text-xs sm:text-sm font-medium text-green-500">Çok
                      İyi</td>
                  </tr>
                  <tr v-for="item in sortedData.excellent" :key="item.subject" class="border-b border-zinc-800">
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-xs sm:text-sm text-white">{{ item.subject }}</td>
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm" :class="getColorClass(item)">{{
                      item.correct ?? '—' }}</td>
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-red-600">{{ item.wrong ??
                      '—' }}</td>
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-zinc-400">{{ item.empty ??
                      '—' }}</td>
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-zinc-400">{{ item.net ??
                      '—' }}</td>
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm">
                      <span v-if="item.successRate != null"
                        class="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                        %{{ item.successRate }}
                      </span>
                      <span v-else class="text-zinc-400">—</span>
                    </td>
                  </tr>

                  <!-- Daha İyi Olabilir (50-80%) -->
                  <tr class="bg-yellow-500/5">
                    <td colspan="6" class="sm:px-4 sm:py-2 px-2 py-1 text-xs sm:text-sm font-medium text-yellow-500">
                      Daha İyi Olabilir</td>
                  </tr>
                  <tr v-for="item in sortedData.good" :key="item.subject" class="border-b border-zinc-800">
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-xs sm:text-sm text-white">{{ item.subject }}</td>
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm" :class="getColorClass(item)">{{
                      item.correct ?? '—' }}</td>
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-red-600">{{ item.wrong ??
                      '—' }}</td>
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-zinc-400">{{ item.empty ??
                      '—' }}</td>
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-zinc-400">{{ item.net ??
                      '—' }}</td>
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm">
                      <span v-if="item.successRate != null"
                        class="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-500">
                        %{{ item.successRate }}
                      </span>
                      <span v-else class="text-zinc-400">—</span>
                    </td>
                  </tr>

                  <!-- Geliştirilmeli (< 50%) -->
                  <tr class="bg-red-600/5">
                    <td colspan="6" class="sm:px-4 sm:py-2 px-2 py-1 text-xs sm:text-sm font-medium text-red-600">
                      Geliştirilmeli</td>
                  </tr>
                  <tr v-for="item in sortedData.needsImprovement" :key="item.subject" class="border-b border-zinc-800">
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-xs sm:text-sm text-white">{{ item.subject }}</td>
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm" :class="getColorClass(item)">{{
                      item.correct ?? '—' }}</td>
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-red-600">{{ item.wrong ??
                      '—' }}</td>
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-zinc-400">{{ item.empty ??
                      '—' }}</td>
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-zinc-400">{{ item.net ??
                      '—' }}</td>
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm">
                      <span v-if="item.successRate != null"
                        class="px-2 py-1 rounded-full text-xs bg-red-600/20 text-red-600">
                        %{{ item.successRate }}
                      </span>
                      <span v-else class="text-zinc-400">—</span>
                    </td>
                  </tr>

                  <!-- Veri Yok -->
                  <tr class="bg-zinc-500/5">
                    <td colspan="6" class="sm:px-4 sm:py-2 px-2 py-1 text-xs sm:text-sm font-medium text-zinc-400">Veri
                      Yok</td>
                  </tr>
                  <tr v-for="item in sortedData.noData" :key="item.subject" class="border-b border-zinc-800">
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-xs sm:text-sm text-white">{{ item.subject }}</td>
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-zinc-400">—</td>
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-zinc-400">—</td>
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-zinc-400">—</td>
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm text-zinc-400">—</td>
                    <td class="sm:px-4 sm:py-2 px-2 py-1 text-center text-xs sm:text-sm">
                      <span class="text-zinc-400">—</span>
                    </td>
                  </tr>
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
      <!--       <div
        class="absolute inset-x-0 bottom-0 h-12 sm:h-16 md:h-24 bg-gradient-to-t from-30% from-[#141414] via-[#141414]/70 to-transparent overflow-hidden">
<div class="flex gap-4 pr-4 w-[200%] h-full animate-marquee" style="--marquee-duration: 5000ms;">
          <div class="flex flex-1 h-full">
            <div
              class="flex flex-1 sm:items-center justify-center text-center text-white/30 p-1 text-xl text-nowrap font-[helvetica]">
              Bu içerikler senin için özenle hazırlandı</div>
            <div
              class="flex flex-1 sm:items-center justify-center text-center text-white/30 p-1 text-xl text-nowrap font-[helvetica]">
              Bu içerikler senin için özenle hazırlandı</div>
            <div
              class="flex flex-1 sm:items-center justify-center text-center text-white/30 p-1 text-xl text-nowrap font-[helvetica]">
              Bu içerikler senin için özenle hazırlandı</div>
          </div>
          <div class="flex flex-1 h-full">
            <div
              class="flex flex-1 sm:items-center justify-center text-center text-white/30 p-1 text-xl text-nowrap font-[helvetica]">
              Bu içerikler senin için özenle hazırlandı</div>
            <div
              class="flex flex-1 sm:items-center justify-center text-center text-white/30 p-1 text-xl text-nowrap font-[helvetica]">
              Bu içerikler senin için özenle hazırlandı</div>
            <div
              class="flex flex-1 sm:items-center justify-center text-center text-white/30 p-1 text-xl text-nowrap font-[helvetica]">
              Bu içerikler senin için özenle hazırlandı</div>
          </div>
        </div>
      </div> -->
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
              <Play class="w-6 h-6 mr-2 fill-black" /> {{ new Date().getFullYear() }} Öğrenme Yolculuğun
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Sections -->
    <div class="sm:-mt-[3.5rem] relative z-10 bg-gradient-to-t from-[#141414] from-95% to-transparent">
      <section v-for="(section, index) in sections" :key="index" class="pb-8 pt-0 sm:pt-4">
        <!-- Section header with original padding -->
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
            
            <!-- Only show "Daha Fazla Göster" for lesson sections -->
            <RouterLink v-if="section.type === 'lesson'" :to="`/browse?section=${section.title}`">
              <button class="text-xs sm:text-sm text-white hover:text-zinc-300">
                Daha Fazla Göster
              </button>
            </RouterLink>
          </div>
        </div>

        <div class="relative w-screen -ml-[50vw] left-1/2">
          <!-- Left scroll button -->
          <button @click="() => handleCarouselScroll(index, 'left')"
            class="left-chevron absolute left-4 sm:left-6 lg:left-16 2xl:left-24 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hidden sm:block">
            <ChevronLeftIcon class="w-6 h-6" />
          </button>

          <!-- Right scroll button -->
          <button @click="() => handleCarouselScroll(index, 'right')"
            class="right-chevron absolute right-4 sm:right-6 lg:right-16 2xl:right-24 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hidden sm:block">
            <ChevronRightIcon class="w-6 h-6" />
          </button>

          <!-- Content container -->
          <div :ref="(el) => { if (el) scrollContainers[index] = el }"
            class="flex space-x-2 overflow-x-auto scrollbar-hide select-none pl-4 sm:pl-6 lg:pl-16 2xl:pl-24"
            @touchstart="startDrag" @touchmove="drag" @touchend="endDrag">
            <div v-for="item in section.items" :key="item.id">
              <ContentCard :item="item" :type="section.type" @click="openContentModal" />
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
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue"
import { ChevronLeftIcon, ChevronRightIcon, Info } from "lucide-vue-next"
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
import analysis from '@/data/analysis.json'
import { useContent } from '@/composables/useContent'
import { useScroll } from '@/composables/useScroll'
import { useModal } from '@/composables/useModal'

// State Management
const isMobile = ref(false)
const courseData = ref(null)
const isScrolled = ref(false)
const hoveredSection = ref({})
const userName = computed(() => analysis.data.user.name || 'Misafir')

// Get functionality from composables
const { otherSections } = useContent()
const {
  scrollContainers,
  scroll,
  startDrag,
  drag,
  endDrag,
  cleanup
} = useScroll()
const {
  showModal,
  showContentModal,
  showAnalysisModal,
  selectedLesson,
  selectedCourse,
  openWrappedModal,
  closeModal,
  openContentModal,
  closeContentModal,
  showAnalysisForCourse,
  closeAnalysisModal
} = useModal()

// Format title function
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

// Replace generateDummyVideos with generateVideos
const generateVideos = (subjectName, subjectData) => {
  if (!subjectData?.videos?.length) {
    return [{
      id: `${subjectName}-default`,
      title: subjectName,
      channel_title: 'Eğitim Kanalı',
      video_id: "dQw4w9WgXcQ",
      thumbnail_url: `https://picsum.photos/seed/${subjectName}/300/200`,
      type: "lesson"
    }]
  }

  return subjectData.videos.map(video => ({
    ...video, // Spread the video object to keep all original properties
    type: "lesson",
    subjectName
  }))
}

// Update generateItemsFromSubjects to handle the new structure
const generateItemsFromSubjects = (subjects) => {
  if (!subjects) return []

  console.log('Subjects received:', subjects); // Debug log

  // Get all videos from all subjects
  const allVideos = Object.entries(subjects).flatMap(([name, data]) => {
    console.log('Processing subject:', name, 'with data:', data); // Debug log
    return generateVideos(name, data)
  })

  console.log('All videos generated:', allVideos); // Debug log

  // Randomly select videos to fill the grid
  return allVideos
    .sort(() => Math.random() - 0.5)
    .slice(0, 20) // Limit to 20 videos
}

// Computed properties
const lessonSections = computed(() => {
  if (!courseData.value?.content?.courses) return []

  return courseData.value.content.courses.map(course => ({
    title: formatTitle(course.title || course.title_uppercase),
    type: "lesson",
    items: generateItemsFromSubjects(course.subjects || {})
  }))
})

const sections = computed(() => [...lessonSections.value, ...otherSections.value])

// Analysis data computed properties
const analysisData = computed(() => {
  if (!courseData.value?.content?.courses || !selectedCourse.value) return []

  const course = courseData.value.content.courses.find(
    course => formatTitle(course.title || course.title_uppercase) === selectedCourse.value
  )

  if (!course) return []

  const transformedData = []

  Object.entries(course.subjects).forEach(([subjectName, data]) => {
    const analysis = data.analysis?.[0]
    if (analysis) {
      transformedData.push({
        subject: subjectName,
        correct: analysis.correct,
        wrong: analysis.incorrect,
        empty: analysis.empty,
        net: analysis.net,
        successRate: analysis.success_ratio
      })
    }
  })

  return transformedData
})

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

// Methods
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 70
}

const getColorClass = (item) => {
  if (item.correct === null || item.correct === undefined ||
    item.wrong === null || item.wrong === undefined ||
    item.empty === null || item.empty === undefined) {
    return 'text-zinc-400'
  }

  const totalQuestions = item.correct + item.wrong + item.empty
  const percentage = (item.correct / totalQuestions) * 100

  if (percentage >= 80) return 'text-green-500'
  if (percentage >= 50) return 'text-yellow-500'
  return 'text-red-600'
}

// Change the name of the carousel scroll handler
const handleCarouselScroll = (index, direction) => {
  console.log('Scrolling carousel:', index, direction) // Debug log
  scroll(index, direction)
}

// Lifecycle hooks
onMounted(async () => {
  try {
    const response = await import('@/data/analysis.json')
    courseData.value = response.default.data
  } catch (error) {
    console.error('JSON verisi yüklenirken hata:', error)
  }

  checkMobile()
  window.addEventListener('resize', checkMobile)
  window.addEventListener('scroll', handleScroll)

  // Set viewport height
  const setVH = () => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)
  }
  setVH()
  window.addEventListener("resize", setVH)

  openWrappedModal()
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  window.removeEventListener('scroll', handleScroll)
  cleanup()
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
