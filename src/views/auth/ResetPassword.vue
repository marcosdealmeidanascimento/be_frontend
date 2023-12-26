<template>
    <div>
        <form @submit.prevent="register" :class="fadeout" id="register">
            <div class="p-4 shadow-2 border-round w-full lg:w-6" id="registerContainer">
                <div class="text-center mb-5">
                    <p style="font-weight: 900; font-size: 8rem;">be</p>
                    <div class="text-900 text-3xl font-medium mb-3">Altere sua senha</div>
                    <span class="text-600 font-medium line-height-3">Preencha os campos para prosseguir</span>
                </div>

                <div>
                    <label for="password1" class="block text-900 font-medium mb-2">Senha</label>
                    <InputText id="password1" type="password" required class="w-full mb-3" v-model="pw"
                        :class="[invalidPw, fadeout]" />

                    <label for="password1" class="block text-900 font-medium mb-2">Confirme sua senha</label>
                    <InputText id="password1" type="password" required class="w-full mb-3" v-model="confirm"
                        :class="[invalidPw, fadeout]" />

                    <div class="flex align-items-center justify-content-end mb-6">
                        <span class="text-600 font-medium line-height-3">Já possui uma conta?</span>
                        <router-link class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
                            style="color: var(--text-color)" to="/login">Entre aqui</router-link>
                    </div>

                    <Button label="Alterar senha" :disabled="disabled" icon="pi pi-user" class="w-full" type="submit" />
                </div>
            </div>
        </form>

        <Toast />
    </div>
</template>
<script setup>
import { useAuthStore } from '@/store/auth';
import apiClient from '@/helpers/axios'
import axios from 'axios'
import { ref, onMounted } from "vue";
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router'

const toast = useToast();
const router = useRouter();

const user = ref("");
const tk = ref("");
const fullname = ref("");
const pw = ref("");
const confirm = ref("");
const invalidPw = ref("");
const invalidEmail = ref("");
const disabled = ref(false)


const register = async () => {
    const url = new URL(window.location.href)
    const searchParams = url.searchParams
    user.value = searchParams.get('email');
    tk.value = searchParams.get('tk');
    
    if (pw.value.length < 6 || pw.value.length > 20) {
        toast.add({ severity: 'error', summary: 'Failed to Register', detail: 'Password length must be greater than 6 and less than 20', life: 3000 });
        invalidPw.value = "p-invalid"
        
    } else if (pw.value !== confirm.value) {
        toast.add({ severity: 'error', summary: 'Failed to Register', detail: 'Passwords must be equal', life: 3000 });
        invalidPw.value = "p-invalid"
    } else {
        disabled.value = true
        invalidPw.value = ""
        const data = {
            new_password: confirm.value,
            token: tk.value,
        }

        const response = await apiClient.post("reset-password", data)
        toast.add({ severity: 'info', summary: 'Senha alterada com sucesso', detail: 'Você será redirecionado para a página de login', life: 3000 });
        setTimeout(() => {
            router.push("/login");
        }, 3000)

    }



}



onMounted(() => {

})

</script>
  
  
<style scoped>
#register {
  display: flex;
  justify-content: center;
}

#registerContainer {
  max-width: 800px;
}
</style>