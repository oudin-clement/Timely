<script>
import {useActiviteStore} from "@/stores/activite.js";
import {mapState} from "pinia";

export default {
  data(){
    return {

    }
  },
  computed: {
    ...mapState(useActiviteStore, ["nomActivite"])
  },
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
      <p>STOP</p>
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
