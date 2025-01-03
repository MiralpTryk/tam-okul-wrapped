<template>
  <div class="flex flex-col xl:flex-row h-full bg-black text-white">
    <div class="w-full xl:w-2/3 flex items-start justify-center">
      <div class="w-full max-w-[1024px] mx-auto">
        <div class="relative w-full pb-[56.25%]">
          <div id="youtube-player" class="absolute inset-0 w-full h-full"></div>
        </div>
      </div>
    </div>
    <div class="w-full xl:w-1/3 p-6 overflow-y-auto max-h-[calc(100vh-56.25vw-4rem)] xl:max-h-[calc(100vh-14rem)]">
      <h1 class="text-2xl font-bold mb-2">{{ lesson.title }}</h1>
      <p class="text-sm text-gray-400 mb-4">{{ lesson.channel_title }}</p>
      
      <div class="text-sm text-gray-400 mb-6">
        <p>{{ lesson.description }}</p>
      </div>

      <div class="prose prose-invert max-w-none">
        <div class="study-notes" v-html="formattedStudyNotes"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  lesson: {
    type: Object,
    required: true
  }
})

const formattedStudyNotes = computed(() => {
  if (!props.lesson.study_notes) return ''
  
  return props.lesson.study_notes
    // Tek başına duran # işaretlerini kaldır (satır başı ve sonundakiler dahil)
    .replace(/^#\s*$|^\s*#\s*$|#$/gm, '')
    // Satır başı ve sonundaki tek # işaretlerini kaldır
    .replace(/^#(?!#)\s*|\s*#$/gm, '')
    // Çift yıldız içindeki metinleri bold yap
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
    // ### başlıklar (h3 - bold)
    .replace(/### (.*$)/gm, '<h3 class="text-lg font-bold text-white mt-6 mb-3">$1</h3>')
    // #### başlıklar (h4)
    .replace(/#### (.*$)/gm, '<h4 class="text-base font-semibold text-white mt-4 mb-2">$1</h4>')
    // Liste öğeleri
    .replace(/- (.*$)/gm, '<li class="ml-4 mb-1 text-gray-300">$1</li>')
    // Liste öğelerini ul içine al
    .replace(/(<li.*<\/li>\n)+/g, '<ul class="list-disc mb-4">$&</ul>')
    // Paragraflar (başında h3, h4, ul, li olmayan satırlar)
    .replace(/^(?!<[hul]).*$/gm, '<p class="text-gray-300 mb-3">$&</p>')
    // Boş satırları temizle
    .replace(/<p>\s*<\/p>/g, '')
})

let player = null

onMounted(() => {
  // Initialize YouTube Player
  if (window.YT) {
    createPlayer()
  } else {
    // Load YouTube IFrame API if not already loaded
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    window.onYouTubeIframeAPIReady = createPlayer
  }
})

function createPlayer() {
  player = new window.YT.Player('youtube-player', {
    videoId: props.lesson.video_id,
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0
    }
  })
}

onUnmounted(() => {
  if (player) {
    player.destroy()
  }
})
</script>

<style>
.study-notes ul {
  list-style-type: disc;
  padding-left: 1rem;
}

.study-notes li {
  margin-bottom: 0.5rem;
}

.study-notes h3 {
  border-bottom: 1px solid rgb(75 85 99);
  padding-bottom: 0.5rem;
}
</style>