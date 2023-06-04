<template>
  <div class="notepad">
    <h1 class="header">Tasks</h1>
    <div class="paper">
      <div class="task" v-for="task in tasks">
        {{ task.day }} {{ task.Title }} {{ task.Description }} {{ task.ini }} {{ task.end }}
      </div>
    </div>
  </div>
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
.notepad {
  width: 95%;
  margin:auto;
  margin-top: 1em;
  box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.20);
  border-radius: 0 0 10px 10px;
}

.header {
  width: 100%;
  height: 50px;
  background: #333;
  border-radius: 5px 5px 0 0;
}

.paper {
  width: 100%;
  height: 100%;
  min-height: 60vh;
  background: repeating-linear-gradient(#F1EDE9, #F1EDE9 31px, #94ACD4 31px, #94ACD4 32px);
  color: black;
  font-family: cursive;
  font-size: 18px;
  line-height: 31px;
  outline: 0;
  padding: 35px 50px;
}
.task{
  margin-bottom: 0px;
  padding:0px;
}
</style>
