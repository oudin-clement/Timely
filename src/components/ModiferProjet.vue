<script>
import {useAuthentificationStore} from "@/stores/authentification.js";
import {mapState} from "pinia";
import axios from "axios";

export default {
  data: () => ({
    nom: '',
    description: '',
    rules: [
      value => {
        if (value) return true

        return 'Le nom du projet est requis'
      },
    ],
  }),
  computed: {
    ...mapState(useAuthentificationStore, ["key"])
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getProjects()
  },
  methods:{
    updateProject() {
      if(this.nom !== ''){
        axios.put("https://timely.edu.netlor.fr/api/projects/"+this.id, {
          "name": this.nom,
          "description": this.description
        }, {
          headers: {
            'Content-Type': "application/json",
            "Authorization": `key=${this.key}`
          }
        })
        this.$router.push({name: "projet"})
      }
    },
    getProjects() {
      axios.get("https://timely.edu.netlor.fr/api/projects/"+this.id, {
        headers: {
          'Content-Type': "application",
          "Authorization": `key=${this.key}`
        }
      }).then(res => {
        this.nom = res.data.name
        this.color = res.data.description
      })
    }
  }
}
</script>

<template>
  <div class="container">
    <h2>Modifier Projet</h2>
    <v-form @submit.prevent ref="form">
      <v-text-field
          v-model="nom"
          :rules="rules"
          label="Nom du projet"
      ></v-text-field>
      <v-text-field
          v-model="description"
          label="Description du projet"
      ></v-text-field>
      <v-container class="mt-3 pa-0">
        <v-btn type="submit" variant="outlined" color="blue" @click="updateProject">Modifier</v-btn>
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
form {
  width: 20%;
}
</style>