<script>
export default {
  data: () => ({
    nom: '',
    color: '#FF0000',
    rules: [
      value => {
        if (value) return true

        return 'Le nom de l\'activite est requis'
      },
    ],
  }),
  methods:{
    createActivity() {
      if(this.nom !== ''){
        this.reset()
      }
    },
    reset() {
      this.$refs.form.reset()
    },
  }
}
</script>

<template>
  <div>
    <h2>Creer Activité</h2>

    <v-form @submit.prevent ref="form">
      <v-text-field
          v-model="nom"
          :rules="rules"
          label="Nom de l'activite"
      ></v-text-field>
      <v-color-picker color="grey" v-model="color"></v-color-picker>
      <v-container class="mt-3 pa-0">
      <v-btn type="submit" variant="outlined" color="blue" @click="createActivity">Creer</v-btn>
      </v-container>
    </v-form>

  </div>
</template>

<style scoped>

</style>