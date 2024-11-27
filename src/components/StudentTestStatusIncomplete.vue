<template>
    <span
        class="bg-amber-500 text-red-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded gap-1 w-24 justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12L19 19M12 12L5 5M12 12L5 19M12 12L19 5" stroke="#991b1b" stroke-width="2"
                stroke-linecap="round" />
        </svg>
        {{ text }}
    </span>
</template>

<script setup>
defineProps({
    text: {
        type: String,
        required: true
    }
});
</script>

<style lang="scss" scoped></style>
