<template>
    <div style="height: 100vh; display: flex; align-items: center; justify-content: center;">
        <section>
            <p class="text-5xl flex justify-content-center">
                Reenviar confirmação de email
            </p>
            <div class="flex justify-content-center">
                <form @submit.prevent="resend_confirmation">
                    <Button icon="pi pi-send" :disabled="disabled" label="Reenviar Confirmação" type="submit" />
                </form>
            </div>
            <Toast />
        </section>
    </div>
</template>
<script setup>
import { useAuthStore } from '@/store/auth';
import { ref, onMounted } from "vue";
import Toast from 'primevue/toast';
import apiClient from '@/helpers/axios'
import { useToast } from 'primevue/usetoast';
import { useRouter, useRoute } from 'vue-router'

const email = ref("")
const toast = useToast();


const router = useRouter();
const route = useRoute();

const disabled = ref(false)

const response = ref();


const resend_confirmation = async () => {
    disabled.value = true
    try{
        response.value = await apiClient.post('users/resend-confirmation', {email: email.value})
        if(response.value.status == 200){
            toast.add({ severity: 'info', summary: 'Email enviado com sucesso', detail: 'Verifique sua caixa de entrada!', life: 3000 });
            setTimeout(() => {
                router.push("/login")
            }, 3000);
        } else {
            toast.add({ severity: 'error', summary: 'Erro ao tentar enviar email', detail: 'Tente novamente mais tarde!', life: 3000 });
            setTimeout(() => {
                router.push("/login")
            }, 3000);
        }

    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    email.value = route.query.email
})

</script>
  
<style scoped>
</style>