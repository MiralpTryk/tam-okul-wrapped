<template>
  <div class=" text-white min-h-screen">
    <div class="mx-auto px-4 sm:px-6 lg:px-16 2xl:px-24">
      <div class="space-y-4">
        <!-- Header and Navigation -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4">
          <div class="flex items-center gap-4">
            <a href="/" class="flex items-center">
              <img src="@/assets/tam-okul-logo-dark.webp" alt="Tam Okul Logo" class="h-8 w-auto" />
            </a>
            <h1 class="text-2xl md:text-3xl font-bold">Optik Form</h1>
          </div>
        </div>

        <!-- Tabs and Search -->
        <div class="flex flex-col sm:flex-row gap-4 xl:max-w-[50%] text-nowrap">
          <div class="flex gap-4">
            <button @click="activeTab = 'all'" :class="[
              'px-4 py-2 rounded text-sm font-medium transition-colors w-1/2',
              activeTab === 'all' ? 'bg-red-600 text-white' : 'bg-[#2F2F2F] text-zinc-300 hover:bg-[#3F3F3F]'
            ]">
              Tüm Sorular
            </button>
            <button @click="activeTab = 'bookmarked'" :class="[
              'px-4 py-2 rounded text-sm font-medium transition-colors w-1/2',
              activeTab === 'bookmarked' ? 'bg-red-600 text-white' : 'bg-[#2F2F2F] text-zinc-300 hover:bg-[#3F3F3F]'
            ]">
              Favori Sorular
            </button>
          </div>
          <div class="relative flex-1 sm:w-[30%]">
            <input v-model="searchQuery" type="text" placeholder="Soru ara..."
              class="w-full bg-[#2F2F2F] text-white rounded pl-10 pr-3 py-2 text-sm min-w-0 border border-transparent focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
          </div>
          <select v-model="currentPage"
            class="bg-[#2F2F2F] text-white rounded px-2 py-2 text-sm w-full sm:w-[30%] border border-transparent focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors">
            <template v-for="(pages, title) in groupedPages" :key="title">
              <option disabled class="font-semibold bg-[#1F1F1F]">{{ title }}</option>
              <option v-for="page in pages" :key="page" :value="page"
                :class="['pl-4', { 'text-red-600': isPageSaved(page) }]">
                Sayfa {{ page }} {{ isPageSaved(page) ? '✓ (kaydedildi)' : '' }}
              </option>
            </template>
          </select>
        </div>

        <!-- Progress Bars -->
        <div class="sticky top-0 bg-black backdrop-blur-sm z-50 py-4 border-b border-[#2F2F2F]">
          <div class="grid gap-2">
            <div>
              <div class="flex justify-between text-sm mb-1 sm:max-w-[50%]">
                <span>Toplam İlerleme</span>
                <span>{{ answeredOrSavedCount }} / {{ totalQuestions }}</span>
              </div>
              <div class="bg-[#2F2F2F] rounded-full h-2 sm:max-w-[50%]">
                <div class="bg-red-600 h-full rounded-full transition-all duration-300"
                  :style="{ width: `${progress}%` }">
                </div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1 sm:max-w-[50%]">
                <span>Sayfa {{ currentPage }}</span>
                <span>{{ currentPageAnsweredOrSavedCount }} / {{ currentPageQuestions.length }}</span>
              </div>
              <div class="bg-[#2F2F2F] rounded-full h-2 sm:max-w-[50%]">
                <div class="bg-red-600 h-full rounded-full transition-all duration-300"
                  :style="{ width: `${currentPageProgress}%` }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Questions Grid -->
        <div v-if="activeTab === 'bookmarked' && !hasBookmarkedQuestions"
          class="text-center text-zinc-400 py-12 mb-36">
          <component :is="BookmarkPlusIcon" class="mx-auto w-12 h-12 mb-4 text-red-600" />
          <p class="text-lg">Favori sorunuz yok. Favorilere eklemek için sorulardaki işarete tıklayın.</p>
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-20 sm:pb-24">
          <!-- Question Card -->
          <div v-for="question in currentPageQuestions" :key="question.id" :data-question-id="question.id"
            class="bg-[#1f1f1f] rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#3F3F3F]">
            <div class="flex justify-between items-center mb-2">
              <span class="font-bold text-base">Soru {{ question.number }}</span>
              <button @click="toggleBookmark(question.id)" :class="[
                'hover:scale-110 transition-transform duration-200',
                question.bookmarked ? 'text-red-600' : 'text-green-500'
              ]">
                <component :is="question.bookmarked ? BookmarkMinusIcon : BookmarkPlusIcon"
                  class="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
            <p class="text-sm text-zinc-400 mb-6 truncate">{{ question.subject }}</p>

            <!-- Question Image -->
            <div v-if="showQuestionImages" class="mb-4 relative">
              <div class="aspect-w-4 aspect-h-3 relative bg-zinc-800 rounded-md overflow-hidden">
                <img :src="showQuestionImages ? simulateImageError(imageBaseUrl + '/' + question.image) : ''"
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
              <button v-for="(option, index) in ['A', 'B', 'C', 'D', 'E']" :key="option"
                @click="selectAnswer(question.id, option)" :class="[
                  'w-12 h-12 md:w-10 md:h-10 text-sm md:text-sm rounded-full flex items-center justify-center transition-all duration-200 relative z-0 border',
                  {
                    'border-red-600 bg-red-600 text-white': !question.saved && question.answer === index.toString(),
                    'border-[#3F3F3F] hover:border-red-600 text-zinc-300': !question.saved && question.answer !== index.toString(),
                    'border-green-500 bg-green-500 text-white': question.saved && question.correct_answer === index.toString(),
                    'border-red-600 bg-red-600 text-white': question.saved && question.answer === index.toString() && question.answer !== question.correct_answer,
                    'border-[#3F3F3F] text-zinc-300': question.saved && question.answer !== index.toString() && question.correct_answer !== index.toString(),
                    'opacity-50 cursor-not-allowed': question.saved || isPageSaved(question.page)
                  }
                ]">
                {{ option }}
              </button>
            </div>


            <!-- Solution Video Button -->
            <div v-if="question.saved" class="mt-6">
              <button @click="watchSolutionVideo(question.id)"
                class="w-full bg-[#2F2F2F] hover:bg-[#3F3F3F] text-white rounded py-2 px-3 flex items-center justify-center gap-2 transition-colors duration-200 border border-[#3F3F3F]">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
                </svg>
                <span class="text-sm">Çözüm Videosu</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Bottom Navigation Bar -->
        <div v-if="activeTab !== 'bookmarked'"
          class="fixed bottom-0 left-0 right-0 bg-[#141414]/95 backdrop-blur-sm border-t border-[#2F2F2F] z-40">
          <div class="mx-auto flex justify-between items-center py-3 px-4 sm:px-6 lg:px-16 2xl:px-24">
            <button @click="goToPreviousPage" :disabled="!hasPreviousPage"
              class="px-4 py-2 text-sm bg-[#2F2F2F] text-white rounded hover:bg-[#3F3F3F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              Önceki
            </button>
            <button @click="showSaveConfirmation" :disabled="!hasUnsavedAnswers || isPageSaved(currentPage)" :class="[
              'px-4 py-2 text-sm rounded transition-colors',
              isPageSaved(currentPage)
                ? 'bg-[#2F2F2F] text-white opacity-50 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-600/90 disabled:opacity-50 disabled:cursor-not-allowed'
            ]">
              {{ isPageSaved(currentPage) ? 'Kaydedildi' : 'Kaydet' }}
            </button>
            <button @click="goToNextPage" :disabled="!hasNextPage"
              class="px-4 py-2 text-sm bg-[#2F2F2F] text-white rounded hover:bg-[#3F3F3F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              Sonraki
            </button>
          </div>
        </div>
      </div>

      <!-- Save Confirmation Modal -->
      <div v-if="showConfirmation"
        class="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
        <div class="bg-[#141414] text-white p-6 md:p-8 rounded-md max-w-xl w-full border border-zinc-800 shadow-2xl">
          <h2 class="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-red-600">Cevapları Kaydet</h2>
          <p class="mb-6 md:mb-8 text-sm md:text-base text-gray-200 leading-relaxed">
            Cevapları kaydettikten sonra, bu sayfadaki soruların doğru cevaplarını göreceğiniz için 
            <span class="font-bold text-red-600">tekrar işaretleme yapamayacaksınız.</span>
            <br><br>
            {{ currentPage }}. sayfa için cevapları kaydetmek istediğinize emin misiniz?
          </p>
          <div class="flex items-center mb-6 md:mb-8">
            <input type="checkbox" id="dontShowAgain" v-model="dontShowConfirmationAgain"
              class="mr-3 w-4 h-4 bg-[#141414] border-2 border-gray-600 text-red-600 rounded focus:ring-red-600 focus:ring-offset-[#141414]">
            <label for="dontShowAgain" class="text-sm md:text-base text-gray-300 select-none hover:text-white transition-colors">
              Bu uyarıyı tekrar gösterme
            </label>
          </div>
          <div class="flex justify-end space-x-4">
            <button @click="cancelSave"
              class="px-8 py-3 text-base md:text-lg font-medium bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors duration-300">
              Hayır
            </button>
            <button @click="confirmSave"
              class="px-8 py-3 text-base md:text-lg font-medium bg-red-600 text-white rounded hover:bg-red-600/90 transition-colors duration-300 shadow-xl shadow-red-600/20">
              Evet
            </button>
          </div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
        <symbol id="pencil-circle" viewBox="0 0 49 49">
          <g clip-path="url(#clip0_11_6)">
            <path
              d="M48.5453 30.6539C48.6256 29.3876 48.5838 28.1359 48.431 26.8902C48.3303 26.0681 48.1936 25.2573 47.9961 24.4611C47.8414 23.8376 47.6915 23.2134 47.4843 22.6224C47.2907 22.0699 47.1223 21.5028 46.882 20.9749C46.5706 20.2909 46.2919 19.5804 45.9625 18.9084C45.0372 17.0199 43.9815 15.2788 42.8085 13.6705C42.0686 12.6558 41.2678 11.7355 40.4106 10.9068C39.5451 10.0694 38.6412 9.31838 37.711 8.62645C37.1885 8.23799 36.6689 8.84023 36.1338 7.48564C35.6468 7.16291 35.1355 6.90925 34.6456 6.59583C34.0141 6.19209 33.3213 6.01612 32.6952 5.60508C32.2184 5.29232 31.7645 4.91581 31.3004 4.56653C30.3751 3.86995 29.4089 3.29954 28.4164 2.80683C27.6633 2.43297 26.902 2.09365 26.143 1.74636C25.4113 1.47211 24.6889 1.15271 23.9489 0.916974C22.8548 0.568354 21.7607 0.234343 20.6354 0.109504C19.9582 0.0344676 19.2805 -0.0080308 18.6033 0.00126574C17.4955 0.0165386 16.3994 0.199149 15.3131 0.510583C14.5167 0.739012 13.7295 1.01193 12.9633 1.37914C12.1187 1.78354 11.2912 2.24771 10.488 2.79554C9.58456 3.41243 8.73367 4.14088 7.91587 4.94304C6.97157 5.86937 6.11339 6.93382 5.30726 8.07796C4.69379 8.94785 4.14647 9.89078 3.63468 10.8709C3.35202 11.4114 3.10634 11.9891 2.85482 12.5589C2.28951 13.8392 1.80593 15.1798 1.4143 16.5717C1.15791 17.4814 0.982772 18.4356 0.844119 19.3991C0.713251 20.3082 0.64806 21.2266 0.596491 22.1463C0.568761 22.6403 0.59941 23.141 0.615951 23.6384C0.655844 24.8363 0.760441 26.0223 0.970123 27.189C1.17591 28.3324 1.47122 29.4308 1.83171 30.5005C1.98934 30.968 2.17372 31.4156 2.33864 31.8771C2.50941 32.2841 2.67968 32.6919 2.85044 33.0989C2.96331 33.3134 3.07618 33.5285 3.18856 33.743C3.38024 33.9715 3.49846 34.2796 3.65073 34.5505C4.47389 36.0127 5.37148 37.3753 6.39264 38.5905C6.9706 39.2784 7.60305 39.8615 8.20679 40.4989C8.2389 40.5328 8.27782 40.5534 8.31382 40.5806C8.5707 40.5288 8.76773 40.6178 8.89568 40.9618C8.93849 41.0767 9.06984 41.1152 9.17006 41.1371C9.26201 41.1577 9.33304 41.2095 9.40942 41.2732C9.68575 41.5016 9.96306 41.7294 10.2477 41.9372C10.6665 42.2434 11.0927 42.5296 11.5145 42.8284C12.1722 43.2945 12.8495 43.6936 13.5461 44.0449C14.5001 44.525 15.4668 44.952 16.4432 45.3298C17.6502 45.7966 18.8733 46.1831 20.1032 46.5238C20.8553 46.7323 21.6128 46.897 22.3712 47.0537C23.0144 47.1865 23.6614 47.2794 24.308 47.379C24.7521 47.4474 25.1987 47.4707 25.6415 47.5384C26.0394 47.5988 26.4398 47.565 26.8363 47.6593C27.0265 47.7044 27.2289 47.6433 27.4254 47.6493C27.9154 47.6626 28.4048 47.6991 28.8942 47.7044C29.5763 47.7117 30.2583 47.6984 30.9404 47.6951C30.9988 47.6951 31.0577 47.6998 31.1165 47.7323C30.1469 47.8824 29.173 47.8472 28.198 47.8545C28.3279 48.0006 28.503 47.8532 28.632 47.99C28.8056 47.982 28.9808 48.0285 29.1535 47.97C29.512 47.8731 29.8721 47.9528 30.2316 47.9594C30.3007 47.9607 30.3702 47.9627 30.4393 47.9641C30.6144 47.8651 30.7945 47.9501 30.972 47.9382C31.0859 47.8419 31.209 47.9156 31.3272 47.9043C31.405 47.8113 31.5077 47.8425 31.5938 47.8306C31.8249 47.7994 32.0589 47.81 32.2919 47.804C32.3133 47.804 32.3352 47.8027 32.3566 47.802C32.4714 47.7071 32.5945 47.7781 32.7137 47.7702H32.7127C32.8738 47.6785 33.0421 47.6719 33.2128 47.6938C33.677 47.6453 34.1377 47.561 34.596 47.4508C34.6986 47.3844 34.8061 47.3538 34.9195 47.3764C35.296 47.316 35.6638 47.1931 36.0355 47.0982C36.1722 47.063 36.3109 47.0377 36.4485 47.0072C36.9321 46.8345 37.4177 46.6725 37.8983 46.4872C38.937 46.0868 39.9426 45.5649 40.9185 44.9341C41.7018 44.4281 42.4398 43.8151 43.1681 43.179C43.2513 43.106 43.3247 43.0123 43.4026 42.9287C44.1712 42.1663 44.8767 41.3104 45.4833 40.3077C45.5149 40.2559 45.5334 40.1756 45.5976 40.1709C46.4067 38.8787 47.0153 37.4138 47.5709 35.9038C47.6755 35.5133 47.7747 35.1209 47.8856 34.7338C48.2612 33.421 48.4558 32.0597 48.5444 30.6559L48.5453 30.6539ZM46.6319 29.9653C46.5497 31.3923 46.3123 32.7649 45.9046 34.0863C45.6779 34.8208 45.4074 35.5233 45.1024 36.196C44.6821 37.1236 44.2102 38.0028 43.6585 38.7997C42.5006 40.4717 41.151 41.7573 39.5991 42.6564C38.4155 43.3417 37.1827 43.7893 35.926 44.1326C34.8742 44.4201 33.8117 44.5974 32.7439 44.7295C31.5758 44.8736 30.4072 44.9726 29.2328 44.9805C28.218 44.9878 27.2031 45.0011 26.1907 44.9254C24.9788 44.8344 23.7699 44.6884 22.5658 44.4619C21.0124 44.1691 19.4702 43.7952 17.9426 43.3185C16.3449 42.8198 14.7745 42.1856 13.2396 41.3941C11.711 40.6059 10.2861 39.5394 8.88643 38.4012C7.78403 37.5048 6.75119 36.4769 5.84192 35.2418C5.34715 34.5691 4.90444 33.8287 4.54832 32.9913C4.21653 32.2118 3.92998 31.4076 3.68333 30.5756C3.41527 29.6725 3.21775 28.7388 3.06985 27.7853C2.8592 26.4253 2.77114 25.0528 2.79741 23.6629C2.81931 22.5161 2.96671 21.3959 3.13407 20.275C3.33791 18.9111 3.66289 17.6062 4.1061 16.3565C4.38778 15.5617 4.69379 14.7827 5.03871 14.0344C5.32964 13.3783 5.63759 12.7382 5.96695 12.1166C6.39264 11.3125 6.87573 10.5741 7.35202 9.82836C7.40845 9.74004 7.46294 9.64243 7.54953 9.59993C7.54321 9.49502 7.60451 9.44787 7.65024 9.39143C7.83657 9.16366 8.00052 8.90269 8.20533 8.70282C8.22917 8.67161 8.25253 8.64106 8.27636 8.60985C8.38972 8.30705 8.59016 8.1085 8.77551 7.91062C9.29704 7.35217 9.81078 6.7791 10.3615 6.27111C10.8188 5.84878 11.2927 5.46763 11.78555 5.13295C12.1693 4.87198 12.5678 4.64953 12.9594 4.40981C13.0134 4.37661 13.0669 4.34208 13.1287 4.36732C13.1715 4.38458 13.1944 4.33677 13.2245 4.31286C13.2883 4.19135 13.3841 4.18802 13.4795 4.18338C13.5018 4.16877 13.5242 4.15482 13.5466 4.14021C13.6887 4.01006 13.8439 3.93237 14.0151 3.9171C14.0978 3.80421 14.2 3.77632 14.3119 3.78695C14.3824 3.76769 14.4534 3.74976 14.5133 3.688C14.6086 3.58508 14.7171 3.54524 14.8378 3.5625C14.9288 3.44497 15.0397 3.41708 15.1598 3.43036C15.2815 3.32212 15.4172 3.29622 15.5588 3.30353C15.6089 3.31681 15.6527 3.29821 15.6921 3.25505C15.8263 3.15146 15.9708 3.11228 16.1241 3.1322L16.1221 3.13353C16.2224 3.05318 16.3294 3.01998 16.4447 3.04854V3.05053C16.6733 2.88518 16.9312 2.89116 17.1754 2.84136C17.7947 2.71452 18.416 2.60031 19.0436 2.56711C19.0727 2.56578 19.1122 2.57176 19.1287 2.54984C19.3826 2.2072 19.712 2.34532 20.002 2.33337C20.5848 2.30946 21.1715 2.33005 21.7524 2.40043C22.4281 2.48211 23.1029 2.58304 23.7738 2.74308C24.4486 2.90444 25.1199 3.08838 25.7874 3.29224C26.2885 3.44563 26.7949 3.58574 27.2814 3.8228C27.4683 3.91378 27.6624 3.97752 27.8511 4.06252C27.8881 4.07912 27.9567 4.09639 27.9368 4.1847C27.9222 4.24845 27.8682 4.22853 27.8283 4.23584C27.5388 4.28697 27.2552 4.19002 26.9745 4.13689C26.7064 4.08643 26.4359 4.06783 26.1688 4.03662C24.9944 3.89917 23.8151 3.84007 22.6373 3.84405C21.9407 3.84671 21.2391 3.85667 20.5454 3.95096C19.7655 4.05721 18.9827 4.15084 18.2107 4.35271C18.1542 4.36732 18.0944 4.35935 18.036 4.362C17.4235 4.51274 16.811 4.66879 16.2228 4.953C15.6926 5.20932 15.1618 5.46696 14.6466 5.77773C14.381 5.98956 14.0973 6.15955 13.8507 6.41587C13.8122 6.58188 13.6887 6.62969 13.5996 6.68746C13.3155 6.8714 13.1803 7.21272 13.0528 7.56267C12.8694 8.06667 12.8748 8.06601 13.2829 8.08991C13.4114 8.09722 13.5393 8.1271 13.6668 8.15167C14.0774 8.23069 14.4568 8.02948 14.8422 7.9C15.7315 7.60118 16.6242 7.31764 17.5291 7.13303C18.1888 6.9989 18.847 6.83488 19.5164 6.79172C20.1372 6.75188 20.7517 6.58653 21.3763 6.62106C21.3851 6.62106 21.3948 6.60579 21.4148 6.58786C21.3496 6.47497 21.2323 6.57989 21.1482 6.46036C21.2328 6.43247 21.2995 6.38732 21.3627 6.39462C21.5875 6.42118 21.8093 6.37404 22.0316 6.36275C23.1214 6.30963 24.2107 6.32955 25.298 6.41189C26.018 6.46634 26.7336 6.60844 27.4532 6.6775C27.9577 6.72598 28.4524 6.85746 28.9521 6.94644C29.7368 7.08589 30.5089 7.31963 31.2771 7.57927C31.8521 7.77317 32.4301 7.95777 32.9881 8.2267C33.4906 8.46841 34.0131 8.63774 34.4938 8.96179C34.5916 9.02753 34.685 9.11452 34.7186 9.25463C34.7507 9.38943 34.8407 9.37615 34.8995 9.41666C35.368 9.74071 35.7115 10.2912 36.1445 10.675C36.2773 10.7925 36.4198 10.9373 36.5994 10.9214C36.6855 10.8211 36.8013 10.8437 36.8971 10.7866C36.9521 10.754 37.0246 10.762 37.0401 10.6398C37.0542 10.5276 37.1126 10.592 37.1486 10.6192C37.5184 10.9021 37.8876 11.1896 38.2661 11.4446C38.7054 11.7401 39.0922 12.1465 39.5271 12.4493C39.9285 12.7289 40.2943 13.0954 40.65 13.4766C40.8066 13.6439 40.9696 13.8 41.1301 13.96C41.1627 13.9919 41.2187 14.0191 41.19 14.0815C41.1613 14.1439 41.1184 14.0935 41.0849 14.0596C40.7871 13.7608 40.4899 13.4626 40.1917 13.1645C40.1163 13.0888 40.0472 12.9978 39.9552 12.9593C39.8944 12.9341 39.8643 12.962 39.8857 13.0543C40.775 13.9268 41.6575 14.81 42.4442 15.8592C43.1462 16.7961 43.7825 17.8061 44.324 18.925C44.3459 18.9702 44.3751 19.016 44.3639 19.0784C45.0941 20.5838 45.6614 22.1967 46.0666 23.9153C46.1299 24.1835 46.1941 24.4511 46.2578 24.7188C46.3702 25.0415 46.3867 25.3974 46.4427 25.7387C46.6718 27.1319 46.7146 28.5423 46.6334 29.9627L46.6319 29.9653ZM46.6319 29.9653Z" />
          </g>
          <defs>
            <clipPath id="clip0_11_6">
              <rect width="48" height="48" fill="white" transform="translate(0.585327)" />
            </clipPath>
          </defs>
        </symbol>
      </svg>
    </div>
  </div>
  <!-- Video Modal -->
  <div v-if="showVideoModal"
    class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div class="bg-zinc-900 rounded-lg overflow-hidden max-w-4xl w-full">
      <div class="p-4 flex justify-between items-center border-b border-zinc-800">
        <h3 class="text-lg font-medium text-zinc-300">Çözüm Videosu</h3>
        <button @click="closeVideoModal" class="text-zinc-400 hover:text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="aspect-w-16">
        <iframe v-if="currentVideoUrl" :src="currentVideoUrl" class="w-full h-full" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
        <div v-else class="w-full h-full flex items-center justify-center text-zinc-400">
          Video bulunamadı
        </div>
      </div>
    </div>
  </div>
  <!-- Welcome Modal -->
  <div v-if="showWelcomeModal"
    class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
  <div class="bg-[#141414] text-white p-6 md:p-8 rounded-md max-w-xl w-full border border-zinc-800 shadow-2xl">
    <h2 class="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-red-600">Kişiye Özel Kitap Optik Form</h2>
    <p class="mb-6 md:mb-8 text-sm md:text-base text-gray-200 leading-relaxed">
      Bu ekran ile Kişiye Özel Kitap'ınızdan çözdüğünüz soruları cevaplandırabilir, favori sorularınızı işaretleyebilir ve cevaplarınızı kaydedebilirsiniz.
      <br>
      <br>
      Ekranda gördüğünüz sayfalar, kitaptaki sayfalarla aynıdır.
      <br>
      <br>
      Cevaplarınızı kaydettikten sonra, bu sayfadaki soruların doğru cevaplarını görüp kendi cevaplanırızla karşılaştırabilirsiniz.
      <br>
      <br>
      <span class="font-bold text-xs bg-red-600/10 text-red-600 py-1 px-2 rounded">Not: Klavyenizdeki A, B, C, D, E tuşlarını kullanarak hızlıca cevap verebilirsiniz.</span>
    </p>
    <div class="flex items-center mb-6 md:mb-8">
      <input type="checkbox" id="dontShowWelcomeAgain" v-model="dontShowWelcomeAgain"
        class="mr-3 w-4 h-4 bg-[#141414] border-2 border-gray-600 text-red-600 rounded focus:ring-red-600 focus:ring-offset-[#141414]">
      <label for="dontShowWelcomeAgain" class="text-sm md:text-base text-gray-300 select-none hover:text-white transition-colors">
        Bu bilgilendirmeyi tekrar gösterme
      </label>
    </div>
    <div class="flex justify-end">
      <button @click="closeWelcomeModal"
        class="px-8 py-3 text-base md:text-lg font-medium bg-red-600 text-white rounded hover:bg-red-600/90 transition-colors duration-300 shadow-xl shadow-red-600/20">
        Tamam
      </button>
    </div>
  </div>
</div>
  <!-- Error simulation buttons -->
  <div v-if="isDevelopment" class="fixed bottom-20 right-4 space-x-2 z-50">
    <button @click="loadQuestions()" 
      class="bg-green-600 text-white px-4 py-2 rounded">
      Normal Yükleme
    </button>
    <button @click="() => { simulateError('network'); loadQuestions(); }"
      class="bg-red-600 text-white px-4 py-2 rounded">
      Ağ Hatası
    </button>
    <button @click="() => { simulateError('data'); loadQuestions(); }"
      class="bg-yellow-600 text-white px-4 py-2 rounded">
      Veri Hatası
    </button>
    <button @click="() => { simulateError('empty'); loadQuestions(); }"
      class="bg-blue-600 text-white px-4 py-2 rounded">
      Boş Veri
    </button>
    <button @click="() => { simulateError('null'); loadQuestions(); }"
      class="bg-purple-600 text-white px-4 py-2 rounded">
      Null Veri
    </button>
  </div>
  <!-- Error State -->
  <div v-if="error" class="flex items-center justify-center min-h-screen">
    <div class="text-red-600 text-center p-4">
      <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p class="text-xl mb-4">{{ error }}</p>
      <p class="text-sm text-gray-400 mb-4">Hata Kodu: {{ Date.now() }}</p>
      <button @click="loadQuestions" 
        class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
        Tekrar Dene
      </button>
    </div>
  </div>
</template>

<script setup>
const imageBaseUrl = process.env.VUE_APP_IMAGE_BASE_URL || '';
const showQuestionImages = ref(process.env.VUE_APP_SHOW_QUESTION_IMAGES === 'true');
console.log('Image Base URL:', process.env.VUE_APP_IMAGE_BASE_URL);
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { BookmarkPlusIcon, BookmarkMinusIcon, Search } from 'lucide-vue-next';
import wrappedData from '@/data/wrapped.json';

const questions = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');
const activeTab = ref('all');
const currentPage = ref(1);
const showConfirmation = ref(false);
const dontShowConfirmationAgain = ref(false);
const imageLoadError = ref(false);
const showVideoModal = ref(false);
const currentVideoUrl = ref('');
const showWelcomeModal = ref(true);
const dontShowWelcomeAgain = ref(false);
const isDevelopment = ref(process.env.NODE_ENV === 'development');

const simulateError = (type) => {
  switch(type) {
    case 'network':
      throw new Error('Ağ bağlantısı hatası');
    case 'data':
      throw new Error('Veri yapısı hatası');
    case 'empty':
      wrappedData.data.optic.courses = [];
      break;
    case 'null':
      wrappedData.data.optic = null;
      break;
    default:
      break;
  }
};

const loadQuestions = () => {
  try {
    loading.value = true;
    
    // simulateError('network');  // Ağ hatası simülasyonu
    // simulateError('data');     // Veri yapısı hatası simülasyonu
    // simulateError('empty');    // Boş veri simülasyonu
    // simulateError('null');     // Null veri simülasyonu
    
    const opticData = wrappedData.data.optic;
    
    if (!opticData || !opticData.courses) {
      throw new Error('Geçersiz veri yapısı');
    }

    let allQuestions = [];
    
    opticData.courses.forEach(course => {
      Object.entries(course.pages).forEach(([pageNumber, pageQuestions]) => {
        Object.values(pageQuestions).forEach(question => {
          allQuestions.push({
            id: question.id,
            number: question.number,
            difficulty: question.difficulty,
            correct_answer: question.correct_answer,
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

    allQuestions.sort((a, b) => a.number - b.number);

    questions.value = allQuestions.map(newQ => {
      const existingQ = questions.value.find(q => q.id === newQ.id);
      return existingQ ? { ...newQ, answer: existingQ.answer, bookmarked: existingQ.bookmarked, saved: existingQ.saved } : newQ;
    });

    if (availablePages.value.length > 0) {
      currentPage.value = availablePages.value[0];
    }

  } catch (err) {
    console.error('Error loading questions:', err);
    error.value = err.message || 'Sorular yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
  } finally {
    loading.value = false;
  }
};

const filteredQuestions = computed(() => {
  let filtered = questions.value;

  if (activeTab.value === 'bookmarked') {
    filtered = filtered.filter(q => q.bookmarked);
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(q =>
      q.id.toString().includes(query) ||
      q.subject.toLowerCase().includes(query)
    );
  }

  return filtered;
});

const availablePages = computed(() => {
  return Object.values(groupedPages.value).flat();
});

const groupedPages = computed(() => {
  const grouped = {};
  filteredQuestions.value.forEach(q => {
    if (!grouped[q.title]) {
      grouped[q.title] = new Set();
    }
    grouped[q.title].add(q.page);
  });

  // Convert sets to sorted arrays
  for (const section in grouped) {
    grouped[section] = Array.from(grouped[section]).sort((a, b) => a - b);
  }

  return grouped;
});

const currentPageQuestions = computed(() => {
  const questions = filteredQuestions.value.filter(q => q.page === currentPage.value);
  questions.forEach(q => {
    console.log('Full image URL:', `${imageBaseUrl}/${q.image}`);
  });
  return questions;
});

const totalQuestions = computed(() => questions.value.length);
const answeredOrSavedCount = computed(() => questions.value.filter(q => q.answer !== null || q.saved).length);
const progress = computed(() => (answeredOrSavedCount.value / totalQuestions.value) * 100);
const hasBookmarkedQuestions = computed(() => questions.value.some(q => q.bookmarked));

const currentPageAnsweredOrSavedCount = computed(() => {
  return currentPageQuestions.value.filter(q => q.answer !== null || q.saved).length;
});

const currentPageProgress = computed(() => {
  return (currentPageAnsweredOrSavedCount.value / currentPageQuestions.value.length) * 100;
});

const hasPreviousPage = computed(() => {
  const allPages = availablePages.value;
  const currentIndex = allPages.indexOf(currentPage.value);
  return currentIndex > 0;
});

const hasNextPage = computed(() => {
  const allPages = availablePages.value;
  const currentIndex = allPages.indexOf(currentPage.value);
  return currentIndex < allPages.length - 1;
});

const hasUnsavedAnswers = computed(() => {
  return currentPageQuestions.value.some(q => !q.saved);
});

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

const goToPreviousPage = () => {
  if (hasPreviousPage.value) {
    const allPages = availablePages.value;
    const currentIndex = allPages.indexOf(currentPage.value);
    currentPage.value = allPages[currentIndex - 1];
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const goToNextPage = () => {
  if (hasNextPage.value) {
    const allPages = availablePages.value;
    const currentIndex = allPages.indexOf(currentPage.value);
    currentPage.value = allPages[currentIndex + 1];
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const showSaveConfirmation = () => {
  if (localStorage.getItem('dontShowSaveConfirmation') === 'true') {
    saveCurrentPageAnswers();
  } else {
    showConfirmation.value = true;
  }
};

const cancelSave = () => {
  showConfirmation.value = false;
};

const confirmSave = () => {
  saveCurrentPageAnswers();
  showConfirmation.value = false;
  if (dontShowConfirmationAgain.value) {
    localStorage.setItem('dontShowSaveConfirmation', 'true');
  }
};

const saveCurrentPageAnswers = () => {
  let unsavedAnswersExist = false;
  currentPageQuestions.value.forEach(question => {
    if (!question.saved) {
      question.saved = true;
      unsavedAnswersExist = true;
    }
  });
  if (unsavedAnswersExist) {
    saveAnswers();
    alert('Cevaplar kaydedildi!');
  }
};

const isPageSaved = (page) => {
  return questions.value.filter(q => q.page === page).every(q => q.saved);
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
  console.log('watchSolutionVideo called with questionId:', questionId);

  const question = questions.value.find(q => q.id === questionId);
  console.log('Found question:', question);

  if (question) {
    const videoUrl = question.video_url || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
    console.log('Video URL:', videoUrl);
    currentVideoUrl.value = videoUrl;
    console.log('Set currentVideoUrl to:', currentVideoUrl.value);

    showVideoModal.value = true;
    console.log('Set showVideoModal to:', showVideoModal.value);
  } else {
    console.error('Question not found for id:', questionId);
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

onMounted(() => {
  loadQuestions();
  loadAnswers();
  window.addEventListener('keydown', handleKeyPress);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && showVideoModal.value) {
      closeVideoModal();
    }
  });
  
  // Check if welcome modal has been shown before
  if (localStorage.getItem('welcomeModalShown')) {
    showWelcomeModal.value = false;
  }
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress);
  window.removeEventListener('keydown', (e) => {
    if (e.key === 'Escape' && showVideoModal.value) {
      closeVideoModal();
    }
  });
});

watch(questions, saveAnswers, { deep: true });

watch(availablePages, (newPages) => {
  if (newPages.length > 0 && !newPages.includes(currentPage.value)) {
    currentPage.value = newPages[0];
  }
}, { immediate: true });
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
  /* 4:3 aspect ratio */
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
  /* 16:9 aspect ratio */
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

/* Smooth fade-in animation for modal */
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

[v-if="showWelcomeModal"] > div {
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

/* Smooth fade-in animation for modals */
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

[v-if="showConfirmation"] > div,
[v-if="showWelcomeModal"] > div {
  animation: fadeIn 0.3s ease-out;
}
</style>