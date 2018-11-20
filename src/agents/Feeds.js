import axios from "axios/index";

const Feeds = {
    initFeeds: feedsId => axios.get('/articles').then(res => res.data.data.articles).catch(err => console.log(err)),


}
export default Feeds