import axios from "axios/index";

const Collections = {
    initCollections: filters => axios.get(`/collections${filters}`),
    getItems: (id, filters) => axios.get(`/collections/${id}/items${filters}`),
};
export default Collections