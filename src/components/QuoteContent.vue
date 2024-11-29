<template>
  <div class="relative h-full w-full overflow-hidden bg-black">
    <!-- Background Video -->
    <video 
      class="absolute inset-0 w-full h-full object-cover"
      autoplay 
      loop 
      muted 
      playsinline
    >
      <source :src="getBackgroundVideo()" type="video/mp4">
    </video>
    
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    
    <!-- Quote Content -->
    <div class="relative z-10 h-full flex items-center justify-center p-4 md:p-36">
      <div class="text-center max-w-3xl">
        <blockquote class="mb-6">
          <p class="text-2xl md:text-4xl font-serif italic text-white leading-relaxed">
            "{{ quote.text }}"
          </p>
        </blockquote>
        <cite class="text-lg md:text-xl text-gray-300 not-italic">
          — {{ quote.author }}
        </cite>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  defineProps({
    quote: {
      type: Object,
      required: true
    }
  });
  
  const videos = [
  'https://cdn.pixabay.com/video/2024/03/13/204006-923133925_small.mp4',
  'https://cdn.pixabay.com/video/2024/08/30/228847_small.mp4',
  'https://cdn.pixabay.com/video/2023/01/30/148594-794221537_small.mp4',
  'https://cdn.pixabay.com/video/2024/08/20/227567_small.mp4',
  'https://cdn.pixabay.com/video/2021/10/10/91562-629172467_small.mp4',
  'https://cdn.pixabay.com/video/2024/06/12/216463_small.mp4',
  'https://cdn.pixabay.com/video/2023/06/17/167569-837244635_small.mp4',
  'https://cdn.pixabay.com/video/2023/10/19/185726-876210695_small.mp4',
  'https://cdn.pixabay.com/video/2024/08/17/226955_small.mp4',
  'https://cdn.pixabay.com/video/2021/04/15/71122-537102350_small.mp4',
  'https://cdn.pixabay.com/video/2021/04/13/70962-536644240_small.mp4',
  'https://cdn.pixabay.com/video/2023/10/15/185096-874643413_small.mp4',
  'https://cdn.pixabay.com/video/2022/04/05/113004-696349232_small.mp4',
  'https://cdn.pixabay.com/video/2023/07/04/169951-842348732_large.mp4',
  'https://cdn.pixabay.com/video/2024/03/28/205923_small.mp4',
];
  
  const getBackgroundVideo = () => {
    // Get a random video from the array
    return videos[Math.floor(Math.random() * videos.length)];
  };
  </script>
  
  <style scoped>
  video {
    filter: brightness(0.7);
  }
  
  blockquote p {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  cite {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }
  </style>
  