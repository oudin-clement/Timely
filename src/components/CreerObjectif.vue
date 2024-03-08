<script>
import axios from "axios";
import {mapState} from "pinia";
import {useAuthentificationStore} from "@/stores/authentification.js";

export default {
  data() {
    return {
      nomObjectif: "",
      contenuObjectif: ""
    }
  },
  computed: {
    ...mapState(useAuthentificationStore, ["key"])
  },
  methods: {
    closeDialog(){
      this.$emit("close");
    },

    async createObjectif(){
      await axios.post("https://timely.edu.netlor.fr/api/daily-objectives", {
        "name": this.nomObjectif,
        "content": this.contenuObjectif,
      }, {
        headers: {
          'Content-Type': "application/json",
          "Authorization": `key=${this.key}`
        }
      })
      this.$emit("close");
    }

  }
}
</script>


<template>
  <div class="flex flex-col justify-center items-center p-10 bg-white rounded-2xl">

    <v-text-field v-model="nomObjectif" placeholder="nom" class="w-[150px]"/>
    <v-text-field v-model="contenuObjectif" placeholder="contenu" class="w-[150px]"/>

    <div class="flex justify-between w-full mt-10 px-[150px]">
      <v-btn color="blue" @click="createObjectif">Créer</v-btn>
      <v-btn @click="closeDialog">Annuler</v-btn>
    </div>


  </div>
</template>
<script setup>
</script>