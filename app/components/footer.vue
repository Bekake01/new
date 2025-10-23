<template>
    <UButton @click="openModal">Open Modal</UButton>
</template>
<script setup>
const modal = useState('globalModal', () => false)
const openModal = () => {
    modal.value = !modal.value
}
</script>
