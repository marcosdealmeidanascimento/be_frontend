<template>
  <pre>
    {{ post }}
  </pre>
  <Button label="Logout" @click="logout" class="mt-5" />
</template>
<script setup>
import { useAuthStore } from '@/store/auth';
import apiClient from '@/helpers/axios'
import { ref, onMounted, resolveComponent } from "vue";
import router from '../../router';
const configure = useAuthStore()

const post = ref([])

const testToken = async () => {
  try {
    const response = await apiClient.post("login/test-token");
    if (response.error) {
      window.location.assign("/login")
    }
  } catch(err) {
    window.location.assign("/login")
    
  }

}

const me = async () => {
    const response = await apiClient.get("users/me");
    console.log(response.data);
    if (response.data.is_admin) {
      router.push({ name: 'dashboard' })
    }
}

const getPost = async () => {
  if (!localStorage.getItem("post")) {
    try {
      const response = await apiClient.get("post");
      post.value = response.data
      localStorage.setItem("post", post.value.id)
    } catch(err) {
      console.log(err)
    } 
  } else {
    try {
      const response = await apiClient.get("post/" + localStorage.getItem("post"));
      post.value = response.data
    } catch(err) {
      console.log(err)
    }
  }
}

const logout = async () => {
  configure.logout()
  window.location.assign("/login")
}

onMounted(() => {
  testToken()
  me()
  getPost()
})

</script>