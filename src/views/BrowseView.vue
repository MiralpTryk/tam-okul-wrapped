<template>
  <div class="flex flex-col bg-black text-white relative">
    <div class="absolute top-0 left-0 right-0 z-50 rounded-full bg-red-500 h-16 w-16">
    </div>
    <!-- Header -->
    <header
      class="sticky top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-zinc-800 bg-black"
      
    >
      <nav class="mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-16 2xl:px-24">
        <a href="/">
        <img
          src="@/assets/tam-okul-logo-dark.webp"
          alt="Tam Okul"
          class="h-8"
        />
        </a>
        <div class="flex items-center space-x-4">
          <RouterLink to="/optic-form">
            <button class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded text-sm">
              Optik İşaretle
            </button>
          </RouterLink>
        </div>
      </nav>
    </header>

    <!-- Content wrapper -->
    <div class="flex flex-1">


      <!-- Sidebar -->
      <aside class="fixed top-16 w-64 h-[calc(100vh-4rem)] bg-black overflow-y-auto border-r border-zinc-800">
        <div class="px-4 py-8">
          <nav>
            <ul>
              <li v-for="category in categories" :key="category.id" class="mb-2">
                <button
                  @click="toggleCategory(category.id)"
                  class="flex items-center justify-between w-full text-left py-2 px-4 rounded hover:bg-zinc-900 transition-colors font-semibold text-zinc-400 hover:text-zinc-300"
                >
                  <span>{{ category.name }}</span>
                  <ChevronDown
                    :class="{ 'transform -rotate-90': openCategories.includes(category.id) }"
                    class="w-4 h-4 transition-transform duration-200"
                  />
                </button>
                <ul v-if="openCategories.includes(category.id)" class="mx-4">
                  <li v-for="subcategory in category.subcategories" :key="subcategory">
                    <a
                      href="#"
                      @click.prevent="scrollToSection(category.id, subcategory)"
                      class="block py-1.5 px-4 truncate hover:bg-zinc-900 hover:border-l-2 hover:border-red-600 rounded-r transition-colors text-sm text-zinc-400 hover:text-zinc-300 border-l border-zinc-800"
                    >
                      {{ subcategory }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <!-- Main Content -->
      <main ref="mainContent" class="flex-1 overflow-y-auto p-8 ml-64">
        <div v-for="category in categories" :key="category.id" class="mb-12">
          <h2 :ref="el => { if (el) categoryRefs[category.id] = el }" class="text-3xl font-bold mb-6">
            {{ category.name }}
          </h2>
          <div v-for="subcategory in category.subcategories" :key="subcategory" class="mb-8">
            <h3 
              :ref="el => { if (el) subcategoryRefs[`${category.id}-${subcategory}`] = el }" 
              class="text-2xl font-semibold mb-4"
            >
              {{ subcategory }}
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              <div
                v-for="(index) in 5"
                :key="index"
                class="relative aspect-w-2 aspect-h-3 bg-zinc-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
                :style="{
                  backgroundImage: `url('${getMovieImage(index)}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '300px'
                }"
              >
                <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div class="absolute bottom-0 left-0 right-0 p-4">
                  <h4 class="text-lg font-semibold mb-1 text-white">Movie Title {{ index + 1 }}</h4>
                  <p class="text-sm text-zinc-300">2023 | Action, Adventure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const categories = [
  {
    id: 1,
    name: 'Matematik',
    subcategories: ['Sayılar', 'Permütasyon', 'Kombinasyon', 'Olasılık']
  },
  {
    id: 2,
    name: 'Fizik',
    subcategories: ['Kuvvet', 'Hareket', 'Enerji', 'Isı']
  },
  {
    id: 3,
    name: 'Kimya',
    subcategories: ['Kimyasal Reaksiyon', 'Kimyasal Formüller', 'Kimyasal Denklemler', 'Kimyasal Tepkimeler']
  },
  {
    id: 4,
    name: 'Biyoloji',
    subcategories: ['Hücre', 'Genetik', 'Biyokimya', 'Biyoloji']
  },
  {
    id: 5,
    name: 'Türkçe',
    subcategories: ['Türkçe', 'Türkçe', 'Türkçe', 'Türkçe']
  },
  {
    id: 6,
    name: 'Sosyal Bilgiler',
    subcategories: ['Sosyal Bilgiler', 'Sosyal Bilgiler', 'Sosyal Bilgiler', 'Sosyal Bilgiler']
  }
]

const openCategories = ref([])
const categoryRefs = ref({})
const subcategoryRefs = ref({})
const mainContent = ref(null)

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
    targetRef.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const getMovieImage = (index) => {
  const images = [
    'https://picsum.photos/seed/movie1/300/450',
    'https://picsum.photos/seed/movie2/300/450',
    'https://picsum.photos/seed/movie3/300/450',
    'https://picsum.photos/seed/movie4/300/450',
    'https://picsum.photos/seed/movie5/300/450'
  ]
  return images[index % images.length]
}

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 70
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Open the first category by default
  if (categories.length > 0) {
    openCategories.value.push(categories[0].id)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
/* Add custom scrollbar styles */
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

