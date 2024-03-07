<script>
import {mapState} from "pinia";
import {useAuthentificationStore} from "@/stores/authentification.js";
import axios from "axios";
import CreerProjet from "@/components/CreerProjet.vue";


export default {
  components: {CreerProjet},
  data: () => ({
    tab: null,
  }),

  computed: {
    ...mapState(useAuthentificationStore, ["key"])
  },
  mounted() {
    this.getProjects()
  },
  methods: {
    getProjects() {
      axios.get("https://timely.edu.netlor.fr/api/projects", {
        headers: {
          'Content-Type': "application",
          "Authorization": `key=${this.key}`
        }
      }).then(res => {
        this.tab = res.data
      })
    },
    modifyProject(id) {
      this.$router.push({name: "modifierProjet", params: {id: id}})
    },
    enableDisableProject(id,enable) {
      if(enable === 0){
        axios.patch("https://timely.edu.netlor.fr/api/projects/"+id+"/enable",  {},{
          headers: {
            'Content-Type': "application/json",
            "Authorization": `key=${this.key}`
          }
        }).then(() => {
          this.getProjects()
        })
      }else{
        axios.patch("https://timely.edu.netlor.fr/api/projects/"+id+"/disable",{},  {
          headers: {
            'Content-Type': "application/json",
            "Authorization": `key=${this.key}`
          }
        }).then(() => {
          this.getProjects()
        })
      }

    },
  }
}
</script>

<template>
  <div>
    <h1>Projects</h1>
    <v-container>
      <v-row>
        <v-col v-for="item in tab" :key="item.id" cols="12" md="4">
          <v-card>
            <v-card-title>{{item.name}}</v-card-title>
            <v-card-text>{{item.description}}</v-card-text>
            <v-card-text>
              <v-btn @click="modifyProject(item.id)">Modifier</v-btn>
              <v-btn @click="enableDisableProject(item.id,item.is_enabled)">{{item.is_enabled === 0 ? "Activer" : "Desactiver"}}</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <CreerProjet @click="getProjects"/>
  </div>
</template>

<style scoped>
h1{
  font-size: 30px;
  margin-top: 20px;
  text-align: center;
}
</style>