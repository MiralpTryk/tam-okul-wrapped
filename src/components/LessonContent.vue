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
      
      <div class="mb-6">
        <div class="text-gray-300 space-y-4" v-html="lesson.summary"></div>
      </div>

      <div class="text-sm text-gray-400">
        <p>{{ lesson.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  lesson: {
    type: Object,
    required: true
  }
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