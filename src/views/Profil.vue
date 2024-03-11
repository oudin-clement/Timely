<script>
import {mapState} from "pinia";
import {useAuthentificationStore} from "@/stores/authentification.js";
import axios from "axios";

export default {
  data: () => ({
    name: '',
    email: '',
    rules: [
      value => {
        if (value) return true

        return 'Le champ est requis'
      },
    ],
  }),
  computed: {
    ...mapState(useAuthentificationStore, ["key"])
  },
  mounted() {
    axios.get("https://timely.edu.netlor.fr/api/profile", {
      headers: {
        'Content-Type': "application/json",
        "Authorization": `key=${this.key}`
      }
    }).then(res => {
      this.name = res.data.name;
      this.email = res.data.email;
    })
    },
      methods: {
        modifProfil() {
          if (this.name !== '' && this.email !== '') {
            axios.put("https://timely.edu.netlor.fr/api/profile", {
              "name": this.name,
              "email": this.email
            }, {
              headers: {
                'Content-Type': "application/json",
                "Authorization": `key=${this.key}`
              }
            })
          }
        }
      }
    }
</script>

<template>
  <div class="container">
    <h1>Profil</h1>
    <h1>Votre clé de profil est "{{key}}" (elle vous servira pour vous authentifier)</h1>
    <v-form @submit.prevent ref="form">
      <v-text-field
          v-model="name"
          :rules="rules"
      ></v-text-field>
      <v-text-field
          v-model="email"
          :rules="rules"
      ></v-text-field>
      <v-container class="mt-3 pa-0">
        <v-btn type="submit" variant="outlined" color="blue" @click="modifProfil">Modifier le profil</v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<style scoped>
h1 {
  font-size: 30px;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 25%;
}

.container {
  margin-top: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>