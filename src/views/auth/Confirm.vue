<template>
    <div style="height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column;">
        <p class="text-5xl">
            Confirmação de conta concluída!
        </p>
        <p>
            Você será redirecionado para a página de login.
        </p>
        <div class="flex align-items-center justify-content-end">
            <router-link class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
                style="color: var(--text-color)" to="/login">Entre aqui</router-link>
        </div>
        <Toast />
    </div>
</template>
<script setup>
import apiClient from '@/helpers/axios'
import { ref, onMounted } from "vue";
import Toast from 'primevue/toast';
import { useRouter } from 'vue-router';

const tk = ref("");
const router = useRouter();

onMounted(async () => {
    const url = new URL(window.location.href)
    const searchParams = url.searchParams
    tk.value = searchParams.get('tk');

    const data = {
        token: tk.value,
    }

    const response = await apiClient.post("users/confirm", data)

    setTimeout(() => {
        router.push("/login");
    }, 3000)
})

</script>
  
  
<style scoped></style>