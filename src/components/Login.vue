<template>
<v-app>
  <v-card
    class="mx-auto"
    max-width="900"
  >
    <v-card-title class="text-h6 font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
      <v-avatar
        color="primary lighten-2"
        class="subheading white--text"
        size="24"
        v-text="step"
      ></v-avatar>
    </v-card-title>

    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card-text>
           <v-text-field
                  label="FullName*"
                  value=""
                ></v-text-field>
          <v-text-field
            label="Email"
            value=""
          ></v-text-field>
          <span class="text-caption grey--text text--darken-1">
            This is the your emailId you will use to login to your  account
          </span>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="2">
        <v-card-text>
          <v-text-field
            label="Password"
            type="password"
          ></v-text-field>
          <v-text-field
            label="Confirm Password"
            type="password"
          ></v-text-field>
          <span class="text-caption grey--text text--darken-1">
            Please enter a password for your account
          </span>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="3">
        <div class="pa-4 text-center">
          <v-img
            class="mb-4"
            contain
            height="128"
            src="../assets/logo.jpeg"
          ></v-img>
          <h3 class="text-h6 font-weight-light mb-2">
            Welcome to AddressBook
          </h3>
          <span class="text-caption grey--text">Thanks for signing up!</span>
        </div>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        :disabled="step === 1"
        text
        @click="step--"
      >
        Back
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="step === 3"
        color="primary"
        depressed
        @click="step++"
      >
        Next
      </v-btn>
    </v-card-actions>
    <v-divider></v-divider>
     <v-dialog
      v-model="dialog1"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Already have an account? click here
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog1 = false"
          >
            Cancel
          </v-btn>
           <router-link to="/home">
          <v-btn
            color="blue darken-1"
            text
            
            @click="userlogin"
          >
          Save
          </v-btn>
          </router-link>
           </v-card-actions>
          </v-card>
    </v-dialog>
  </v-card>
  </v-app>
</template>

<script>
import loginService from "../service/loginService";
export default {
  name: "Login",
  data: () => ({
    step: 1,
    dialog1: false,
    Contacts: [],
      }),
     computed: {
      currentTitle () {
        switch (this.step) {
          case 1: return 'Sign-up'
          case 2: return 'Create a password'
          default: return 'Account created'
        }
      },
    formData() {
      return {
        fullname: this.FullName,
        email: this.email,
        phonenumber: this.phonenumber,
      };
    },
  },
   methods: {
    getEmployee() {
      loginService.addUser(this.formData).then((response) => {
        console.log(response.data.data);
        this.Contacts = response.data.data;
      });
      this.dialog = false
    },
     userlogin() {
      loginService.login(this.formData).then((response) => {
        console.log(response.data.data);
        this.Contacts = response.data.data;
      });
      this.dialog = false
    },
     }
}
</script>