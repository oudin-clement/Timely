<script>
import {useAuthentificationStore} from "@/stores/authentification.js";
import {mapState} from "pinia";
import Header from "@/components/Header.vue";

export default {
  computed: {
    ...mapState(useAuthentificationStore, ["key"])
  },
  components: {
    Header
  },
}

</script>

<template>
  <Header v-if="key"/>
  <RouterView />
</template>
