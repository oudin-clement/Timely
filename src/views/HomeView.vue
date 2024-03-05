<script>
import axios from "axios";
import {mapActions, mapState} from "pinia";
import {useAuthentificationStore} from "@/stores/authentification.js";
import {useActiviteStore} from "@/stores/activite.js";

export default {
  data() {
    return {
      projets: [],
      activites: [],
      projetSelectedId: "",
      projetSelectedName: "",
      activiteSelectedId: "",
      activiteSelectedName: ""
    }
  },
  methods: {
    ...mapActions(useActiviteStore, ["lancerActivite", "finirActivite"]),
    startActivite(){
      console.log("start")
      for (let i = 0; i < this.projets.length; i++) {
        if (this.projets[i].id === this.projetSelectedId) {
          console.log("trouve")
          console.log(this.projets[i].name)
          this.projetSelectedName = this.projets[i].name
        }

      }
      for (let i = 0; i < this.activites.length; i++) {
        if (this.activites[i].id === this.activiteSelectedId) {
          console.log("trouve")
          console.log(this.activites[i].name)
          this.activiteSelectedName = this.activites[i].name
        }
      }

      console.log(this.projetSelectedId)
      console.log(this.activiteSelectedId)
      console.log(this.projetSelectedName)
      console.log(this.activiteSelectedName)

      this.lancerActivite({idProjet: this.projetSelectedId, idActivite: this.activiteSelectedId, nomProjet: this.projetSelectedName, nomActivite: this.activiteSelectedName, debut: new Date().toISOString()})
    },
    stopActivite(){
      axios.post("https://timely.edu.netlor.fr/api/time-entries", {
        "project_id": this.idProjet,
        "activity_id": this.idActivite,
        "start": this.debut,
        "end": new Date().toISOString()
      }, {
        headers: {
          'Content-Type': "application/json",
          "Authorization": `key=${this.key}`
        }
      })
      this.finirActivite({fin: new Date().toISOString()})
      console.log("stop")
    },

  },
  computed: {
    ...mapState(useActiviteStore, ["nomActivite", "idActivite", "idProjet", "debut"]),
    ...mapState(useAuthentificationStore, ["key"])
  },
  created() {
    if (this.key) {
      axios.get("https://timely.edu.netlor.fr/api/projects", {
        headers: {
          'Content-Type': "application/json",
          'Authorization': `key=` + this.key,
        }
      })
          .then(res => {
            this.projets = res.data
            console.log(this.projets)
          })

      axios.get("https://timely.edu.netlor.fr/api/activities", {
        headers: {
          'Content-Type': "application/json",
          'Authorization': `key=` + this.key,
      }
    })
        .then(res => {
          this.activites = res.data
        })
    }
  }
}
</script>

<template>
  <main class="px-[50px] py-[35px]">
    <div v-if="!nomActivite" class="flex items-center justify-evenly px-8 py-5 bg-purple-950 rounded-2xl">
      <div class="w-[252px]">
        <v-select
            :items="projets"
            v-model="projetSelectedId"
            item-title="name"
            item-value="id"
            label="Projet"
        ></v-select>
      </div>
      <div class="w-[252px] ml-5">
        <v-select

            :items="activites"
            v-model="activiteSelectedId"
            item-title="name"
            item-value="id"
            label="Activité"></v-select>
      </div>

      <v-btn color="blue" @click="startActivite" variant="outlined">Commencer</v-btn>
    </div>
    <div v-else class="flex items-center justify-between px-8 py-5 bg-green-950 rounded-2xl">
      <h1>Activité en cours : {{nomActivite}}</h1>
      <v-btn color="red" @click="stopActivite" variant="outlined">Arreter activité</v-btn>
    </div>

  </main>
</template>
