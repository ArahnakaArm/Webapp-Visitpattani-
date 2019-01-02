<template>
  <div>
    <div>
     
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
      <br/>

    </div>
    <br>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:80%;  height: 400px; margin-left:10%"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import firebase from 'firebase'
import {db} from '../firebase'
export default {
  name: "GoogleMap",
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 7.0071889, lng: 100.4962275 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
     
     // if (this.currentPlace) {
        const marker = {
          lat:7.0071889,
          lng: 100.4962275
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
        const marker2 = {
          lat:7.0428779,
          lng: 100.4962275
        };
           this.markers.push({ position: marker2 });
        this.places.push(this.currentPlace);
        this.center = marker2;
        this.currentPlace = null;
    //  }
    
    },
    addMarker2() {
      if (this.currentPlace) {
        const marker = {
          lat:7.0428779,
          lng: 100.4962275
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>