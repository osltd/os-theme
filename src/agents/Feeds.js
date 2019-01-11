import axios from "axios/index";

const Feeds = {
    initFeeds: feedsId => axios.get('/articles').then(res => res.data.data.posts).catch(err => console.log(err)),


}
export default Feeds