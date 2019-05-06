import axios from "axios/index";

const Feeds = {
    initFeeds: feedsId => axios.get('/articles'),
};
export default Feeds