<script>
import axios from "axios";
import {mapActions, mapState} from "pinia";
import {useAuthentificationStore} from "@/stores/authentification.js";
import {useActiviteStore} from "@/stores/activite.js";
import CreerActivite from "@/components/CreerActivite.vue";
import CreerTimeEntries from "@/components/CreerTimeEntries.vue";
import ModifierTimeEntries from "@/components/ModifierTimeEntries.vue";
import CreerObjectif from "@/components/CreerObjectif.vue";

export default {
  components: {CreerActivite, CreerTimeEntries, ModifierTimeEntries, CreerObjectif},
  data() {
    return {
      projets: [],
      activites: [],
      timeEntries: [],
      objectif: [],
      projetSelectedId: "",
      projetSelectedName: "",
      activiteSelectedId: "",
      activiteSelectedName: "",
      debutcreate: "",
      fincreate: "",
      tempsEcoul: 0,
      textNote: "",
      dialog_create: false,
      dialog_edit: false,
      idAvantEdit: "",
      dialog_objectif: false
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
    async stopActivite() {
      await axios.post("https://timely.edu.netlor.fr/api/time-entries", {
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
      await axios.get(`https://timely.edu.netlor.fr/api/time-entries?from=${date}&to=${date}`, {
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
    },

    closeTimeEntriesCreate(){
      this.dialog_create = false
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
    },

    closeObjectif(){
      this.dialog_objectif = false
      axios.get("https://timely.edu.netlor.fr/api/daily-objectives", {
        headers: {
          'Content-Type': "application/json",
          'Authorization': `key=` + this.key,
        }
      })
          .then(res => {
            this.objectif = res.data
          })
    },

    closeTimeEntriesEdit(){
      this.dialog_edit = false
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
    },

    openTimeEntriesEdit(id){
      this.idAvantEdit = id;
      this.dialog_edit = true
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

      axios.get("https://timely.edu.netlor.fr/api/daily-objectives", {
        headers: {
          'Content-Type': "application/json",
          'Authorization': `key=` + this.key,
        }
      })
          .then(res => {
            this.objectif = res.data
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
      <div class="mb-5 mr-5 flex justify-end"><v-btn color="blue" variant="outlined" @click="dialog_create = true">Créer une entrée</v-btn></div>
      <v-dialog width="600" v-model="dialog_create">
        <CreerTimeEntries :activites="activites" :projets="projets" @close="closeTimeEntriesCreate"/>
      </v-dialog>
      <div v-for="timeEntry in timeEntries" :key="timeEntry.id"
           class="w-full justify-evenly flex p-10 bg-purple-500 rounded-3xl mb-5">
        <p class="text-xl font-bold">{{ getNameProjet(timeEntry.project_id) }}</p>
        <p class="text-xl font-bold">{{ getNameActivite(timeEntry.activity_id) }}</p>
        <p>{{ timeEntry.start }}</p>
        <p>{{ timeEntry.end }}</p>
        <v-btn @click="openTimeEntriesEdit(timeEntry.id)">editer</v-btn>
        <v-dialog width="600" v-model="dialog_edit">
          <ModifierTimeEntries @close="closeTimeEntriesEdit" :activites="activites" :projets="projets" :entry-id="idAvantEdit"/>
        </v-dialog>
      </div>
    </div>

    <div>
      <v-btn color="blue" variant="outlined" @click="dialog_objectif = true">Créer un objectif</v-btn>
      <v-dialog width="600" v-model="dialog_objectif">
        <CreerObjectif @close="closeObjectif"/>
      </v-dialog>
    </div>
    <div class="flex flex-wrap justify-center">
      <div v-for="obj in objectif" :key="obj.id" class="w-[20%] rounded-2xl bg-white px-4 py-2 mx-2 my-4 text-center">
        <p>Nom : {{obj.name}}</p>
        <p>Contenu : {{obj.content}}</p>
      </div>
    </div>



  </main>
</template>
