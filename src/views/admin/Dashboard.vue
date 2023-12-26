<template>
    <div class="flex flex-column justify-content-between align-items-center p-5">
        <div>
            <h1>Dashboard</h1>
            <DataTable stripedRows v-model:selection="selectedPost" selectionMode="single" dataKey="id" :value="posts" @row-click="post"
                :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 30]">
                <Column field="id" header="ID"></Column>
                <Column field="title" header="Title"></Column>
                <Column field="user_id" header="User ID"></Column>
            </DataTable>
            <Dialog v-model:visible="visible" modal :header="title" style="min-width: 320px;">
                <div class="flex flex-column">
                    <p class="text-justify">{{ content }}</p>

                </div>
                <template #footer>
                    <Button @click="openDeleteModal" class="mt-5" label="Deletar post" icon="pi pi-times" />
                </template>
            </Dialog>
            <Dialog v-model:visible="deleteVisible" modal header="Deseja realmente excluir esse post?">
                <template #footer>
                    <Button @click="[deletePost(), visible = false, deleteVisible = false]" class="mt-5" label="Sim"
                        icon="pi pi-check" />
                    <Button @click="deleteVisible = false" class="mt-5" label="Não" icon="pi pi-times" />
                </template>
            </Dialog>
        </div>
        <Button label="Logout" @click="logout" class="mt-5" />
    </div>
</template>
<script setup>
import { useAuthStore } from '@/store/auth';
import apiClient from '@/helpers/axios'
import { ref, onMounted } from "vue";
import router from '../../router';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';

const configure = useAuthStore()

const visible = ref(false)
const posts = ref([])

const selectedPost = ref(null)
const title = ref("")
const content = ref("")
const deleteVisible = ref(false)


const openDeleteModal = () => {
    deleteVisible.value = true
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

const getPosts = async () => {
    try {
        const response = await apiClient.get("post/all");
        posts.value = response.data
    } catch (err) {
        console.log(err)
    }
}


const post = async (event) => {
    title.value = event.data.title
    content.value = event.data.content
    visible.value = true
}

const deletePost = async () => {
    try {
        await apiClient.delete(`post/${selectedPost.value.id}`);
        getPosts()
    } catch (err) {
        console.log(err)
    }
}


const me = async () => {
    const response = await apiClient.get("users/me");
}

const logout = async () => {
    configure.logout()
    window.location.assign("/login")
}

onMounted(() => {
    testToken()
    me()
    getPosts()
})

</script>