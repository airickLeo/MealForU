import search from "./search.js";
import api from "./api.js";
import home from "./home.js"

const mountRoutes = (app) => {
    app.use('/', home)
    app.use('/search', search)
    app.use('/api', api)
}

export default mountRoutes;