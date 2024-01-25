import {defineStore} from 'pinia'

export const useAuthentificationStore = defineStore('authentification', {
    state() {
        return {
            key: "",
            id: "",
            name: "",
            email: ""
        }
    },
    getters: {
        getKey(state) {
            return state.key
        },
        getId(state){
            return state.id
        }
    },
    actions: {
        fetchProfile({key, id, name, email}) {
            this.key = key
            this.id = id
            this.name = name
            this.email = email

        }
    },
    persist: {
        enabled: true,
        strategies: [
            {storage: localStorage}
        ]
    }

})
