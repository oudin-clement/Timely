import {defineStore} from 'pinia'

export const useActiviteStore = defineStore('activite', {
    state() {
        return {
            idActivite: "",
            nomActivite: "",
            idProjet: "",
            nomProjet: "",
            debut: "",
        }
    },
    actions: {
        lancerActivite({idActivite, nomActivite, idProjet, nomProjet, debut}) {
            this.idActivite = idActivite
            this.nomActivite = nomActivite
            this.idProjet = idProjet
            this.nomProjet = nomProjet
            this.debut = debut

        }
    },
    persist: {
        enabled: true,
        strategies: [
            {storage: localStorage}
        ]
    }

})
