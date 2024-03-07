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
      timeEntries: [],
      projetSelectedId: "",
      projetSelectedName: "",
      activiteSelectedId: "",
      activiteSelectedName: "",
      tempsEcoul: 0,
      textNote: ""
    }
  },
  methods: {
    ...mapActions(useActiviteStore, ["lancerActivite", "finirActivite"]),
    getNameProjet(id) {
      for (let i = 0; i < this.projets.length; i++) {
        if (this.projets[i].id === id) {
          return this.projets[i].name
        }
      }
    },
    getNameActivite(id) {
      for (let i = 0; i < this.activites.length; i++) {
        if (this.activites[i].id === id) {
          return this.activites[i].name
        }
      }
    },
    startActivite() {
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

      this.lancerActivite({
        idProjet: this.projetSelectedId,
        idActivite: this.activiteSelectedId,
        nomProjet: this.projetSelectedName,
        nomActivite: this.activiteSelectedName,
        debut: new Date().toISOString()
      })
      setInterval(() => {
        const maintenant = new Date();
        const tempsDebut = new Date(this.debut);
        this.tempsEcoul = maintenant - tempsDebut;
      }, 1000);
    },
    stopActivite() {
      axios.post("https://timely.edu.netlor.fr/api/time-entries", {
        "project_id": this.idProjet,
        "activity_id": this.idActivite,
        "start": this.debut,
        "end": new Date().toISOString(),
        "comment" : this.textNote
      }, {
        headers: {
          'Content-Type': "application/json",
          "Authorization": `key=${this.key}`
        }
      })
      this.finirActivite({fin: new Date().toISOString()})
      const date = new Date().toISOString().split("T")[0]
      console.log("stop")
      axios.get(`https://timely.edu.netlor.fr/api/time-entries?from=${date}&to=${date}`, {
        headers: {
          'Content-Type': "application/json",
          'Authorization': `key=` + this.key,
        }
      })
          .then(res => {
            this.timeEntries = res.data
          })
    },
    formatTemps(temps) {
      const secondes = Math.floor(temps / 1000);
      const heures = Math.floor(secondes / 3600);
      const minutes = Math.floor((secondes % 3600) / 60);
      const secondesRestantes = secondes % 60;
      return `${heures}h ${minutes}m ${secondesRestantes}s`;
    }

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

    const date = new Date().toISOString().split("T")[0]
    axios.get(`https://timely.edu.netlor.fr/api/time-entries?from=${date}&to=${date}`, {
      headers: {
        'Content-Type': "application/json",
        'Authorization': `key=` + this.key,
      }
    })
        .then(res => {
          this.timeEntries = res.data
        })
  }
}
</script>

<template>
  <main class="px-[228px] py-[35px]">
    <div v-if="!nomActivite"
         class="flex items-center justify-evenly px-8 py-5 bg-purple-950 rounded-2xl h-[250px] mb-10">
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
    <div v-else class="px-32 py-5 bg-purple-950 min-h-[250px] rounded-2xl mb-10">
      <div class="flex items-center justify-between">
        <h1 class="font-bold text-4xl">Activité en cours : {{ nomActivite }}</h1>
        <h1 class="font-bold text-4xl">{{ formatTemps(tempsEcoul) }}</h1>
        <v-btn color="red-darken-4" @click="stopActivite" variant="elevated">Arreter activité</v-btn>
      </div>
      <h1 class="mt-8 text-xl">Notes :</h1>
      <v-textarea v-model="textNote"></v-textarea>
    </div>


    <div>
      <div v-for="timeEntry in timeEntries" :key="timeEntry.id"
           class="w-full justify-evenly flex p-10 bg-purple-500 rounded-3xl mb-5">
        <p class="text-xl font-bold">{{ getNameProjet(timeEntry.project_id) }}</p>
        <p class="text-xl font-bold">{{ getNameActivite(timeEntry.activity_id) }}</p>
        <p>{{ timeEntry.start }}</p>
        <p>{{ timeEntry.end }}</p>
      </div>
    </div>


  </main>
</template>
