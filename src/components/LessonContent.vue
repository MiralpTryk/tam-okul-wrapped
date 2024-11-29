<template>
    <div class="flex flex-col md:flex-row h-full bg-black text-white">
      <div class="w-full md:w-2/3 flex items-start justify-center">
        <div class="w-full max-w-[1024px] mx-auto">
          <div class="relative w-full pb-[56.25%]">
            <div id="youtube-player" class="absolute inset-0 w-full h-full"></div>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/3 p-6 overflow-y-auto max-h-[calc(100vh-56.25vw-4rem)] md:max-h-[calc(100vh-14rem)]">
        <h1 class="text-2xl font-bold mb-2">{{ lesson.title }}</h1>
        <p class="text-sm text-gray-400 mb-4">{{ lesson.channelName }}</p>
        
        <div class="mb-6">
          <div class="text-gray-300 space-y-4" v-html="lesson.content"></div>
        </div>
      </div>
    </div>
    </template>
    
    <script setup>
    import { onMounted, onUnmounted, shallowRef, watch } from 'vue';
    
    const props = defineProps({
      lesson: {
        type: Object,
        required: true,
      },
    });
    
    const player = shallowRef(null);
    
    onMounted(() => {
      ensureViewportMeta();
      
      if (window.YT && window.YT.Player) {
        createYouTubePlayer();
      } else {
        loadYouTubeAPI();
      }
    });
    
    onUnmounted(() => {
      if (player.value) {
        player.value.destroy();
      }
    });
    
    const ensureViewportMeta = () => {
      let viewport = document.querySelector('meta[name=viewport]');
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        document.head.appendChild(viewport);
      }
      viewport.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
    };
    
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    
      window.onYouTubeIframeAPIReady = createYouTubePlayer;
    };
    
    const createYouTubePlayer = () => {
      if (player.value) {
        player.value.destroy();
      }
    
      const playerConfig = {
        height: '100%',
        width: '100%',
        videoId: extractVideoId(props.lesson.videoUrl),
        playerVars: {
          playsinline: 1,
          modestbranding: 1,
          rel: 0,
          enablejsapi: 1,
          origin: window.location.origin,
          controls: 1,
          fs: 1,
          autoplay: 0,
          mute: 0,
          'webkit-playsinline': 1,
        },
        events: {
          onReady: onPlayerReady,
          onError: onPlayerError,
          onStateChange: onPlayerStateChange
        }
      };
    
      try {
        player.value = new window.YT.Player('youtube-player', playerConfig);
      } catch (error) {
        console.error('Error creating YouTube player:', error);
      }
    };
    
    const onPlayerReady = (event) => {
      console.log('YouTube player is ready');
      const playerElement = event.target.getIframe();
      playerElement.style.width = '100%';
      playerElement.style.height = '100%';
    };
    
    const onPlayerError = (event) => {
      console.error('YouTube player error:', event.data);
    };
    
    const onPlayerStateChange = (event) => {
      console.log('Player state changed:', event.data);
    };
    
    const extractVideoId = (url) => {
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[7].length === 11) ? match[7] : false;
    };
    
    watch(() => props.lesson, (newLesson) => {
      if (newLesson && window.YT && window.YT.Player) {
        createYouTubePlayer();
      }
    }, { immediate: true });
    </script>
    
    <style scoped>
    @media (min-width: 1280px) {
      .max-w-\[1024px\] {
        max-width: 1280px;
      }
    }
    @media (min-width: 1536px) {
      .max-w-\[1024px\] {
        max-width: 1536px;
      }
    }
    
    :deep(iframe) {
      width: 100% !important;
      height: 100% !important;
      position: absolute;
      top: 0;
      left: 0;
    }
    </style>
    
    