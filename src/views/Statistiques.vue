<script>
import axios from "axios";
import {mapState} from "pinia";
import {useAuthentificationStore} from "@/stores/authentification.js";
import Chart from 'chart.js/auto';

export default {
  data: () => ({
    tab: null,
    default_date: new Date(),
    datedebut: new Date(),
    datefin: new Date(),
    tempstotp: 0,
    tempstota: 0,
  }),
  computed: {
    ...mapState(useAuthentificationStore, ["key"])
  },
  mounted() {
    this.getStats();

  },
  methods: {
    getStats() {
      axios.get("https://timely.edu.netlor.fr/api/time-entries", {
        headers: {
          'Content-Type': "application",
          "Authorization": `key=${this.key}`
        }
      }).then(res => {
        this.tab = res.data
        this.displayStats();
      })
    },
    getProjects(id, date,temps) {
      axios.get("https://timely.edu.netlor.fr/api/projects/" + id, {
        headers: {
          'Content-Type': "application",
          "Authorization": `key=${this.key}`
        }
      }).then(res => {
        console.log(res.data)
        if(res.data.is_enabled){
        this.projects.push(res.data.name + " " + date)
        this.tempstotp += temps
        }
      })
    },
    getActivities(id,temps) {
      axios.get("https://timely.edu.netlor.fr/api/activities/" + id, {
        headers: {
          'Content-Type': "application",
          "Authorization": `key=${this.key}`
        }
      }).then(res => {
        if (res.data.is_enabled){
        this.activities.push(res.data.name)
        this.colors.push(res.data.color)
        this.tempstota += temps
        }
      })
    },

    displayStats() {
      this.colors = []
      this.activities = []
      this.projects = []
      this.temps = []
      this.tempstotp = 0
      this.tempstota = 0
      this.tab.forEach((entry) => {
        if (new Date(entry.start) <= this.datefin && new Date(entry.start) >= this.datedebut) {
          this.getProjects(entry.project_id, new Date(entry.start).toLocaleDateString(),new Date(entry.end) - new Date(entry.start))
          this.getActivities(entry.activity_id,new Date(entry.end) - new Date(entry.start))
          const temps = (new Date(entry.end) - new Date(entry.start)) / 1000
          this.temps.push(temps)
        }
      })
      setTimeout(() => {

        if (this.chart)
          this.chart.destroy();
        this.chart = new Chart(this.$refs.chartp.getContext('2d'), {
          type: 'bar',
          data: {
            labels: this.projects,
            datasets: [{
              label: 'Temps',
              data: this.temps,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });


        if (this.chart2)
          this.chart2.destroy();
        this.chart2 = new Chart(this.$refs.charta.getContext('2d'), {
          type: 'bar',
          data: {
            labels: this.activities,
            datasets: [{
              label: 'Temps',
              data: this.temps,
              backgroundColor: this.colors,
              borderColor:
                this.colors,
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }, 200)
    },
    formatTemps(temps) {
      const secondes = Math.floor(temps / 1000);
      const heures = Math.floor(secondes / 3600);
      const minutes = Math.floor((secondes % 3600) / 60);
      const secondesRestantes = secondes % 60;
      return `${heures}h ${minutes}m ${secondesRestantes}s`;
    }
  },

}
</script>
<template>
  <div>
    <h1>Statistiques</h1>
    <div class="date">
      <v-date-picker show-adjacent-months :max="default_date" v-model="datedebut" color="primary"
                     title="date debut" @click="displayStats"></v-date-picker>
      <v-date-picker show-adjacent-months :max="default_date" v-model="datefin" color="primary"
                     title="date fin" @click="displayStats"></v-date-picker>
    </div>
    <h1>Temps Projets {{formatTemps(tempstotp)}}</h1>
    <canvas ref="chartp"></canvas>
    <h1>Temps Activités {{formatTemps(tempstota)}}</h1>
    <canvas ref="charta"></canvas>
  </div>

</template>

<style scoped>

.date {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

h1 {
  font-size: 30px;
  margin-top: 20px;
  text-align: center;
}

h2{
  font-size: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}
</style>