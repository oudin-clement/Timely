<script>
import axios from "axios";
import {mapState} from "pinia";
import {useAuthentificationStore} from "@/stores/authentification.js";

export default {
  data() {
    return {
      projetSelectedId: "",
      activiteSelectedId: "",
      textNote: "",
      debut: "",
      fin: ""
    }
  },
  props: ['projets', "activites",],
  computed: {
    ...mapState(useAuthentificationStore, ["key"])
  },
  methods: {
    padZero(number) {
      return (number < 10 ? '0' : '') + number;
    },
    formatDateTime(dateTimeString) {
      var dateTime = new Date(dateTimeString);
      var year = dateTime.getFullYear();
      var month = this.padZero(dateTime.getMonth() + 1);
      var day = this.padZero(dateTime.getDate());
      var hours = this.padZero(dateTime.getHours());
      var minutes = this.padZero(dateTime.getMinutes());
      var seconds = this.padZero(dateTime.getSeconds());

      return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    },

    closeDialog(){
      this.$emit("close");
    },

    createTimeEntry(){
      axios.post("https://timely.edu.netlor.fr/api/time-entries", {
        "project_id": this.projetSelectedId,
        "activity_id": this.activiteSelectedId,
        "start": this.formatDateTime(this.debut),
        "end": this.formatDateTime(this.fin),
        "comment" : this.textNote
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
  <div class="flex flex-col justify-center items-center p-10 bg-white">

    <v-select
        :items="projets"
        v-model="projetSelectedId"
        item-title="name"
        item-value="id"
        label="Projet"
    ></v-select>

    <v-select

        :items="activites"
        v-model="activiteSelectedId"
        item-title="name"
        item-value="id"
        label="Activité"></v-select>
    <v-textarea v-model="textNote"></v-textarea>
    <input type="datetime-local" v-model="debut">
    <input type="datetime-local" v-model="fin">
    <div class="flex">
      <v-btn @click="createTimeEntry">Créer</v-btn>
      <v-btn @click="closeDialog">Annuler</v-btn>
    </div>


  </div>
</template>
<script setup>
</script>