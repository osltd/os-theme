import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../../../helpers/actions';
import './widget.article.tile.css';
import Oneshop from 'oneshop.web';
import { MoonLoader } from 'react-spinners';
import Carousel from 'react-grid-carousel';
import { captureWithLocale } from '../../../helpers/AttributesHelper';
 
// ------------------------ REDUX ------------------------
const mapStateToProps = (state, ownProps) => ({
    homeContext : state.home,
    i18n        : state.i18n,
    settings    : state.shop.settings,
    ...ownProps
});

const mapDispatchToProps = (dispatch) => ({
    setHomeContext : (key, payload) => dispatch({
        type    : actions.SET_HOME_CONTEXT,
        payload : payload,
        key
    }),
});
// ------------------------ /REDUX ------------------------


function Article(props){

    // get cache
    const { setHomeContext, homeContext, id, settings : { layout_override }, index } = props;
    // get translation method
    const { __, locale } = props.i18n;
    // set status
    let [isLoading, setIsLoading] = useState(false);
    // get oneshop instance
    const OS = new Oneshop();
    // get settings from attributes
    const attribute_settings = layout_override[index] || {}
    // special nav bar title?
    const customizeTitle = captureWithLocale({
        locale,
        value : attribute_settings.title
    })

    // ---------------- LIFECYCLE ----------------
    useEffect(() => {
        // not fetch yet?
        if(!homeContext[id]) fetchArticles();
    }, []);

    function fetchArticles(){
        // get settings from config.js
        const { ordering, tags, keywords, ids, collections } = props;
        // set filters container
        let filters = {};
        // filters
        if((ordering || "").length > 0) filters.ordering = ordering;
        if((tags || "").length > 0) filters.tags = tags;
        if((keywords || "").length > 0) filters.keywords = keywords;
        if((ids || "").length > 0) filters.ids = ids;
        if((collections || "").length > 0) filters.collections = collections;
        // start loading
        setIsLoading(true);
        // get 
        OS.article.get({
            ...filters,
            locale
        })
        // got articles
        .then(rows => {
            // finished loadling
            setIsLoading(false);
            // save context
            if(rows.length > 0) setHomeContext(id, rows);
        })
        // error
        .catch(error => {
            // finished loadling
            setIsLoading(false);
            // show alert
            alert("Failed to get articles");
        });
    }
    // ---------------- /LIFECYCLE ----------------
    
    // ---------------- RENDERING ----------------
    function renderSlider(){
       return <Carousel cols={props.cols || 2} rows={props.rows || 2} gap={15} loop>
            {(homeContext[id] || []).map((a, idx) => (
                <Carousel.Item  key={`slide-image-${idx}`}>
                    <Link to={`/blogs/${a.id}`}>
                        <div className="article-grid">
                            <div className="thumb">
                                <img src={articleInfoExtractor(a).thumbnail} />
                            </div>
                            <div className="title">{articleInfoExtractor(a).title}</div>
                            <div className="desc">{articleInfoExtractor(a).description.replace(/<[^>]*>?/gm, '').substr(0, 70) + "..."}</div>
                        </div>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>;
   }

   function articleInfoExtractor(article){
        // set thumbnail
        return {
            title       : ((article.sections || [])[0] || {}).title || "",
            description : ((article.sections || [])[0] || {}).description || "",
            thumbnail   : (((((article.sections || []).filter(s => s.media.length > 0) || [])[0] || {}).media || [])[0] || {}).url || ""
        }
    }
   // ---------------- /RENDERING ----------------

    // article data loaded?
    return homeContext[id] && !isLoading ? <div className="widget-article" style={{...props.styles}}>
        <h1>{customizeTitle || __(props.title)}</h1>
        {renderSlider()}
    </div> : 
    isLoading ? 
    <div style={{ width:"100%", height:500, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <MoonLoader 
            size={20}
            color={"#000000"}
            loading={true}
        />
    </div> : null;

}

export default connect(mapStateToProps, mapDispatchToProps)(Article);