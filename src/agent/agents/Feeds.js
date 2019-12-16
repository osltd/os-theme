import axios from "axios/index";

const Feeds = {
    initFeeds: () => axios.get('/articles'),
    getFeaturedArticles: page => axios.get(`/articles?tags=featured${page ? '&page=' + page : ''}`),
    getTips: page => axios.get(`/articles?tags=tips${page ? '&page=' + page : ''}`)
};
export default Feeds