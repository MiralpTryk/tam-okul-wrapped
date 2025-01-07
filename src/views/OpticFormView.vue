<template>
  <div class="text-white min-h-screen">
    <!-- Grid Pattern Background -->
    <div class="fixed inset-0 z-0">
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f_1px,transparent_1px)] bg-[size:8rem_8rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_20%,transparent_80%)] opacity-[0.35]">
      </div>
    </div>

    <!-- Gradient Blobs -->
    <div class="fixed inset-0 z-[1]">
      <!-- sky gradient -->
      <div
        class="absolute top-[-6rem] -left-[10rem] w-[15rem] h-[15rem] sm:w-[20rem] sm:h-[20rem] md:w-[25rem] md:h-[25rem] lg:w-[30rem] lg:h-[30rem] bg-sky-500/60 rounded-full mix-blend-multiply filter blur-[64px] sm:blur-[96px] md:blur-[112px] lg:blur-[128px] animate-blob [animation-delay:2000ms]">
      </div>

      <!-- Red gradient -->
      <div
        class="absolute top-[-1rem] -right-[10rem] w-[15rem] h-[15rem] sm:w-[20rem] sm:h-[20rem] md:w-[25rem] md:h-[25rem] lg:w-[30rem] lg:h-[30rem] bg-red-500/60 rounded-full mix-blend-multiply filter blur-[64px] sm:blur-[96px] md:blur-[112px] lg:blur-[128px] animate-blob [animation-delay:3000ms]">
      </div>

      <!-- violet gradient -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[15rem] h-[15rem] sm:w-[20rem] sm:h-[20rem] md:w-[25rem] md:h-[25rem] lg:w-[30rem] lg:h-[30rem] bg-violet-500/60 rounded-full mix-blend-multiply filter blur-[64px] sm:blur-[96px] md:blur-[112px] lg:blur-[128px] animate-blob [animation-delay:4000ms]">
      </div>
    </div>

    <div class="relative z-[5]">
      <!-- Header -->
      <AppHeader :is-fixed="false" hide-optic-button class="bg-black/95">
        <template #before-button>
          <h1 class="text-xl md:text-2xl font-bold text-white">Optik Form</h1>
        </template>
      </AppHeader>

      <!-- Main Content -->
      <div class="relative z-[6]">
        <div class="mx-auto px-4 sm:px-6 lg:px-16 2xl:px-24">
          <!-- Tabs and Search -->
          <div class="py-4 sm:py-6">
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:max-w-[50%]">
              <div class="flex gap-3 sm:gap-4 flex-1">
                <button @click="activeTab = 'all'" :class="[
                  'px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition-colors w-full',
                  activeTab === 'all' ? 'bg-[#E50914] text-white shadow-lg shadow-[#E50914]/20' : 'bg-[#141414] text-zinc-200 hover:bg-[#3F3F3F]'
                ]">
                  Tüm Sorular
                </button>
                <button @click="activeTab = 'bookmarked'" :class="[
                  'px-3 sm:px-4 py-2 rounded text-xs sm:text-sm font-medium transition-colors w-full',
                  activeTab === 'bookmarked' ? 'bg-[#E50914] text-white shadow-lg shadow-[#E50914]/20' : 'bg-[#141414] text-zinc-200 hover:bg-[#3F3F3F]'
                ]">
                  Favori Sorular
                </button>
              </div>
              <select v-model="currentPage" @change="scrollToSelectedPage"
                class="bg-[#141414] text-zinc-200 rounded px-2 py-2 text-xs sm:text-sm w-full sm:w-1/4 border border-transparent focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-colors">
                <template v-for="(pages, title) in groupedPages" :key="title">
                  <option disabled class="font-semibold bg-[#1F1F1F] text-[#E50914]">{{ title }}</option>
                  <option v-for="page in pages" :key="page" :value="page"
                    :class="['pl-4', { 'text-[#E50914]': isPageSaved(page) }]">
                    Sayfa {{ page }} {{ isPageSaved(page) ? '✓' : '' }}
                  </option>
                </template>
              </select>
              <button @click="handleSubmit"
                class="px-4 sm:px-6 py-2 rounded text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2 w-full sm:w-1/4 whitespace-nowrap bg-[#E50914] text-white shadow-lg shadow-[#E50914]/20 hover:bg-[#E50914]/90">
                <template v-if="isFormCompleted">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Cevaplar Gözden Geçirildi
                </template>
                <template v-else>
                  Cevap Anahtarı
                </template>
              </button>
            </div>
          </div>

          <!-- Questions Grid -->
          <div class="">
            <div v-if="activeTab === 'bookmarked' && !hasBookmarkedQuestions"
              class="text-center text-zinc-400 py-12 mb-36">
              <component :is="BookmarkPlusIcon" class="mx-auto w-12 h-12 mb-4 text-green-500" />
              <p class="text-lg">Favori sorunuz yok. Favorilere eklemek için sorulardaki işarete tıklayın.</p>
            </div>
            <div v-else-if="loading"
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-20 sm:pb-24">
              <QuestionSkeleton v-for="n in 8" :key="n" />
            </div>
            <div v-else class="space-y-12 pb-20">
              <!-- Group by Subject -->
              <template v-for="(subjectQuestions, subject) in groupedQuestions" :key="subject">
                <div class="relative">
                  <div class="sticky top-0 z-30">
                    <div :class="[
                      'w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] transition-colors duration-300',
                      scrollY > 144 ? 'bg-black/95 backdrop-blur-sm' : 'bg-transparent'
                    ]">
                      <div class="mx-auto px-4 sm:px-6 lg:px-16 2xl:px-24">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between py-4">
                          <h2 class="text-xl font-bold text-[#E50914] mb-3 sm:mb-0">{{ subject }}</h2>
                          <div v-show="activeTab === 'all'" class="flex-1 sm:max-w-[50%] sm:ml-8">
                            <div class="flex justify-between text-sm mb-1">
                              <span>Toplam İlerleme</span>
                              <span>{{ answeredOrSavedCount }} / {{ totalQuestions }}</span>
                            </div>
                            <div class="bg-[#1F1F1F] rounded-full h-2">
                              <div class="bg-[#E50914] h-full rounded-full transition-all duration-300"
                                :style="{ width: `${progress}%` }">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Group by Page -->
                  <div class="space-y-8 mt-6">
                    <template v-for="(pageQuestions, page) in subjectQuestions" :key="page">
                      <div class="" :data-page="page">
                        <h3 class="text-lg font-semibold text-zinc-200 mb-4 w-fit">Sayfa {{ page }}</h3>

                        <!-- Questions Grid for this page -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                          <div v-for="question in pageQuestions" :key="question.id" :data-question-id="question.id"
                            class="bg-[#141414]/70 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#3F3F3F]">
                            <div class="flex justify-between items-center mb-2">
                              <span class="font-bold text-base">Soru {{ question.number }}</span>
                              <button @click="toggleBookmark(question.id)" :class="[
                                'hover:scale-110 transition-transform duration-200',
                                question.bookmarked ? 'text-[#E50914]' : 'text-green-500'
                              ]">
                                <component :is="question.bookmarked ? BookmarkMinusIcon : BookmarkPlusIcon"
                                  class="w-5 h-5 md:w-6 md:h-6" />
                              </button>
                            </div>
                            <p class="text-sm text-zinc-400 mb-6 truncate">{{ question.subject }}</p>

                            <!-- Question Image -->
                            <div v-if="showQuestionImages" class="mb-4 relative">
                              <div class="aspect-w-4 aspect-h-3 relative bg-zinc-800 rounded-md overflow-hidden">
                                <img
                                  :src="showQuestionImages ? simulateImageError(imageBaseUrl + '/' + question.image) : ''"
                                  :alt="`Soru ${question.number} görseli`"
                                  class="w-full h-full object-cover absolute inset-0" @error="handleImageError" />
                                <div v-if="imageLoadError"
                                  class="absolute inset-0 flex items-center justify-center bg-zinc-800 text-zinc-400 text-sm">
                                  Resim yüklenemedi
                                </div>
                              </div>
                            </div>

                            <!-- Answer Options -->
                            <div class="grid grid-cols-5 gap-4 md:gap-6">
                              <div v-for="(option, index) in ['A', 'B', 'C', 'D', 'E']" :key="option"
                                class="relative flex items-center justify-center">
                                <input type="radio" :name="`question-${question.id}`"
                                  :id="`question-${question.id}-${option}`" :value="index.toString()"
                                  v-model="question.answer" class="absolute opacity-0 w-full h-full cursor-pointer"
                                  @change="handleAnswerChange(question.id, index.toString())"
                                  :disabled="isPageSaved(question.page)">
                                <label :for="`question-${question.id}-${option}`" :class="[
                                  'w-12 h-12 md:w-10 md:h-10 text-sm md:text-sm rounded-full flex items-center justify-center transition-all duration-200 relative z-0 border cursor-pointer p-4',
                                  {
                                    'border-[#E50914] bg-red-600 text-white': question.answer === index.toString() && !isPageSaved(question.page),
                                    'border-[#3F3F3F] hover:border-[#E50914] text-zinc-200': question.answer !== index.toString() && !isPageSaved(question.page),
                                    'border-zinc-700 text-zinc-500 cursor-not-allowed': isPageSaved(question.page) && question.answer !== index.toString() && index.toString() !== question.correct_answer,
                                    'border-green-600 bg-green-600 text-white': isPageSaved(question.page) && index.toString() === question.correct_answer,
                                    'border-[#E50914] bg-red-600/50 text-white': isPageSaved(question.page) && question.answer === index.toString() && index.toString() !== question.correct_answer
                                  }
                                ]">
                                  {{ option }}
                                </label>
                              </div>
                            </div>
                            <!-- Clear Answer Button -->
                            <button v-if="question.answer !== null && !isPageSaved(question.page)"
                              @click="handleAnswerChange(question.id, null)"
                              class="mt-4 flex items-center justify-center gap-2 text-zinc-400 hover:text-white transition-colors border border-zinc-800 rounded-md py-1.5 px-3 hover:border-zinc-700 w-full">
                              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2">
                                <path
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              <span class="text-sm">Cevabı Temizle</span>
                            </button>

                            <!-- Solution Video Button -->
                            <div v-show="question.saved && showSolutionVideos" class="mt-6">
                              <button @click="watchSolutionVideo(question.id)"
                                class="w-full bg-[#141414] hover:bg-[#3F3F3F] text-white rounded py-2 px-3 flex items-center justify-center gap-2 transition-colors duration-200 border border-[#3F3F3F]">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                  stroke-width="2">
                                  <circle cx="12" cy="12" r="10" />
                                  <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
                                </svg>
                                <span class="text-sm">Çözüm Videosu</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        <!-- Save button moved to bottom -->
                        <div class="flex justify-end mt-8">
                          <button @click="savePageAnswers(subject, page)" :disabled="isPageSaved(page)" :class="[
                            'px-4 py-2 text-sm font-medium rounded transition-colors shadow-lg flex items-center gap-2',
                            isPageSaved(page)
                              ? 'bg-green-600 text-white cursor-not-allowed opacity-75'
                              : 'bg-[#E50914] text-white hover:bg-[#E50914]/90 shadow-[#E50914]/20'
                          ]">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{{ isPageSaved(page) ? 'Kaydedildi' : 'Kaydet' }}</span>
                          </button>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </template>

              <!-- Loading Indicator -->
              <div v-if="isLoadingMore" class="flex justify-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-2 border-[#E50914] border-t-transparent"></div>
              </div>

              <!-- End of Questions Message -->
              <div v-if="!isLoadingMore && visibleQuestionsCount >= filteredQuestions.length"
                class="text-center py-8 text-zinc-400">
                Tüm sorular yüklendi
              </div>
            </div>
          </div>
        </div>

        <!-- Video Modal -->
        <div v-if="showVideoModal"
          class="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div class="bg-[#141414] rounded-lg overflow-hidden w-full max-w-4xl mx-4">
            <div class="p-3 sm:p-4 flex justify-between items-center border-b border-zinc-800">
              <h3 class="text-base sm:text-lg font-medium text-zinc-200">Çözüm Videosu</h3>
              <button @click="closeVideoModal" class="text-zinc-400 hover:text-white transition-colors">
                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="aspect-w-16">
              <iframe v-if="currentVideoUrl" :src="currentVideoUrl" class="w-full h-full" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
              <div v-else class="w-full h-full flex items-center justify-center text-zinc-400 text-sm sm:text-base">
                Video bulunamadı
              </div>
            </div>
          </div>
        </div>

        <!-- Welcome Modal -->
        <div v-if="showWelcomeModal"
          class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div class="bg-[#141414] text-white p-6 rounded-md max-w-lg w-full border border-zinc-800 shadow-2xl">
            <h2 class="text-xl font-bold mb-4 text-[#E50914]">Kişiye Özel Kitap Optik Form</h2>
            <div class="mb-4 text-sm text-gray-200 leading-relaxed space-y-3">
              <div class="space-y-2">
                <p class="flex items-start gap-2">
                  <span class="text-[#E50914] font-bold">1.</span>
                  <span>Her sayfadaki soruları cevaplayıp "Kaydet" butonuna basın. İstediğiniz soruları boş
                    bırakabilirsiniz.</span>
                </p>

                <p class="flex items-start gap-2">
                  <span class="text-[#E50914] font-bold">2.</span>
                  <span>Tüm sayfaları tamamladıktan sonra "Sınavı Bitir" butonuna basın. İşaretlenmemiş sorular boş
                    sayılacaktır.</span>
                </p>

                <p class="flex items-start gap-2">
                  <span class="text-[#E50914] font-bold">3.</span>
                  <span>Sınavı bitirdikten sonra cevaplarınızı değiştiremezsiniz.</span>
                </p>
              </div>

              <div class="bg-[#E50914]/10 text-[#E50914] p-2 rounded space-y-1 text-xs">
                <p class="font-semibold">İpuçları:</p>
                <ul class="list-disc list-inside space-y-0.5">
                  <li>A, B, C, D, E tuşlarıyla hızlıca cevap verebilirsiniz</li>
                  <li>
                    <BookmarkPlusIcon class="w-4 h-4 inline-block text-green-500" /> işareti ile soruları favorilere
                    ekleyebilirsiniz
                  </li>
                  <li>"Cevabı Temizle" butonu ile cevabınızı kaldırabilirsiniz</li>
                  <li>Cevaplarınızı istediğiniz zaman değiştirebilirsiniz</li>
                </ul>
              </div>
            </div>

            <div class="flex items-center mb-4">
              <input type="checkbox" id="dontShowWelcomeAgain" v-model="dontShowWelcomeAgain"
                class="mr-2 w-4 h-4 bg-[#141414] border-2 border-gray-600 text-[#E50914] rounded focus:ring-[#E50914] focus:ring-offset-[#141414]">
              <label for="dontShowWelcomeAgain"
                class="text-xs text-gray-300 select-none hover:text-white transition-colors">
                Bu bilgilendirmeyi tekrar gösterme
              </label>
            </div>
            <div class="flex justify-end">
              <button @click="closeWelcomeModal"
                class="px-6 py-2 text-sm font-medium bg-[#E50914] text-white rounded hover:bg-[#E50914]/90 transition-colors duration-300 shadow-xl shadow-[#E50914]/20">
                Anladım
              </button>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div v-if="error" class="flex items-center justify-center min-h-screen">
          <div class="text-[#E50914] text-center p-4">
            <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p class="text-xl mb-4">{{ error }}</p>
            <p class="text-sm text-gray-400 mb-4">Hata Kodu: {{ Date.now() }}</p>
            <button @click="loadQuestions"
              class="bg-[#E50914] text-white px-4 py-2 rounded hover:bg-[#E50914]/90 transition-colors">
              Tekrar Dene
            </button>
          </div>
        </div>

        <!-- Submit Modal -->
        <div v-if="showSubmitModal" class="fixed inset-0 z-[100]">
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto" @click="showSubmitModal = false">
          </div>
          <div class="fixed inset-0 pointer-events-none">
            <div class="flex min-h-full items-center justify-center p-4">
              <div
                class="bg-[#141414] text-white p-4 sm:p-6 md:p-8 rounded-md w-full max-w-4xl border border-zinc-800 shadow-2xl overflow-y-auto max-h-[90vh] mx-4 pointer-events-auto">
                <div class="flex justify-between items-center mb-6">
                  <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-[#E50914]">Cevaplarını Gözden Geçir</h2>
                  <button @click="showSubmitModal = false" class="text-zinc-400 hover:text-white transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div class="mb-6 space-y-4">
                  <template v-if="Object.keys(allSavedAnswers).length === 0">
                    <div class="text-center py-8 space-y-6">
                      <p class="text-sm sm:text-base text-gray-200 leading-relaxed">
                        Henüz hiç cevap kaydetmediniz. Cevaplarınızı kaydetmek için her sayfanın sonunda bulunan
                        <span class="inline-flex items-center gap-1 px-2 py-1 bg-[#E50914] text-white text-sm rounded">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Kaydet</span>
                        </span>
                        butonuna basın.
                      </p>
                      <p class="text-xs text-yellow-500">
                        <strong>Not:</strong> Kaydedilen cevaplar daha sonra değiştirilemez.
                      </p>
                    </div>
                  </template>
                  <template v-else>
                    <p class="text-sm sm:text-base text-gray-200 leading-relaxed">
                      Kaydedilen cevaplarınız aşağıdaki gibidir:
                    </p>

                    <!-- Display saved answers -->
                    <div class="space-y-4 sm:space-y-6">
                      <template v-for="(pages, subject) in allSavedAnswers" :key="subject">
                        <div class="border border-zinc-800 rounded-lg overflow-hidden">
                          <button @click="toggleAccordion(subject)"
                            class="w-full p-3 sm:p-4 flex justify-between items-center text-left hover:bg-zinc-900/50 transition-colors">
                            <h3 class="text-base sm:text-lg font-semibold text-[#E50914] flex items-center gap-2">
                              <span>{{ subject }}</span>
                              <span class="text-xs text-zinc-400 font-normal">
                                ({{ Object.values(pages).reduce((total, page) => total + Object.keys(page).length, 0) }}
                                Soru)
                              </span>
                            </h3>
                            <svg class="w-5 h-5 text-zinc-400 transition-transform duration-200"
                              :class="{ 'rotate-180': openAccordions[subject] }" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          <div v-show="openAccordions[subject]" class="border-t border-zinc-800">
                            <div class="p-3 sm:p-4 space-y-4">
                              <template v-for="(questions, page) in pages" :key="page">
                                <div class="border-t border-zinc-800 pt-3 sm:pt-4 first:border-t-0 first:pt-0">
                                  <h4 class="text-xs sm:text-sm font-medium mb-2 text-zinc-400">Sayfa {{ page }}</h4>
                                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
                                    <div v-for="(question, questionIndex) in Object.values(questions)" :key="question.id"
                                      class="bg-[#1F1F1F] p-2 sm:p-3 rounded-lg text-xs sm:text-sm">
                                      <div class="flex justify-between items-center">
                                        <span class="text-zinc-300">Soru {{
                                          Object.entries(pages)
                                            .filter(([p]) => parseInt(p) < parseInt(page)).reduce((count, [_,
                                              pageQuestions]) => count + Object.keys(pageQuestions).length, 0)
                                          + questionIndex + 1
                                            }}</span>
                                        <div class="flex items-center gap-2">
                                          <!-- Öğrenci Cevabı -->
                                          <span :class="[
                                            'font-medium px-2 py-0.5 rounded',
                                            question.answer === null
                                              ? 'text-yellow-500 bg-yellow-500/10'
                                              : question.answer === parseInt(question.correct)
                                                ? 'text-green-500 bg-green-500/10'
                                                : 'text-[#E50914] bg-[#E50914]/10'
                                          ]">
                                            {{ question.answer === null ? 'Boş' : ['A', 'B', 'C', 'D',
                                            'E'][question.answer] }}
                                            {{
                                              question.answer !== null &&
                                                question.answer === parseInt(question.correct)
                                                ? '✓'
                                                : question.answer !== null ? '✗' : ''
                                            }}
                                          </span>
                                          <!-- Doğru Cevap -->
                                          <span class="text-green-500 bg-green-500/10 px-2 py-0.5 rounded font-medium">
                                            {{ ['A', 'B', 'C', 'D', 'E'][parseInt(question.correct)] }}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </template>
                            </div>
                          </div>
                        </div>
                      </template>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { useAnalysisStore } from '@/composables/useAnalysisStore';
import { BookmarkPlusIcon, BookmarkMinusIcon } from 'lucide-vue-next';
import AppHeader from "@/components/AppHeader.vue";
import QuestionSkeleton from "@/components/QuestionSkeleton.vue";
import Swal from 'sweetalert2';

const analysisStore = useAnalysisStore();
const imageBaseUrl = process.env.VUE_APP_IMAGE_BASE_URL || '';
const showQuestionImages = ref(process.env.VUE_APP_SHOW_QUESTION_IMAGES === 'true');
const showSolutionVideos = ref(process.env.VUE_APP_SHOW_SOLUTION_VIDEOS === 'true');

const questions = ref([]);
const loading = computed(() => analysisStore.isOpticDataLoading.value);
const error = ref(null);
const activeTab = ref('all');
const currentPage = ref(1);
const imageLoadError = ref(false);
const showVideoModal = ref(false);
const currentVideoUrl = ref('');
const showWelcomeModal = ref(true);
const dontShowWelcomeAgain = ref(false);
const allSavedAnswers = ref({});
const showSubmitModal = ref(false);

const savedPages = ref(new Set());

const isFormCompleted = ref(false);

const QUESTIONS_PER_PAGE = 20;
const visibleQuestionsCount = ref(QUESTIONS_PER_PAGE);
const isLoadingMore = ref(false);

const visibleQuestions = computed(() => {
  const filtered = filteredQuestions.value;
  return filtered.slice(0, visibleQuestionsCount.value);
});

const loadMoreQuestions = () => {
  if (isLoadingMore.value) return;

  isLoadingMore.value = true;
  setTimeout(() => {
    visibleQuestionsCount.value += QUESTIONS_PER_PAGE;
    isLoadingMore.value = false;
  }, 300);
};

const handleScroll = () => {
  const scrollContainer = document.documentElement;
  const scrolledToBottom = scrollContainer.scrollHeight - scrollContainer.scrollTop <= scrollContainer.clientHeight + 300;

  if (scrolledToBottom && visibleQuestionsCount.value < filteredQuestions.value.length) {
    loadMoreQuestions();
  }
};

const filteredQuestions = computed(() => {
  let filtered = questions.value;

  if (activeTab.value === 'bookmarked') {
    filtered = filtered.filter(q => q.bookmarked);
  }

  return filtered;
});

const groupedPages = computed(() => {
  const grouped = {};
  filteredQuestions.value.forEach(q => {
    if (!grouped[q.title]) {
      grouped[q.title] = new Set();
    }
    grouped[q.title].add(q.page);
  });

  for (const section in grouped) {
    grouped[section] = Array.from(grouped[section]).sort((a, b) => a - b);
  }

  return grouped;
});

const availablePages = computed(() => {
  return Object.values(groupedPages.value).flat();
});

const loadQuestions = () => {
  error.value = null;

  try {
    if (analysisStore.isOpticDataLoading.value) {
      return;
    }

    const opticData = analysisStore.opticData.value;

    if (!opticData) {
      error.value = 'Veriler henüz yüklenmedi. Lütfen anasayfadan tekrar deneyin.';
      return;
    }

    if (!opticData.courses) {
      error.value = 'Geçersiz veri yapısı';
      return;
    }

    let allQuestions = [];

    opticData.courses.forEach(course => {
      const pageNumbers = Object.keys(course.pages).map(Number).sort((a, b) => a - b);

      pageNumbers.forEach(pageNumber => {
        const pageQuestions = course.pages[pageNumber];
        Object.values(pageQuestions).forEach(question => {
          allQuestions.push({
            id: question.id,
            number: question.number,
            difficulty: question.difficulty,
            correct_answer: question.correct_answer.toString(),
            subject: question.subject,
            image: question.image,
            page: parseInt(pageNumber),
            title: course.title,
            answer: null,
            bookmarked: false,
            saved: false
          });
        });
      });
    });

    allQuestions.sort((a, b) => {
      if (a.title !== b.title) {
        const subjectOrderA = opticData.courses.findIndex(c => c.title === a.title);
        const subjectOrderB = opticData.courses.findIndex(c => c.title === b.title);
        return subjectOrderA - subjectOrderB;
      }

      return a.page - b.page;
    });

    questions.value = allQuestions.map(newQ => {
      const existingQ = questions.value.find(q => q.id === newQ.id);
      return existingQ ? { ...newQ, answer: existingQ.answer, bookmarked: existingQ.bookmarked, saved: existingQ.saved } : newQ;
    });
  } catch (err) {
    console.error('Error loading questions:', err);
    error.value = err.message || 'Sorular yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
  }
};

watch(() => analysisStore.opticData.value, (newData) => {
  if (newData && !questions.value.length) {
    loadQuestions();
  }
}, { immediate: true });

watch(availablePages, (newPages) => {
  if (newPages.length > 0 && !newPages.includes(currentPage.value)) {
    currentPage.value = newPages[0];
  }
}, { immediate: true });

const currentPageQuestions = computed(() => {
  const questions = filteredQuestions.value.filter(q => q.page === currentPage.value);
  return questions;
});

const totalQuestions = computed(() => questions.value.length);
const answeredOrSavedCount = computed(() => questions.value.filter(q => q.answer !== null || q.saved).length);
const progress = computed(() => (answeredOrSavedCount.value / totalQuestions.value) * 100);
const hasBookmarkedQuestions = computed(() => questions.value.some(q => q.bookmarked));

const selectAnswer = (questionId, option) => {
  const question = questions.value.find(q => q.id === questionId);
  if (question && !question.saved && !isPageSaved(question.page)) {
    const optionIndex = ['A', 'B', 'C', 'D', 'E'].indexOf(option).toString();
    question.answer = question.answer === optionIndex ? null : optionIndex;
  }
};

const toggleBookmark = (questionId) => {
  const question = questions.value.find(q => q.id === questionId);
  if (question) {
    question.bookmarked = !question.bookmarked;
    saveAnswers();
  }
};

const saveAnswers = () => {
  localStorage.setItem('optikFormAnswers', JSON.stringify(questions.value));
};

const loadAnswers = () => {
  const savedAnswers = localStorage.getItem('optikFormAnswers');
  if (savedAnswers) {
    const parsedAnswers = JSON.parse(savedAnswers);
    questions.value = questions.value.map(q => {
      const savedQuestion = parsedAnswers.find(sq => sq.id === q.id);
      return savedQuestion ? { ...q, answer: savedQuestion.answer, bookmarked: savedQuestion.bookmarked, saved: savedQuestion.saved } : q;
    });

    const savedQuestions = questions.value.filter(q => q.saved);
    const reconstructedAnswers = { answers: {} };

    savedQuestions.forEach(q => {
      if (!reconstructedAnswers.answers[q.title]) {
        reconstructedAnswers.answers[q.title] = {};
      }
      if (!reconstructedAnswers.answers[q.title][q.page]) {
        reconstructedAnswers.answers[q.title][q.page] = {};
      }
      reconstructedAnswers.answers[q.title][q.page][q.id] = {
        id: q.id,
        correct: parseInt(q.correct_answer),
        answer: q.answer !== null ? parseInt(q.answer) : null
      };

      savedPages.value.add(q.page);
    });

    allSavedAnswers.value = mergeAndSortAnswers(reconstructedAnswers);
  }
};

const scrollToQuestion = (questionId, addBorder = false) => {
  nextTick(() => {
    const questionElement = document.querySelector(`[data-question-id="${questionId}"]`);
    if (questionElement) {
      questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (addBorder) {
        addTemporaryBorder(questionElement);
      }
    }
  });
};

const addTemporaryBorder = (element) => {
  element.classList.add('border-2', 'border-transition');
  element.style.borderColor = 'transparent';

  void element.offsetWidth;

  element.style.borderColor = 'rgb(220, 38, 38)';

  setTimeout(() => {
    element.style.borderColor = 'transparent';
    setTimeout(() => {
      element.classList.remove('border-2', 'border-transition');
    }, 300);
  }, 1000);
};

const handleKeyPress = (e) => {
  if (['a', 'b', 'c', 'd', 'e'].includes(e.key.toLowerCase())) {
    const option = e.key.toUpperCase();
    const unansweredQuestion = currentPageQuestions.value.find(q => q.answer === null && !q.saved);
    if (unansweredQuestion) {
      selectAnswer(unansweredQuestion.id, option);
      scrollToQuestion(unansweredQuestion.id);
    }
  }
};


const isPageSaved = (page) => {
  return savedPages.value.has(parseInt(page));
};

const handleImageError = (event) => {
  console.error('Image load error:', event.target.src);
  event.target.style.display = 'none';
  const errorElement = event.target.nextElementSibling;
  if (errorElement) {
    errorElement.style.display = 'flex';
  } else {
    console.error('Error element not found');
  }
};

const watchSolutionVideo = (questionId) => {

  const question = questions.value.find(q => q.id === questionId);

  if (question) {
    const videoUrl = question.video_url || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
    currentVideoUrl.value = videoUrl;

    showVideoModal.value = true;
  }
};

const closeVideoModal = () => {
  showVideoModal.value = false;
  currentVideoUrl.value = '';
};

const closeWelcomeModal = () => {
  showWelcomeModal.value = false;
  if (dontShowWelcomeAgain.value) {
    localStorage.setItem('welcomeModalShown', 'true');
  }
};

const simulateImageError = (imageUrl) => {
  return Math.random() > 0.5 ? imageUrl : 'invalid-url';
};

const handleAnswerChange = (questionId, answer) => {
  const question = questions.value.find(q => q.id === questionId);
  if (question && !isPageSaved(question.page) && !isFormCompleted.value) {
    question.answer = answer;
  }
};

const mergeAndSortAnswers = (currentAnswers) => {
  const mergedAnswers = { ...allSavedAnswers.value };

  if (!currentAnswers || !currentAnswers.answers) {
    return mergedAnswers;
  }

  Object.entries(currentAnswers.answers).forEach(([subject, pages]) => {
    if (!mergedAnswers[subject]) {
      mergedAnswers[subject] = {};
    }

    Object.entries(pages).forEach(([page, answers]) => {
      if (!mergedAnswers[subject][page]) {
        mergedAnswers[subject][page] = {};
      }
      Object.assign(mergedAnswers[subject][page], answers);
    });
  });

  const sortedAnswers = {};

  const subjectOrder = [...new Set(questions.value.map(q => q.title))];

  subjectOrder.forEach(subject => {
    if (mergedAnswers[subject]) {
      sortedAnswers[subject] = {};

      const pages = Object.keys(mergedAnswers[subject]).map(Number);
      pages.sort((a, b) => a - b);

      pages.forEach(page => {
        sortedAnswers[subject][page] = mergedAnswers[subject][page];
      });
    }
  });

  return sortedAnswers;
};

const handleSubmit = () => {
  showSubmitModal.value = true;
};


const scrollToSelectedPage = () => {
  nextTick(() => {
    const pageElement = document.querySelector(`[data-page="${currentPage.value}"]`);
    if (pageElement) {
      pageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
};

const scrollY = ref(0);

const updateScrollPosition = () => {
  scrollY.value = window.scrollY;
};

onMounted(() => {
  loadQuestions();
  loadAnswers();

  const completed = localStorage.getItem('optikFormCompleted');
  if (completed === 'true') {
    isFormCompleted.value = true;
  }

  window.addEventListener('keydown', handleKeyPress);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && showVideoModal.value) {
      closeVideoModal();
    }
  });

  if (localStorage.getItem('welcomeModalShown')) {
    showWelcomeModal.value = false;
  }

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('scroll', updateScrollPosition);
  updateScrollPosition();
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress);
  window.removeEventListener('keydown', (e) => {
    if (e.key === 'Escape' && showVideoModal.value) {
      closeVideoModal();
    }
  });

  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('scroll', updateScrollPosition);
});

watch(questions, saveAnswers, { deep: true });

watch(availablePages, (newPages) => {
  if (newPages.length > 0 && !newPages.includes(currentPage.value)) {
    currentPage.value = newPages[0];
  }
}, { immediate: true });

const openAccordions = ref({});

const toggleAccordion = (subject) => {
  openAccordions.value[subject] = !openAccordions.value[subject];
};

const groupedQuestions = computed(() => {
  const grouped = {};
  visibleQuestions.value.forEach(q => {
    if (!grouped[q.title]) {
      grouped[q.title] = {};
    }
    if (!grouped[q.title][q.page]) {
      grouped[q.title][q.page] = [];
    }
    grouped[q.title][q.page].push(q);
  });
  return grouped;
});

const savedAnswersData = ref({
  code: '',
  answers: []
});

const subjectOrder = computed(() => {
  if (!analysisStore.opticData.value?.courses) return [];
  return analysisStore.opticData.value.courses.map(course => course.title);
});

const savePageAnswers = (subject, page) => {
  if (isPageSaved(page) || isFormCompleted.value) {
    Swal.fire({
      title: 'Hata!',
      text: 'Bu sayfa zaten kaydedilmiş veya form tamamlanmış.',
      icon: 'error',
      confirmButtonText: 'Tamam',
      confirmButtonColor: '#E50914',
      background: '#141414',
      color: '#fff',
      iconColor: '#E50914'
    });
    return;
  }

  Swal.fire({
    title: 'Emin misiniz?',
    html: `
      <div class="text-left space-y-2">
        <p>Sayfa ${page} cevaplarınızı kaydetmek üzeresiniz.</p>
        <p class="text-yellow-500"><strong>Dikkat:</strong> Kaydedilen cevaplar daha sonra değiştirilemez!</p>
      </div>
    `,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Evet, Kaydet',
    cancelButtonText: 'İptal',
    confirmButtonColor: '#E50914',
    cancelButtonColor: '#3F3F3F',
    background: '#141414',
    color: '#fff',
    iconColor: '#E50914'
  }).then((result) => {
    if (result.isConfirmed) {
      if (isPageSaved(page) || isFormCompleted.value) {
        return;
      }

      const pageQuestions = questions.value.filter(q => q.title === subject && q.page === parseInt(page));

      const hash = window.location.hash;
      const code = hash.split('/').pop() || '';

      savedAnswersData.value.code = code;

      let existingSubjectIndex = savedAnswersData.value.answers.findIndex(ans => ans[subject]);

      if (existingSubjectIndex === -1) {
        const targetIndex = subjectOrder.value.indexOf(subject);
        let insertIndex = 0;

        while (insertIndex < savedAnswersData.value.answers.length) {
          const currentSubject = Object.keys(savedAnswersData.value.answers[insertIndex])[0];
          if (subjectOrder.value.indexOf(currentSubject) > targetIndex) {
            break;
          }
          insertIndex++;
        }

        const newAnswerData = {
          [subject]: {
            [page]: {}
          }
        };

        pageQuestions.forEach(question => {
          newAnswerData[subject][page][question.id] = {
            id: question.id,
            correct: parseInt(question.correct_answer),
            answer: question.answer !== null ? parseInt(question.answer) : null
          };

          question.saved = true;
        });

        savedAnswersData.value.answers.splice(insertIndex, 0, newAnswerData);
      } else {
        const newPageData = {};
        pageQuestions.forEach(question => {
          newPageData[question.id] = {
            id: question.id,
            correct: parseInt(question.correct_answer),
            answer: question.answer !== null ? parseInt(question.answer) : null
          };

          question.saved = true;
        });
        savedAnswersData.value.answers[existingSubjectIndex][subject][page] = newPageData;
      }

      savedPages.value.add(parseInt(page));

      saveAnswers();

      const answersArray = savedAnswersData.value.answers;
      const cleanAnswers = JSON.parse(JSON.stringify(answersArray));
      const dataToSend = {
        code: savedAnswersData.value.code,
        answers: JSON.stringify(cleanAnswers)
      };

      console.log('Data to be sent to API:', dataToSend);

      const apiUrl = `${process.env.VUE_APP_API_BASE_URL}/koksis/submit-optic-form`;

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      })
        .then(response => response.json())
        .then(data => {
          console.log('API Response:', data);

          Swal.fire({
            title: 'Başarılı!',
            text: 'Cevaplarınız kaydedildi.',
            icon: 'success',
            confirmButtonText: 'Tamam',
            confirmButtonColor: '#E50914',
            background: '#242424',
            color: '#fff',
            iconColor: '#E50914',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            toast: true,
            position: 'top',
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          });
        })
        .catch(error => {
          console.error('API Error:', error);

          Swal.fire({
            title: 'Hata!',
            text: 'Cevaplarınız kaydedilirken bir hata oluştu.',
            icon: 'error',
            confirmButtonText: 'Tamam',
            confirmButtonColor: '#E50914',
            background: '#242424',
            color: '#fff',
            iconColor: '#E50914'
          });
        });
    }
  });
};

watch(isFormCompleted, (newValue) => {
  if (newValue) {
    localStorage.setItem('optikFormCompleted', 'true');
    questions.value.forEach(q => {
      q.saved = true;
    });
  }
});

onMounted(() => {

  const completed = localStorage.getItem('optikFormCompleted');
  if (completed === 'true') {
    isFormCompleted.value = true;
    questions.value.forEach(q => {
      q.saved = true;
    });
  }

  const savedPagesFromStorage = localStorage.getItem('savedPages');
  if (savedPagesFromStorage) {
    const parsedPages = JSON.parse(savedPagesFromStorage);
    savedPages.value = new Set(parsedPages);
  }
});

const saveSavedPages = () => {
  localStorage.setItem('savedPages', JSON.stringify([...savedPages.value]));
};

watch(savedPages, () => {
  saveSavedPages();
}, { deep: true });
</script>

<style scoped>
.border-zinc-400:hover {
  @apply border-zinc-300;
  transform: scale(1.1);
  transition: all 0.15s ease;
}

.text-right,
.text-xs {
  user-select: none;
}

.border-transition {
  transition: border-color 0.3s ease-in-out;
}

select option:disabled {
  color: #9CA3AF;
}

select option:not(:disabled) {
  color: white;
}

select option:checked {
  background-color: #374151;
}

.aspect-w-4 {
  position: relative;
  padding-bottom: 75%;
}

.aspect-w-4>* {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%;
}

.aspect-w-16>* {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

[v-if="showWelcomeModal"]>div {
  animation: fadeIn 0.3s ease-out;
}

:root {
  --netflix-red: #E50914;
}

.text-netflix-red {
  color: var(--netflix-red);
}

.bg-netflix-red {
  background-color: var(--netflix-red);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

[v-if="showConfirmation"]>div,
[v-if="showWelcomeModal"]>div {
  animation: fadeIn 0.3s ease-out;
}
</style>