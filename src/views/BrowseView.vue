<template>
  <div class="min-h-screen bg-black text-white relative overflow-hidden">
    <!-- Grid Pattern Background -->
    <div class="fixed inset-0 z-0">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f_1px,transparent_1px)] bg-[size:8rem_8rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_20%,transparent_80%)] opacity-[0.35]"></div>
    </div>

    <div class="fixed inset-0 z-[1]">
      <!-- Purple gradient -->
      <div class="absolute top-[-6rem] -left-[10rem] w-[15rem] h-[15rem] sm:w-[20rem] sm:h-[20rem] md:w-[25rem] md:h-[25rem] lg:w-[30rem] lg:h-[30rem] bg-sky-500/60 rounded-full mix-blend-multiply filter blur-[64px] sm:blur-[96px] md:blur-[112px] lg:blur-[128px] animate-blob [animation-delay:2000ms]"></div>
      
      <!-- Red gradient -->
      <div class="absolute top-[-1rem] -right-[10rem] w-[15rem] h-[15rem] sm:w-[20rem] sm:h-[20rem] md:w-[25rem] md:h-[25rem] lg:w-[30rem] lg:h-[30rem] bg-red-500/60 rounded-full mix-blend-multiply filter blur-[64px] sm:blur-[96px] md:blur-[112px] lg:blur-[128px] animate-blob [animation-delay:3000ms]"></div>
      
      <!-- violet gradient -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[15rem] h-[15rem] sm:w-[20rem] sm:h-[20rem] md:w-[25rem] md:h-[25rem] lg:w-[30rem] lg:h-[30rem] bg-violet-500/60 rounded-full mix-blend-multiply filter blur-[64px] sm:blur-[96px] md:blur-[112px] lg:blur-[128px] animate-blob [animation-delay:4000ms]"></div>
    </div>

    <AppHeader>
      <template #before-button>
        <button 
          @click="toggleSidebar" 
          class="xl:hidden text-white hover:text-gray-300" 
          aria-label="Toggle menu"
          type="button"
        >
          <MenuIcon v-if="!isSidebarOpen" class="w-6 h-6" />
          <XIcon v-else class="w-6 h-6" />
        </button>
      </template>
    </AppHeader>

    <div class="pt-[4.5rem] min-h-screen relative z-10">
      <!-- Loading State - Removed spinner, using only skeletons -->
      <!-- <div v-if="loading" class="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
        <div class="animate-spin rounded-full h-12 w-12 border-2 border-red-600 border-t-transparent mb-4"></div>
        <p class="text-zinc-400">Veriler yükleniyor...</p>
      </div> -->

      <!-- Mobile Overlay -->
      <div v-show="isSidebarOpen" class="fixed inset-0 bg-black/50 z-20 xl:hidden" @click="toggleSidebar">
      </div>

      <!-- Sidebar -->
      <aside :class="[
        'fixed z-30',
        'top-16 h-[calc(100vh-64px)]',
        'w-[280px] xl:w-[20%] xl:min-w-[300px]',
        'border-r border-zinc-800',
        'backdrop-blur-sm',
        'xl:bg-transparent bg-[#141414]/70 backdrop-blur-sm',
        'transition-all duration-300 ease-in-out',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'
      ]">
        <div ref="sidebarRef" class="h-full overflow-y-auto no-scroll-propagation">
          <div class="px-4 py-8">
            <nav>
              <ul class="space-y-4">
                <template v-if="!loading && categories.length > 0">
                  <li v-for="category in categories" :key="category.id" class="mb-2">
                    <button @click="toggleCategory(category.id)"
                      class="flex items-center justify-between w-full text-left py-3 px-4 rounded hover:bg-zinc-900/50 transition-colors font-semibold text-zinc-200 hover:text-zinc-100">
                      <span>{{ category.name }}</span>
                      <ChevronDown :class="{ 'transform rotate-0': openCategories.includes(category.id) }"
                        class="w-4 h-4 transition-transform duration-200 -rotate-90" />
                    </button>
                    <ul v-if="openCategories.includes(category.id)" class="mx-4 mt-2">
                      <li v-for="subcategory in category.subcategories" :key="subcategory">
                        <a href="#" @click.prevent="scrollToSection(category.id, subcategory)"
                          :data-section="`${category.id}-${subcategory}`" :class="[
                            'block py-3 px-4 truncate rounded-r transition-colors text-sm border-l',
                            isActiveSection(`${category.id}-${subcategory}`)
                              ? 'bg-zinc-900/50 border-l-4 border-red-600 text-zinc-300'
                              : 'hover:bg-zinc-950/50 hover:border-l-4 hover:border-red-700 text-zinc-200 hover:text-zinc-100 border-zinc-800'
                          ]">
                          {{ subcategory }}
                        </a>
                      </li>
                    </ul>
                  </li>
                </template>
                <template v-else>
                  <!-- Skeleton Loading for Categories -->
                  <li v-for="n in 5" :key="n" class="mb-2 animate-pulse">
                    <div class="h-12 bg-zinc-700/50 rounded mb-2"></div>
                    <div class="space-y-2 ml-4">
                      <div v-for="i in 3" :key="i" class="h-8 bg-zinc-400/30 rounded"></div>
                    </div>
                  </li>
                </template>
              </ul>
            </nav>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <div :class="[
        'transition-all duration-300',
        'xl:ml-[20%]',
        'relative'
      ]">
        <main class="p-4 sm:p-6 xl:p-8">
          <template v-if="!loading && categories.length > 0">
            <div v-for="category in categories" :key="category.id" class="mb-16">
              <!-- Category Title -->
              <h2 :ref="el => { if (el) categoryRefs[category.id] = el }" 
                class="text-2xl sm:text-3xl font-bold mb-8 break-words">
                {{ category.name }}
              </h2>

              <!-- Subcategories -->
              <div v-for="subcategory in category.subcategories" :key="subcategory" class="mb-12">
                <!-- Subcategory Header -->
                <div class="mb-6">
                  <h3 :ref="el => { if (el) subcategoryRefs[`${category.id}-${subcategory}`] = el }"
                    class="flex flex-wrap items-center gap-3">
                    <span class="text-xl sm:text-2xl font-semibold break-words">{{ subcategory }}</span>

                  </h3>
                </div>

                <!-- Video Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <div 
                    v-for="video in generateVideos(subcategory, category.id)"
                    :key="video.id"
                    class="flex flex-col h-full"
                  >
                    <ContentCard 
                      :item="video" 
                      :type="'lesson'"
                      @click="(item, type) => openContentModal(item, type)"
                      class="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template v-else-if="!loading && categories.length === 0">
            <div class="text-center py-12">
              <p class="text-zinc-400">Henüz hiç ders bulunamadı.</p>
            </div>
          </template>

          <template v-else>
            <!-- Skeleton Loading -->
            <div v-for="n in 3" :key="n" class="mb-16">
              <!-- Category Title Skeleton -->
              <div class="h-10 bg-zinc-400/50 rounded w-1/3 mb-8 animate-pulse"></div>
              
              <!-- Subcategories -->
              <div v-for="i in 2" :key="i" class="mb-12">
                <!-- Subcategory Header Skeleton -->
                <div class="h-8 bg-zinc-400/30 rounded w-1/4 mb-6 animate-pulse"></div>
                
                <!-- Video Grid Skeleton -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <div v-for="j in 4" :key="j" class="flex flex-col">
                    <!-- Thumbnail Skeleton -->
                    <div class="aspect-video bg-zinc-400/30 rounded-lg mb-3 animate-pulse"></div>
                    <!-- Title Skeleton -->
                    <div class="h-4 bg-zinc-400/40 rounded w-3/4 mb-2 animate-pulse"></div>
                    <!-- Subtitle Skeleton -->
                    <div class="h-3 bg-zinc-400/30 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </main>
      </div>

      <!-- Back to Top Button - Updated visibility condition -->
      <button @click="scrollToTop" :class="[
        'fixed bottom-6 right-6 z-[60]',
        'bg-red-600 hover:bg-red-700',
        'rounded-full p-3 shadow-lg',
        'transition-all duration-300 ease-in-out',
        showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      ]" aria-label="Back to top">
        <ChevronUp class="w-6 h-6 text-white" />
      </button>
    </div>

    <!-- Content Modal Container -->
    <div class="relative z-[100]">
      <ContentModal :show="showContentModal" @close="closeContentModal">
        <template v-if="selectedLesson">
          <LessonContent v-if="selectedLesson.type === 'lesson'" :lesson="selectedLesson" />
        </template>
      </ContentModal>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick, watch } from 'vue'
import { ChevronUp, Menu as MenuIcon, X as XIcon, ChevronDown } from 'lucide-vue-next'
import AppHeader from "@/components/AppHeader.vue"
import { useAnalysisStore } from '@/composables/useAnalysisStore'
import { useLoading } from '@/composables/useLoading'
import ContentModal from "@/components/ContentModal.vue"
import LessonContent from "@/components/LessonContent.vue"
import ContentCard from "@/components/ContentCard.vue"
import { useRoute, useRouter } from 'vue-router'
import { useModal } from '@/composables/useModal'

// Route'u en üstte tanımla
const route = useRoute()
const router = useRouter()
const analysisStore = useAnalysisStore()

// Loading state yönetimini useLoading composable'ından al
const { 
  loading,
  startLoading,
  stopLoading,
  setError
} = useLoading();

// Categories computed property'sini güncelle
const categories = computed(() => {
  const courses = analysisStore.courses.value;
  if (!courses || !Array.isArray(courses)) {
    return [];
  }

  return courses.map(course => {
    const subjectsWithVideos = Object.entries(course.subjects || {})
      .filter(([, subjectData]) => {
        const videos = subjectData.videos;
        return Array.isArray(videos) && videos.filter(video => video && video.video_id).length > 0;
      })
      .map(([subjectName]) => subjectName);

    return {
      id: course.title || course.title_uppercase,
      name: course.title || course.title_uppercase,
      subcategories: subjectsWithVideos
    };
  }).filter(category => category.subcategories.length > 0);
});

const generateVideos = (subjectName, categoryId) => {
  console.log('BrowseView - Generating videos for:', { subjectName, categoryId });
  
  // Dersi bul
  const course = analysisStore.courses.value?.find(course => {
    const courseTitle = (course.title || course.title_uppercase || '').toLowerCase();
    const searchTitle = (categoryId || '').toLowerCase();
    const matches = courseTitle === searchTitle;
    console.log('BrowseView - Comparing course:', { courseTitle, searchTitle, matches });
    return matches;
  });

  if (!course) {
    console.log('BrowseView - No course found for:', categoryId);
    return [];
  }

  // Konuyu bul
  const subject = course.subjects?.[subjectName];
  if (!subject) {
    console.log('BrowseView - No subject found:', subjectName);
    return [];
  }

  // Videoları kontrol et
  const videos = subject.videos;
  if (!Array.isArray(videos)) {
    console.log('BrowseView - No videos array found for subject:', subjectName);
    return [];
  }

  // Videoları işle
  const processedVideos = videos
    .filter(video => {
      const isValid = video && video.video_id;
      if (!isValid) {
        console.log('BrowseView - Invalid video found:', video);
      }
      return isValid;
    })
    .map((video, index) => {
      const processedVideo = {
        ...video,
        id: `${video.id || video.video_id}-${subjectName}-${index}`,
        type: "lesson",
        subjectName,
        description: video.description || 'Video açıklaması bulunmuyor.',
        study_notes: video.study_notes || 'Video özeti bulunmuyor.',
        channel_title: video.channel_title || 'Tam Okul'
      };
      console.log('BrowseView - Processed video:', processedVideo);
      return processedVideo;
    });

  console.log('BrowseView - Generated videos count:', processedVideos.length);
  return processedVideos;
};

const openCategories = ref([])
const categoryRefs = ref({})
const subcategoryRefs = ref({})
const observers = ref({})

const toggleCategory = (categoryId) => {
  console.log('BrowseView - Toggling category:', categoryId);
  console.log('BrowseView - Current open categories:', openCategories.value);
  
  const index = openCategories.value.indexOf(categoryId);
  if (index === -1) {
    // Kategoriyi aç
    openCategories.value.push(categoryId);
  } else {
    // Kategoriyi kapat
    openCategories.value.splice(index, 1);
  }
  
  console.log('BrowseView - Open categories after toggle:', openCategories.value);
};

const scrollToSection = (categoryId, subcategory) => {
  // Önce yönlendirme yap
  navigateToSection(categoryId, subcategory);

  // Sonra scroll işlemini gerçekleştir
  const targetRef = subcategoryRefs.value[`${categoryId}-${subcategory}`]
  if (targetRef) {
    if (window.innerWidth < 1280) {
      isSidebarOpen.value = false

      setTimeout(() => {
        const headerOffset = 80
        const elementPosition = targetRef.getBoundingClientRect().top + window.pageYOffset
        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: 'smooth'
        })
      }, 300)
    } else {
      const headerOffset = 80
      const elementPosition = targetRef.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth'
      })
    }
  }
}

const showBackToTop = ref(false)

const handleScroll = () => {
  showBackToTop.value = window.scrollY > window.innerHeight
}

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
  // console.log('Sidebar toggled:', isSidebarOpen.value)
}


const handleResize = () => {
  if (window.innerWidth >= 1280 && isSidebarOpen.value) {
    toggleSidebar()
  }
}

const activeSection = ref('')
const sidebarRef = ref(null)

const isActiveSection = (sectionId) => {
  if (activeSection.value === sectionId) {
    if (window.innerWidth >= 1280) {
      nextTick(() => {
        const activeMenuItem = document.querySelector(`[data-section="${sectionId}"]`)
        if (activeMenuItem && sidebarRef.value) {
          activeMenuItem.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          })
        }
      })
    }
    return true
  }
  return false
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const { 
  showContentModal, 
  selectedLesson, 
  openContentModal: originalOpenContentModal, 
  closeContentModal,
  cleanup: modalCleanup 
} = useModal();

const openContentModal = (video, type) => {
  console.log('BrowseView - Opening modal with video:', video);
  console.log('BrowseView - Modal type:', type);
  originalOpenContentModal(video, type);
  console.log('BrowseView - Selected lesson after open:', selectedLesson.value);
  console.log('BrowseView - Modal visibility after open:', showContentModal.value);
};

const scrollToCategory = async (categoryTitle) => {
  if (!categoryTitle) return;
  
  console.log('BrowseView - Trying to scroll to category:', categoryTitle);

  // Verinin yüklenmesini bekle
  if (loading.value) {
    console.log('BrowseView - Waiting for data to load...');
    await new Promise(resolve => {
      const unwatch = watch(loading, (newLoading) => {
        if (!newLoading) {
          unwatch();
          resolve();
        }
      });
    });
  }

  // DOM'un güncellenmesini bekle
  await nextTick();
  console.log('BrowseView - Categories after loading:', categories.value);

  // Kategoriyi bul
  const category = categories.value.find(cat => {
    const matches = cat.name === categoryTitle;
    console.log('BrowseView - Comparing:', {
      categoryName: cat.name,
      searchTitle: categoryTitle,
      matches
    });
    return matches;
  });

  if (!category) {
    console.log('BrowseView - Category not found:', categoryTitle);
    return;
  }

  console.log('BrowseView - Found category:', category.name);

  // Önce diğer kategorileri kapat
  openCategories.value = [];
  
  // Bu kategoriyi aç
  openCategories.value.push(category.id);
  console.log('BrowseView - Opened category:', category.id);

  // DOM'un güncellenmesini bekle
  await nextTick();

  // Kategoriye scroll yap
  const element = categoryRefs.value[category.id];
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    
    console.log('BrowseView - Scrolling to position:', elementPosition - headerOffset);
    
    window.scrollTo({
      top: elementPosition - headerOffset,
      behavior: 'smooth'
    });
  } else {
    console.log('BrowseView - Category element not found in refs');
  }
};

// Route watcher'ı güncelle
watch(
  () => route.query.course,
  async (newCourse) => {
    if (newCourse) {
      console.log('BrowseView - Course changed in URL:', newCourse);
      await scrollToCategory(newCourse);
    }
  },
  { immediate: true }
);

// Yönlendirme fonksiyonunu güncelle
const navigateToSection = (categoryId, subcategory) => {
  router.push({
    name: 'browse',
    params: { code: route.params.code },
    query: { section: subcategory }
  });
};

// Kategorileri izleyelim ve değişiklikleri loglayalım
watch(openCategories, (newCategories) => {
  console.log('BrowseView - Open categories changed:', newCategories);
});

// Kategorileri otomatik açmak için watch ekleyelim
watch(categories, (newCategories) => {
  if (newCategories.length > 0 && openCategories.value.length === 0) {
    const firstCategory = newCategories[0];
    console.log('BrowseView - Auto opening first category:', firstCategory.id);
    openCategories.value = [firstCategory.id];
  }
}, { immediate: true });

// Loading state'lerini izleyelim
watch(loading, (newLoading) => {
  console.log('BrowseView - Loading state changed:', {
    loading: newLoading
  });
  
  // Loading bittiğinde kategorileri kontrol et
  if (!newLoading && categories.value.length > 0 && openCategories.value.length === 0) {
    const firstCategory = categories.value[0];
    console.log('BrowseView - Auto opening first category after loading:', firstCategory.id);
    openCategories.value = [firstCategory.id];
  }
});

onMounted(async () => {
  const code = route.params.code;
  console.log('BrowseView - Mounting with code:', code);
  
  try {
    startLoading();
    console.log('BrowseView - Started loading');
    
    // Veriyi yükle
    const data = await analysisStore.fetchAnalysisData(code);
    console.log('BrowseView - Data fetched:', data);
    
    // Veri yüklendikten sonra loading'i kapat
    stopLoading();
    console.log('BrowseView - Loading stopped');
    
    // DOM'un güncellenmesini bekle
    await nextTick();
    console.log('BrowseView - DOM updated');
    
    // URL'de course parametresi varsa o kategoriye git
    const course = route.query.course;
    if (course) {
      console.log('BrowseView - Found course in URL:', course);
      await scrollToCategory(course);
    } else if (categories.value.length > 0) {
      // Yoksa ilk kategoriyi aç
      console.log('BrowseView - Opening first category:', categories.value[0].id);
      openCategories.value = [categories.value[0].id];
    }
  } catch (err) {
    console.error('BrowseView - Error loading data:', err);
    setError(err);
    stopLoading(); // Hata durumunda da loading'i kapat
  }

  // Event listener'ları ekle
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);

  // Intersection Observer'ları ayarla
  nextTick(() => {
    Object.entries(subcategoryRefs.value).forEach(([sectionId, element]) => {
      if (!element) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              activeSection.value = sectionId;
            }
          });
        },
        {
          rootMargin: '-10% 0px -70% 0px',
          threshold: 0
        }
      );

      observer.observe(element);
      observers.value[sectionId] = observer;
    });
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)

  Object.values(observers.value).forEach(observer => {
    observer.disconnect()
  })

  modalCleanup();
})
</script>

<style>
/* Global scrollbar styles - these can't be done with Tailwind */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #4a4a4a;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #5a5a5a;
}
</style>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
