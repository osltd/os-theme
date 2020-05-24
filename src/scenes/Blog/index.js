import React, { useState, useEffect } from 'react';
import Oneshop from 'oneshop.web';
import { Link } from 'react-router-dom';
import './blog.css';
import { connect } from 'react-redux';
import actions from '../../helpers/actions';
import { MoonLoader } from 'react-spinners';
// import parseHTML from 'html-react-parser';

// ------------------------ REDUX ------------------------
const mapStateToProps = state => ({
    articles : state.article.articles
});

const mapDispatchToProps = dispatch => ({
    setArticles : (articles) => dispatch({
        type    : actions.SET_ARTICLES,
        payload : articles
    })
});
// ------------------------ /REDUX ------------------------



function Blog(props){

    // oneshop instance
    const OS = new Oneshop();
    // get articles
    let { articles } = props;
    // statuses
    var [status, setStatus] = useState({
        loading : false
    });


    // ----------------------- LIFECYCYLE -----------------------
    useEffect(() => {
        // active fetch articles if no product is loaded
        if(!(articles || []).length) fetchArticles();
    }, []);


    function fetchArticles(){
        // start loading
        toggleLoading();
        // fetch articles
        OS.article.get({
            page : Math.ceil(articles.length/15) + 1
        })
        // got articles
        .then((rows) => {
            // set articles
            props.setArticles(articles.concat(rows));
            // has result
            toggleLoading();
        })
        // error
        .catch(error => console.error(error));
    }
    // ----------------------- /LIFECYCYLE -----------------------



    // ----------------------- HELPERS -----------------------
    function thumbnailExtractor(a){
        // default value
        let thumbnail_url = "https://via.placeholder.com/150";
        // has media?
        let sectionHasMedia = a.sections.filter(v => v.media.length > 0);
        // get first image as the thumbnail
        if(sectionHasMedia.length > 0) thumbnail_url = sectionHasMedia[0].media[0].url;
        // return's thumnail url
        return thumbnail_url;
    }

    function captionExtractor(a){
        // setup title container
        let section = {};
        // search title
        (a.sections || []).forEach(s => {
            // title not found yet and section title exists?
            if(!Object.keys(section).length && s.title.length > 0) 
                // save the valid section
                section = s;
        });
        // return result title
        return section;
    }

    function toggleLoading(){
        setStatus(oldStatus => {
            var newStatus = {...oldStatus};
            // finish loading
            newStatus.loading = !newStatus.loading;
            // return new status set
            return newStatus;
        });
    }
    // ----------------------- /HELPERS -----------------------


    return (
        <div className="blogs">
            <h1>Blog - All</h1>
            <div className="list">
            {articles.map((a, idx) => (
                <div key={`blog-${a.id}`} className="blog">
                    <Link to={`/blogs/${a.id}`}>
                        <div className="blog-wrapper">
                            <div className="thumbnail">
                                <img src={thumbnailExtractor(a)} />
                            </div>
                            <div className="info">
                                <div className="title">{captionExtractor(a).title}</div>
                                <div className="description">{`${(captionExtractor(a).description || "").replace(/<[^>]*>?/gm, '').substr(0, 100)}...`}</div>
                                <div className="time">{new Date(a.time).toLocaleDateString()}</div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
            </div>
            <div style={{ width:"100%", display:"flex", justifyContent: "center", alignItems :"center", padding : "30px 0px" }}>
                {
                    status.loading === false ? 
                    <button className="load-more-btn" onClick={fetchArticles}>
                        Load more
                    </button> :
                    <MoonLoader 
                        size={20}
                        color={"#000000"}
                        loading={true}
                    /> 
                }
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);