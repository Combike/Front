<template>
  <form>
    <input type="text" placeholder="Nome do grupo">
    <input type="text" placeholder="Horário de partida">
    <input type="text" planeholder="Coordenadas">
    <button @click.prevent="saveRoute()">Salvar</button>
  </form>
</template>

<script>
  import axios from 'axios'
  export default {
    methods: {
      saveRoute: function () {
        axios.post('/route')
          .then((response) => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  }
</script>
