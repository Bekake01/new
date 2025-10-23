<template>
  <UModal v-model:open="isOpen" title="Global Modal">
    <template #body>
        <div class="p-4 space-y-4">
          <h3 class="text-lg font-semibold">Global Modal</h3>
          <p>You opened this modal from a completely different file 🔥</p>
          <UButton color="primary" @click="isOpen = false">Close</UButton>
        </div>
    </template>
  </UModal>
</template>

<script setup>
const isOpen = useState('globalModal')
</script>
