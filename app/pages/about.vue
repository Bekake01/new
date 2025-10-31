<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow rounded">
    <h2 class="text-2xl mb-4">Contact Us</h2>
    <form @submit.prevent="onSubmit">
      <div class="mb-4">
        <label class="block mb-1" for="name">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          class="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block mb-1" for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block mb-1" for="message">Message</label>
        <textarea
          id="message"
          v-model="form.message"
          class="w-full border px-3 py-2 rounded"
          rows="4"
          required
        ></textarea>
      </div>

      <!-- honeypot -->
      <input
        type="text"
        v-model="form.honeypot"
        name="honeypot"
        style="display:none"
        tabindex="-1"
        autocomplete="off"
      />

      <button
        type="submit"
        class="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? "Sending…" : "Send" }}
      </button>
    </form>

    <p v-if="status === 'success'" class="mt-4 text-green-600">
      Thank you! Your message has been sent.
    </p>
    <p v-if="status === 'error'" class="mt-4 text-red-600">
      Oops — something went wrong. Please try again later.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: '',
  honeypot: ''
})

const isSubmitting = ref(false)
const status = ref(null)  // null | "success" | "error"

const onSubmit = async () => {
  // simple spam check
  if (form.value.honeypot) {
    // treat as spam silently
    status.value = 'success'
    return
  }

  isSubmitting.value = true
  status.value = null

//   accessKey: '4f64efc98873784f4de7478a86eda1c6763472e3475c11b778e6c7301595ea07',
  try {
    const payload = {
        accessKey: 'sf_k2dj3b4k2j3b4k23b4k23',
        name: form.value.name,
        email: form.value.email,
        message: form.value.message,
        honeypot: form.value.honeypot
    }
    console.log(payload)
    const response = await fetch('https://silentforms.com/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error('Submission failed')
    }

    // clear form
    form.value.name = ''
    form.value.email = ''
    form.value.message = ''
    form.value.honeypot = ''

    status.value = 'success'
  } catch (err) {
    console.error(err)
    status.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* optional minimal styling */
</style>
