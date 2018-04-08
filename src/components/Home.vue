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
      <button @click="">Usar GPS</button>
      <button @click="loadMap();showRegisterForm = true">Cadastrar rota</button>
      <div v-show="showRegisterForm">
        <input ref="from" type="text" placeholder="De">
        <input ref="to" type="text" placeholder="Para">
        <button @click="showRoute();">Ver rota</button>
        <button @click="loadMap();loadRoutes();showRegisterForm = false">Cancelar</button>
      </div>
      <div class="google-map" :id="mapId"></div>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ['name'],
  data: function () {
    return {
      mapId: 'map',
      showRegisterForm: false,
      directionsService: null,
      geocoder: null,
      map: null,
      routes: [
        [{lat: -3.7394102, lng: -38.5271261}, {lat: -3.7413959, lng: -38.5434447}],
        [{lat: -3.747991, lng: -38.5355487}, {lat: -3.7513309, lng: -38.5200137}],
      ],
    }
  },
  mounted: function () {
    // Sorry
    setTimeout(() => {
      this.loadMap()
      this.loadRoutes()
      this.loadRegisterForm()
    }, 500)
  },
  methods: {
    loadRegisterForm: function () {
      let from = new google.maps.places.Autocomplete(this.$refs.from)
      let to = new google.maps.places.Autocomplete(this.$refs.to)
    },
    loadMap: function () {
      const options = {
        zoom: 14,
        center: new google.maps.LatLng(-3.7394102,-38.5271261)
      }
      this.map = new google.maps.Map(this.getMapElement(), options)
      this.directionsService = new google.maps.DirectionsService()
      this.geocoder = new google.maps.Geocoder()
    },
    loadRoutes: function () {
      this.routes.forEach(this.addRoute)
    },
    showRoute: function () {
      let to = {}
      let from = {}
      this.geocoder.geocode( { address: this.$refs.from.value }, (fromResults, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          from = {
            lat: fromResults[0].geometry.location.lat(),
            lng: fromResults[0].geometry.location.lng()
          }
          this.geocoder.geocode( { address: this.$refs.to.value }, (toResults, status) => {
            to = {
              lat: toResults[0].geometry.location.lat(),
              lng: toResults[0].geometry.location.lng()
            }
            this.addRoute([
              from,
              to
            ])
          })
        }
      });
    },
    addRoute (route) {
      let request = {
        origin: route[0],
        destination: route[1],
        travelMode: google.maps.DirectionsTravelMode.BICYCLING
      }
      this.directionsService.route(request, (response, status) => {
        if (status == google.maps.DirectionsStatus.OK) {
          const directionsRenderer = new google.maps.DirectionsRenderer()
          let a = directionsRenderer.setDirections(response)
          let b =  directionsRenderer.setMap(this.map)
          google.maps.event.addListener(directionsRenderer, () => console.log(111))
          console.log(directionsRenderer)
          // this.showAditionalFields
        } else {
          // TODO: Melhorar o tratamento do erro
          alert('Não foi possível encontrar a rota')
        }
      })
    },
    getMapElement: function () {
      return document.getElementById(this.mapId)
    },
  }
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
