import React, { useState, useEffect } from 'react';
import Oneshop from 'oneshop.web';
import { useParams, Redirect, Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import './blog.detail.css';
import { MoonLoader } from 'react-spinners';
import parseHTML from 'html-react-parser';
import { connect } from 'react-redux';

// ------------------------ REDUX ------------------------
const mapStateToProps = state => ({
    i18n : state.i18n
});
// ------------------------ /REDUX ------------------------

function ArticleDetail(props){

    // oneshop instance
    const OS = new Oneshop();
    // get params
    const params = useParams();
    // articles
    let [article, setArticle] = useState({});
    // statuses
    let [status, setStatus] = useState({ loading : false });
    // setup redirect
    let [redirect, setRedirect] = useState(null);

    // get i18n settings
    let { __ } = props.i18n;


    // ----------------------- LIFECYCYLE -----------------------
    useEffect(() => {
        // not loading?
        if(!status.loading && !Object.keys(article).length){
            // start loading
            setLoading(true);
            // fetch article by id
            OS.article.get({ids: params.id})
            // got articles
            .then(rows => {
                // no article found
                if(!rows.length) setRedirect("/notfound");
                // save article
                setArticle(rows[0]);
                // finish loading
                setLoading(false);
            })
            // error
            .catch(error => {
                // finish loading
                setLoading(false);
                // not found
                setRedirect("/notfound");
            });
        }
    }, []);
    // ----------------------- /LIFECYCYLE -----------------------




    // ----------------------- HELPERS -----------------------
    function setLoading(loading){
        setStatus(oldStatus => {
            let newStatus = {...oldStatus};
            newStatus.loading = loading;
            return newStatus;
        });
    }
    // ----------------------- /HELPERS -----------------------


    // ----------------------- RENDERING -----------------------
    function renderSlider(s){
         // define properties
         const properties = {
            duration : 5000,
            transitionDuration : 300,
            infinite :  false,
            indicators : true,
            arrows : true
        };
        return <div className="slide-container">
            <Slide {...properties}>
                {(s.media || []).map((m, idx) => (
                    <div key={`slide-image-${idx}`} className="each-slide">
                        <div style={{ backgroundImage : `url(${m.url})`}}></div>
                    </div>
                ))}
            </Slide>
        </div>
        
    }

    function renderSections(a){
        return (a.sections || []).map((s,idx, sections) => (
            <div key={`article-section-${idx}`} className="section">
                {s.media.length > 0 ? renderSlider(s) : null}
                {idx == 0 && sections.length > 1 ? <h1>{s.title}</h1> : <h2>{s.title}</h2>}
                {idx == 0 ? <span>{new Date(a.time).toLocaleDateString()}</span> : null}
                <p>{parseHTML(s.description)}</p>
            </div>
        ));
    }
    // ----------------------- /RENDERING -----------------------



    return status.loading ? 
        <div style={{ width : "100%", height : "100vh", display : "flex", justifyContent : "center", alignItems : "center" }}>
            <MoonLoader 
                size={20}
                color={"#000000"}
                loading={true}
            /> 
        </div>
        :
        (
            // article not found? back to article list
            redirect ? <Redirect to={redirect} /> : 
            (
                <div className="article-detail">
                    <div className="article-detail-wrapper">
                        <div className="back-button-wrapper">
                            <Link to={"/blogs"}>
                                <i className="fas fa-chevron-left"></i>
                                {__("Back to blog")}
                            </Link>
                        </div>
                        <div className="content">
                            {renderSections(article)}
                        </div>
                    </div>
                </div>
            )
        )
}

export default connect(mapStateToProps)(ArticleDetail);