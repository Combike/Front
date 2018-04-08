<template>
  <div>
    <v-toolbar color="orange">
      <v-toolbar-side-icon></v-toolbar-side-icon>
    </v-toolbar>

    <v-container pa-0>
      <div class="field-fixed">
        <v-text-field solo label="Qual o seu destino?"></v-text-field>
      </div>
      <v-btn
        fab dark small fixed bottom left
        color="orange"
        tag='button'
        :to="{name: 'AddRoute'}"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn
        fab light small fixed bottom right
        color="orange"
      >
        <v-icon>my_location</v-icon>
      </v-btn>
      <div class="google-map" :id="mapName"></div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'google-map',
  props: ['name'],
  data: function () {
    return {
      mapName: this.name + "-map",
    }
  },
  mounted: function () {
    // Sorry
    setTimeout(() => {
      const element = document.getElementById(this.mapName)
      const options = {
        zoom: 14,
        center: new google.maps.LatLng(-3.7394102,-38.5271261)
      }
      const map = new google.maps.Map(element, options)

      let geocoder = new google.maps.Geocoder()
      let directionsService = new google.maps.DirectionsService()

      const routes = [
        [{lat: -3.7394102, lng: -38.5271261}, {lat: -3.7413959, lng: -38.5434447}],
        [{lat: -3.747991, lng: -38.5355487}, {lat: -3.7513309, lng: -38.5200137}],
      ]
      routes.forEach(route => {
        let request = {
          origin: route[0],
          destination: route[1],
          travelMode: google.maps.DirectionsTravelMode.BICYCLING
        }
        directionsService.route(request, (response, status) => {
          if (status == google.maps.DirectionsStatus.OK) {
            const directionsRenderer = new google.maps.DirectionsRenderer()
            directionsRenderer.setDirections(response)
            directionsRenderer.setMap(map)
          }
        })
      })
    }, 500)
    // const input = document.getElementById('route_from')
    // const autocomplete = new google.maps.places.Autocomplete(input)
  },
  methods: {}
}
</script>

<style lang="sass">
html, body
  height: 100%
  margin: 0
  padding: 0

.google-map
  width: 100%
  height: calc(100vh - 56px)
  margin: 0
.field-fixed
  position: fixed
  width: calc(100% - 30px)
  top: 71px
  left: 15px
  background: white
  z-index: 99
</style>
