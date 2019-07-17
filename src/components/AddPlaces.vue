<template>
  <v-layout justify-center mt-2>
    
    <v-flex xs12 sm10 md8 lg6 >
      <v-card ref="form" >
        <v-card-text>
          <v-text-field
            name="title"
             id="title"
            v-model="title"
          
            label="ชื่อสถานที่"
            placeholder="กรุณากรอกชื่อสถานที่"
            required
          ></v-text-field>
          <v-text-field
            name="titleEn"
             id="titleEn"
            v-model="titleEn"
          
            label="Place Name"
            placeholder="Please fill place name"
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
            placeholder="Please fill describtion"
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
            placeholder="Please fill location"
            required
          ></v-text-field>
          <h5 style="color:#808080;font-size:11.8px">รูปภาพสถานที่</h5>
          <v-btn riese class="primary;white--text" @click="onPickFile">อัพโหลด</v-btn>
          <input type="file" 
          style="display:none" 
          ref="fileInput" 
          accept="image/*"
          @change="onFilePicked">
           
       <div>
          <img :src="imageUrl">
    </div>
        </v-card-text>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>
         
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              
              left
            >
              <template >
              
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn large color="#26a69a"  class="white--text" :disabled="!formIsvalid" @click="test">เพิ่ม</v-btn>
        </v-card-actions>
      </v-card>
      
    </v-flex>
 
  </v-layout>
  
</template>
<script>
import {db} from '../firebase'
import { error } from 'util';
import {storage} from '../firebase'
import firebase from 'firebase'
let dataRef = db.ref('Home-Attract').child('TH');
let dataRefEn = db.ref('Home-Attract').child('EN');
export default {
   
    data(){
        return{
            title: '',
            describtion: '',
            location: '',
            imageUrl: '',
            image : null,
            picture: '',
            titleEn:'',
            describtionEn:'',
            locationEn:''
        }
    },
    computed:{
        formIsvalid(){
            return (this.title !== '' && this.titleEn !== '' &&
            this.describtion !=='' && this.describtionEn !== '' &&
            this.location !=='' && this.locationEn !== '')
        }, form () {
        return {
          title: this.title,
          titleEn : this.titleEn,
          describtion: this.describtion,
          describtionEn : this.describtionEn,
          location: this.location,
          locationEn : this.locationEn,
          imageUrl: this.imageUrl,
          
         
        }
      }
        
    },methods:{
        resetForm () {
         console.log('reset')
        
        this.location=''
        this.title=''
        this.describtion=''
        this.imageUrl=''
        this.locationEn=''
        this.titleEn = ''
        this.describtionEn=''
      },
        test(){
              if(!this.image){
                return alert('กรุณาเลือกรูปภาพ')
            }
            const storageRef=firebase.storage().ref('/AddedData/')
            const task = storageRef.put(this.image)
            
           
            task.snapshot.ref.getDownloadURL().then((url)=>{
                this.picture = url;
                console.log(this.picture)
               
                 dataRef.push({
                title:this.title,
                location:this.location,
                url:this.picture,
                des:this.describtion,
                lat:'-',
                lng:'-',
                tel:'-'
            }
            
        )
          dataRefEn.push({
                title:this.titleEn,
                location:this.locationEn,
                url:this.picture,
                des:this.describtionEn,
                lat:'-',
                lng:'-',
                tel:'-'
            }
            
        )
            }
            ).then(()=>{
                alert('เพิ่มข้อมูลสำเร็จ')
               this.resetForm()
                console.log('OK!')
            })
            .catch((error)=>{
                alert('เพิ่มข้อมูลไม่สำเร็จ')
                console.log(error)
            })
            let key
            let imageUrl
            var vm=this
            
           /* dataRef.update({
                title:this.title,
                location:this.location,
                des:this.describtion,
                lat:'-',
                lng:'-',
                tel:'-'
        


            }*/
            
            
            /*.then(()=>{
                alert('เพิ่มข้อมูลสำเร็จ')
               this.resetForm()
                console.log('OK!')
            })
            .catch((error)=>{
                alert('เพิ่มข้อมูลไม่สำเร็จ')
                console.log(error)
            })*/
        },onPickFile(){
            this.$refs.fileInput.click()
        },onFilePicked(event){
            const files = event.target.files
            let filename = files[0].name
            if(filename.lastIndexOf('.')<=0){
                return alert('Please add a valid file!')
            }
            const fileReader = new FileReader()
            fileReader.addEventListener('load',()=>{
                this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        }
    }
}
</script>
<style>
img {
  width: 150px;
  border-radius: 2px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
  transition: width 1s;
}

</style>
