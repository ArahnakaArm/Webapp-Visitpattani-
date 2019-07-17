<template>
  <v-layout justify-center mt-2>
    
    <v-flex xs12 sm10 md8 lg6 >
      <v-card ref="form" >
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
          <h5 style="color:#808080;font-size:11.8px">รูปภาพข่าวกิจกรรม</h5>
          <v-btn riese class="primary;white--text"  @click="onPickFile">อัพโหลด</v-btn>
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
let dataRef = db.ref('Travel-Event').child('TH');
let dataRefEn = db.ref('Travel-Event').child('EN');
export default {
   
    data(){
        return{
            title: '',titleEn:'',
            describtion: '',describtionEn:'',
            location: '',locationEn:'',
            imageUrl: '',
            tel: '',
            image : null,
            picture: '',
             mask: '###-#######',
             value: '4444444444444444'
        }
    },
    computed:{
        formIsvalid(){
            return (this.title !== '' &&  this.titleEn !== '' &&
            this.describtion !=='' &&  this.describtionEn !== '' &&
            this.location !=='' && this.locationEn !== '' && this.tel !== '')
        }, form () {
        return {
          title: this.title,titleEn:this.titleEn,
          describtion: this.describtion,describtionEn:this.describtionEn,
          location: this.location,locationEn:this.locationEn,
          imageUrl: this.imageUrl,
          tel : this.tel
         
        }
      }
        
    },methods:{
        resetForm () {
         console.log('reset')
        
        this.location=''
        this.title=''
        this.describtion=''
        this.imageUrl=''
        this.tel=''
        this.titleEn=''
        this.locationEn=''
        this.describtionEn=''
      },
        test(){
              if(!this.image){
                return alert('กรุณาเลือกรูปภาพ')
            }
            let firebaseKey =this.generateKey()
            const storageRef=firebase.storage().ref('/AddedData/')
            const task = storageRef.put(this.image)
           
            task.snapshot.ref.getDownloadURL().then((url)=>{
                this.picture = url;
                console.log(this.picture)
               
                 dataRef.child(firebaseKey).set({
                title:this.title,
                location:this.location,
                url:this.picture,
                des:this.describtion,
                type:'กิจกรรม',
                lat:'-',
                lng:'-',
                tel:this.tel

            }

            
        )
           dataRefEn.child(firebaseKey).set({
                title:this.titleEn,
                location:this.locationEn,
                url:this.picture,
                des:this.describtionEn,
                 type:'กิจกรรม',
                lat:'-',
                lng:'-',
                tel:this.tel

            }

            
        )
            }).then(()=>{
                alert('เพิ่มข้อมูลสำเร็จ')
               this.resetForm()
                console.log('OK!')
                this.$router.replace('news')
            })
            .catch((error)=>{
                alert('เพิ่มข้อมูลไม่สำเร็จ')
                console.log(error)
            })
            let key
            let imageUrl
            var vm=this
            
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
        },generateKey(){
            let text = "-L"
    	    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ-_abcdefghijklmnopqrstuvwxyz"

               for( let i=0; i < 18; i++ ) {
				text += chars.charAt(Math.floor(Math.random() * chars.length))
      }

			return text
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
