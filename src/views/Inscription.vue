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
  <div class="flex flex-col min-h-screen px-[30vw] justify-center items-center">
    <div class="flex flex-col justify-center items-center">
      <h1 class="font-bold text-center text-[59px] mb-12">Inscription</h1>
      <v-text-field v-model="nom" label="nom" class="w-[15vw]"/>
      <v-text-field v-model="email" label="email" class="w-[15vw]"/>
      <div class="flex justify-center">
        <v-btn @click="inscription" color="blue" variant="outlined">Inscription</v-btn>
      </div>
      <v-alert class="mt-10" v-model="displayErreur" transition="fade-transition" border="start" variant="tonal"
               closable color="red-accent-4" title="erreur">
        <div :key="e" v-for="e in erreur">{{ e }}</div>
      </v-alert>
    </div>


  </div>
</template>
