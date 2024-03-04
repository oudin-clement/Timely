<script>
import {mapActions, mapState} from "pinia";
import {useAuthentificationStore} from "@/stores/authentification.js";
import axios from "axios";

export default {
  data() {
    return {
      key: "",
      displayErreur: false,
      erreur: ""
    }
  },
  computed: {
    ...mapState(useAuthentificationStore, ["name", "id", "key", "email"])
  },
  methods: {
    ...mapActions(useAuthentificationStore, ["fetchProfile"]),

    connexion() {
      axios.get("https://timely.edu.netlor.fr/api/profile", {
        headers: {
          'Content-Type': "application/json",
          'Authorization': `key=` + this.key,
        }
      })
          .then(res => {
            this.fetchProfile({key: this.key, id: res.data.id, name: res.data.name, email: res.data.email})
            this.$router.push("/")
          })
          .catch(e => {
            this.displayErreur = true
            this.erreur = e.response.data.errors
            setTimeout(() => {
              this.displayErreur = false
            }, 3000)
          })
    }
  },
}
</script>

<template>
  <div class="flex flex-col min-h-screen px-[30vw] justify-center items-center">
    <div class="flex flex-col justify-center items-center">
      <h1 class="font-bold text-center text-[59px] mb-12">Connexion</h1>
      <v-text-field v-model="key" label="clé" class="w-[15vw]"/>
      <v-btn @click="connexion" color="blue" variant="outlined">Connexion</v-btn>

      <v-alert class="mt-10" v-model="displayErreur" transition="fade-transition" border="start" variant="tonal"
               closable color="red-accent-4" title="erreur">
        <div :key="e" v-for="e in erreur">{{ e }}</div>
      </v-alert>
    </div>
  </div>
</template>
