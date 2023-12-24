<template class="tBone">
    <p class="text-5xl flex justify-content-center">
        Confirmation Completed
    </p>
    <section class="flex justify-content-center">
        <router-link class="p-primary" to="/login">Login here.</router-link>
    </section>
    <Toast />
</template>
<script setup>
import apiClient from '@/helpers/axios'
import { ref, onMounted } from "vue";
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router'


const tk = ref("");

onMounted(async () => {
    const url = new URL(window.location.href)
    const searchParams = url.searchParams
    tk.value = searchParams.get('tk');

    const data = {
        token: tk.value,
    }

    const response = await apiClient.post("users/confirm", data)

    setTimeout(() => {
        // router.push("/login");
    }, 3000)
})

</script>
  
  
<style scoped>
</style>