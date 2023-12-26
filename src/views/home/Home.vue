<template>
  <div id="home">
    <div class="p-4 shadow-2 border-round w-full lg:w-6" id="homeContainer">
      <div class="text-center mb-5">
        <p class="fadein animation-duration-1000" style="font-weight: 900; font-size: 8rem;">be</p>
        <div class="fadein animation-duration-2000 text-900 text-3xl font-medium mb-3">A plataforma para compartilhar emoções</div>
        <router-link class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" style="color: var(--text-color)"
          to="/login"><i class="pi pi-angle-right mt-5 fadein animation-duration-3000"></i></router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import router from '../../router';


onMounted(() => {
  localStorage.removeItem("token")
  localStorage.removeItem("post")
  localStorage.removeItem("postTime")
  localStorage.removeItem("user")
})

</script>

<style scoped>
#home {
  display: flex;
  justify-content: center;
  align-items: center;
}

#homeContainer {
  max-width: 800px;
}
</style>