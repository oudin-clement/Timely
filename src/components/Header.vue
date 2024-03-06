<script>
import {useActiviteStore} from "@/stores/activite.js";
import {mapActions, mapState} from "pinia";
import axios from "axios";
import {useAuthentificationStore} from "@/stores/authentification.js";

export default {
  data(){
    return {

    }
  },
  computed: {
    ...mapState(useActiviteStore, ["nomActivite", "idActivite", "debut", "idProjet"]),
    ...mapState(useAuthentificationStore, ["key"])
  },
  methods: {
    ...mapActions(useActiviteStore, ["finirActivite"]),
    stopActivite() {
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
      axios.get("https://timely.edu.netlor.fr/api/time-entries", {
        headers: {
          'Content-Type': "application/json",
          'Authorization': `key=` + this.key,
        }
      })
          .then(res => {
            this.timeEntries = res.data
          })
    },
  }
}
</script>

<template>
  <header class="w-full h-[80px] bg-purple-500 flex items-center justify-evenly">
    <div>
      <p>Paramètre Généraux</p>
    </div>
    <div>
      <p>Déconnexion</p>
    </div>
    <div>
      <p>Activité en cours : {{this.nomActivite}}</p>
    </div>
    <div>
      <p @click="stopActivite" class="cursor-pointer">STOP</p>
    </div>
    <div>
      <p>Nombre d'heures quotidiennes :</p>
    </div>
    <div>
      <p>Objectif atteint :</p>
    </div>
    <div>
      <p>Activités</p>
    </div>
    <div>
      <p>Statistiques</p>
    </div>

  </header>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
