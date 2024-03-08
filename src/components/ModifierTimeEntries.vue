<script>
import axios from "axios";
import {mapState} from "pinia";
import {useAuthentificationStore} from "@/stores/authentification.js";

export default {
  data() {
    return {
      resFetch : null,
      projetSelectedId: "",
      activiteSelectedId: "",
      textNote: "",
      debut: "",
      fin: ""
    }
  },
  props: ['projets', "activites", "entryId"],
  created() {
    axios.get(`https://timely.edu.netlor.fr/api/time-entries/${this.entryId}`, {
      headers: {
        'Content-Type': "application/json",
        'Authorization': `key=` + this.key,
      }
    })
        .then(res => {
          this.resFetch = res.data
          this.projetSelectedId = res.data.project_id
          this.activiteSelectedId = res.data.activity_id
          this.textNote = res.data.comment
          this.debut = res.data.start
          this.fin = res.data.end
        })
  },
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

    deleteTimeEntry(){
      axios.delete(`https://timely.edu.netlor.fr/api/time-entries/${this.entryId}`, {
        headers: {
          'Content-Type': "application/json",
          "Authorization": `key=${this.key}`
        }
      })
      this.$emit("close");
    },

    editTimeEntry(){
      axios.put(`https://timely.edu.netlor.fr/api/time-entries/${this.entryId}`, {
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
        class="w-[250px]"
    ></v-select>

    <v-select

        :items="activites"
        v-model="activiteSelectedId"
        item-title="name"
        item-value="id"
        class="w-[250px]"
        label="Activité"></v-select>
    <v-textarea v-model="textNote"></v-textarea>
    <input type="datetime-local" v-model="debut">
    <input type="datetime-local" v-model="fin">
    <div class="w-full mt-10">
      <div class="flex justify-evenly">
        <v-btn color="yellow" @click="editTimeEntry">Editer</v-btn>
        <v-btn @click="closeDialog">Annuler</v-btn>
        </div>
        <div class="flex justify-end mt-12">
          <v-btn color="red" @click="deleteTimeEntry">Supprimer</v-btn>
        </div>

      </div>



  </div>
</template>
<script setup>
</script>