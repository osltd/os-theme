import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../../../helpers/actions';
import './widget.product.css';
import Oneshop from 'oneshop.web';
import { MoonLoader } from 'react-spinners';
import Carousel from 'react-grid-carousel'


// ------------------------ REDUX ------------------------
const mapStateToProps = (state, ownProps) => ({
    homeContext : state.home,
    shop        : state.shop.session,
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
    const { setHomeContext, homeContext, id, shop } = props;
    // get translation method
    const { __ } = props.i18n;
    // set loading status
    let [isLoading, setIsLoading] = useState(false);
    // get oneshop instance
    const OS = new Oneshop();

    // ---------------- LIFECYCLE ----------------
    useEffect(() => {
        // not fetch yet?
        if(!homeContext[id]) fetchProducts();
    }, []);

    function fetchProducts(){
        // set filters container
        let filters = {};
        // filters
        if((props.ordering || "").length > 0) filters.ordering = props.ordering;
        if((props.tags || "").length > 0) filters.tags = props.tags;
        if((props.keywords || "").length > 0) filters.keywords = props.keywords;
        if((props.ids || "").length > 0) filters.ids = props.ids;
        if((props.collections || "").length > 0) filters.collections = props.collections;
        // start loading
        setIsLoading(true);
        // get 
        OS.merchandise.get({...filters})
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
            alert("Failed to get products");
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
                            <div className="price">{shop.currency.toUpperCase()} {productInfoExtractor(p).price.toFixed(2)}</div>
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
    return homeContext[id] && !isLoading ? <div className="widget-product" style={{...props.styles}}>
        <h1>{__(props.title)}</h1>
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