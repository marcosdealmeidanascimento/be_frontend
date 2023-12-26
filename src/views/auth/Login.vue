<template>
  <div class="fadein animation-duration-1000">
    <form @submit.prevent="login" :class="fadeout" id="login">
      <div class="p-4 shadow-2 border-round w-full lg:w-6" id="loginContainer">
        <div class="text-center mb-5">
          <p style="font-weight: 900; font-size: 8rem;">be</p>
          <div class="text-900 text-3xl font-medium mb-3">Entre na sua conta</div>
          <span class="text-600 font-medium line-height-3">Não tem uma conta?</span>
          <router-link class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" style="color: var(--text-color)"
            to="/register">Crie uma agora!</router-link>
        </div>
  
        <div>
          <label class="block text-900 font-medium mb-2">Email</label>
          <InputText :autofocus="true" type="email" required class="w-full mb-3" v-model="user" placeholder="user@example.com"/>
  
          <label class="block text-900 font-medium mb-2">Senha</label>
          <InputText type="password" required class="w-full mb-3" v-model="pw" />
  
          <div class="flex align-items-center justify-content-end mb-6">
            <router-link class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
              style="color: var(--text-color)" to="/password-recovery">Esqueceu a senha?</router-link>
          </div>
  
          <Button label="Entrar" icon="pi pi-user" class="w-full" type="submit" />
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import { useAuthStore } from '@/store/auth';
import { ref, onMounted } from "vue";
import InputText from 'primevue/inputtext';
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter();
const configure = useAuthStore();

const user = ref("");
const pw = ref("");
const invalid = ref("");
const response = ref();
const resend = ref(false)
const loginComponent = ref(true)
const fadeout = ref("")
const disabled = ref(false)



const login = async () => {
  disabled.value = true
  if (user.value !== "" && pw.value !== "") {

    var data = {
      grant_type: "",
      username: user.value,
      password: pw.value,
      scope: "",
      client_id: "",
      client_secret: "",
    };

    var config = {
      method: "post",
      url: import.meta.env.VITE_SERVER_NAME + "login/access-token",
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    try {
      const userData = await axios(config);
      response.value = await configure.login(user.value, pw.value);
      fadeout.value = "fadeout animation-duration-500"
      
      setInterval(() => {
        fadeout.value = "hidden"
      }, 400);

      setTimeout(() => {
        router.push("/createPost");
      }, 3000);
    } catch (err) {
      disabled.value = false
      invalid.value = "p-invalid";
      setTimeout(() => {
        if (err.response.status == 401) {
          fadein.value = "fadeindown animation-duration-300"
          fadeout.value = "hidden"
          resend.value = true
          loginComponent.value = false
          router.push("/resend?email=" + user.value);
        }
      }, 1000);
    }

  }
}

onMounted(() => {
})

</script>

<style scoped>

#login {
  display: flex;
  justify-content: center;
}

#loginContainer {
  max-width: 800px;
}

</style>