<script>
import axios from "axios";
import {mapState} from "pinia";
import {useAuthentificationStore} from "@/stores/authentification.js";

export default {
  data: () => ({
    nom: '',
    color: '#FF0000',
    rules: [
      value => {
        if (value) return true

        return 'Le nom de l\'activite est requis'
      },
    ],
  }),
  computed: {
    ...mapState(useAuthentificationStore, ["name", "id", "key", "email"])
  },
  methods:{
    createActivity() {
      if(this.nom !== ''){
        axios.post("https://timely.edu.netlor.fr/api/activities", {
          "name": this.nom,
          "color": this.color
        }, {
          headers: {
            'Content-Type': "application/json",
            "Authorization": `key=${this.key}`
          }
        })
        this.reset()
      }
    },
    reset() {
      this.$refs.form.reset()
    },
  }
}
</script>

<template>
  <div class="container">
    <h2>Creer Activité</h2>

    <v-form @submit.prevent ref="form">
      <v-text-field
          v-model="nom"
          :rules="rules"
          label="Nom de l'activite"
      ></v-text-field>
      <v-color-picker color="grey" v-model="color"></v-color-picker>
      <v-container class="mt-3 pa-0">
      <v-btn type="submit" variant="outlined" color="blue" @click="createActivity">Creer</v-btn>
      </v-container>
    </v-form>

  </div>
</template>

<style scoped>

h2{
  font-size: 25px;
  margin-bottom: 20px;
}

.container{
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

</style>