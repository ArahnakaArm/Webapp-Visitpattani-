<template>
  <div>
 
        <div style="margin-top:25px;margin-left:450px" class="row">
    <v-menu>
      <v-text-field :value="due" slot="activator" label="ช่วงเวลาเริ่มต้น"  prepend-icon="date_range"></v-text-field>
      <v-date-picker v-model="due"></v-date-picker>
      
    </v-menu>
    <v-menu style="margin-left:30px">
      <v-text-field :value="due2" slot="activator" label="ช่วงเวลาสิ้นสุด"  prepend-icon="date_range"></v-text-field>
      <v-date-picker v-model="due2"></v-date-picker>
      
    </v-menu>
 

  <v-btn style="margin-top:20px;color:white;margin-left:75px" v-on:click="addMarker" class="white--text" color="#26a69a ">แสดงหมุด</v-btn>
  
</div>

      
        
      <div style="margin-left:15%;margin-top:15px">
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:80%;  height: 550px; margin-left:10%:margin-top:0px"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
      </div>
  </div>
</template>

<script>

import firebase from 'firebase'
import {db} from '../firebase'
let booksRef = db.ref('Location');
let rateRef = db.ref('Places');
let bookReff=db.ref('books');
var childCount;
var childValue=0;
var childRate=0;
var sumRate=0;
var childNum=0;
var childAverage=0;
var placeName;
var DateStamp='Test';
export default {
  
  name: "GoogleMap",
  firebase: {
    posts: booksRef
  },
  data() {
    return {
      due:null,due2:null,
      slicedDue:'',slicedDue2:'',
       mask: '##/##/####',
      value: '4444444444444444',
      selected:1,
      options:[
        { value: 1, text: 'จากผู้ใช้ให้คะแนน' },
        { value: 2, text: 'จากการติดตามผู้ใช้' }
      ],
     
      center: { lat: 6.7512336, lng: 101.091477 },
      markers: [
      ],
      places: [],
      currentPlace: null
    };
  },

  mounted() {
    this.geolocate();
  
  },

  methods: {
    
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {   
     
      this.markers = []
      var i=0;
      var j=0;
      var returnArray=[];
      var returnArray2=[];
    var num=0
      var marker=[];
      var marker2=[];
    var dbRef= firebase.database().ref('Location');
    var dbRefUsers = firebase.database().ref('Location(users)');
      marker=[];
      this.slicedDue = this.due.replace('-','')
      this.slicedDue = this.slicedDue.replace('-','')
    console.log(this.slicedDue)
     this.slicedDue2 = this.due2.replace('-','')
      this.slicedDue2 = this.slicedDue2.replace('-','')
    console.log(this.slicedDue2)

      for(j=this.slicedDue;j<=this.slicedDue2;j++){
        console.log(j)
    dbRef.on('value', function(snapshot) {
    snapshot.forEach(function(child) {  
      
    var childs=child.val();
    if(child.val().date==j){
   var childs1=childs.latt
   var childs2=childs.long
   returnArray.push(childs1)
   returnArray2.push(childs2)
 
    }
       });

       
        num += snapshot.numChildren()
     
      });
   }
   
    
      
   for(i=0;i<returnArray.length;i++){
      var marker=[];
     
       marker[i] = {
          lat:returnArray[i],
          lng: returnArray2[i]
        };
        this.markers.push({ position: marker[i] });
     
   }
   console.log(this.markers.length)
     //this.markers = []
     
    },deleteMarker(){
         this.markers = []
    }
    
,



    calculate(){
        

        rateRef.once("value",function(snapshot){
        
          snapshot.forEach(function(childs){
            let   booksReff=db.ref('books');
            childs.forEach(function(childss){
                  childCount= childss.numChildren();
                  sumRate=sumRate+childss.val().Rate;
                  DateStamp=childss.val().Date;
                 
                  
            })
         
            console.log(sumRate);
            childNum= childs.numChildren();
            childAverage=sumRate/childNum;
            console.log(childNum);
             placeName=childs.key;
            console.log(placeName);
           booksReff.child(placeName).set({
             name:placeName,
             rate:childAverage,
             timestamp:DateStamp
        
           })
           console.log(DateStamp);
           //booksReff.push('sad');
            console.log(childAverage);
            // rateRef.push(childAverage);
            sumRate=0;
             childAverage=0;
           
          })
       
        })
        
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
<style>
 .v-menu{
    margin-top: 0.55rem;
    margin-left: 0.2rem;
  }
</style>