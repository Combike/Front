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
          <div>
            <v-container
              fluid
              style="min-height: 0;"
              grid-list-lg
            >
              <v-layout row wrap>
                <v-flex v-for="route in routes" class="dark" xs12>
                  <v-card color="blue-grey" class="white--text">
                  <v-card-media :src="'https://maps.googleapis.com/maps/api/staticmap?center=' + route.cordinates[0].lat + ',' + route.cordinates[0].lng + '&zoom=14&size=800x130&key=AIzaSyAScck9X91OxwM0wMi6kZ7t2Ni_OWupmc8'">
                    <v-card-title  primary-title>
                      <div class="headline black--text">{{ route.name }}</div>
                    </v-card-title>
                  </v-card-media>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </div>
        </v-flex>
      </v-layout>
  </v-container>
  </v-app>
</template>

<script>
import Header from '@/components/Header'
import axios from 'axios';

export default {
  components: {
    Header,
  },
  data() {
    return {
      routes: [
        {
          "id": 1,
          "name": "Parque do Cocó",
          "cordinates": [
            {
              "lat": "-3.747991",
              "lng": "-38.5355487"
            },
            {
              "lat": "-3.7513309",
              "lng": "-38.5200137"
            }
          ],
          "working_days": [
            "08:00",
            "08:00",
            "08:00",
            "08:00",
            "08:00",
            "08:00",
            "08:00"
          ],
          "bookmark": false
        },
        {
          "id": 2,
          "name": "Praia de Iracema",
          "cordinates": [
            {
              "lat": "-3.747991",
              "lng": "-38.5355487"
            },
            {
              "lat": "-3.7513309",
              "lng": "-38.5200137"
            }
          ],
          "working_days": [
            "08:00",
            "08:00",
            "08:00",
            "08:00",
            "08:00",
            "08:00",
            "08:00"
          ],
          "bookmark": false
        }
      ]
    }
  },

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

.card__media__content
  z-index: 5
</style>
