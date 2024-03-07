<script>
import {useAuthentificationStore} from "@/stores/authentification.js";
import {mapState} from "pinia";
import axios from "axios";

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
    ...mapState(useAuthentificationStore, ["key"])
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getActivity()
  },
  methods:{
    updateActivity() {
      if(this.nom !== ''){
        axios.put("https://timely.edu.netlor.fr/api/activities/"+this.id, {
          "name": this.nom,
          "color": this.color
        }, {
          headers: {
            'Content-Type': "application/json",
            "Authorization": `key=${this.key}`
          }
        })
        this.$router.push({name: "activite"})
      }
    },
    getActivity() {
      axios.get("https://timely.edu.netlor.fr/api/activities/"+this.id, {
        headers: {
          'Content-Type': "application",
          "Authorization": `key=${this.key}`
        }
      }).then(res => {
        this.nom = res.data.name
        this.color = res.data.color
      })
    }
  }
}
</script>

<template>
  <div class="container">
    <h2>Modifier Activité</h2>
    <v-form @submit.prevent ref="form">
      <v-text-field
          v-model="nom"
          :rules="rules"
          label="Nom de l'activite"
      ></v-text-field>
      <v-color-picker color="grey" v-model="color"></v-color-picker>
      <v-container class="mt-3 pa-0">
      <v-btn type="submit" variant="outlined" color="blue" @click="updateActivity">Modifier</v-btn>
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