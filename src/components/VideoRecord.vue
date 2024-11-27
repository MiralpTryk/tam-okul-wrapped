<template>
  <div class="w-full h-[600px] mb-12">
    <video controls :src="videoURL" class="w-full h-full rounded-t"></video>
    <div
      class="h-[10%] bg-slate-300 dark:bg-slate-950 flex flex-row py-3 px-4 gap-4 rounded-b justify-between items-center text-[#A7A7A7]">
      <div class="flex">
        <button @click="reRecord"
          class="flex flex-row items-center justify-center py-2 px-4 text-slate-200 font-semibold bg-violet-900 hover:bg-violet-950 dark:bg-sky-500 dark:hover:bg-sky-600 rounded gap-2">
          <img src="@/assets/icon-retry.svg" alt="Yeniden çek" />
          Yeniden çek
        </button>
      </div>
      <div class="flex flex-row gap-4">
        <button @click="downloadVideo"
          class="flex flex-row items-center justify-center py-2 px-4 text-slate-200 font-semibold bg-violet-900 hover:bg-violet-950 dark:bg-sky-500 dark:hover:bg-sky-600 rounded gap-2">
          <img src="@/assets/icon-download.svg" alt="İndir" />
          İndir
        </button>
        <button @click="shareVideo"
          class="flex flex-row items-center justify-center py-2 px-4 text-slate-200 font-semibold bg-violet-900 hover:bg-violet-950 dark:bg-sky-500 dark:hover:bg-sky-600 rounded gap-2">
          <img src="@/assets/icon-share.svg" alt="Paylaş" />
          Paylaş
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const videoURL = ref(route.query.videoURL);

const reRecord = () => {
  window.history.back();
};

const downloadVideo = () => {
  const a = document.createElement("a");
  a.href = videoURL.value;
  a.download = "video.mp4";
  a.click();
};

const shareVideo = () => {
  const shareData = {
    title: "Video",
    text: "Video",
    url: videoURL.value,
  };

  const encodedURL = encodeURIComponent(shareData.url);
  const whatsappURL = `https://wa.me/?text=${encodedURL}`;

  window.open(whatsappURL, "_blank");
};
</script>
