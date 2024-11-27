<template>
  <div class="bg-black text-white min-h-screen">
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent">
      <nav class="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        <img src="https://tamokul.com/new-landing/assets/images/logo/header-logo.webp" alt="Tam Okul" class="h-8" />
        <div class="flex items-center space-x-4">
          <button class="bg-sky-600 text-white px-4 py-2 rounded">Optik İşaretle</button>
        </div>
      </nav>
    </header>
  
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center">
      <img :src="heroImage" alt="Hero" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black bg-opacity-60"></div>
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Sınırsız eğitim videoları, her zaman, her yerde.</h1>
        <p class="text-xl sm:text-2xl mb-8">Kendi hızınızda öğrenin. Bilgi dünyasını keşfedin.</p>
        <div class="relative inline-flex group">
          <div class="absolute transitiona-all duration-300 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-flash"></div>
          <button @click="openModal" class="relative inline-flex items-center justify-center px-6 py-3 text-lg font-bold text-white transition-all duration-200 bg-black font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" role="button">
            Öğrenim Yolculuğum
          </button>
        </div>
      </div>
    </section>
  
    <!-- Content Sections -->
    <section v-for="(section, index) in sections" :key="index" class="py-12 px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl sm:text-3xl font-bold mb-6">{{ section.title }}</h2>
      <div class="relative">
        <button @click="scroll(index, 'left')" class="left-chevron absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hidden sm:block">
          <ChevronLeftIcon class="w-6 h-6" />
        </button>
        <button @click="scroll(index, 'right')" class="right-chevron absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hidden sm:block">
          <ChevronRightIcon class="w-6 h-6" />
        </button>
        <div 
          :ref="el => { if (el) scrollContainers[index] = el }" 
          class="flex space-x-4 overflow-x-auto scrollbar-hide select-none"
          :class="{ 'dragging': isDragging }"
          @mousedown="startDrag"
          @mousemove="drag"
          @mouseup="endDrag"
          @mouseleave="endDrag"
          @touchstart="startDrag"
          @touchmove="drag"
          @touchend="endDrag"
        >
          <div 
            v-for="item in section.items" 
            :key="item.id" 
            class="flex-shrink-0 w-64 sm:w-72 relative group cursor-pointer"
            @click="openContentModal(item, section.type)"
          >
            <img v-if="section.type !== 'quote'" :src="item.image" :alt="item.title" @dragstart.prevent class="w-full h-40 object-cover rounded-md transition-opacity duration-300" />
            <div v-if="section.type === 'quote'" class="w-full h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center p-4">
              <p class="text-white text-center text-lg font-semibold">{{ item.quote }}</p>
            </div>
            <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
              <p class="text-sm font-semibold truncate text-white opacity-75 group-hover:opacity-100 transition-opacity duration-300">{{ item.title }}</p>
              <p v-if="section.type !== 'quote'" class="text-xs text-gray-300 truncate opacity-75 group-hover:opacity-100 transition-opacity duration-300">{{ item.subtitle }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 py-3 px-4 sm:px-6 lg:px-8">
      <div class="container mx-auto">
        <p class="text-center text-sm">&copy; {{ new Date().getFullYear() }} Tam Okul. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  
    <!-- Spotify Wrapped Style Modal -->
    <WrappedModal :show="showModal" @close="closeModal" />
    
    <!-- Content Modal -->
    <ContentModal :show="showContentModal" @close="closeContentModal">
      <LessonContent v-if="selectedLesson" :lesson="selectedLesson" />
    </ContentModal>
  </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next';
  import WrappedModal from '@/components/WrappedModal.vue';
  import ContentModal from '@/components/ContentModal.vue';
  import LessonContent from '@/components/LessonContent.vue';
  
  const movieImages = [
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=450&q=80',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=450&q=80',
  'https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=450&q=80',
  'https://images.unsplash.com/photo-1512070679279-8988d32161be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=450&q=80',
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=450&q=80',
  'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=450&q=80',
  'https://images.unsplash.com/photo-1611419010196-a360856fc42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=450&q=80',
  'https://images.unsplash.com/photo-1578022761797-b8636ac1773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=450&q=80',
  'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=450&q=80',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=450&q=80'
  ];
  
  const scrollContainers = ref([]);
  const isDragging = ref(false);
  const startX = ref(0);
  const scrollLeft = ref(0);
  const momentum = ref({ velocity: 0, timestamp: 0 });
  const animationFrame = ref(null);
  const showModal = ref(false);
  const showContentModal = ref(false);
  const selectedLesson = ref(null);
  
  const heroImage = "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80";
  
  const generateItems = (count, prefix, type = 'video') => {
    return Array.from({ length: count }, (_, i) => ({
      id: `${prefix}-${i + 1}`,
      title: type === 'quote' ? '' : `${prefix} ${type === 'music' ? 'Şarkı' : 'Video'} ${i + 1}`,
      subtitle: type === 'quote' ? '' : `${prefix} ${type === 'music' ? 'Sanatçı' : 'Kanal'} ${Math.floor(i / 5) + 1}`,
      image: movieImages[Math.floor(Math.random() * movieImages.length)],
      quote: type === 'quote' ? motivationalQuotes[i % motivationalQuotes.length] : ''
    }));
  };
  
  const motivationalQuotes = [
    "Başarı, her gün tekrarlanan küçük çabalarının toplamıdır.",
    "Zorluklar, seni hedefinden uzaklaştırmasın, seni güçlendirsin.",
    "Bugün yapabileceğin en küçük adım, yarın için büyük bir sıçramadır.",
    "Başarısızlık, vazgeçtiğin an gerçekleşir. O yüzden asla vazgeçme!",
    "Her yeni gün, yeni bir başlangıç için bir fırsattır."
  ];
  
  const generateStories = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `story-${i + 1}`,
      title: `Başarı Hikayesi ${i + 1}`,
      subtitle: "İlham Veren Öğrenci Deneyimi",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=450&q=80"
    }));
  };
  
  const generateBooks = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `book-${i + 1}`,
      title: `Kitap Önerisi ${i + 1}`,
      subtitle: "Yazar Adı",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=450&q=80"
    }));
  };
  
  const sections = [
    { title: 'Fizik', items: generateItems(20, 'Fizik'), type: 'video' },
    { title: 'Kimya', items: generateItems(20, 'Kimya'), type: 'video' },
    { title: 'Motivasyon Müzikleri', items: generateItems(20, 'Motivasyon', 'music'), type: 'music' },
    { title: 'Biyoloji', items: generateItems(20, 'Biyoloji'), type: 'video' },
    { title: 'Matematik', items: generateItems(20, 'Matematik'), type: 'video' },
    { title: 'İlham Veren Sözler', items: generateItems(5, 'Motivasyon', 'quote'), type: 'quote' },
    { title: 'Tarih', items: generateItems(20, 'Tarih'), type: 'video' },
    { title: 'Felsefe', items: generateItems(20, 'Felsefe'), type: 'video' },
    { title: 'Başarı Hikayeleri', items: generateStories(10), type: 'story' },
    { title: 'Coğrafya', items: generateItems(20, 'Coğrafya'), type: 'video' },
    { title: 'Türkçe', items: generateItems(20, 'Türkçe'), type: 'video' },
    { title: 'Kitap Önerileri', items: generateBooks(15), type: 'book' },
    { title: 'Din Kültürü', items: generateItems(20, 'Din Kültürü'), type: 'video' },
    { title: 'Sosyal Bilgiler', items: generateItems(20, 'Sosyal Bilgiler'), type: 'video' },
  ];
  
  const scroll = (index, direction) => {
    const container = scrollContainers.value[index];
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  const startDrag = (e) => {
    isDragging.value = true;
    const container = e.currentTarget;
    startX.value = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    scrollLeft.value = container.scrollLeft;
    momentum.value = { velocity: 0, timestamp: Date.now() };
  };
  
  const drag = (e) => {
    if (!isDragging.value) return;
    e.preventDefault();
    const container = e.currentTarget;
    const x = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const walk = (x - startX.value) * 2;
    container.scrollLeft = scrollLeft.value - walk;
  
    const currentTimestamp = Date.now();
    const dt = currentTimestamp - momentum.value.timestamp;
    const velocity = (container.scrollLeft - scrollLeft.value) / dt;
  
    momentum.value = { velocity, timestamp: currentTimestamp };
  };
  
  const endDrag = (e) => {
    isDragging.value = false;
    const container = e.currentTarget;
  
    const applyMomentum = () => {
      momentum.value.velocity *= 0.95; // Decay factor
      container.scrollLeft += momentum.value.velocity;
      
      if (Math.abs(momentum.value.velocity) > 0.5) {
        animationFrame.value = requestAnimationFrame(applyMomentum);
      }
    };
  
    cancelAnimationFrame(animationFrame.value);
    animationFrame.value = requestAnimationFrame(applyMomentum);
  };
  
  const openModal = () => {
    showModal.value = true;
  };
  
  const closeModal = () => {
    showModal.value = false;
  };
  
  const openContentModal = (item, sectionType) => {
    if (sectionType === 'video') {
      selectedLesson.value = {
        title: item.title,
        channelName: item.subtitle,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        content: `
          <h2>Küme İşlemleri Notları</h2>
          <h3>Küme Tanımı</h3>
          <ul>
            <li>Küme, birbirinden farklı nesnelerin oluşturduğu topluluktur.</li>
            <li>Canlı veya cansız nesnelerden oluşabilir.</li>
            <li>İyi tanımlanmış olması gereklidir; nesneler herkesin aklında aynı şeyleri çağrıştırmalıdır.</li>
          </ul>
          <h3>Küme Gösterimi</h3>
          <ul>
            <li>Kümeler, sembollerle (örneğin A, B, C) gösterilir.</li>
            <li>Elemanlar süslü parantez içinde belirtilir: ( A = { x_1, x_2, x_3 } ).</li>
            <li>Küme elemanları birbirinden ayrılmalıdır, bu nedenle tekrar eden eleman yoktur.</li>
          </ul>
          <h3>Eleman Sayısı</h3>
          <ul>
            <li>Kümenin eleman sayısı belirtilebilir: 11 elemanlı bir küme gibi.</li>
            <li>Boş küme, eleman içermeyen kümedir (∅).</li>
          </ul>
          <h3>Küme Sınıflandırmaları</h3>
          <ul>
            <li>Sonlu Kümeler: Belirli sayıda eleman içerir. Örnek: 1, 2, 3.</li>
            <li>Sonsuz Kümeler: Sonsuz sayıda eleman içerir. Örnek: Tam sayılar, reel sayılar.</li>
          </ul>
          <h3>Elemanları Belirleme Yöntemleri</h3>
          <ul>
            <li>Liste Yöntemi: Kümenin elemanları yazılarak gösterilir.</li>
            <li>Ortak Özellik Yöntemi: Kümenin elemanları belirli ortak özellikleri olan nesnelerden seçilir.</li>
          </ul>
        `
      };
      showContentModal.value = true;
    }
  };
  
  const closeContentModal = () => {
    showContentModal.value = false;
  };
  
  onMounted(() => {
    scrollContainers.value.forEach(container => {
      if (container) {
        container.style.cursor = 'grab';
      }
    });
  });
  
  onUnmounted(() => {
    cancelAnimationFrame(animationFrame.value);
  });
  </script>
  
  <style scoped>
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
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
  </style>
  
  