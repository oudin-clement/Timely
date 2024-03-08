<script>

import {defineComponent} from "vue";
import Profil from "@/views/Profil.vue";
import Projects from "@/views/Projects.vue";
import Activites from "@/views/Activites.vue";

export default defineComponent({
  components: {Activites, Projects, Profil}
})
</script>

<template>
  <div>
    <h1>Paramètres généraux</h1>
    <Profil/>
    <hr>
    <Projects/>
    <hr>
    <Activites/>
  </div>
</template>

<style scoped>

hr{
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: auto;
  margin-right: auto;
  border: 0;
  width: 80%;
  border-top: 2px solid grey;
}

h1{
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 40px;
  font-weight: bold;
}

</style>