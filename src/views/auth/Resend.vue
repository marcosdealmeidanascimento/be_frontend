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
        </section>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import apiClient from '@/helpers/axios'
import { useRouter, useRoute } from 'vue-router'

const email = ref("")


const router = useRouter();
const route = useRoute();

const disabled = ref(false)

const response = ref();


const resend_confirmation = async () => {
    disabled.value = true
    try{
        response.value = await apiClient.post('users/resend-confirmation', {email: email.value})
        if(response.value.status == 200){
            setTimeout(() => {
                router.push("/login")
            }, 3000);
        } else {
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