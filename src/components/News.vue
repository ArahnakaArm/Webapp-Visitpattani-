<template>

  <div id="board" class="container">
   
    <div class = "page-header">
      
      <div>

        <div style="margin-top:5px" class="row">
        <h2 style="font-size:40px"> ข่าวกิจกรรม </h2>
        </div>
        <v-btn style="color:white;width:110px" v-on:click="goAddNews" color="#26a69a">เพิ่มกิจกรรม +</v-btn>
      <div style="margin-top:5px" class="row">
       
<v-dialog v-model="dialog2" max-width="700px" max-height="200px">
      <v-card ref="form">
        <v-card-title>
          <span class="headline">แก้ไขข้อมูล</span>
        </v-card-title>
        <v-card-text>
         <v-text-field
            name="title"
             id="title"
            v-model="title"
          
            label="ชื่อข่าวกิจกรรม"
            placeholder="กรุณากรอกข่าวกิจกรรม"
            required
          ></v-text-field>
          <v-text-field
            name="titleEn"
             id="titleEn"
            v-model="titleEn"
          
            label="News Name"
            placeholder="Please fill news name."
            required
          ></v-text-field>
          <v-text-field 
            name="describtion"
            id="describtion"
            multi-line
            v-model="describtion"
            label="คำอธิบาย"
            placeholder="กรุณากรอกคำอธิบาย"
          
            required
          ></v-text-field>
           <v-text-field
            name="describtionEn"
             id="describtionEn"
              multi-line
            v-model="describtionEn"
          
            label="Describtion"
            placeholder="Please fill describtion."
            required
          ></v-text-field>
          <v-text-field
            name="location"
            id="location"
            v-model="location"
        
            label="ที่ตั้งสถานที่"
            placeholder="กรุณากรอกที่ตั้งสถานที่"
            required
          ></v-text-field>
           <v-text-field
            name="locationEn"
             id="locationEn"
            v-model="locationEn"
          
            label="Location"
            placeholder="Please fill location."
            required
          ></v-text-field>
          <v-text-field 
            name="tel"
            id="tel"
            v-model="tel"
            :mask="mask" 
            label="เบอร์โทรศัพท์/Telephone."
            placeholder="กรุณากรอกเบอร์โทรศัพท์/Please fill phonenumber."
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog2 = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="updateData(selectednews)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


<v-dialog v-model="dialog" max-width="290">
  <v-card>
        <v-card-title class="headline">ยืนยันการลบ</v-card-title>

        <v-card-text>
         ต้องการลบ {{selectednews.title}} ?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            ยกเลิก
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            v-on:click="removeProduct(selectednews)"
          >
            ตกลง
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> 
   

    


</div>

      </div>
    </div>
    <div class="panel panel-default" style="margin-top:30px">
        <div class="panel-heading">
          
        </div>
        <div class="panel-body">
          <table class="table table striped">
            <thead>
              <tr>
                <th>
                  ข่าวกิจกรรม
                </th>
               
              </tr>
            </thead>
            <tbody>
            
              <tr v-for="book in books" :key="book.id">
     
                <td>
                 <a>{{book.title}}</a>
                </td>
               <td style="padding-right:0px;padding-left:0px;width:45px">
                 
                    <v-icon small @click.stop="showupdatePanel(book,book.title,book.des,book.location,book.tel)">fas fa-edit</v-icon>

                </td>
                <td  style="padding-right:0px;padding-left:0px">
              
            <v-icon small  @click.stop="comfirmDelete(book)">fas fa-trash-alt</v-icon>
                             
                              

                </td>
                
              </tr>
             
            </tbody>
          </table>
  
        </div>
    </div>

  </div>
  
</template>
<script>

import Firebase,{ functions, database } from 'firebase'
import firebase from 'firebase'
import BootstrapVue from 'bootstrap-vue'
import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {db} from '../firebase'
import JsonExcel from 'vue-json-excel'
let booksRef=db.ref('Travel-Event').child('TH')
let booksRefEn=db.ref('Travel-Event').child('EN')
Vue.component('downloadExcel', JsonExcel)

export default {
  name: 'App',
  firebase:{
        books:booksRef,booksEn:booksRefEn
      },
  data () {
    return {
        dialog: false,
        selectednews:'',
        selectednewsEn:'',
        dialog2: false,
        title: '',titleEn:'',
            describtion: '',describtionEn:'',
            location: '',locationEn:'',
            tel: '',
            picture: '',
             mask: '###-#######',
             value: '4444444444444444'
             ,keyUpdate:''
      }
  },
  methods: {
   removeProduct:function(book){
  this.dialog= false
          booksRefEn.child(book['.key']).remove().then(()=>{
        booksRef.child(book['.key']).remove().then(()=>{
                alert('ลบข้อมูลสำเร็จ')
                console.log('OK!')
            })
            .catch((error)=>{
                alert('เพิ่มข้อมูลไม่สำเร็จ')
                console.log(error)
            })
      })
      
   },
   goAddNews:function(){
        this.$router.replace('addnews')
   },comfirmDelete(book,bookEn){
        this.dialog = true
        this.selectednews = book
        
   }, form () {
        return {
          title: this.title,titleEn:this.titleEn,
          describtion: this.describtion,describtionEn:this.describtionEn,
          location: this.location,locationEn:this.locationEn,
          imageUrl: this.imageUrl,
          tel : this.tel
         
        }
        },showupdatePanel(book,name,des,location,tel){
     this.selectednews = book

      this.dialog2 = true
      this.title = name
      this.describtion = des
      this.location = location
      this.tel = tel
      this.keyUpdate=booksRef.child(book['.key'])
      booksRefEn.child(book['.key']).on('value', (snapshot) => {
      this.titleEn = snapshot.val().title
      this.describtionEn = snapshot.val().des
      this.locationEn = snapshot.val().location
          
    })
   },updateData(eventnew){
      booksRefEn.child(eventnew['.key']).update({
        title : this.titleEn,
          des:this.describtionEn,
        location : this.locationEn,
        tel:this.tel,
        lat : '-',
        lng:'-',
        type:'กิจกรรม'


      })
      booksRef.child(eventnew['.key']).update({
        title : this.title,
          des:this.describtion,
        location : this.location,
        tel:this.tel,
        lat : '-',
        lng:'-',
        type:'กิจกรรม'


      }).then(()=>{
                alert('อัพเดทข้อมูลสำเร็จ')

                console.log('OK!')

                
            })
            .catch((error)=>{
                alert('อัพเดทไม่สำเร็จ')
                console.log(error)
            }).then(()=>{
                 this.dialog2 = false
                  this.$router.replace('news')
            })

           

   }
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