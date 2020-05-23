import React, { useEffect } from 'react';
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
        // get 
        OS.merchandise.get({...filters})
        // got products
        .then(rows => setHomeContext(id, rows))
        // db error
        .catch(error => {
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
    return homeContext[id] ? <div className="widget-product" style={{...props.styles}}>
        <h1>{props.title}</h1>
        {renderSlider()}
    </div> : 
    <div style={{ width:"100%", height:500, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <MoonLoader 
            size={20}
            color={"#000000"}
            loading={true}
        />
    </div>;

}

export default connect(mapStateToProps, mapDispatchToProps)(Product);