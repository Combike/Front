<template>
  <v-app id="inspire">
    <Header />
    <v-container pa-0>
      <div :class="hasSelectedRoute ? 'disabled' : ''"  class="form" v-show="showRegisterForm">
        <div class="input-group__input">
          <input ref="from" type="text" placeholder="De">
        </div>
        <div class="input-group__input">
          <input ref="to" type="text" placeholder="Para">
        </div>
        <button class="btn" @click="cancel()">Cancelar</button>
        <button
          v-if="hasSelectedRoute"
          color="success"
          class="btn"
          @click="saveRoute()"
          :loading="loading"
          :disabled="loading"
        >Salvar</button>
        <button v-else="hasSelectedRoute" color="success" class="btn" @click="showRoute()">Ver rota</button>
      </div>
      <v-btn
        fab light small fixed bottom right
        color="orange"
      >
        <v-icon>my_location</v-icon>
      </v-btn>
      <v-btn
        fab dark small fixed bottom left
        color="orange"
        tag='button'
        @click="loadMap();showRegisterForm = true"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <div class="google-map" :id="mapId"></div>
    </v-container>
  </v-app>
</template>

<script>
import apiRequestService from '@/services/api-request-service'
import Header from '@/components/Header'

export default {
  props: ['name'],
  data: function () {
    return {
      mapId: 'map',
      showRegisterForm: false,
      directionsService: null,
      geocoder: null,
      map: null,
      loading: false,
      hasSelectedRoute: false,
      mapName: this.name + "-map",
      drawer: null,
    }
  },
  components: {
    Header,
  },
  mounted: function () {
    apiRequestService.get('routes')
      .then(response => {
        this.routes = response.routes
        this.loadMap()
        this.loadRoutes()
        this.loadRegisterForm()
      })
  },
  methods: {
    loadRegisterForm: function () {
      let from = new google.maps.places.Autocomplete(this.$refs.from)
      let to = new google.maps.places.Autocomplete(this.$refs.to)
    },
    loadMap: function () {
      const options = {
        zoom: 14,
        center: new google.maps.LatLng(-3.7394102,-38.5271261),
        disableDefaultUI: true,
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
            this.hasSelectedRoute = true
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
        } else {
          // TODO: Melhorar o tratamento do erro
          alert('Não foi possível encontrar a rota')
        }
      })
    },
    saveRoute () {
      apiRequestService.post('routes')
        .then(() => this.$router.push({name: 'Routes'}))
    },
    cancel() {
      this.loadMap();
      this.loadRoutes();
      this.showRegisterForm = false
      this.hasSelectedRoute = false
      this.$refs.from.value = ''
      this.$refs.to.value = ''
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
.form
  padding: 20px
  input
    width: 100%
    padding: 8px
  .input-group__input
    height: 40px
    border-bottom: 1px solid
  .btn
      margin-top: 30px
.field-fixed
  position: fixed
  width: calc(100% - 30px)
  top: 71px
  left: 15px
  background: white
  z-index: 5
</style>
