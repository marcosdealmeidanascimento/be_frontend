<template>
    <div>
        <div id="post">
            <div class="p-4 shadow-2 border-round w-full lg:w-6" id="postContainer">
                <div class="text-center mb-5">
                    <p style="font-weight: 900; font-size: 8rem;">be</p>
                    <span class="text-600 font-medium line-height-3">{{ content }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import apiClient from '@/helpers/axios'
import { ref, onMounted } from "vue";

const post = ref(null)
const content = ref("")

const getPost = async () => {
    if (!localStorage.getItem("post") || isPostExpired()) {
        try {
            const response = await apiClient.get("post");
            post.value = response.data
            localStorage.setItem("post", post.value.id)
            localStorage.setItem("postTime", new Date().toISOString())
            content.value = post.value.content
        } catch (err) {
            console.log(err)
        }
    } else {
        try {
            const response = await apiClient.get("post/" + localStorage.getItem("post"));
            post.value = response.data
            content.value = post.value.content
        } catch (err) {
            console.log(err)
        }
    }
}

const isPostExpired = () => {
    const postTime = localStorage.getItem("postTime");
    const currentTime = new Date().getTime();
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
    return currentTime - new Date(postTime).getTime() > fiveMinutes;
}

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

onMounted(() => {
    getPost()
    testToken()
})

</script>

<style scoped>
#post {
    display: flex;
    justify-content: center;
}

#postContainer {
    max-width: 800px;
}
</style>