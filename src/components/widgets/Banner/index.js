import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../../../helpers/actions';
import './widget.banner.css';
import Oneshop from 'oneshop.web';
import { MoonLoader } from 'react-spinners';
import { Slide } from 'react-slideshow-image';


// ------------------------ REDUX ------------------------
const mapStateToProps = (state, ownProps) => ({
    homeContext : state.home,
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


function Banner(props){

    // get cached
    const { setHomeContext, homeContext, id } = props;
    // set status
    let [isLoading, setIsLoading] = useState(false);
    // get oneshop instance
    const OS = new Oneshop();

    // ---------------- LIFECYCLE ----------------
    useEffect(() => {
        // not fetch yet?
        if(!homeContext[id]) fetchArticles();
    }, []);

    function fetchArticles(){
        // set filters container
        let filters = {};
        // filters
        if((props.ordering || "").length > 0) filters.ordering = props.ordering;
        if((props.tags || "").length > 0) filters.tags = props.tags;
        if((props.keywords || "").length > 0) filters.keywords = props.keywords;
        if((props.ids || "").length > 0) filters.ids = props.ids;
        if((props.collections || "").length > 0) filters.collections = props.collections;
        // start loading
        setIsLoading(false);
        // get articles
        OS.article.get({...filters})
        // got articles
        .then(rows => {
            // finished loading
            setIsLoading(false);
            // save context
            if(rows.length) setHomeContext(id, rows);
        })
        // error
        .catch(error => {
            // finished loading
            setIsLoading(false);
            // show error
            alert("Failed to get featured article");
        });
    }
    // ---------------- /LIFECYCLE ----------------
    

    // ---------------- RENDERING ----------------
    function renderSlider(){
        // define properties
        const properties = {
           duration : props.duration != undefined ? props.duration : 5000,
           transitionDuration : props.transitionDuration != undefined ? props.transitionDuration : 300,
           infinite : props.infinite != undefined ? props.infinite : false,
           indicators : props.indicators != undefined ? props.indicators : true,
           arrows : props.arrows != undefined ? props.arrows : true
       };
       return <Slide {...properties}>
            {(homeContext[id] || []).map((a, idx) => (
                <Link key={`slide-image-${idx}`} to={`/blogs/${a.id}`}>
                    <div className="each-slide">
                        <div style={{ backgroundImage : `url(${articleInfoExtractor(a).thumbnail})`}}>
                            <h1>{articleInfoExtractor(a).title}</h1>
                        </div>
                    </div>
                </Link>
            ))}
        </Slide>;
    }

    function articleInfoExtractor(article){
        // set thumbnail
        return {
            title     : article.sections[0].title,
            thumbnail : ((((article.sections || []).filter(s => s.media.length > 0) || [])[0] || {}).media || [])[0].url || ""
        }
    }
    // ---------------- /RENDERING ----------------

    // banner data loaded?
    return homeContext[id] && !isLoading ? <div className="widget-banner" style={{...props.styles}}>
        {renderSlider()}
    </div> : 
    isLoading ?
    <div style={{ width : "100%", height : 500, display:"flex", alignItems : "center", justifyContent : "center" }}>
        <MoonLoader 
            size={20}
            color={"#000000"}
            loading={true}
        />
    </div> : null;

}

export default connect(mapStateToProps, mapDispatchToProps)(Banner);