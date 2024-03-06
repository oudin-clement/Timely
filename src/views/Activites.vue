<script>
import {mapState} from "pinia";
import {useAuthentificationStore} from "@/stores/authentification.js";
import axios from "axios";
import CreerActivite from "@/components/CreerActivite.vue";

export default {
  components: {CreerActivite},
  data: () => ({
    tab: null,
  }),

  computed: {
    ...mapState(useAuthentificationStore, ["name", "id", "key", "email"])
  },
  mounted() {
    axios.get("https://timely.edu.netlor.fr/api/activities", {
      headers: {
        'Content-Type': "application/json",
        "Authorization": `key=${this.key}`
      }
    }).then(res => {
      this.tab = res.data
    })
  }
}
</script>

<template>
  <div>
    <h1>Activités</h1>
    <v-container>
      <v-row>
        <v-col v-for="activite in tab" :key="activite.id" cols="12" md="4">
          <v-card class="ma-2" :color="activite.color">
            <v-card-title>{{ activite.name }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <CreerActivite/>
</template>

<style scoped>

h1{
  font-size: 30px;
  margin-top: 20px;
  text-align: center;
}
</style>