import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../../../helpers/actions';
import './widget.bestseller.css';
import Oneshop from 'oneshop.web';
import { MoonLoader } from 'react-spinners';
import Carousel from 'react-grid-carousel'
import { captureWithLocale } from '../../../helpers/AttributesHelper';

// ------------------------ REDUX ------------------------
const mapStateToProps = (state, ownProps) => ({
    homeContext : state.home,
    shop        : state.shop.session,
    settings    : state.shop.settings,
    i18n        : state.i18n,
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


function Product(props){

    // get cached
    const { setHomeContext, homeContext, id, shop, settings : { layout_override }, index } = props;
    // get translation method
    const { __, locale } = props.i18n;
    // set loading status
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
        if(!homeContext[id]) fetchProducts();
    }, []);

    function fetchProducts(){
        // fetch bestseller
        fetch(`/api/collections?tags=${props.tags}`)
        // got collections
        .then(res => res.json())
        // parse json
        .then(res => {
            // has collections?
            if(res.data.rows.length > 0) {
                // get merchandise
                OS.merchandise.get({ 
                    collections : res.data.rows.map(r => r.id).join(","),
                    locale
                })
                // got products
                .then(rows => {
                    // finished loading
                    setIsLoading(false);
                    // save context
                    if(rows.length > 0) setHomeContext(id, rows);
                })
                // error
                .catch(error => {
                    // finished loading
                    setIsLoading(false);
                    // show alert
                    alert("Failed to get collection products");
                });
            }
        });
    }
    // ---------------- /LIFECYCLE ----------------
    
    // ---------------- RENDERING ----------------
    function renderSlider(){
        return <Carousel cols={props.cols || 5} rows={props.rows || 1} gap={15} loop>
            {(homeContext[id] || []).map((p, idx) => (
                <Carousel.Item key={`slide-image-${idx}`} >
                    <Link to={`/products/${p.id}`}>
                        <div className="product-grid">
                            <img src={productInfoExtractor(p).thumbnail} />
                            <div className="title">{productInfoExtractor(p).title}</div>
                            <div className="price">
                                {function(){
                                        // get currency
                                        const currency = shop.currency.toUpperCase();
                                        // get all prices
                                        let prices = p.variants.map(v => (v.price || 0))
                                            // get value larger then 0 only
                                            .filter(p => p > 0)
                                            // filter duplicate
                                            .filter((v, i, a) => a.indexOf(v) === i)
                                        // only one value
                                        if(prices.length === 0) {
                                            return `${currency} ${p.price || 0}`
                                        } else if(prices.length < 2) {
                                            return `${currency} ${prices[0] || 0}`
                                        } else {
                                            return `${currency} ${Math.min(...prices)} - HKD ${Math.max(...prices)}`
                                        }
                                }()}
                            </div>
                        </div>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>;
   }

   function productInfoExtractor(product){
        // set thumbnail
        return {
            title     : product.name,
            thumbnail : ((((product.variants || []).filter(v => v.media.length > 0) || [])[0] || {}).media || [])[0].url || "",
            price     : product.price
        }
   }
   // ---------------- /RENDERING ----------------

    // product data loaded?
    return homeContext[id] && !isLoading ? <div className="widget-bestseller" style={{...props.styles}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);