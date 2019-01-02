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
let booksRef = db.ref('Location');
export default {
  name: "GoogleMap",
  firebase: {
    posts: booksRef
  },
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 7.0071889, lng: 100.4962275 },
      markers: [
      /*  {
        position:{
        lat: 7.0071889, lng: 100.4962275
      }
        }*/ ],
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
      var i=0;
      var returnArray=[];
      var returnArray2=[];
      var marker=[];
     /*  const marker = {
          lat:parseFloat(posts.latt),
          lng: parseFloat(posts.long)
        };
        console.log(posts.latt)
        this.markers.push({ position: marker });*/
    var dbRef= firebase.database().ref('Location');
    dbRef.on('value', function(snapshot) {
   
    snapshot.forEach(function(child) {  
    var childs=child.val();
   var childs1=childs.latt
   var childs2=childs.long
   returnArray.push(childs1)
   returnArray2.push(childs2)
          console.log(returnArray)
          console.log(returnArray2)
       });
      return returnArray;
      return returnArray2
   });
    
     // if (this.currentPlace) {
    //  console.log(lat1)
     // console.log(lat2)
   // booksRef.on('value', function(snapshot) {
   // snapshot.forEach(function(child) {  
   // var childs=child.val();
   for(i=0;i<returnArray.length;i++){
     
     
       marker[i] = {
          lat:returnArray[i],
          lng: returnArray2[i]
        };
        this.markers.push({ position: marker[i] });
        /*this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;*/
   }
     //  });
   //});
      /*
        const marker2 = {
          lat:7.0428779,
          lng: 100.4962275
        };
           this.markers.push({ position: marker2 });
        this.places.push(this.currentPlace);
        this.center = marker2;
        this.currentPlace = null;*/
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