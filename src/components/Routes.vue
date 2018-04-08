<template>
  <v-app id="inspire">
    <Header :title="'Rotas'"/>
    <v-container
      fluid
      style="min-height: 0;"
      grid-list-lg
    >
      <v-layout row wrap>
        <v-flex xs12>
          <div class="after">
            <v-card>
              <v-card-media src="https://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=14&size=800x130&key=AIzaSyAScck9X91OxwM0wMi6kZ7t2Ni_OWupmc8" height="130px">
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <v-list-tile color="white">
                        <v-list-tile-action>
                          <v-icon color="white">place</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title class="title" v-text="'item.title'"></v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
            </v-card>
          </div>
        </v-flex>
      </v-layout>
  </v-container>
  </v-app>
</template>

<script>
import Header from '@/components/Header'

export default {
  components: {
    Header,
  }
}
</script>

<style lang="sass">
.after
  position: relative
  &:after
    content: ''
    position: absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
    background: rgba(0, 0, 0, .5)
.card__media__content
  z-index: 5
</style>
