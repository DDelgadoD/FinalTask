<template>
  <h1>Tasks</h1>
</template>
<script setup>
import { getTasks } from '../API'
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router'

// route nos da la informacion de la ruta
const route = useRoute();

const tasks = ref(undefined);
const isLoading = ref(true);

const loadDetails = async () => {
    tasks.value = await getTasks(route.params.code);
    isLoading.value = false;
}

onMounted(async () => {
    await loadDetails()
})

// Observa una variable, en esta caso el route.params.id y cuando cambia ejecuta una funcion
// lo usaremos cuando tengamos una url con parametros y cambie el valor para actualizar los datos
watch(async () => route.params.code, async newValue => {
    isLoading.value = true;
    await loadDetails()
});

</script>

<style scoped>
.container {
  padding: 3em 3em;
  border-radius: 8px;
  margin: 2% auto;
}
.icono {
  width: 64px;
  height: 64px;
  cursor: pointer;
}

.night-case {
  background-image: var(--night-bg);
  box-shadow: var(--night-shadow);
}

.day-case {
  background: white;
  box-shadow: var(--day-shadow);
}
</style>
