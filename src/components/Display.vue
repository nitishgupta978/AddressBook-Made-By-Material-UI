<template>
 <body>
      <router-link to="/form"><v-btn 
        color="blue"
        absolute
        right
        >
        <v-icon>mdi-account-plus</v-icon>Add User</v-btn>
        <h2>Persons Details</h2>
      
      </router-link> 
      
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            First Name
          </th>
          <th class="text-left">
            Last Name
          </th>
          <th class="text-left">
            Address
          </th>
          <th class="text-left" @click="getsortCity()">
            City
          </th>
          <th class="text-left" @click="getsortState()">
            State
          </th>
          <th class="text-left">
            Zipcode
          </th>
          <th class="text-left">
            Phone Number
          </th>
          <th class="text-left">
            Email
          </th>
           <th class="text-left">
            Actions
          </th>
        </tr>
      </thead>
     <tbody>
        <tr
          v-for="Contact in Contacts"
          :key="Contact.addressId"
        >
          <td class="text-left">{{ Contact.firstname }}</td>
          <td class="text-left">{{ Contact.lastname }}</td>
          <td class="text-left">{{ Contact.address }}</td>
          <td class="text-left">{{ Contact.city }}</td>
          <td class="text-left">{{ Contact.state }}</td>
          <td class="text-left">{{ Contact.zipcode }}</td>
          <td class="text-left">{{ Contact.phoneNumber }}</td>
          <td class="text-left">{{ Contact.emailId }}</td>
         
           <td >
            <v-icon @click="remove(Contact.addressId)">mdi-delete</v-icon>
           <v-icon @click="update(Contact.addressId)"> mdi-pencil</v-icon>
           </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </body>
</template>


<script>
  import AddressBookService from "../service/AddressBookService";
export default {
  name: "Displayhome",
  data() {
    return {
      Contacts: [],
    };
  },
  methods: {
    getEmployee() {
      AddressBookService.getAllAddressbookData().then((response) => {
        console.log(response.data.data);
        this.Contacts = response.data.data;
      });
    },
    getsortCity(){
            AddressBookService.getsortCity().then((response) => {
              console.log(response.data.data);
                this.Contacts = response.data.data;   
            });
        },

      getsortState(){
            AddressBookService.getsortState().then((response) => {
              console.log(response.data.data);
                this.Contacts = response.data.data;   
            });
        },
        
     update(id){
          console.log(id);
          this.$router.push({name: "EditForm",params:{id:id}})
        },
        remove(id){
     console.log(id)
       AddressBookService .deleteContact(id).then((data) => {
            var answer = window.confirm(" Employee data once deleted cannot be restored!! Do you wish to continue ?",data);
            if(answer === true){
                alert("Employee data deleted successfully!!");
                window.location.reload();
                this.getContact();
            }
            else{
              window.location.reload();
            }
          })
          .catch((error) => {
            alert("Something Went Wrong!");
          });
        }
  },
   created() {
    this.getEmployee();
  },
}
   
</script>
<style>
body {
  margin: 0;
  height: 100%;
}
.header {
  padding: 10px 0;
  background: #ffffff 0% 0% no-repeat padding-box;
  opacity: 1;
}
.header-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.logo-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
}
.addressBook-text {
  text-align: left;
  font: normal normal bold 22px/25px Montserrat;
  letter-spacing: 0px;
  text-transform: uppercase;
  opacity: 1;
  color: #098df8;
  margin-left: 10px;
}
.addressBook-book {
  color: #3d4e5d;
}
* {
  box-sizing: border-box;
}