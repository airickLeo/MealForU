import search from "./search.js";
import api from "./api.js";

const mountRoutes = (app) => {
    app.use('/search', search)
}

export default mountRoutes;