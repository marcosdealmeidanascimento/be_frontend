<template>
    <div>
        <form @submit.prevent="reset" id="reset">
            <div class="p-4 shadow-2 border-round w-full lg:w-6" id="resetContainer">
                <div class="text-center mb-5">
                    <p style="font-weight: 900; font-size: 8rem;">be</p>
                    <div class="text-900 text-3xl font-medium mb-3">Encontre sua conta</div>
                </div>

                <div>
                    <label for="email1" class="block text-900 font-medium mb-2">Email</label>
                    <InputText id="email1" type="email" required class="w-full mb-3" v-model="user"
                        placeholder="user@example.com" :class="[invalid]" />

                    <div class="flex align-items-center justify-content-end mb-6">
                        <span class="text-600 font-medium line-height-3">Já possui uma conta?</span>
                        <router-link class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
                            style="color: var(--text-color)" to="/login">Entre aqui</router-link>
                    </div>

                    <Button label="Enviar pedido de alteração" :disabled="disabled" icon="pi pi-user" class="w-full" type="submit" />
                </div>
            </div>
        </form>
        <Toast />
        <section style="height: 100vh; display: flex; align-items: center; justify-content: center;">
            <p :class="fadein" class="text-lg">
                Seu pedido foi enviado com sucesso! Verifique seu e-mail para continuar.
            </p>
        </section>
    </div>
</template>
<script setup>
import apiClient from '@/helpers/axios'
import { ref, onMounted } from "vue";
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router'

const toast = useToast();
const router = useRouter();

const user = ref("");
const invalid = ref("");
const fadeout = ref("")
const fadein = ref("")
const disabled = ref(false)

const show = () => {
    toast.add({ severity: 'info', summary: 'Um email foi enviado', detail: 'Verifique sua caixa de entrada', life: 3000 });
};

const reset = async () => {

    const data = {
        email: user.value
    }
    disabled.value = true;
    
    const response = await apiClient.post("/password-recovery", data)
    if (response !== undefined) {
        invalid.value = ""
        fadeout.value = "fadeoutup animation-duration-200";
        setTimeout(() => {
            fadeout.value = "hidden";
            fadein.value = "fadeindown animation-duration-300"
        }, 200);
        show()
        setTimeout(() => {
            router.push("/login");

        }, 3000)
    } else {
        toast.add({ severity: 'error', summary: 'Conta não encontrada', detail: "Nenhuma conta foi encontrada com esse email", life: 3000 });
        invalid.value = "p-invalid"
        disabled.value = false;
    }




}

onMounted(() => {

})

</script>
  
<style scoped>
#reset {
    display: flex;
    justify-content: center;
}

#resetContainer {
    max-width: 800px;
}
</style>