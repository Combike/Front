<template>
  <div>
    <v-navigation-drawer fixed app v-model="drawer">
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Combike
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list dense color="grey darken-3">
        <v-list-tile :to="{ name: 'Home', activeClass: 'active', exact: true }">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{ name: 'Routes', activeClass: 'active', exact: true }">
          <v-list-tile-action>
            <v-icon>map</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Rotas</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="orange">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title v-if="title">{{ title }}</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      drawer: null,
    }
  },
  props: [
    'title'
  ]
}
</script>
