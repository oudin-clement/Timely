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
    ...mapState(useAuthentificationStore, ["key"])
  },
  mounted() {
    this.getActivities()
  },
  methods: {
    getActivities() {
      axios.get("https://timely.edu.netlor.fr/api/activities", {
        headers: {
          'Content-Type': "application",
          "Authorization": `key=${this.key}`
        }
      }).then(res => {
        this.tab = res.data
      })
    },
    modifyActivity(id) {
      this.$router.push({name: "modifierActivite", params: {id: id}})
    }
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
            <v-card-actions>
              <v-btn>{{ activite.is_enable ? "Activer" : "Desactiver" }}</v-btn>
              <v-btn @click="modifyActivity(activite.id)">Modifier</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <CreerActivite @click="getActivities"/>
</template>

<style scoped>

h1{
  font-size: 30px;
  margin-top: 20px;
  text-align: center;
}
</style>