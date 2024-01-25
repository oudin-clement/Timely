import axios from "axios";

export default {
    install: (app, options) => {
        app.config.globalProperties.$api = axios.create({
            baseURL: options.baseURL,
            headers: {
                'Content-Type': "application/json",
                'Authorization': `key=${options.apiKey}`
            }
        })
    }
}