<script setup lang="ts">
import { onMounted, ref } from 'vue';
 import axios from 'axios';
 import { useQuasar } from 'quasar';

 const $q = useQuasar();
 const data = ref<string | null>(null)
 const created = async () => {
   try {
     const token = localStorage.getItem('token');
     const response = await axios.get('http://localhost:3000/protected', {
       headers: { Authorization: `Bearer ${token}` },
     });
     data.value = response.data.message;
   } catch (error) {
     console.error('Failed to fetch protected data:', error);
     $q.notify({
       color: 'negative',
       position: 'top',
       message: 'Failed to fetch protected data.',
     });
   }
 }

 onMounted(() => {
   created();
 });
</script>

<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Protected Content</div>
        <div v-if="data">{{ data }}</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>

</style>
