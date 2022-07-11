<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6" width="100" >
      <v-app-bar  color="orange lighten-1" dark>
        
        <h2 style="margin-left: 223px">Address Book Form</h2>
        <v-icon style="margin-left: 249px">mdi-close</v-icon>
      </v-app-bar>
           
       
      <v-card ref="form" style="padding: 132px" elevation="2">
        <v-card-text>
          <v-text-field
            outlined
            ref="firstname"
            v-model="form.firstname"
            :rules="[() => !!firstname || 'This field is required']"
            :error-messages="errorMessages"
            label="First Name"

            required
          ></v-text-field>

          <v-text-field
            outlined
            ref="lastname"
            v-model="form.lastname"
            :rules="[() => !!lastname || 'This field is required']"
            :error-messages="errorMessages"
            label="Last Name"
            required
          ></v-text-field>

          <v-text-field
            outlined
            ref="emailId"
             v-model="form.emailId"
            label="E-mail"
          ></v-text-field>

          <v-text-field
            outlined
            ref="phoneNumber"
            v-model="form.phoneNumber"
            :rules="[() => !!phoneNumber || 'This field is required']"
            label="Phone number"
            required
            placeholder="eg.8888888888"
          ></v-text-field>

          <v-text-field
            outlined
            ref="address"
             v-model="form.address"
            :rules="[() => !!address || 'This field is required']"
            label="Address Line"
            required
          ></v-text-field>

          <v-row>
            <v-col cols="4">
              <v-autocomplete
                outlined
                ref="city"
                v-model="form.city"
                :rules="[() => !!city || 'This field is required']"
                :items="cities"
                label="city"
                placeholder="Select..."
                required
              ></v-autocomplete>
            </v-col>

            <v-col cols="4">
              <v-autocomplete
                outlined
                ref="state"
                v-model="form.state"
                :rules="[() => !!state || 'This field is required']"
                :items="states"
                label="state"
                placeholder="Select..."
                required
              ></v-autocomplete>
            </v-col>
            <v-col cols="4">
              <v-text-field
                outlined
                ref="zipcode"
                v-model="form.zipcode"
                :rules="[() => !!zipcode || 'This field is required']"
                label="zipcode"
                required
                placeholder="eg.6 digit 875462"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions style="justify-content: flex-start">
          <router-link to="/">
            <v-btn
              class="text-capitalize"
              width="180px"
              height="53px"
              color="#E2E2E2"
              depressed
              >Cancel</v-btn> 
            <v-spacer></v-spacer>
          </router-link>
        
          <v-slide-x-reverse-transition>
            <v-tooltip v-if="formHasErrors" left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  class="my-0"
                  v-bind="attrs"
                  @click="resetForm"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn
            class="ml-10 text-capitalize"
            width="180px"
            height="53px"
            color="#E2E2E2"
            @click="submit"
            depressed
            >Submit</v-btn>
          
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
 import AddressBookService from '../service/AddressBookService'
export default {
  name: "EditForm",
  data: () => ({
    states: [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Asam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujrat",
      "Haryana",
      "HP",
      "Jarkhand",
      "Karnataka",
      "kerela",
      "MP",
      "Maharastrta",
      "Manipur",
      "Meghalay",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Panjab",
      "Rajasthan",
      "Sikkiam",
      "TamilNadu",
      "Tripura",
      "Telengana",
      "UK",
      "UP",
      "WB",
    ],
    cities: [
      "Ajmer",
      "Barmer",
      "Baran",
      "Bansawada",
      "Bikaner",
      "Bhilwara",
      "Bundi",
      "Bhopal",
      "Churu",
      "Chittorgarh",
      "Dosa",
      "Dungarpur",
      "Dholpur",
      "Ganganagar",
      "Jaipur",
      "Jaisalmer",
      "Jodhpur",
      "Jalawar",
      "Jalor",
      "Junjunnu",
      "Hunumangarh",
      "Kota",
      "Karoli",
      "Nagaor",
      "Pali",
      "pune",
      "Patna",
      "Rajsamand",
      "Tonk",
      "Sirohi",
      "Sikar",
      "Pratapgarh",
      "Sawai-Madhopur",
      "Udaipur",
      "Bijapuar",
    ],
    errorMessages: "",
    firstname: null,
    lastname: null,
    address: null,
    emailId: null,
    city: null,
    phoneNumber: null,
    state: null,
    zipcode: null,
    formHasErrors: false,
  }),

   computed: {
    form (){
      return {
        firstname: this.firstname,
        lastname: this.lastname,
        address: this.address,
        city: this.city,
        phoneNumber: this.phoneNumber,
        state: this.state,
        zipcode: this.zipcode,
        emailId: this.emailId
      }
    },
   } ,

   watch:{
    name(){
      this.errorMessages=''
    },
   },

   methods :{
    addressCheck (){
      this.errorMessages = this.address && !this.firstname && !this.lastname
      ? `Hey buddy ! I'M Required`:''
      return true
    },
    resetForm () {
      this.errorMessages =[]
      this.formHasErrors = false

      object.keys(this.form).forEach(() =>{
        this.$refs[f].reset()
      })
    },
   getDataById(id){
             console.log(id)
            AddressBookService.getContact(id)  .then((response) => {
              console.log(response.data.data)
                let obj = response.data.data;
                this.setData(obj);
            })
            .catch((err) => {
               console.log(err);
            });
         },
      submit (event) {
            event.preventDefault();
            console.log(this.form);
            const data = this.form;
           AddressBookService.updateAddressBookData(this.id, data).then((response) => {
                console.log(response)
                console.log(response.data.data)
                this.updateAddressBookData = response.data.data
                 alert("Contact Added Successfully",response)
            })
            .catch(error => {
                console.log(error);
                 alert("Contact is not Addedd")
            })
      },
            setData(obj) {
                this.id = obj.addressId;
                this.firstname = obj.firstname;
                this.lastname = obj.lastname;
                this.city = obj.city;
                this.address = obj.address;
                this.state = obj.state;
                this.phoneNumber = obj.phoneNumber;
                this.zipcode = obj.zipcode;
                this.emailId = obj.emailId;
                console.log(this.form);
    },
   },
     created() {
        this.getDataById(this.$route.params.id);
    }

 }
</script>
