<template>
<div class="grid-container">
  <div id="router"><RouterView /></div>
  <div id="calendar"><Calendar /></div>
</div>
  
</template>

<script setup>
import Calendar from "../../components/Calendar.vue";
</script>

<style>
.grid-container {
  display: grid;
  grid-template-areas: 'a1 a1 a1 a1 a1 a2' 'a1 a1 a1 a1 a1  a3' 'a1 a1 a1 a1 a1 a3';
  min-height: 90vh;
  grid-gap: 2px;
  padding: 10px;
}
#router {
  grid-area: a1;
  background-color: beige;
}
#calendar {
  grid-area: a2;
}
</style>