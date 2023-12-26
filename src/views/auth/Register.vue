<template>
  <div class="fadein animation-duration-1000" :class="fadeout">
    <form @submit.prevent="register" id="register">
      <div class="p-4 shadow-2 border-round w-full lg:w-6" id="registerContainer">
        <div class="text-center mb-5">
          <p style="font-weight: 900; font-size: 8rem;">be</p>
          <div class="text-900 text-3xl font-medium mb-3">Crie sua conta</div>
          <span class="text-600 font-medium line-height-3">Preencha os campos para prosseguir</span>
        </div>

        <div>
          <label class="block text-900 font-medium mb-2">Email</label>
          <InputText :autofocus=true type="email" required class="w-full mb-3" v-model="user"
            :class="[invalidEmail]" placeholder="user@example.com" />

          <label class="block text-900 font-medium mb-2">Senha</label>
          <InputText type="password" required class="w-full mb-3" v-model="pw" :class="[invalidPw]" />

          <label class="block text-900 font-medium mb-2">Confirme sua senha</label>
          <InputText type="password" required class="w-full mb-3" v-model="confirm" :class="[invalidPw]" />

          <div class="flex align-items-center justify-content-end mb-6">
            <span class="text-600 font-medium line-height-3">Já possui uma conta?</span>
            <router-link class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
              style="color: var(--text-color)" to="/login">Entre aqui</router-link>
          </div>

          <Button label="Registrar-se" :disabled="disabled" icon="pi pi-user" class="w-full" type="submit" />
        </div>
      </div>
    </form>
  </div>

  <div style="height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column;" :class="confirmEmail">
    <p class="text-5xl">
      Confirme seu email!
    </p>
    <p>
      Enviamos um email para você, confirme-o para continuar.
    </p>
    <p class="text-200">
      Pode fechar essa página.
    </p>
  </div>

</template>
<script setup>
import apiClient from '@/helpers/axios'
import { ref, onMounted } from "vue";
import InputText from 'primevue/inputtext';
import { useRouter } from 'vue-router'

const router = useRouter();

const confirmEmail = ref("hidden")
const fadeout = ref("")

const user = ref("");
const fullname = ref("");
const pw = ref("");
const confirm = ref("");
const invalidPw = ref("");
const invalidEmail = ref("");
let response = ref("")
const disabled = ref(false)


const register = async () => {
  disabled.value = true;
  if (!user.value.includes('.com')) {
    invalidEmail.value = "p-invalid"
    disabled.value = false;
  } else {
    invalidEmail.value = ""
  }

  if (pw.value.length < 6 || pw.value.length > 20) {
    invalidPw.value = "p-invalid"
    disabled.value = false;
  } else {
    if (pw.value !== confirm.value) {
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
        fadeout.value = "fadeout animation-duration-500"
        setTimeout(() => {
          fadeout.value = "hidden";
        }, 500);

        setTimeout(() => {
          confirmEmail.value = "fadein animation-duration-1000"
        }, 2000);

      } else if (response === undefined && invalidPw.value == "" && invalidEmail.value == "") {
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