<template>
  <div class="bg-black text-white min-h-screen">
    <!-- Header -->
    <header :class="[
      'fixed top-0 left-0 right-0 z-20 transition-all duration-300',
      isScrolled ? 'bg-black backdrop-blur-sm' : 'bg-gradient-to-b from-black to-transparent'
    ]">
      <nav class=" mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-16 2xl:px-24">
        <a href="/">
          <img src="https://tamokul.com/new-landing/assets/images/logo/header-logo.webp" alt="Tam Okul" class="h-8" />
        </a>
        <div class="flex items-center space-x-4">
          <RouterLink to="/optic-form">
            <button
              class="bg-[#E50914] hover:bg-[#E50914]/90 text-white px-6 py-2 rounded text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-[#E50914]/20 hover:scale-105 active:scale-100">
              Optik İşaretle
            </button>
          </RouterLink>
        </div>
      </nav>
    </header>

    <!-- Info Modal -->
    <Transition name="modal">
      <div v-if="showInfoModal" class="fixed inset-0 z-[60]">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <!-- Modal Content -->
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-0 sm:p-4" @click="showInfoModal = false">
            <div
              class="max-w-3xl relative transform sm:rounded-2xl bg-zinc-900 p-4 sm:p-6 text-left shadow-xl transition-all overflow-y-auto z-50 sm:max-h-[80vh] md:rounded-2xl sm:m-4 h-screen w-screen m-0 rounded-none sm:h-auto sm:w-auto">
              <div class="absolute top-0 right-0">
                <button v-if="isMobile" @click="showInfoModal = false"
                  class="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-gray-200 z-50 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-xl sm:text-3xl">
                  &times;
                </button>
              </div>
              <h3 class="text-base sm:text-lg font-medium leading-6 text-white mb-4">
                Neden bu videoları görüyorum?
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
                  @click="showInfoModal = false">
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
      <div
        class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-30% from-black via-black/70 to-transparent overflow-hidden">
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
      </div>
      <div class="absolute inset-0"></div>
      <div class="px-4 sm:px-6 lg:px-16 2xl:px-24 relative z-10 flex flex-col justify-center h-full">
        <div class="max-w-[720px] mb-8">
          <h1 class="text-3xl sm:text-4xl font-bold mb-4">
            Merhaba
            <span class="inline-flex items-center -mr-2">
              <DecodeText :text="userName" :interval="5000" />
            </span>
            , senin için tasarlanan eşsiz öğrenme deneyimine hoş geldin!
          </h1>
          <p class="text-sm sm:text-base bg-black/50 sm:bg-transparent rounded-lg px-4 py-2">
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
            <button @click="openModal"
              class="relative inline-flex items-center justify-center px-6 py-2 text-lg text-black transition-all bg-white hover:bg-white/70 focus:ring-red-600 active:scale-95 rounded"
              role="button">
              <Play class="w-6 h-6 mr-2 fill-black" /> {{ new Date().getFullYear() }} Öğrenme Yolculuğun

            </button>
            <!-- <AnimatedCTAButton @click="openModal" /> -->
            <!-- <GlowingCTAButton @click="openModal" /> -->
          </div>
        </div>
      </div>
    </section>

    <!-- Content Sections -->
    <section v-for="(section, index) in sections" :key="index" class="pb-6 px-4 sm:px-6 lg:px-16 2xl:px-24">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <h2 class="text-xl">{{ section.title }}</h2>

          <!-- Mobile Button -->
          <button v-if="!['music', 'quote', 'story', 'book'].includes(section.type)"
            class="sm:hidden bg-zinc-800 text-white rounded-full w-8 h-8 flex items-center justify-center z-10"
            @click="showInfoModal = true">
            <span class="text-sm flex-shrink-0 flex items-center justify-center">
              <Info class="w-4 h-4" />
            </span> </button>

          <!-- Desktop Button -->
          <button v-if="!['music', 'quote', 'story', 'book'].includes(section.type)"
            class="hidden sm:flex bg-zinc-800 text-white rounded-full items-center justify-end transition-all duration-300 ease-in-out overflow-hidden z-10"
            :class="{ 'w-8 h-8': !hoveredSection[index], 'w-[228px] h-8': hoveredSection[index] }"
            @mouseenter="hoveredSection[index] = true" @mouseleave="hoveredSection[index] = false"
            @click="showInfoModal = true">
            <div class="flex items-center w-full h-full justify-end">
              <span class="whitespace-nowrap text-xs transition-all duration-300 ease-in-out overflow-hidden mr-1"
                :class="{ 'w-0 opacity-0': !hoveredSection[index], 'w-auto opacity-100': hoveredSection[index] }">
                Neden bu videoları görüyorum?
              </span>
              <span class="text-sm flex-shrink-0 mr-2 flex items-center justify-center">
                <Info class="w-4 h-4" />
              </span>
            </div>
          </button>
        </div>
        <a href="/#/browse">
          <button class="text-sm text-white hover:text-zinc-300">
            Tümünü Gör
          </button>
        </a>
      </div>

      <div class="relative">
        <button @click="scroll(index, 'left')"
          class="left-chevron absolute -left-16 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 pl-16 rounded-full z-10 hidden sm:block">
          <ChevronLeftIcon class="w-6 h-6" />
        </button>
        <button @click="scroll(index, 'right')"
          class="right-chevron absolute -right-16 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 pr-16 rounded-full z-10 hidden sm:block">
          <ChevronRightIcon class="w-6 h-6" />
        </button>
        <div :ref="(el) => {
          if (el) scrollContainers[index] = el;
        }
          " class="flex space-x-4 overflow-x-auto scrollbar-hide select-none" :class="{ dragging: isDragging }"
          @mousedown="startDrag" @mousemove="drag" @mouseup="endDrag" @mouseleave="endDrag"
          @touchstart.passive="startDrag" @touchmove.passive="drag" @touchend="endDrag">
          <div v-for="item in section.items" :key="item.id"
            class="flex-shrink-0 w-64 sm:w-72 relative group cursor-pointer"
            @click="openContentModal(item, section.type, $event)">
            <img v-if="section.type !== 'quote'" :src="item.image" @dragstart.prevent
              class="w-full h-40 object-cover rounded-md transition-opacity duration-300" />
            <div v-if="section.type === 'quote'"
              class="w-full h-40 rounded-md flex items-center justify-center p-4 relative overflow-hidden transition-transform duration-300"
              :style="{
                backgroundImage: `url(${item.thumbnail.replace(
                  '.mp4',
                  '.jpg'
                )})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }">
              <div class="absolute inset-0 bg-black bg-opacity-30"></div>
              <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div class="relative z-[5] opacity-75 group-hover:opacity-100 transition-opacity duration-300">
                <p class="text-white text-center text-lg font-semibold line-clamp-3">
                  {{ item.quote }}
                </p>
                <p class="text-white text-center text-sm mt-2">
                  - {{ item.author }}
                </p>
              </div>
            </div>
            <div v-if="section.type !== 'quote'"
              class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
              <p
                class="text-sm font-semibold truncate text-white opacity-75 group-hover:opacity-100 transition-opacity duration-300">
                {{ item.title }}
              </p>
              <p
                class="text-xs text-gray-300 truncate opacity-75 group-hover:opacity-100 transition-opacity duration-300">
                {{ item.subtitle }}
              </p>
              <p
                class="text-xs text-gray-300 truncate opacity-75 group-hover:opacity-100 transition-opacity duration-300">
                {{ item.videoTitle }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-zinc-900 text-zinc-400 py-3 px-4 sm:px-6 lg:px-8">
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
        <LessonContent v-if="selectedLesson && selectedLesson.type === 'lesson'" :lesson="selectedLesson" />
        <MusicContent v-else-if="selectedLesson && selectedLesson.type === 'music'" :music="selectedLesson" />
        <QuoteContent v-else-if="selectedLesson && selectedLesson.type === 'quote'" :quote="selectedLesson" />
        <BookContent v-else-if="selectedLesson && selectedLesson.type === 'book'" :book="selectedLesson" />
        <StoryContent v-else-if="selectedLesson && selectedLesson.type === 'story'" :story="selectedLesson" />
      </template>
    </ContentModal>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { ChevronLeftIcon, ChevronRightIcon, Info } from "lucide-vue-next";
// import AnimatedCTAButton from "@/components/AnimatedCTAButton.vue";
// import GlowingCTAButton from "@/components/GlowingCTAButton.vue";
import WrappedModal from "@/components/WrappedModal.vue";
import ContentModal from "@/components/ContentModal.vue";
import LessonContent from "@/components/LessonContent.vue";
import DecodeText from "@/components/DecodeText.vue";
import HeroImage from "@/assets/hero-img.webp";
import { Play } from "lucide-vue-next";
import MusicContent from "@/components/MusicContent.vue";
import QuoteContent from "@/components/QuoteContent.vue";
import BookContent from "@/components/BookContent.vue";
import StoryContent from "@/components/StoryContent.vue";
// Book Covers
import AclikCover from "@/assets/img/aclik.jpeg";
import AgantaCover from "@/assets/img/aganta-burina-burinata.jpeg";
import AkdenizCover from "@/assets/img/akdeniz.jpeg";
import AyasliCover from "@/assets/img/ayasli-ve-kiracilari.jpg";
import BabalarCover from "@/assets/img/babalar-ve-ogullar.jpg";
import BeyazDisCover from "@/assets/img/beyaz-dis.webp";
import BeyazGemiCover from "@/assets/img/beyaz-gemi.jpg";
import BirBilimAdamiCover from "@/assets/img/bir-bilim-adaminin-romani.jpg";
import CalikusuCover from "@/assets/img/calikusu.jpeg";
import CanlarCover from "@/assets/img/canlar-kimin-icin-caliyor.jpg";
import CemoCover from "@/assets/img/cemo.jpeg";
import DervisCover from "@/assets/img/dervis-ve-olum.jpg";
import DokuzuncuCover from "@/assets/img/dokuzuncu-hariciye-kogusu.jpg";
import DonKisotCover from "@/assets/img/don-kisot.jpg";
import DrinaCover from "@/assets/img/drina-koprusu.jpeg";
import DrinadaCover from "@/assets/img/drinada-son-gun.jpg";
import EsirCover from "@/assets/img/esir-sehrin-insanlari.jpg";
import EskiciCover from "@/assets/img/eskici-ve-ogullari.jpg";
import FarelerCover from "@/assets/img/fareler-ve-insanlar.jpg";
import FatihHarbiyeCover from "@/assets/img/fatih-harbiye.jpg";
import GoraCover from "@/assets/img/gora.jpg";
import GunOlurCover from "@/assets/img/gun-olur-asra-bedel.jpg";
import IbrahimCover from "@/assets/img/ibrahim-efendi-konagi.webp";
import IkiSehrinCover from "@/assets/img/iki-sehrin-hikayesi.webp";
import KalpaklilarCover from "@/assets/img/kalpaklilar.jpg";
import KaplumbagalarCover from "@/assets/img/kaplumbagalar.jpg";
import KaratmaCover from "@/assets/img/karartma-geceleri.jpg";
import KayipCover from "@/assets/img/kayip-araniyor.webp";
import KiralikCover from "@/assets/img/kiralik-konak.jpg";
import KucukCover from "@/assets/img/kucuk-aga.jpg";
import KuyrukluCover from "@/assets/img/kuyruklu-yildiz.webp";
import KuyucakliCover from "@/assets/img/kuyucakli-yusuf.jpg";
import MadameCover from "@/assets/img/madame-bovary.webp";
import MaiCover from "@/assets/img/mai-ve-siyah.webp";
import MorCover from "@/assets/img/mor-salkimli-ev.jpeg";
import OluCover from "@/assets/img/olu-canlar.webp";
import OnlarCover from "@/assets/img/onlar-da-insandi.jpg";
import RobinsonCover from "@/assets/img/robinson.jpg";
import SahneninCover from "@/assets/img/sahnenin-disindakiler.jpg";
import SavasCover from "@/assets/img/savas-ve-baris.jpg";
import SefillerCover from "@/assets/img/sefiller.jpg";
import SerguzestCover from "@/assets/img/serguzest.jpg";
import SesCover from "@/assets/img/ses-ve-ofke.png";
import SinekliCover from "@/assets/img/sinekli-bakkal.jpg";
import SokaktaCover from "@/assets/img/sokakta.jpg";
import SucCover from "@/assets/img/suc-ve-ceza.jpg";
import TutunCover from "@/assets/img/tutun-zamani.jpg";
import VadiCover from "@/assets/img/vadideki-zambak.jpg";
import YabanCover from "@/assets/img/yaban.jpg";
import YasarCover from "@/assets/img/yasar-ne-yasar-ne-yasamaz.jpg";
import YedinciCover from "@/assets/img/yedinci-gun.jpg";
import YilkiCover from "@/assets/img/yilki-ati.png";
import analysis from '@/data/analysis.json';

const touchStartX = ref(0);
const touchStartY = ref(0);

const movieImages = [
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=450&q=80",
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=450&q=80",
  "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=450&q=80",
  "https://images.unsplash.com/photo-1512070679279-8988d32161be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=450&q=80",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=450&q=80",
  "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=450&q=80",
  "https://images.unsplash.com/photo-1611419010196-a360856fc42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=450&q=80",
  "https://images.unsplash.com/photo-1578022761797-b8636ac1773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=450&q=80",
  "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=450&q=80",
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=450&q=80",
];

const backgroundImages = [
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
  'https://images.unsplash.com/photo-1439853949127-fa647821eba0',
  'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1',
  'https://images.unsplash.com/photo-1468276311594-df7cb65d8df6',
  'https://images.unsplash.com/photo-1431794062232-2a99a5431c6c',
  'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b',
  'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
  'https://images.unsplash.com/photo-1459213599465-03ab6a4d5931',
  'https://images.unsplash.com/photo-1455156218388-5e61b526818b',
  'https://images.unsplash.com/photo-1495312040802-a929cd14a6ab',
  'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e',
  'https://images.unsplash.com/photo-1473773508845-188df298d2d1',
  'https://images.unsplash.com/photo-1444464666168-49d633b86797',
  'https://images.unsplash.com/photo-1535463731090-e34f4b5098c5',
  'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab',
  'https://images.unsplash.com/photo-1439226091259-5d991a17d364',
  'https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe',
  'https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2',
  'https://images.unsplash.com/photo-1452441205368-43c32531450a',
  'https://images.unsplash.com/photo-1498429089284-41f8cf3ffd39',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
  'https://images.unsplash.com/photo-1470770903676-69b98201ea1c',
  'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1',
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e',
  'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e',
  'https://images.unsplash.com/photo-1504567961542-e24d9439a724',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
  'https://images.unsplash.com/photo-1505028106030-e07ea1bd80c3',
  'https://images.unsplash.com/photo-1499363536502-87642509e31b',
  'https://images.unsplash.com/photo-1518021964703-4b2030f03085',
  'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86'
];

const scrollContainers = ref([]);
const isDragging = ref(false);
const startX = ref(0);
const startY = ref(0);
const isDragged = ref(false);
const scrollLeft = ref(0);
const momentum = ref({ velocity: 0, timestamp: 0 });
const animationFrame = ref(null);
const showModal = ref(false);
const showContentModal = ref(false);
const selectedLesson = ref(null);
const userName = computed(() => analysis.data.user.name || 'Misafir');

const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkMobile();

  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});

const generateItems = (count, prefix, type = "video") => {
  const playlists = [
    {
      id: 1,
      title: "Klasik Müziklerle Çalış",
      artist: "Spotify",
      spotifyEmbed:
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX17GkScaAekA?utm_source=generator",
      studyTip:
        "Piyano melodileri, beynin alfa dalgalarını artırarak derin konsantrasyonu destekler. Özellikle matematik ve problem çözme çalışmalarında etkilidir. Kulaklıkla dinleyerek dış sesleri engelleyebilir ve kendi çalışma alanınızı oluşturabilirsiniz.",
    },
    {
      id: 2,
      title: "Derinlemesine Odaklan",
      artist: "Spotify",
      spotifyEmbed:
        "https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ?utm_source=generator",
      studyTip:
        "Elektronik ve ambient müzikler, uzun süreli odaklanma gerektiren çalışmalar için idealdir. Sözsüz müzikler, dil işleyen beyin bölgelerini meşgul etmeden çalışmanıza olanak sağlar. Özellikle yazı yazma ve okuma çalışmalarında tercih edilebilir.",
    },
    {
      id: 3,
      title: "Yoğun Çalış",
      artist: "Spotify",
      spotifyEmbed:
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX8NTLI2TtZa6?utm_source=generator",
      studyTip:
        "Lofi müzik, sakin ritmi ve tekrarlayan melodileriyle stresi azaltır ve konsantrasyonu artırır. Ödev yaparken veya not çıkarırken arka planda çalabilir. Düzenli molalar vermeyi unutmayın ve her 45 dakikada bir 5 dakika ara verin.",
    },
    {
      id: 4,
      title: "Jazz Müziklerle Çalış",
      artist: "Spotify",
      spotifyEmbed:
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX3SiCzCxMDOH?utm_source=generator",
      studyTip:
        "Dinamik elektronik müzikler, enerji seviyenizi yüksek tutarken konsantrasyonunuzu destekler. Sabah çalışmaları için ideal olan bu playlist, uyanık kalmanıza ve motive olmanıza yardımcı olur. Çalışmaya başlamadan önce kısa bir meditasyon yapabilirsiniz.",
    },
    {
      id: 5,
      title: "Enstrümantal Çalış",
      artist: "Spotify",
      spotifyEmbed:
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX9sIqqvKsjG8?utm_source=generator",
      studyTip:
        "Enstrümantal müzikler, beyninizin yaratıcı bölgelerini uyarırken konsantrasyonunuzu korur. Proje çalışmaları ve yaratıcı görevler için mükemmel bir seçim. Her saat başı kısa bir nefes egzersizi yaparak zihninizi tazeleyin.",
    },
    {
      id: 6,
      title: "Ortam Sesleriyle Çalış",
      artist: "Spotify",
      spotifyEmbed:
        "https://open.spotify.com/embed/playlist/37i9dQZF1DWWb1L5n1gkOJ?utm_source=generator",
      studyTip:
        "Yoğun çalışma seansları için tasarlanmış bu playlist, odaklanmanızı maksimuma çıkarır. Pomodoro tekniği ile birlikte kullanın: 25 dakika çalışma, 5 dakika mola. Her 4 döngüde bir uzun mola verin.",
    },
    {
      id: 7,
      title: "Doğa Sesleriyle Odaklan",
      artist: "Spotify",
      spotifyEmbed:
        "https://open.spotify.com/embed/playlist/37i9dQZF1DWYFCj3KyU0r0?utm_source=generator",
      studyTip:
        "Sabah çalışmaları için enerjik ama rahatsız etmeyen melodiler. Güne erken başlayın, önce en zor konuları çalışın. Çalışmaya başlamadan önce kısa bir egzersiz yapın ve bol su için.",
    },
    {
      id: 8,
      title: "Sakin, Lofi Müziklerle Yoğunlaş",
      artist: "Spotify",
      spotifyEmbed:
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX8Uebhn9wzrS?utm_source=generator",
      studyTip:
        "Okuma ve anlama çalışmaları için özel seçilmiş sakin melodiler. Aktif okuma tekniklerini kullanın: not alın, önemli yerlerin altını çizin. Her bölüm sonunda kısa özetler çıkarın.",
    },
    {
      id: 9,
      title: "Karanlık Jazz",
      artist: "Spotify",
      spotifyEmbed:
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX0J6DFF0p3Vs?utm_source=generator",
      studyTip:
        "Gece çalışmaları için sakinleştirici ama uyanık tutan melodiler. Mavi ışık filtresi kullanın, düzenli molalar verin. Çalışma alanınızı iyi aydınlatın ve sıcak bir içecek tercih edin.",
    },
    {
      id: 10,
      title: "Piyano İle Odaklan",
      artist: "Spotify",
      spotifyEmbed:
        "https://open.spotify.com/embed/playlist/37i9dQZF1DX52IXnX9fyzi?utm_source=generator",
      studyTip:
        "Stres seviyesini düşüren, rahatlatıcı melodiler. Sınav öncesi tekrar ve pratik için ideal. Derin nefes egzersizleri yapın, kendinize pozitif telkinlerde bulunun ve düzenli molalar verin.",
    },
  ];

  if (type === "music") {
    const playlistImages = [
      "https://i.scdn.co/image/ab67706f0000000252b2a52d3e41e73f5f318ce7", // Dark Academia Classical
      "https://i.scdn.co/image/ab67706f000000026020f2f6476db518ef747da4", // Deep Focus
      "https://i.scdn.co/image/ab67706f00000002f87d8382976ebff84930bfc1", // Intense Studying
      "https://i.scdn.co/image/ab67706f000000029cca3b87df0dbfa4d4c25a63", // Jazz For Study
      "https://i.scdn.co/image/ab67706f00000002fee5d4ac2208b874fa2c20c9", // Instrumental Study
      "https://i.scdn.co/image/ab67706f0000000227d900368076d5cc99f81aa3", // Ambient Study
      "https://i.scdn.co/image/ab67706f0000000293296c6b1f088ea3c4399db8", // Focus with Nature Sounds
      "https://i.scdn.co/image/ab67706f000000025054e7f2d5398de6efa23236", // Chill Lofi Study Beats
      "https://i.scdn.co/image/ab67706f00000002395e9ad1d437e57da96a45f7", // Dark Academia Jazz
      "https://i.scdn.co/image/ab67706f0000000248b8d40c7eb644100198535c", // Music for Writing
    ];

    return Array.from({ length: count }, (_, i) => {
      const playlist = playlists[i % playlists.length];
      return {
        id: `${prefix}-${i + 1}`,
        title: playlist.title,
        subtitle: playlist.artist,
        image: playlistImages[i % playlistImages.length],
        spotifyEmbed: playlist.spotifyEmbed,
        studyTip: playlist.studyTip,
        type: "music",
      };
    });
  }

  else if (type === "quote") {
    return motivationalQuotes.slice(0, count).map((quote, i) => ({
      id: `${prefix}-${i + 1}`,
      quote: quote.text,
      author: quote.author,
      type: "quote",
      thumbnail: `${backgroundImages[i % backgroundImages.length]}?auto=format&fit=crop&w=800&q=80`,
    }));
  }

  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    title: type === "quote" ? "" : `${prefix} Dersi ${i + 1}`,
    subtitle:
      type === "quote" ? "" : `${prefix} Öğretmeni ${Math.floor(i / 5) + 1}`,
    image: movieImages[Math.floor(Math.random() * movieImages.length)],
    quote:
      type === "quote" ? motivationalQuotes[i % motivationalQuotes.length] : "",
    videoUrl: "https://www.youtube.com/watch?v=Bm1NtTAtBAA",
    content: `
        <h2>${prefix} Dersi - Konu ${i + 1}</h2>
        <h3>Konu Özeti</h3>
        <ul>
          <li>Bu derste ${prefix} konusunun temel prensiplerini öğreneceksiniz.</li>
          <li>Pratik uygulamalar ve örneklerle konuyu pekiştireceksiniz.</li>
          <li>Sınav hazırlığı için önemli ipuçları alacaksınız.</li>
        </ul>
        <h3>Önemli Noktalar</h3>
        <ul>
          <li>Konunun ana hatları ve temel kavramlar</li>
          <li>Sık karşılaşılan soru tipleri ve çözüm yöntemleri</li>
          <li>Pratik yapılması gereken alt başlıklar</li>
        </ul>
        <h3>Çalışma Önerileri</h3>
        <ul>
          <li>Videoyu not alarak izleyin</li>
          <li>Verilen örnekleri çözmeye çalışın</li>
          <li>Anlamadığınız yerleri not alıp tekrar izleyin</li>
        </ul>
      `,
  }));
};

const motivationalQuotes = [
  {
    text: "Zafer, zafer benimdir diyebilenindir. Başarı ise 'başaracağım' diye başlayarak sonunda 'başardım' diyenindir.",
    author: "Mustafa Kemal Atatürk",
  },
  {
    text: "Kazanma isteği ve başarıya ulaşma arzusu birleşirse kişisel mükemmelliğin kapısını açar.",
    author: "Konfüçyüs",
  },
  {
    text: "Hiçbir şeyden vazgeçme, çünkü sadece kaybedenler vazgeçer.",
    author: "Abraham Lincoln",
  },
  {
    text: "Başarıya çıkan asansör bozuk. Bekleyerek zaman kaybetmeyin, adım adım merdivenleri çıkmaya başlayın.",
    author: "Joe Girard",
  },
  {
    text: "Fırsatlar durup dururken karşınıza çıkmaz, onları siz yaratırsınız.",
    author: "Chris Grosser",
  },
  {
    text: "Şansa çok inanırım ve ne kadar çok çalıştıysam ona o kadar çok sahip oldum.",
    author: "Thomas Jefferson",
  },
  {
    text: "Bir şeye başlayıp başarısız olmaktan daha kötü tek şey hiçbir şeye başlamamaktır.",
    author: "Seth Godin",
  },
  {
    text: "Sadece sınırlarını aşmanın riskini alanlar ne kadar ileri gidebildiklerini görürler.",
    author: "T.S. Elliot",
  },
  {
    text: "Hayat her ne kadar zor görünse de, yapabileceğimiz ve başarabileceğimiz bir şey mutlaka vardır.",
    author: "Stephen Hawking",
  },
  {
    text: "Bir şeyi başarmak ne kadar zorsa, zaferin tadı o kadar güzeldir.",
    author: "Pele",
  },
  {
    text: "Hiç kimse başarı merdivenine elleri cebinde tırmanmamıştır.",
    author: "J. Keth Moorhead",
  },
  {
    text: "Ne zaman başarılı bir iş görseniz, birisi bir zamanlar mutlaka cesur bir karar almıştır.",
    author: "Peter Drucker",
  },
  {
    text: "Sessizce sıkı çalışın, bırakın başarı sesiniz olsun.",
    author: "Frank Ocean",
  },
  {
    text: "Eğer her şey kontrol altında gibi görünüyorsa, yeterince hızlı gitmiyorsunuzdur.",
    author: "Mario Andretti",
  },
  {
    text: "Başarısız insanlar içerisinde bulundukları duruma göre karar verirler. Başarılı insanlar ise olmak istedikleri yere göre karar verirler.",
    author: "Benjamin Hardy",
  },
  {
    text: "Sadece başarılı bir insan olmaya değil, değerli bir insan olmaya çalışın.",
    author: "Albert Einstein",
  },
  {
    text: "Başarı son değildir, başarısızlık ise ölümcül değildir: Önemli olan ilerlemeye cesaret etmektir.",
    author: "Winston S. Churchill",
  },
  {
    text: "Her gün tutarlılık ile tekrarlanan küçük disiplinler, zaman içinde büyük başarıların oluşmasını sağlar.",
    author: "John C. Maxwell",
  },
  {
    text: "En büyük makam, en büyük hak çalışanlara ait olacaktır.",
    author: "Mustafa Kemal Atatürk",
  },
  {
    text: "Bilginin efendisi olmak için çalışmanın uşağı olmak şarttır.",
    author: "Balzac",
  },
  {
    text: "Çalışmak bizi üç beladan kurtarır: Can sıkıntısı, kötü alışkanlıklar ve yoksulluk.",
    author: "Voltaire",
  },
  {
    text: "Keskin bıçak olmak için çok çekiç yemek gerekir.",
    author: "Türk Atasözü",
  },
  {
    text: "İnsanoğlu için en kutsal ibadet; çalışmak, doğruluk ve insan sevgisidir.",
    author: "Hacı Bektaş-i Veli",
  },
  {
    text: "10 bin tekmeyi bir kez çalışandan korkmam, bir tekmeyi 10 bin kez çalışandan korkarım.",
    author: "Bruce Lee",
  },
  {
    text: "Çalışma olmadan yetenek hiçbir şeydir.",
    author: "Cristiano Ronaldo",
  },
  {
    text: "Basit bir adamın elinden geleni yapmaya çalışması, zeki bir adamın tembelliğinden iyidir.",
    author: "G. Gracian",
  },
  {
    text: "Daima yukarıya bak, bilmediğin şeyleri öğren ve her gün yükselmeye çalış.",
    author: "Louis Pasteur",
  },
  {
    text: "İnsanlar, benim ustalığımı elde etmek için ne kadar sıkı çalıştığımı bilseler, o kadar da hayret edilecek bir şey olmadığını anlarlardı.",
    author: "Michelangelo",
  },
  {
    text: "Zamanlama, azim ve 10 yıl boyunca aralıksız çalışmak, sizi bir gecede başarılı olmuşsunuz gibi gösterir.",
    author: "Biz Stone",
  },
  {
    text: "Eğitim geleceğin pasaportudur, çünkü yarın, bugün hazırlananlara aittir.",
    author: "Malcolm X",
  },
  {
    text: "Dünyayı değiştirmek için kullanabileceğin en güçlü silah eğitimdir.",
    author: "B.B. King",
  },
];

const generateStories = (count) => {
  const stories = [
    {
      id: 1,
      title: "Azimle Başarıya Ulaşan Öğrenci",
      subtitle: "Matematik Olimpiyat Şampiyonu",
      image:
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=60",
      content: `Mehmet, lise yıllarında matematik dersinde zorlanıyordu. Ancak vazgeçmek yerine, her gün düzenli olarak 2 saat matematik çalışmaya başladı. Öğretmenlerinden ek destek aldı ve online kaynaklardan faydalandı.

      Sistemli çalışması sonuç verdi ve önce sınıfının en başarılı matematik öğrencisi oldu. Ardından katıldığı matematik olimpiyatlarında Türkiye derecesi elde etti.

      Mehmet'in başarısının sırrı:
      • Her gün düzenli çalışma
      • Anlamadığı konularda yardım istemekten çekinmemesi
      • Başarısızlıklardan yılmadan devam etmesi
      • Hedefine odaklanması`,
    },
    {
      id: 2,
      title: "Yabancı Dil Başarısı",
      subtitle: "Cambridge C2 Seviyesi",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60",
      content: `Ayşe, İngilizce öğrenmeye ortaokulda başladı. İlk başta kendini ifade etmekte zorlanıyordu. Ancak her gün İngilizce diziler izlemeye, podcast dinlemeye ve yabancı arkadaşlarıyla pratik yapmaya başladı.

      8 ay boyunca düzenli çalışması sonucunda Cambridge sınavında en yüksek seviye olan C2'yi elde etti. Şimdi bir teknoloji şirketinde tercüman olarak çalışıyor.

      Ayşe'nin dil öğrenme yöntemi:
      • Her gün en az 1 saat dizi/film izleme
      • Yabancı müzikler dinleyip şarkı sözlerini ezberleme
      • Online language exchange uygulamalarını kullanma
      • Günlük tutma ve blog yazma`,
    },
    {
      id: 3,
      title: "Spor ve Eğitim Dengesi",
      subtitle: "Milli Yüzücü ve Başarılı Öğrenci",
      image:
        "https://images.unsplash.com/photo-1521493959102-bdd6677fdd81?w=800&auto=format&fit=crop&q=60",
      content: `Ali, hem profesyonel yüzücü hem de başarılı bir öğrenci. Her sabah 05:00'te kalkıp antrenman yapıyor, ardından okula gidiyor. Akşamları ise derslerine çalışıyor.

      Bu disiplinli yaşam tarzı sayesinde hem ulusal yüzme yarışmalarında madalyalar kazandı hem de okulunda takdir belgesi almayı başardı.

      Ali'nin başarı stratejisi:
      • Detaylı zaman planlaması
      • Verimli ders çalışma teknikleri
      • Düzenli uyku ve beslenme
      • Hedef odaklı yaşam`,
    },
    {
      id: 4,
      title: "Kodlama Tutkusu",
      subtitle: "Genç Yazılımcı",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
      content: `Zeynep, lise ikinci sınıfta kodlamaya ilgi duymaya başladı. Online kurslar ve YouTube videoları ile self-learning yaparak Python ve JavaScript öğrendi.

      Bir yıl içinde kendi mobil uygulamasını geliştirdi ve App Store'da yayınladı. Şimdi üniversite eğitimine devam ederken, part-time olarak yazılım şirketinde çalışıyor.

      Zeynep'in öğrenme yöntemi:
      • Günlük kod yazma pratiği
      • Open source projelere katkıda bulunma
      • Programlama topluluklarına katılım
      • Kişisel projeler geliştirme`,
    },
    {
      id: 5,
      title: "Sanat ve Bilim Bir Arada",
      subtitle: "Ressam ve Tıp Öğrencisi",
      image:
        "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&auto=format&fit=crop&q=60",
      content: `Deniz, hem tıp fakültesinde okuyor hem de profesyonel resim yapıyor. Anatomi bilgisini resimlerine yansıtarak özgün eserler ortaya çıkarıyor.

      Geçen yıl ilk kişisel sergisini açtı ve aynı zamanda tıp fakültesinde dönem birincisi oldu. Sanatın, tıp eğitiminde ona farklı bir bakış açısı kazandırdığını söylüyor.

      Deniz'in çalışma sistemi:
      • Haftalık detaylı program
      • Pomodoro tekniği kullanımı
      • Sanat ve tıbbı birleştiren projeler
      • Stres yönetimi için sanat terapisi`,
    },
  ];

  return stories.slice(0, count).map((story) => ({
    ...story,
    type: "story",
  }));
};

const generateBooks = (count) => {
  const bookData = [
    {
      id: 1,
      title: "Açlık",
      subtitle: "Knut Hamsun",
      image: AclikCover,
      description:
        "Genç bir yazarın açlık ve yoksullukla mücadelesini anlatan roman, insanın varoluşsal sancılarını ve toplumsal gerçekleri işler. Modern edebiyatın öncü eserlerinden biridir.",
      category: ["Dünya Klasikleri", "Psikolojik Roman", "Modern Edebiyat"],
      readingTime: "8 saat",
      pages: "192 sayfa",
    },
    {
      id: 2,
      title: "Aganta Burina Burinata",
      subtitle: "Halikarnas Balıkçısı",
      image: AgantaCover,
      description:
        "Ege denizinde geçen, balkçıların yaşamını ve denizle olan mücadelelerini anlatan roman. Deniz kültürü ve insan-doğa ilişkisini ustalıkla işler.",
      category: ["Türk Edebiyatı", "Deniz Hikayeleri", "Toplumsal Roman"],
      readingTime: "10 saat",
      pages: "240 sayfa",
    },
    {
      id: 3,
      title: "Akdeniz",
      subtitle: "Panait Istrati",
      image: AkdenizCover,
      description:
        "Akdeniz'in büyülü atmosferinde geçen, dostluk ve özgürlük temalı hikayeler. Deniz insanlarının yaşamını ve Akdeniz kültürünü canlı bir şekilde yansıtır.",
      category: ["Dünya Klasikleri", "Deniz Edebiyatı", "Gezi-Macera"],
      readingTime: "12 saat",
      pages: "288 sayfa",
    },
    {
      id: 4,
      title: "Ayaşlı ile Kiracıları",
      subtitle: "Memduh Şevket Esendal",
      image: AyasliCover,
      description:
        "Bir apartmanda yaşayan insanların gündelik hayatları üzerinden toplumsal değişimi anlatan roman. Cumhuriyet dönemi Türk toplumunun panoramasını sunar.",
      category: ["Türk Edebiyatı", "Toplumsal Roman", "Cumhuriyet Dönemi"],
      readingTime: "9 saat",
      pages: "216 sayfa",
    },
    {
      id: 5,
      title: "Babalar ve Oğullar",
      subtitle: "Turgenyev",
      image: BabalarCover,
      description:
        "Kuşak çatışması teması üzerinden 19. yüzyıl Rus toplumundaki değişimleri anlatan klasik roman. Geleneksel ve modern değerler arasındaki çatışmayı işler.",
      category: ["Dünya Klasikleri", "Rus Edebiyatı", "Toplumsal Roman"],
      readingTime: "14 saat",
      pages: "336 sayfa",
    },
    {
      id: 6,
      title: "Beyaz Diş",
      subtitle: "Jack London",
      image: BeyazDisCover,
      description:
        "Yarı kurt yarı köpek olan Beyaz Diş'in vahşi doğadan medeniyete uzanan yolculuğu. Doğa, sadakat ve hayatta kalma mücadelesini anlatan etkileyici bir eser.",
      category: ["Dünya Klasikleri", "Macera", "Doğa ve Hayvan"],
      readingTime: "10 saat",
      pages: "240 sayfa",
    },
    {
      id: 7,
      title: "Beyaz Gemi",
      subtitle: "Cengiz Aytmatov",
      image: BeyazGemiCover,
      description:
        "Küçük bir çocuğun hayal dünyası üzerinden geleneksel değerler ve modern yaşam arasındaki çatışmayı anlatan roman. Kırgız kültürünün zengin motiflerini barındırır.",
      category: ["Dünya Klasikleri", "Kırgız Edebiyatı", "Modern Klasik"],
      readingTime: "7 saat",
      pages: "168 sayfa",
    },
    {
      id: 8,
      title: "Bir Bilim Adamının Romanı",
      subtitle: "Oğuz Atay",
      image: BirBilimAdamiCover,
      description:
        "Mustafa İnan'ın hayatı üzerinden Türkiye'de bilim insanı olmanın zorluklarını anlatan biyografik roman. Bilim, eğitim ve kişisel gelişim temalarını işler.",
      category: ["Türk Edebiyatı", "Biyografik Roman", "Modern Klasik"],
      readingTime: "12 saat",
      pages: "288 sayfa",
    },
    {
      id: 9,
      title: "Cemo",
      subtitle: "Kemal Bilbaşar",
      image: CemoCover,
      description:
        "Doğu Anadolu'da geçen bir aşk ve mücadele hikayesi. Feodal düzen, toplumsal adaletsizlik ve kadın hakları temalarını işleyen etkileyici bir roman.",
      category: ["Türk Edebiyatı", "Toplumsal Roman", "Anadolu Edebiyatı"],
      readingTime: "11 saat",
      pages: "264 sayfa",
    },
    {
      id: 10,
      title: "Çalıkuşu",
      subtitle: "Reşat Nuri Güntekin",
      image: CalikusuCover,
      description:
        "Feride'nin İstanbul'dan Anadolu'ya uzanan hayat hikayesi. Eğitim, aşk ve fedakarlık temalarını işleyen, Cumhuriyet dönemi Türk edebiyatının başyapıtlarından.",
      category: ["Türk Edebiyatı", "Romantik Roman", "Cumhuriyet Klasikleri"],
      readingTime: "16 saat",
      pages: "384 sayfa",
    },
    {
      id: 11,
      title: "Çanlar Kimin İçin Çalıyor",
      subtitle: "Ernest Hemingway",
      image: CanlarCover,
      description:
        "İspanya İç Savaşı sırasında geçen, savaşın insan üzerindeki etkilerini anlatan güçlü bir roman. Savaş, aşk ve fedakarlık temalarını işler.",
      category: ["Dünya Klasikleri", "Savaş Romanı", "Modern Klasik"],
      readingTime: "20 saat",
      pages: "480 sayfa",
    },
    {
      id: 12,
      title: "Derviş ve Ölüm",
      subtitle: "Mehmet Selimoviç",
      image: DervisCover,
      description:
        "Bir dervişin iç dünyası ve manevi arayışları üzerinden insanın varoluşsal sorunlarını ele alan felsefi roman. Boşnak edebiyatının başyapıtlarından.",
      category: ["Dünya Klasikleri", "Felsefi Roman", "Balkan Edebiyatı"],
      readingTime: "15 saat",
      pages: "360 sayfa",
    },
    {
      id: 13,
      title: "Dokuzuncu Hariciye Koğuşu",
      subtitle: "Peyami Safa",
      image: DokuzuncuCover,
      description:
        "Hasta bir gencin fiziksel ve ruhsal mücadelesini anlatan otobiyografik roman. Hastalık, aşk ve yaşama tutunma temalarını işleyen etkileyici bir eser.",
      category: ["Türk Edebiyatı", "Psikolojik Roman", "Cumhuriyet Klasikleri"],
      readingTime: "6 saat",
      pages: "144 sayfa",
    },
    {
      id: 14,
      title: "Don Kişot",
      subtitle: "Cervantes",
      image: DonKisotCover,
      description:
        "Şövalye romanlarının etkisiyle maceraya atılan Don Kişot'un trajikomik hikayesi. Modern romanın başlangıcı sayılan, idealizm ve gerçeklik arasındaki çatışmayı işleyen başyapıt.",
      category: ["Dünya Klasikleri", "Hiciv", "Macera"],
      readingTime: "35 saat",
      pages: "840 sayfa",
    },
    {
      id: 15,
      title: "Drina Köprüsü",
      subtitle: "İvo Andriç",
      image: DrinaCover,
      description:
        "Drina Köprüsü'nün yapılışından yıkılışına kadar geçen sürede Balkanlar'ın tarihini anlatan roman. Farklı kültürlerin bir arada yaşamasını işleyen Nobel ödüllü eser.",
      category: ["Dünya Klasikleri", "Tarihi Roman", "Balkan Edebiyatı"],
      readingTime: "18 saat",
      pages: "432 sayfa",
    },
    {
      id: 16,
      title: "Drina'da Son Gün",
      subtitle: "Faik Baysal",
      image: DrinadaCover,
      description:
        "Balkan Savaşı sırasında yaşanan dramı anlatan roman. Savaşın insan psikolojisi üzerindeki etkilerini ve göçün trajik sonuçlarını işler.",
      category: ["Türk Edebiyatı", "Savaş Romanı", "Tarihi Roman"],
      readingTime: "13 saat",
      pages: "312 sayfa",
    },
    {
      id: 17,
      title: "Esir Şehrin İnsanları",
      subtitle: "Kemal Tahir",
      image: EsirCover,
      description:
        "İstanbul'un işgal yıllarında geçen, direniş ve mücadele hikayesi. Kurtuluş Savaşı döneminin İstanbul'unu ve insanlarını anlatan tarihi roman.",
      category: ["Türk Edebiyatı", "Tarihi Roman", "Kurtuluş Savaşı"],
      readingTime: "16 saat",
      pages: "384 sayfa",
    },
    {
      id: 18,
      title: "Eskici ve Oğulları",
      subtitle: "Orhan Kemal",
      image: EskiciCover,
      description:
        "Yoksul bir ailenin çocuklarının hayat mücadelesini anlatan roman. Toplumsal gerçekçi bir yaklaşımla işçi sınıfının yaşamını ele alır.",
      category: ["Türk Edebiyatı", "Toplumsal Gerçekçilik", "İşçi Edebiyatı"],
      readingTime: "8 saat",
      pages: "192 sayfa",
    },
    {
      id: 19,
      title: "Fareler ve İnsanlar",
      subtitle: "John Steinbeck",
      image: FarelerCover,
      description:
        "Büyük Buhran döneminde iki göçmen tarım işçisinin dostluk ve hayatta kalma hikayesi. İnsan ilişkileri ve yalnızlık temalarını işleyen çarpıcı bir eser.",
      category: ["Dünya Klasikleri", "Amerikan Edebiyatı", "Toplumsal Roman"],
      readingTime: "4 saat",
      pages: "96 sayfa",
    },
    {
      id: 20,
      title: "Fatih-Harbiye",
      subtitle: "Peyami Safa",
      image: FatihHarbiyeCover,
      description:
        "Doğu-Batı çatışmasını bir genç kızın iç dünyası üzerinden anlatan roman. Modernleşme sürecinde yaşanan kimlik bunalımını işler.",
      category: ["Türk Edebiyatı", "Psikolojik Roman", "Toplumsal Roman"],
      readingTime: "7 saat",
      pages: "168 sayfa",
    },
    {
      id: 21,
      title: "Gora",
      subtitle: "Rabindranath Tagore",
      image: GoraCover,
      description:
        "Hindistan'ın kültürel kimlik arayışını ve toplumsal sorunlarını ele alan roman. Din, milliyetçilik ve modernleşme temalarını işler.",
      category: ["Dünya Klasikleri", "Hint Edebiyatı", "Toplumsal Roman"],
      readingTime: "22 saat",
      pages: "528 sayfa",
    },
    {
      id: 22,
      title: "Gün Olur Asra Bedel",
      subtitle: "Cengiz Aytmatov",
      image: GunOlurCover,
      description:
        "Sovyet rejiminin Orta Asya halklarının kültürel kimliği üzerindeki etkilerini anlatan roman. Geleneksel değerler ve modernleşme çatışmasını işler.",
      category: ["Dünya Klasikleri", "Kırgız Edebiyatı", "Politik Roman"],
      readingTime: "14 saat",
      pages: "336 sayfa",
    },
    {
      id: 23,
      title: "İbrahim Efendi Konağı",
      subtitle: "Samiha Ayverdi",
      image: IbrahimCover,
      description:
        "Osmanlı'dan Cumhuriyet'e geçiş döneminde bir konağın ve ailenin hikayesi. Değişen toplum yapısını ve değerleri ele alan nostaljik roman.",
      category: ["Türk Edebiyatı", "Tarihi Roman", "Sosyal Roman"],
      readingTime: "16 saat",
      pages: "384 sayfa",
    },
    {
      id: 24,
      title: "İki Şehrin Hikayesi",
      subtitle: "Charles Dickens",
      image: IkiSehrinCover,
      description:
        "Fransız Devrimi döneminde Londra ve Paris'te geçen, aşk ve fedakarlık temalı tarihi roman. İnsan doğasının karmaşıklığını ustaca işler.",
      category: ["Dünya Klasikleri", "Tarihi Roman", "Romantik Roman"],
      readingTime: "20 saat",
      pages: "480 sayfa",
    },
    {
      id: 25,
      title: "Kalpaklılar",
      subtitle: "Samim Kocagöz",
      image: KalpaklilarCover,
      description:
        "Kurtuluş Savaşı'nda Ege'de verilen mücadeleyi anlatan roman. Milli mücadele ruhunu ve halkın direnişini işleyen tarihi eser.",
      category: ["Türk Edebiyatı", "Kurtuluş Savaşı", "Tarihi Roman"],
      readingTime: "15 saat",
      pages: "360 sayfa",
    },
    {
      id: 26,
      title: "Kaplumbağalar",
      subtitle: "Fakir Baykurt",
      image: KaplumbagalarCover,
      description:
        "Köy yaşamını ve köylülerin modernleşme ile olan mücadelesini anlatan roman. Toplumsal gerçekçi bir yaklaşımla köy sorunlarını ele alır.",
      category: ["Türk Edebiyatı", "Köy Edebiyatı", "Toplumsal Roman"],
      readingTime: "12 saat",
      pages: "288 sayfa",
    },
    {
      id: 27,
      title: "Karartma Geceleri",
      subtitle: "Rıfat Ilgaz",
      image: KaratmaCover,
      description:
        "İkinci Dünya Savaşı yıllarında İstanbul'da geçen, savaş döneminin zorluklarını anlatan roman. Toplumsal gerçekçi bir bakış açısıyla yazılmıştır.",
      category: ["Türk Edebiyatı", "Savaş Dönemi", "Toplumsal Roman"],
      readingTime: "8 saat",
      pages: "192 sayfa",
    },
    {
      id: 28,
      title: "Kayıp Aranıyor",
      subtitle: "Sait Faik Abasıyanık",
      image: KayipCover,
      description:
        "Modern kent yaşamının yalnızlaştırdığı insanların hikayesi. İstanbul'un kenar mahallelerini ve sıradan insanların yaşamlarını anlatan roman.",
      category: ["Türk Edebiyatı", "Modern Roman", "Kent Edebiyatı"],
      readingTime: "6 saat",
      pages: "144 sayfa",
    },
    {
      id: 29,
      title: "Kiralık Konak",
      subtitle: "Yakup Kadri Karaosmanoğlu",
      image: KiralikCover,
      description:
        "Osmanlı'nın son döneminde yaşanan toplumsal değişimi bir konak ve ailesi üzerinden anlatan roman. Kuşak çatışması ve değerler çatışmasını işler.",
      category: ["Türk Edebiyatı", "Toplumsal Roman", "Tarihi Roman"],
      readingTime: "10 saat",
      pages: "240 sayfa",
    },
    {
      id: 30,
      title: "Kuyruklu Yıldız Altında Bir İzdivaç",
      subtitle: "Hüseyin Rahmi Gürpınar",
      image: KuyrukluCover,
      description:
        "Halley kuyruklu yıldızının dünyaya çarpacağı söylentileri etrafında gelişen olayları anlatan mizahi roman. Toplumsal eleştiri içeren bir hiciv eseri.",
      category: ["Türk Edebiyatı", "Mizah", "Toplumsal Hiciv"],
      readingTime: "9 saat",
      pages: "216 sayfa",
    },
    {
      id: 31,
      title: "Kuyucaklı Yusuf",
      subtitle: "Sabahattin Ali",
      image: KuyucakliCover,
      description:
        "Taşra yaşamı ve bürokrasinin birey üzerindeki etkilerini anlatan roman. Aşk, adalet ve toplumsal düzen temalarını işleyen güçlü bir eser.",
      category: ["Türk Edebiyatı", "Toplumsal Roman", "Anadolu Romanı"],
      readingTime: "10 saat",
      pages: "240 sayfa",
    },
    {
      id: 32,
      title: "Küçük Ağa",
      subtitle: "Tarık Buğra",
      image: KucukCover,
      description:
        "Kurtuluş Savaşı döneminde bir imamın değişim öyküsü. Milli mücadele yıllarında Anadolu insanının yaşadığı iç çatışmaları anlatan tarihi roman.",
      category: ["Türk Edebiyatı", "Tarihi Roman", "Kurtuluş Savaşı"],
      readingTime: "18 saat",
      pages: "432 sayfa",
    },
    {
      id: 33,
      title: "Madame Bovary",
      subtitle: "Gustave Flaubert",
      image: MadameCover,
      description:
        "Taşra yaşamından bunalan bir kadının romantik arayışlarını ve düş kırıklıklarını anlatan roman. Realizmin başyapıtlarından biri kabul edilir.",
      category: ["Dünya Klasikleri", "Psikolojik Roman", "Fransız Edebiyatı"],
      readingTime: "16 saat",
      pages: "384 sayfa",
    },
    {
      id: 34,
      title: "Mai ve Siyah",
      subtitle: "Halit Ziya Uşaklıgil",
      image: MaiCover,
      description:
        "Bir şairin sanat ve hayat karşısındaki yenilgisini anlatan roman. Servet-i Fünun döneminin önemli eserlerinden biri.",
      category: ["Türk Edebiyatı", "Psikolojik Roman", "Edebi Roman"],
      readingTime: "14 saat",
      pages: "336 sayfa",
    },
    {
      id: 35,
      title: "Mor Salkımlı Ev",
      subtitle: "Halide Edib Adıvar",
      image: MorCover,
      description:
        "Yazarın çocukluk ve gençlik yıllarını anlattığı otobiyografik eser. Osmanlı'nın son dönemini ve modernleşme sürecini bireysel bir hikaye üzerinden aktarır.",
      category: ["Türk Edebiyatı", "Anı", "Otobiyografi"],
      readingTime: "12 saat",
      pages: "288 sayfa",
    },
    {
      id: 36,
      title: "Onlar da İnsandı",
      subtitle: "Cengiz Dağcı",
      image: OnlarCover,
      description:
        "Kırım Türklerinin İkinci Dünya Savaşı sırasında yaşadıkları trajedileri anlatan roman. Sürgün ve vatan hasreti temalarını işler.",
      category: ["Türk Edebiyatı", "Savaş Romanı", "Tarihi Roman"],
      readingTime: "13 saat",
      pages: "312 sayfa",
    },
    {
      id: 37,
      title: "Ölü Canlar",
      subtitle: "Nikolay Gogol",
      image: OluCover,
      description:
        "19. yüzyıl Rus toplumunu hicveden roman. Bürokrasi, yozlaşma ve toplumsal çürümeyi keskin bir mizahla ele alır.",
      category: ["Dünya Klasikleri", "Rus Edebiyatı", "Hiciv"],
      readingTime: "20 saat",
      pages: "480 sayfa",
    },
    {
      id: 38,
      title: "Robinson Crusoe",
      subtitle: "Daniel Defoe",
      image: RobinsonCover,
      description:
        "Issız bir adada hayatta kalma mücadelesi veren bir adamın hikayesi. Macera ve keşif temalı romanın öncü örneklerinden biri.",
      category: ["Dünya Klasikleri", "Macera", "Robinsonad"],
      readingTime: "14 saat",
      pages: "336 sayfa",
    },
    {
      id: 39,
      title: "Sahnenin Dışındakiler",
      subtitle: "Ahmet Hamdi Tanpınar",
      image: SahneninCover,
      description:
        "Mütareke İstanbul'unda geçen, bir aydının iç dünyasını ve dönemin toplumsal panoramasını sunan roman.",
      category: ["Türk Edebiyatı", "Modern Roman", "Tarihi Roman"],
      readingTime: "16 saat",
      pages: "384 sayfa",
    },
    {
      id: 40,
      title: "Savaş ve Barış",
      subtitle: "Lev Tolstoy",
      image: SavasCover,
      description:
        "Napolyon'un Rusya seferi sırasında iç içe geçen hayatları anlatan epik roman. İnsan doğası ve tarih felsefesi üzerine derin gözlemler sunar.",
      category: ["Dünya Klasikleri", "Rus Edebiyatı", "Tarihi Roman"],
      readingTime: "60 saat",
      pages: "1440 sayfa",
    },
    {
      id: 41,
      title: "Sefiller",
      subtitle: "Victor Hugo",
      image: SefillerCover,
      description:
        "Jean Valjean'ın hikayesi üzerinden adalet, merhamet ve toplumsal eşitsizlik temalarını işleyen başyapıt. Fransız toplumunun panoramasını sunar.",
      category: ["Dünya Klasikleri", "Fransız Edebiyatı", "Toplumsal Roman"],
      readingTime: "40 saat",
      pages: "960 sayfa",
    },
    {
      id: 42,
      title: "Sergüzeşt",
      subtitle: "Samipaşazade Sezai",
      image: SerguzestCover,
      description:
        "Bir cariyenin trajik aşk hikayesi üzerinden kölelik sistemini eleştiren roman. Tanzimat döneminin önemli eserlerinden biri.",
      category: ["Türk Edebiyatı", "Tanzimat Edebiyatı", "Romantik Roman"],
      readingTime: "6 saat",
      pages: "144 sayfa",
    },
    {
      id: 43,
      title: "Ses ve Öfke",
      subtitle: "William Faulkner",
      image: SesCover,
      description:
        "Güney Amerika'da çöküş halindeki bir ailenin hikayesi. Modern anlatım teknikleriyle yazılmış, bilinç akışı tekniğinin başyapıtlarından.",
      category: ["Dünya Klasikleri", "Modern Roman", "Amerikan Edebiyatı"],
      readingTime: "15 saat",
      pages: "360 sayfa",
    },
    {
      id: 44,
      title: "Sinekli Bakkal",
      subtitle: "Halide Edib Adıvar",
      image: SinekliCover,
      description:
        "II. Abdülhamit döneminde İstanbul'un bir mahallesinde geçen, Doğu-Batı sentezini işleyen roman. Toplumsal değişimi farklı karakterler üzerinden anlatır.",
      category: ["Türk Edebiyatı", "Tarihi Roman", "Toplumsal Roman"],
      readingTime: "16 saat",
      pages: "384 sayfa",
    },
    {
      id: 45,
      title: "Sokakta",
      subtitle: "Bahaeddin Özkişi",
      image: SokaktaCover,
      description:
        "Modern kent yaşamında insanın yalnızlaşmasını ve yabancılaşmasını anlatan öyküler. Toplumsal değişimin birey üzerindeki etkilerini işler.",
      category: ["Türk Edebiyatı", "Modern Öykü", "Kent Edebiyatı"],
      readingTime: "5 saat",
      pages: "120 sayfa",
    },
    {
      id: 46,
      title: "Suç ve Ceza",
      subtitle: "Fyodor Dostoyevski",
      image: SucCover,
      description:
        "Bir öğrencinin işlediği cinayet üzerinden suç, vicdan ve ahlak kavramlarını sorgulayan psikolojik roman. İnsan ruhunun derinliklerini araştıran başyapıt.",
      category: ["Dünya Klasikleri", "Rus Edebiyatı", "Psikolojik Roman"],
      readingTime: "24 saat",
      pages: "576 sayfa",
    },
    {
      id: 47,
      title: "Tütün Zamanı",
      subtitle: "Necati Cumalı",
      image: TutunCover,
      description:
        "Ege'de tütün üreticilerinin yaşamını anlatan roman. Toprak, emek ve insan ilişkilerini gerçekçi bir dille işler.",
      category: ["Türk Edebiyatı", "Toplumsal Roman", "Köy Edebiyatı"],
      readingTime: "10 saat",
      pages: "240 sayfa",
    },
    {
      id: 48,
      title: "Vadideki Zambak",
      subtitle: "Honoré de Balzac",
      image: VadiCover,
      description:
        "Saf bir genç kızın trajik aşk hikayesi. Fransız taşra yaşamını ve toplumsal sınıf farklılıklarını gerçekçi bir dille anlatan roman.",
      category: ["Dünya Klasikleri", "Fransız Edebiyatı", "Romantik Roman"],
      readingTime: "12 saat",
      pages: "288 sayfa",
    },
    {
      id: 49,
      title: "Yaban",
      subtitle: "Yakup Kadri Karaosmanoğlu",
      image: YabanCover,
      description:
        "Kurtuluş Savaşı döneminde bir aydının Anadolu'daki gözlemlerini anlatan roman. Aydın-köylü çatışmasını ve yabancılaşma temasını işler.",
      category: ["Türk Edebiyatı", "Kurtuluş Savaşı", "Toplumsal Roman"],
      readingTime: "8 saat",
      pages: "192 sayfa",
    },
    {
      id: 50,
      title: "Yaşar Ne Yaşar Ne Yaşamaz",
      subtitle: "Aziz Nesin",
      image: YasarCover,
      description:
        "Bürokrasinin saçmalıklarını hicveden roman. Toplumsal eleştiriyi mizahi bir dille sunan, bürokrasi eleştirisi yapan önemli bir eser.",
      category: ["Türk Edebiyatı", "Mizah", "Toplumsal Hiciv"],
      readingTime: "10 saat",
      pages: "240 sayfa",
    },
    {
      id: 51,
      title: "Yedinci Gün",
      subtitle: "Orhan Hançerlioğlu",
      image: YedinciCover,
      description:
        "Toplumsal değişim sürecinde bir ailenin yaşadıklarını anlatan roman. Modernleşme ve değerler çatışmasını işler.",
      category: ["Türk Edebiyatı", "Toplumsal Roman", "Modern Roman"],
      readingTime: "9 saat",
      pages: "216 sayfa",
    },
    {
      id: 52,
      title: "Yılkı Atı",
      subtitle: "Abbas Sayar",
      image: YilkiCover,
      description:
        "Bir yılkı atının özgürlük mücadelesini anlatan roman. İnsan-doğa ilişkisini ve özgürlük temasını işleyen etkileyici bir eser.",
      category: ["Türk Edebiyatı", "Doğa Edebiyatı", "Alegorik Roman"],
      readingTime: "6 saat",
      pages: "144 sayfa",
    },
  ];

  return Array.from({ length: Math.min(count, bookData.length) }, (_, i) => ({
    ...bookData[i],
    type: "book",
  }));
};

// Eski statik array'i kaldırıyoruz
// const lessonSections = [ ... ];

// JSON verisini reactive olarak tutacağız
const courseData = ref(null);

// Başlığı formatlamak için yardımcı fonksiyon
const formatTitle = (title) => {
  return title
    .toLowerCase()
    .split(' ')
    .map(word => {
      // Nokta içeren kelimeleri özel olarak işle
      if (word.includes('.')) {
        // Önce ardışık noktaları temizle
        const cleanWord = word.replace(/\.+/g, '.');
        return cleanWord
          .split('.')
          .filter(part => part.length > 0) // Boş parçaları filtrele
          .map((part, index, array) => {
            return part.charAt(0).toUpperCase() + part.slice(1) + (index < array.length ? '.' : '');
          })
          .join('');
      }
      // Normal kelimeler için ilk harfi büyük yap
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

// lessonSections'ı computed property olarak tanımlıyoruz
const lessonSections = computed(() => {
  console.log('courseData:', courseData.value); // Debug için

  if (!courseData.value?.content?.courses) {
    console.log('Courses not found'); // Debug için
    return [];
  }

  const sections = courseData.value.content.courses.map(course => ({
    title: formatTitle(course.title || course.title_uppercase), // title'ı formatlıyoruz
    type: "lesson",
    items: generateItemsFromSubjects(course.subjects || {})
  }));

  console.log('Generated sections:', sections); // Debug için
  return sections;
});

const generateDummyVideos = (subjectName) => {
  return Array(5).fill(null).map((_, index) => ({
    id: `${subjectName}-video-${index}`,
    title: subjectName, // 1. Konu adı
    subtitle: 'Eğitim Kanalı', // 2. Kanal adı
    videoTitle: `Video ${index + 1}`, // 3. Video adı
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    channelName: "Eğitim Kanalı",
    thumbnail: `https://picsum.photos/seed/${subjectName}-${index}/300/200`,
    type: "lesson"
  }));
};

const generateItemsFromSubjects = (subjects) => {
  if (!subjects) return [];
  
  const subjectEntries = Object.entries(subjects);
  
  // 1. Her konudan en az 1 video seçelim
  let selectedVideos = subjectEntries.map(([name, data]) => {
    const analysis = data.analysis?.[0] || {};
    const videos = generateDummyVideos(name);
    
    // Her konudan random 1 video seç
    return {
      ...videos[Math.floor(Math.random() * videos.length)],
      subjectName: name,
      subjectAnalysis: {
        correct: analysis.correct || 0,
        incorrect: analysis.incorrect || 0,
        empty: analysis.empty || 0,
        success_ratio: analysis.success_ratio || 0
      }
    };
  });

  // 2. Kalan slotları dolduralım (20'ye tamamlayalım)
  const remainingSlots = 20 - selectedVideos.length;
  
  if (remainingSlots > 0) {
    // Tüm konulardan kalan videoları bir havuzda toplayalım
    const remainingVideos = subjectEntries.flatMap(([name, data]) => {
      const analysis = data.analysis?.[0] || {};
      // İlk seçilen videoları hariç tut
      return generateDummyVideos(name)
        .slice(1)
        .map(video => ({
          ...video,
          subjectName: name,
          subjectAnalysis: {
            correct: analysis.correct || 0,
            incorrect: analysis.incorrect || 0,
            empty: analysis.empty || 0,
            success_ratio: analysis.success_ratio || 0
          }
        }));
    });

    // Random seç ama karıştır
    const additionalVideos = remainingVideos
      .sort(() => Math.random() - 0.5)
      .slice(0, remainingSlots);

    selectedVideos = [...selectedVideos, ...additionalVideos];
  }

  // Son bir kez karıştır
  return selectedVideos.sort(() => Math.random() - 0.5);
};

  // Component mount olduğunda JSON verisini yükleyelim
  onMounted(async () => {
    try {
      // JSON dosyasını import edelim
      const response = await import('@/data/analysis.json');
      courseData.value = response.default.data; // .data ekledik
    } catch (error) {
      console.error('JSON verisi yüklenirken hata:', error);
    }
  });

  const otherSections = [
    {
      title: "Çalışırken Dinle 🎶",
      type: "music",
      items: generateItems(10, "Music", "music")
    },
    {
      title: "Motivasyon Sözleri 💬",
      type: "quote",
      items: generateItems(10, "Quote", "quote")
    },
    {
      title: "İlham Veren Hikayeler ✍️",
      type: "story",
      items: generateStories(5)
    },
    {
      title: "Kitap Önerileri 📚",
      type: "book",
      items: generateBooks(10)
    }
  ];

  // sections'ı computed property olarak tanımlayalım
  const sections = computed(() => {
    const lessonSectionsValue = lessonSections.value || [];
    console.log('Final sections:', [...lessonSectionsValue, ...otherSections]); // Debug için
    return [...lessonSectionsValue, ...otherSections];
  });

  const scroll = (index, direction) => {
    const container = scrollContainers.value[index];
    if (container) {
      const scrollAmount =
        direction === "left" ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const startDrag = (e) => {
    if (e.type.includes("mouse")) {
      isDragging.value = true;
      startX.value = e.clientX;
      startY.value = e.clientY;
      isDragged.value = false;
    } else {
      touchStartX.value = e.touches[0].clientX;
      touchStartY.value = e.touches[0].clientY;
    }
    const container = e.currentTarget;
    scrollLeft.value = container.scrollLeft;
    momentum.value = { velocity: 0, timestamp: 0 };
  };

  const drag = (e) => {
    if (e.type.includes("mouse")) {
      if (!isDragging.value) return;
      e.preventDefault();
      const x = e.clientX;
      const y = e.clientY;

      if (Math.abs(x - startX.value) > 5 || Math.abs(y - startY.value) > 5) {
        isDragged.value = true;
      }

      const walk = (x - startX.value) * 2;
      e.currentTarget.scrollLeft = scrollLeft.value - walk;
    } else {

      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const deltaX = touchStartX.value - touchX;
      const deltaY = touchStartY.value - touchY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
        e.currentTarget.scrollLeft += deltaX * 2;
      }

      touchStartX.value = touchX;
      touchStartY.value = touchY;
    }

    const currentTimestamp = Date.now();
    const dt = currentTimestamp - momentum.value.timestamp;
    const velocity = (e.currentTarget.scrollLeft - scrollLeft.value) / dt;

    momentum.value = { velocity, timestamp: currentTimestamp };
  };

  const endDrag = (e) => {
    isDragging.value = false;
    const container = e.currentTarget;

    const applyMomentum = () => {
      momentum.value.velocity *= 0.98;
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
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    showModal.value = false;
    document.body.style.overflow = '';
  };

  const openContentModal = (item, type, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (type === "video") {
      selectedLesson.value = {
        title: item.title,
        channelName: item.subtitle,
        videoUrl: item.videoUrl,
        content: item.content,
        type: "video"
      };
    } else if (type === "quote") {
      selectedLesson.value = {
        ...item,
        text: item.quote,  // quote değerini text olarak aktarıyoruz
        type: type
      };
    } else {
      // Diğer tipler için (music, book, story)
      selectedLesson.value = {
        ...item,
        type: type
      };
    }

    showContentModal.value = true;
    console.log('Selected Lesson:', selectedLesson.value);
  };

  const closeContentModal = () => {
    showContentModal.value = false;
  };

  const isScrolled = ref(false);

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  const handleScroll = () => {
    isScrolled.value = window.scrollY > 70; // 50px scroll threshold
  };

  onMounted(() => {
    const setVH = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVH();
    window.addEventListener("resize", setVH);
    scrollContainers.value.forEach((container) => {
      if (container) {
        container.style.cursor = "grab";
      }
    });
  });

  onUnmounted(() => {
    cancelAnimationFrame(animationFrame.value);
  });

  const hoveredSection = ref({});

  const showInfoModal = ref(false)

  const analysisData = [
    {
      subject: "Sözcükte Anlam",
      correct: 18,
      wrong: 4,
      empty: 3,
      net: 17,
      successRate: 68
    },
    {
      subject: "Paragrafta Ana Düşünce",
      correct: 22,
      wrong: 2,
      empty: 1,
      net: 21.5,
      successRate: 86
    },
    {
      subject: "Üçgenler ve Dörtgenler",
      correct: 12,
      wrong: 8,
      empty: 5,
      net: 10,
      successRate: 40
    },
    {
      subject: "İkinci Dereceden Denklemler",
      correct: 25,
      wrong: 5,
      empty: 0,
      net: 23.75,
      successRate: 83
    },
    {
      subject: "Kuvvet ve Hareket",
      correct: 8,
      wrong: 12,
      empty: 5,
      net: 5,
      successRate: 20
    },
    {
      subject: "Asitler ve Bazlar",
      correct: 15,
      wrong: 5,
      empty: 5,
      net: 13.75,
      successRate: 55
    },
    {
      subject: "Hücre ve Organeller",
      correct: 20,
      wrong: 3,
      empty: 2,
      net: 19.25,
      successRate: 77
    },
    {
      subject: "Dalgalar ve Ses",
      correct: null,
      wrong: null,
      empty: null,
      net: null,
      successRate: null
    },
    {
      subject: "Organik Kimya",
      correct: null,
      wrong: null,
      empty: null,
      net: null,
      successRate: null
    },
    {
      subject: "Logaritma",
      correct: null,
      wrong: null,
      empty: null,
      net: null,
      successRate: null
    }
  ];

  const getColorClass = (item) => {
    if (item.correct === null || item.correct === undefined ||
      item.wrong === null || item.wrong === undefined ||
      item.empty === null || item.empty === undefined) {
      return 'text-zinc-400';
    }

    const totalQuestions = item.correct + item.wrong + item.empty;
    const percentage = (item.correct / totalQuestions) * 100;

    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 50) return 'text-yellow-500';
    return 'text-red-600';
  };

  const sortedData = computed(() => {
    const excellent = analysisData
      .filter(item => item.successRate >= 80)
      .sort((a, b) => b.successRate - a.successRate);

    const good = analysisData
      .filter(item => item.successRate >= 50 && item.successRate < 80)
      .sort((a, b) => b.successRate - a.successRate);

    const needsImprovement = analysisData
      .filter(item => item.successRate !== null && item.successRate < 50)
      .sort((a, b) => b.successRate - a.successRate);

    const noData = analysisData
      .filter(item => item.successRate === null);

    return { excellent, good, needsImprovement, noData };
  });

  onMounted(() => {
    openModal();
  });
  
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

