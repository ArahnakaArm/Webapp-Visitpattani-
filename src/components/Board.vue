
<template>

  <div id="board" class="container">
   
    <div class = "page-header">
      
      <div>
        <h2 style="font-size:40px">ผลการเก็บข้อมูลจากการ Check In </h2>
        
      <div style="margin-top:5px" class="row">
        



</div>

      </div>
    </div>
    <div class="panel panel-default" style="margin-top:30px">
        <div class="panel-heading">
          <h3>Place Ratings</h3>
        </div>
        <div class="panel-body">
          <table class="table table striped">
            <thead>
              <tr>
                <th>
                  Places
                </th>
                <th>
                  Rating
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in books" :key="book.id">
                <td>
                 {{book.name}}
                </td>
                <td style="padding-left:27px">
                {{book.rate}}
                </td>
              </tr>
            </tbody>
          </table>
          <download-excel 
    class   = "btn btn-default" 
    :data   = "json_data"
    :fields = "json_fields"
    worksheet = "My Worksheet"
    name    = "VisitSongkhla.xls">
 
      <v-btn style="margin-top:0px;color:black;width:168px"  class="black--text" color="#26a69a ">ดาวน์โหลด Excel</v-btn>
 
</download-excel>
        </div>
    </div>

  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld'
import Firebase,{ functions, database } from 'firebase'
import firebase from 'firebase'
import BootstrapVue from 'bootstrap-vue'
import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {db} from '../firebase'
import JsonExcel from 'vue-json-excel'
 
Vue.component('downloadExcel', JsonExcel)
//s
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
var day='5';
let booksRef = db.ref('books').child('null');

var i=0;
var returnName=[];
var returnRate=[];

export default {
  name: 'app',
  firebase:{
        books:booksRef
      },
 mounted() {
    this.calculate2();
    //this.addMarker();
  },
  data () {
    return {
      contracts:{},
      selected: null,
      options: [
        { value: null, text: 'Day' },
        { value: '1', text: '1' },
        { value: '2', text: '2' },
        { value: '3', text: '3' },
        { value: '4', text: '4' },
        { value: '5', text: '5' },
        { value: '6', text: '6' },
        { value: '7', text: '7' },
        { value: '8', text: '8' },
        { value: '9', text: '9' },
        { value: '10', text: '10' },
        { value: '11', text: '11' },
        { value: '12', text: '12' },
        { value: '13', text: '13' },
        { value: '14', text: '14' },
        { value: '15', text: '15' },
        { value: '16', text: '16' },
        { value: '17', text: '17' },
        { value: '18', text: '18' },
        { value: '19', text: '19' },
        { value: '20', text: '20' },
        { value: '21', text: '21' },
        { value: '22', text: '22' },
        { value: '23', text: '23' },
        { value: '24', text: '24' },
        { value: '25', text: '25' },
        { value: '26', text: '26' },
        { value: '27', text: '27' },
        { value: '28', text: '28' },
        { value: '29', text: '29' },
        { value: '30', text: '30' },
        { value: '31', text: '31' },
      ],
      selected1: null,
      options1: [
        { value: null, text: 'Month' },
        { value: '1', text: '1' },
        { value: '2', text: '2' },
        { value: '3', text: '3' },
        { value: '4', text: '4' },
        { value: '5', text: '5' },
        { value: '6', text: '6' },
        { value: '7', text: '7' },
        { value: '8', text: '8' },
        { value: '9', text: '9' },
        { value: '10', text: '10' },
        { value: '11', text: '11' },
        { value: '12', text: '12' }
      ],
      selected2: null,
      options2: [
        { value: null, text: 'Year' },
        
        { value: '2019', text: '2019' },
        { value: '2020', text: '2020' },
        { value: '2021', text: '2021' },
        { value: '2022', text: '2022' },
        { value: '2023', text: '2023' },
        { value: '2024', text: '2024' },
        { value: '2025', text: '2025' },
        { value: '2026', text: '2026' },
        { value: '2027', text: '2027' },
        { value: '2029', text: '2029' },
        { value: '2030', text: '2030' }
      ],
      json_fields: {
          'Placename': 'name',
          'Rate': 'rate',
          
      },
      json_data: [
          {
              'name': '',
              'rate': '',
          
          },
          {
              'name': '',
              'rate': '',
          
          },
            {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          }, {
              'name': '',
              'rate': '',
          
          },
      ],
      json_meta: [
          [
              {
                  'key': 'charset',
                  'value': 'utf-8'
              }
          ]
      ],
    }
  },methods:{
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
             rate:childAverage
    
        
           })
           console.log(DateStamp);
           //booksReff.push('sad');
            console.log(childAverage);
            // rateRef.push(childAverage);
            sumRate=0;
             childAverage=0;
           
          })
       
        })


       day=this.selected+this.selected1+this.selected2
       //booksRef.push({name:'testt',rate:'7'})
      console.log(day)
      this.$unbind('books')
      this.$bindAsArray('books',db.ref('books').orderByChild('timestamp').equalTo(day))
      booksRef.orderByChild('day').equalTo(day).on('child_added',snapshot=>{
        console.log(snapshot.val())
        
      })
     
    }, 
    calculate2(){
        /*contactRef.once('value', (snapshot) => {
      this.json_data[0].name = snapshot.val();
     
      
        })*/
      /*
      this.json_data[0].name='Test'
          console.log(this.json_data[0].name);*/
        var Test  = (i, Name, Rate) => {
            this.json_data[i].name=Name;
            this.json_data[i].rate=Rate;
            console.log(this.json_data[i])
        }
        var dbRefMap= firebase.database().ref('books');
        dbRefMap.on('value', snapshot => {
          i=0;
          snapshot.forEach(function(child){
            var Name=child.val().name;
            var Rate=child.val().rate;
            Test(i, Name, Rate)
            i++;
            // returnName.push(Name)
            // returnRate.push(Rate)
        
            //   console.log(returnName)
              //  console.log(returnRate)
            })
        });

        rateRef.once("value",function(snapshot){
            snapshot.forEach(function(childs){
              let   booksReff=db.ref('books');
              childs.forEach(function(childss){
                    childCount= childss.numChildren();
                    sumRate=sumRate+childss.val().Rate;
                    DateStamp=childss.val().Date;
              })
          
            //  console.log(sumRate);
              childNum= childs.numChildren();
              childAverage=sumRate/childNum;
              //var roundedNumber = Math.round(childAverage * 10) / 10;
              childAverage = childAverage.toFixed(1);
            // console.log(childNum);
              placeName=childs.key;
              // console.log(placeName);
              booksReff.child(placeName).set({
                name:placeName,
                rate:childAverage
            
              })
            ///  console.log(DateStamp);
              //booksReff.push('sad');
              //  console.log(childAverage);
                // rateRef.push(childAverage);
                sumRate=0;
                childAverage=0;
              
              })
          
            })
          
        
          day=this.selected+this.selected1+this.selected2
          //booksRef.push({name:'testt',rate:'7'})
          //console.log(day)
        this.$unbind('books')
          this.$bindAsArray('books',db.ref('books'))
          booksRef.orderByChild('day').equalTo(day).on('child_added',snapshot=>{
            console.log(snapshot.val())
            this.Test();
          })
    },/*
    mounted () {
    contactRef.on('value', (snapshot) => {
      this.json_data.name = snapshot.val().name;
     
      
    })
  },*/
    goMap(){
        this.$router.replace('map')
    },
     Test(){
        for(i=0;i<returnName.length;i++){
    this.json_data[i].name=returnName[i];
    this.json_data[i].rate=returnRate[i];
       
        
        
        
        /*this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;*/
   } 
    },
    
  }
  


}


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
  margin-top: 0px;
}
button{
  margin-left: 200px;
   margin: 1px 0;
    width: 5%;
    height: 5%;
    cursor: pointer;
}
.row{
 
  width: 150%;
  font-size: 13px;
 
}
.panel{
  width: 100%;
  height: 50%;
  font-size: 15px;
}.col-sm-2{
  font-size: 15px;
}

</style>
