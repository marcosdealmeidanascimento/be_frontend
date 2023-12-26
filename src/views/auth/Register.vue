<template>
  <div>
    <form @submit.prevent="register" :class="fadeout" id="register">
      <div class="p-4 shadow-2 border-round w-full lg:w-6" id="registerContainer">
        <div class="text-center mb-5">
          <p style="font-weight: 900; font-size: 8rem;">be</p>
          <div class="text-900 text-3xl font-medium mb-3">Bem-vindo! Crie sua conta</div>
          <span class="text-600 font-medium line-height-3">Preencha os campos para prosseguir</span>
        </div>

        <div>
          <label for="email1" class="block text-900 font-medium mb-2">Email</label>
          <InputText :autofocus=true id="email1" type="email" required class="w-full mb-3" v-model="user"
            :class="[fadeout, invalidEmail]" placeholder="user@example.com" />

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

          <Button label="Registrar-se" :disabled="disabled" icon="pi pi-user" class="w-full" type="submit" />
        </div>
      </div>
    </form>

    <Toast />
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
const fullname = ref("");
const pw = ref("");
const confirm = ref("");
const invalidPw = ref("");
const invalidEmail = ref("");
const fadeout = ref("")
const fadein = ref("hidden")
let response = ref("")
const disabled = ref(false)


const register = async () => {
  disabled.value = true;
  if (!user.value.includes('.com')) {
    toast.add({ severity: 'error', summary: 'Falha ao criar a conta', detail: 'Email inválido', life: 3000 });
    invalidEmail.value = "p-invalid"
    disabled.value = false;
  } else {
    invalidEmail.value = ""
  }

  if (pw.value.length < 6 || pw.value.length > 20) {
    toast.add({ severity: 'error', summary: 'Falha ao criar a conta', detail: 'A senha deve ter pelo menos 6 caractéres e no máximo 20!', life: 3000 });
    invalidPw.value = "p-invalid"
    disabled.value = false;
  } else {
    if (pw.value !== confirm.value) {
      toast.add({ severity: 'error', summary: 'Falha ao criar a conta', detail: 'As senhas precisam ser iguais', life: 3000 });
      invalidPw.value = "p-invalid"
      disabled.value = false;

    } else {
      invalidPw.value = ""
      const data = {
        full_name: fullname.value,
        password: confirm.value,
        email: user.value,
      }

      response = await apiClient.post("users/open", data)

      if (response !== undefined && invalidPw.value == "" && invalidEmail.value == "") {
        setTimeout(() => {
          fadeout.value = "hidden";
          fadein.value = "fadeindown animation-duration-300"
        }, 300);
        toast.add({ severity: 'info', summary: 'Sucesso', detail: 'Conta criado com sucesso', life: 3000 });
        setTimeout(() => {
          router.push("/login");
        }, 3800)
      } else if (response === undefined && invalidPw.value == "" && invalidEmail.value == "") {
        toast.add({ severity: 'error', summary: 'Falha ao criar a conta', detail: 'Email já está em uso', life: 3000 });
        invalidEmail.value = "p-invalid"
        disabled.value = false;
      }
    }

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