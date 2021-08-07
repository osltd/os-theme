import React, { useState, useEffect } from 'react';
import Oneshop from 'oneshop.web';
import { Link } from 'react-router-dom';
import './products.css';
import { connect } from 'react-redux';
import actions from '../../helpers/actions';
import { MoonLoader } from 'react-spinners';
import Select from 'react-select';
import { extractByLocaleCode } from '../../helpers/AttributesHelper'


// ------------------------ REDUX ------------------------
const mapStateToProps = state => ({
    products           : state.product.products,
    i18n               : state.i18n,
    shop               : state.shop.session,
    collections        : state.shop.collections || [],
    selectedCollection : state.shop.selectedCollection || null,
});

const mapDispatchToProps = dispatch => ({
    setProducts : (products) => dispatch({
        type    : actions.SET_PRODUCTS,
        payload : products
    }),
    setCollections : (collections) => dispatch({
        type    : actions.SET_COLLECTIONS,
        payload : collections
    }),
    setSelectedCollection : (collectionId) => dispatch({
        type    : actions.SET_SELECTED_COLLECTION,
        payload : collectionId
    }),
});
// ------------------------ /REDUX ------------------------


function Product(props){

    // oneshop instance
    const OS = new Oneshop();
    // get products
    let { products, shop, collections, selectedCollection } = props;
    // get translation method
    let  { __, locale } = props.i18n;
    // set end of page
    let [endOfList, setEndOfList] = useState(false);
    // statuses
    let [status, setStatus] = useState({
        loading : false
    });
    // special nav bar title?
    const customizeTitles = extractByLocaleCode({
        locale, shop
    });

    console.log('----> collections: ', collections, selectedCollection)

    // ----------------------- LIFECYCYLE -----------------------
    useEffect(() => {
        // active fetch products if no product is loaded
        if(!(products || []).length && !endOfList) fetchProducts();
        // no collections?
        if(!(collections || [].length)) fetchCollections();
    }, [products]);


    async function fetchCollections(){
        try {
            // get shop collections
            let collections = await fetch(`/api/collections`, { method : 'GET'});  
            console.log('----> set collection 1')
            // parse json
            collections = await collections.json();
            console.log('----> set collection 2')
            // save collections
            props.setCollections((collections.data || {}).rows || []);
        } catch (error) {
            // DO NOTHING
            // if failed to fetch collection
        }
    }


    function fetchProducts(){
        if(!endOfList){
            // start loading
            toggleLoading();
            // params
            let params = {
                page   : Math.ceil(products.length/15) + 1,
                locale
            };
            // filter by collection?
            if(!isNaN((selectedCollection || {}).value)) params.collections = selectedCollection.value;
            // fetch products
            OS.merchandise.get(params)
            // got products
            .then((rows) => {
                // end of list?
                if(!rows.length) {
                    // prevent further loading
                    setEndOfList(true);
                } else {
                    // set products
                    props.setProducts(products.concat(rows));
                }
                // has result
                toggleLoading();
            })
            // error
            .catch(error => console.error(error));
        }
    }
    // ----------------------- /LIFECYCYLE -----------------------



    // ----------------------- HELPERS -----------------------
    function extractThumbnail(p){
        let thumbnail_url = "https://via.placeholder.com/150";
        let variantsHasThumbnails = p.variants.filter(v => v.media.length > 0);
        if(variantsHasThumbnails.length > 0) thumbnail_url = variantsHasThumbnails[0].media[0].url;
        return thumbnail_url;
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
        <div className="products">
            <div className="header-wrapper">
                {
                    (collections || []).length ? 
                    <div className="header-wrapper">
                        <h1>{customizeTitles.nav_shop || __("Products")} - </h1>
                        <div className="collection-select">
                            <Select placeholder={__("All")}
                                    value={selectedCollection || null}
                                    onChange={option => {
                                        // start over
                                        setEndOfList(false);
                                        // clear product
                                        props.setProducts([]);
                                        // save selected collection
                                        props.setSelectedCollection(option);
                                    }}
                                    options={[{ id : null, name : "All"}].concat((collections || [])).map(c => ({ value : c.id, label : __(c.name.toLowerCase())}))}
                            />
                        </div>
                    </div> : 
                    <h1>{customizeTitles.nav_shop || __("Products")}</h1>
                }
            </div>
            <div className="list">
                {(products || []).map((p, idx) => (
                    <div key={`product-${idx}`} className="item">
                        <Link to={`/products/${p.id}`}>
                            <div className="item-wrapper">
                                <div className="thumbnail">
                                    <img src={extractThumbnail(p)} />
                                </div>
                                <div className="info">
                                    <div className="name">{p.name}</div>
                                    <div className="price">{function(){
                                        // get all prices
                                        let prices = p.variants.map(v => (v.price || 0))
                                            // get value larger then 0 only
                                            .filter(p => p > 0)
                                            // filter duplicate
                                            .filter((v, i, a) => a.indexOf(v) === i)
                                        // only one value
                                        if(prices.length === 0) {
                                            return `HKD ${p.price || 0}`
                                        } else if(prices.length < 2) {
                                            return `HKD ${prices[0] || 0}`
                                        } else {
                                            return `HKD ${Math.min(...prices)} - HKD ${Math.max(...prices)}`
                                        }
                                    }()}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div style={{ width:"100%", display:"flex", justifyContent: "center", alignItems :"center", padding : "30px 0px" }}>
                {
                    status.loading === false ? 
                    <button className="load-more-btn" onClick={fetchProducts}>
                        {__("Load more")}
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);