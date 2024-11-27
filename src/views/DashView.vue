<template>
  <MainLayout>
    <div class="relative z-10 py-4 px-52">
      <LinkInput />
      <TabsAndSearchBar />
      <BookCard />
    </div>
  </MainLayout>
</template>

<script setup>
import BookCard from '@/components/BookCard.vue';
import LinkInput from '@/components/LinkInput.vue';
import TabsAndSearchBar from '@/components/TabsAndSearchBar.vue';
import MainLayout from '@/components/MainLayout.vue';
</script>

<style scoped></style>
