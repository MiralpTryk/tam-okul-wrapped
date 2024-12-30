<template>
  <div class="min-h-screen bg-black text-white relative overflow-hidden">
    <!-- Grid Pattern Background -->
    <div class="fixed inset-0 z-0">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f_1px,transparent_1px)] bg-[size:8rem_8rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_20%,transparent_80%)] opacity-[0.35]"></div>
    </div>

    <div class="fixed inset-0 z-[1]">
      <!-- Purple gradient -->
      <div class="absolute top-[-6rem] -left-[10rem] w-[30rem] h-[30rem] bg-sky-500/60 rounded-full mix-blend-multiply filter blur-[128px] animate-blob [animation-delay:2000ms]"></div>
      
      <!-- Red gradient -->
      <div class="absolute top-[-1rem] -right-[10rem] w-[30rem] h-[30rem] bg-red-500/60 rounded-full mix-blend-multiply filter blur-[128px] animate-blob [animation-delay:3000ms]"></div>
      
      <!-- Blue gradient -->
      <div class="absolute top-[15rem] left-[30rem] w-[30rem] h-[30rem] bg-violet-500/60 rounded-full mix-blend-multiply filter blur-[128px] animate-blob [animation-delay:4000ms]"></div>
    </div>

    <AppHeader class="fixed top-0 left-0 right-0 z-50">
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
      <!-- Mobile Overlay -->
      <div v-show="isSidebarOpen" class="fixed inset-0 bg-black/50 z-20 xl:hidden" @click="toggleSidebar">
      </div>

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
          <div v-for="category in categories" :key="category.id" class="mb-12">
            <h2 :ref="el => { if (el) categoryRefs[category.id] = el }" class="text-2xl sm:text-3xl font-bold mb-6">
              {{ category.name }}
            </h2>
            <div v-for="subcategory in category.subcategories" :key="subcategory" class="mb-8">
              <h3 :ref="el => { if (el) subcategoryRefs[`${category.id}-${subcategory}`] = el }"
                class="text-xl sm:text-2xl font-semibold mb-4">
                {{ subcategory }}
              </h3>
              <!-- Responsive grid for video cards -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <div 
                  v-for="video in generateVideos(subcategory)"
                  :key="video.id"
                  class="aspect-video"
                >
                  <CourseCard
                    :item="video"
                    @click="openContentModal(video)"
                    class="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
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

      <!-- Add Content Modal -->
      <ContentModal :show="showContentModal" @close="closeContentModal">
        <template v-if="selectedLesson">
          <LessonContent v-if="selectedLesson.type === 'video'" :lesson="selectedLesson" />
        </template>
      </ContentModal>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick, watch } from 'vue'
import { ChevronDown, ChevronUp, Menu as MenuIcon, X as XIcon } from 'lucide-vue-next'
import AppHeader from "@/components/AppHeader.vue"
import analysis from '@/data/analysis.json'
import ContentModal from "@/components/ContentModal.vue";
import LessonContent from "@/components/LessonContent.vue";
import CourseCard from "@/components/CourseCard.vue"
import { useRoute } from 'vue-router'

const categories = computed(() => {
  const courses = analysis?.data?.content?.courses;
  if (!courses) return [];

  return courses.map(course => {
    return {
      id: course.title || course.title_uppercase,
      name: course.title || course.title_uppercase,
      subcategories: Object.keys(course.subjects || {})
    }
  });
});

const generateVideos = (subjectName) => {
  const course = analysis?.data?.content?.courses?.find(
    course => course.subjects && course.subjects[subjectName]
  );

  if (!course?.subjects?.[subjectName]?.videos?.length) {
    return [{
      id: `${subjectName}-default`,
      title: subjectName,
      channel_title: 'Eğitim Kanalı',
      video_id: "dQw4w9WgXcQ",
      thumbnail_url: `https://picsum.photos/seed/${subjectName}/300/450`,
      type: "video"
    }];
  }

  return course.subjects[subjectName].videos.map(video => ({
    id: video.id,
    title: video.title,
    channel_title: video.channel_title,
    thumbnail_url: video.thumbnail_url,
    video_id: video.video_id,
    description: video.description,
    summary: video.summary,
    type: "video"
  }));
};

const openCategories = ref([])
const categoryRefs = ref({})
const subcategoryRefs = ref({})
const observers = ref({})

const toggleCategory = (categoryId) => {
  const index = openCategories.value.indexOf(categoryId)
  if (index === -1) {
    openCategories.value.push(categoryId)
  } else {
    openCategories.value.splice(index, 1)
  }
}

const scrollToSection = (categoryId, subcategory) => {
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

const showContentModal = ref(false);
const selectedLesson = ref(null);

const openContentModal = (video) => {
  selectedLesson.value = {
    title: video.title,
    channel_title: video.channel_title,
    video_id: video.video_id,
    description: video.description,
    summary: video.summary,
    type: "video"
  };
  showContentModal.value = true;
};

const closeContentModal = () => {
  showContentModal.value = false;
  selectedLesson.value = null;
};

const route = useRoute()

const scrollToSectionByTitle = (sectionTitle) => {
  const normalizedSearch = sectionTitle.toLowerCase().trim();
  
  const category = categories.value.find(cat => {
    const normalizedName = (cat.name || cat.title || cat.title_uppercase || '').toLowerCase().trim();
    return normalizedName === normalizedSearch;
  });

  if (category) {
    if (!openCategories.value.includes(category.id)) {
      toggleCategory(category.id);
    }

    nextTick(() => {
      const element = categoryRefs.value[category.id];
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: 'smooth'
        });
      }
    });
  } else {
    // console.log('Category not found:', sectionTitle);
  }
};

watch(
  () => route.query.section,
  (newSection) => {
    if (newSection) {
      scrollToSectionByTitle(newSection)
    }
  },
  { immediate: true }
)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  if (categories.value.length > 0) {
    openCategories.value.push(categories.value[0].id)
  }
  window.addEventListener('resize', handleResize)

  nextTick(() => {
    Object.entries(subcategoryRefs.value).forEach(([sectionId, element]) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              activeSection.value = sectionId
            }
          })
        },
        {
          rootMargin: '-10% 0px -70% 0px',
          threshold: 0
        }
      )

      if (element) {
        observer.observe(element)
        observers.value[sectionId] = observer
      }
    })
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)

  Object.values(observers.value).forEach(observer => {
    observer.disconnect()
  })
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
