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

    connexion(){
      axios.get("https://timely.edu.netlor.fr/api/profile", {headers: {
          'Content-Type': "application/json",
          'Authorization' : `key=`+this.key,
        }})
          .then(res => {
            this.fetchProfile({key : this.key, id :res.data.id, name : res.data.name, email : res.data.email})
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
  {{this.name}}
  <v-container>
    <v-row justify="center" align="center" class="h-screen">
      <v-col cols="3">
        <h1>Connexion</h1>
        <v-text-field v-model="key" label="clé"/>
        <v-btn @click="connexion" color="blue" variant="outlined">Connexion</v-btn>
        <v-alert class="mt-10" v-model="displayErreur" transition="fade-transition" border="start" variant="tonal"
                 closable color="red-accent-4" title="erreur">
          <div :key="e" v-for="e in erreur">{{ e }}</div>
        </v-alert>
      </v-col>
    </v-row>


  </v-container>
</template>
