<template>
  <div id="home">
    <div class="p-4 shadow-2 border-round w-full lg:w-6" id="homeContainer">
      <div class="text-center mb-5">
        <p style="font-weight: 900; font-size: 8rem;">be</p>
        <div class="text-900 text-3xl font-medium mb-3">Bem-vindo a <span class="font-italic">be</span> aqui você pode escrever</div>
        <span class="text-600 font-medium line-height-3">Não tem uma conta?</span>
        <router-link class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" style="color: var(--text-color)"
          to="/register">Crie uma agora!</router-link>
      </div>

      <div>
        <label for="email1" class="block text-900 font-medium mb-2">Email</label>
        <InputText id="email1" type="email" required class="w-full mb-3" v-model="user" placeholder="user@example.com" />

        <label for="password1" class="block text-900 font-medium mb-2">Senha</label>
        <InputText id="password1" type="password" required class="w-full mb-3" v-model="pw" />

        <div class="flex align-items-center justify-content-end mb-6">
          <router-link class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
            style="color: var(--text-color)" to="/password-recovery">Esqueceu a senha?</router-link>
        </div>

        <Button label="Entrar" icon="pi pi-user" class="w-full" type="submit" />
      </div>
    </div>
  </div>
  <Button label="Logout" @click="logout" class="mt-5" />
</template>
<script setup>
import { useAuthStore } from '@/store/auth';
import apiClient from '@/helpers/axios'
import { ref, onMounted, resolveComponent } from "vue";
import router from '../../router';
const configure = useAuthStore()

const nextPage = () => {
  currentPage.value += 1
}

const previousPage = () => {
  currentPage.value -= 1
}

const currentPage = ref(1)

const testToken = async () => {
  try {
    const response = await apiClient.post("home/test-token");
    if (response.error) {
      window.location.assign("/home")
    }
  } catch (err) {
    window.location.assign("/home")

  }

}

const me = async () => {
  const response = await apiClient.get("users/me");
  if (response.data.is_admin) {
    router.push({ name: 'dashboard' })
  }
}

const logout = async () => {
  configure.logout()
  window.location.assign("/home")
}

onMounted(() => {
  testToken()
  me()
})

</script>

<style scoped>

#home {
  display: flex;
  justify-content: center;
}

#homeContainer {
  max-width: 800px;
}

</style>