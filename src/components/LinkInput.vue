<template>
    <div class="mx-auto text-center pt-12">
        <label for="url" class="block text-gray-200 text-lg">
            Kitabınızın bağlantı adresini girin
        </label>
        <div class="relative inline-block">
            <input type="url" name="url" id="url"
                class="min-w-[460px] border text-[14px] rounded-full m-4 p-4 pr-12 bg-gray-200 border-gray-600 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://zkitap.indivibook.com/#/indivibook/tyt-turkce/1" required="" />
            <img src="@/assets/icon-find.svg" alt="icon" class="absolute right-8 top-1/2 transform -translate-y-1/2" />
        </div>
        <span class="block text-gray-200 text-lg">
            veya daha önce açtığınız kitaplardan seçin
        </span>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>