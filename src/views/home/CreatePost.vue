<template>
    <div class="fadein animation-duration-1000">
        <form @submit.prevent="create" id="post">
            <div class="p-4 shadow-2 border-round w-full lg:w-6" id="postContainer">
                <div class="text-center mb-5">
                    <p style="font-weight: 900; font-size: 8rem;">be</p>
                    <div class="text-900 text-3xl font-medium mb-3">Crie seu post</div>
                    <p class="text-200">Faça um post a cada 10 (dez) horas</p>
                </div>

                <div>
                    <TextArea autoResize required class="w-full mb-3" v-model="content" style="height: 250px;"
                        placeholder="..." />

                    <Button label="Enviar" :disabled="disabled" class="w-full mt-5" type="submit" />
                    <p class="text-center text-200">Ou</p>
                    <a class="flex justify-content-center font-medium no-underline ml-2 text-blue-500  cursor-pointer"
                        style="color: var(--text-color)"><span @click="login">Volte para o login</span></a>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import apiClient from '@/helpers/axios'
import TextArea from 'primevue/textarea';
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

const content = ref("")
const disabled = ref(false)

const login = () => {
    localStorage.removeItem("token")
    router.push({ name: "login" })
}

const create = async () => {
    disabled.value = true
    try {
        const response = await apiClient.post("post", {
            content: content.value
        });
        setTimeout(() => {
            disabled.value = false
            router.push({ name: "post" })
        }, 2000)
    } catch (err) {
        console.log(err)
    }
}

const testToken = async () => {
    try {
        const response = await apiClient.post("login/test-token");
        if (response.error) {
            window.location.assign("/login")
        }
    } catch (err) {
        window.location.assign("/login")

    }

}

const me = async () => {
    try {
        const response = await apiClient.get("users/me");

        if (!response.data.can_post) {
            router.push({ name: "post" })
        }
    } catch (err) {
        console.log(err)
    }
}

onMounted(() => {
    testToken()
    me()
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