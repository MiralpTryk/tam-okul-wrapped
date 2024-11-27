<template>
    <div class="text-gray-200 flex justify-between  mt-8 font-light">
        <div class="flex gap-12">
            <button class="hover-effect hover:font-normal text-lg text-white relative flex items-center group">
                <span class="">Tüm Kitaplar</span>
            </button>
            <button class="hover-effect hover:font-normal text-lg text-white relative flex items-center group">
                <span class="">Favorilerim</span>
            </button>
        </div>
        <div class="relative inline-block">
            <input type="text" name="text" id="text"
                class="rounded-full bg-gray-200 border-gray-600 text-gray-900 focus:ring-blue-500 focus:border-blue-500 text-[14px] py-2 px-4 pr-12"
                placeholder="Kitaplarınızı arayın" />
            <img src="@/assets/icon-search.svg" alt="" class="absolute right-4 top-1/2 transform -translate-y-1/2" />
        </div>
    </div>
</template>

<script setup>

</script>
<style scoped>
.hover-effect span::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 0.5px;
    background-color: white;
    bottom: 0;
    left: 0;
    transform: scaleX(0);
    transition: transform 0.3s;
}

.hover-effect:hover span::after {
    transform: scaleX(1);
}
</style>