import { ref } from 'vue'
export default function useModal() {
    const modalopen = ref(false)
    return { modalopen }
}