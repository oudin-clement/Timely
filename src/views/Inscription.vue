<script>
import axios from "axios";

export default {
  data() {
    return {
      nom: "",
      email: "",
      displayErreur: false,
      erreur: ""
    }
  },
  methods: {
    inscription() {
      axios.post("https://timely.edu.netlor.fr/api/apikeys", {
        "name": this.nom,
        "email": this.email
      })
          .catch(e => {
            this.displayErreur = true
            this.erreur = e.response.data.errors
            setTimeout(() => {
              this.displayErreur = false
            }, 3000)
          })
    }
  }
}
</script>

<template>
  <v-container>
    <v-row justify="center" align="center" class="h-screen">
      <v-col cols="3">
        <h1>Inscription</h1>
        <v-text-field v-model="nom" label="nom"/>
        <v-text-field v-model="email" label="email"/>
        <v-btn @click="inscription" color="blue" variant="outlined">Inscription</v-btn>
        <v-alert class="mt-10" v-model="displayErreur" transition="fade-transition" border="start" variant="tonal"
                 closable color="red-accent-4" title="erreur">
          <div :key="e" v-for="e in erreur">{{ e }}</div>
        </v-alert>
      </v-col>
    </v-row>


  </v-container>
</template>
