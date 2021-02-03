import React, { useState, useEffect } from 'react';
import Oneshop from 'oneshop.web';
import { useParams, Redirect, Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import './product.detail.css';
import { MoonLoader } from 'react-spinners';
import { connect } from 'react-redux';
import actions from '../../../helpers/actions';
import HTMLParser from 'react-html-parser';

// ------------------------ REDUX ------------------------
const mapStateToProps = state => ({
    cart : state.cart,
    shop : state.shop.session,
    i18n : state.i18n
});

const mapDispatchToProps = dispatch => ({
    setCartItems : (items) => dispatch({
        type    : actions.SET_CART_ITEMS,
        payload : items
    })
});
// ------------------------ /REDUX ------------------------


function ProductDetail(props){

    // oneshop instance
    const OS = new Oneshop();
    // get params
    const params = useParams();
    // products
    let [product, setProduct] = useState({});
    // setup variants 
    let [variants, setVariants] = useState({});
    // statuses
    let [status, setStatus] = useState({ loading : false, addingToCart : false });
    // setup qty
    let [qty, setQty] = useState(1);
    // setup redirect
    let [redirect, setRedirect] = useState(null);
    // setup selected variant
    let [selectedVariant, setSelectedVariant] = useState({});

    // get cart
    let { cart, shop } = props;
    // get translation method
    let  { __ } = props.i18n;


    // ----------------------- LIFECYCYLE -----------------------
    useEffect(() => {
        // not loading?
        if(!status.loading && !Object.keys(product).length){
            // start loading
            setLoading(true);
            // fetch product by id
            OS.merchandise.get({ids: params.id})
            // got products
            .then(rows => {
                // no product found
                if(!rows.length) setRedirect("/notfound");
                // set product
                setProduct((() => {
                    // manipulate product
                    let p = {...rows[0]};
                    // variants
                    p.variants = p.variants.map(v => {
                        // transform description
                        v.description = v.description.split(",").map(o => ({ [o.split(":")[0]] : o.split(":")[1] })).reduce((optionSet, option) => Object.assign(optionSet, option), {});
                        return v;
                    });
                    return p;
                })());
                // set variants
                setVariants(function(){
                    // extract options
                    let options = {};
                    (rows[0].variants || []).forEach(v => {
                        Object.keys(v.description).forEach(o=> {
                            // option name
                            let optionName = o;
                            // option value
                            let optionValue = v.description[o];
                            // if its undefined, set it as an empty Object
                            options[optionName] = options[optionName] || {};
                            // set value 
                            options[optionName][optionValue] = options[optionName][optionValue] || Object.keys(options[optionName]).length == 0;
                        });
                    });
                    return options;
                }());
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
        // pre-select variant
        if(Object.keys(variants).length > 0 && !Object.keys(selectedVariant).length){
            Object.keys(variants).forEach(v => {
                Object.keys(variants[v]).forEach(o => {
                    if(variants[v][o] === true) {
                        selectOption(v, o);
                    }
                });
            });
        }
    }, [variants]);
    // ----------------------- /LIFECYCYLE -----------------------




    // ----------------------- HELPERS -----------------------
    function setLoading(loading, cart = false){
        setStatus(oldStatus => {
            let newStatus = {...oldStatus};
            // settings carts
            if(cart){
                newStatus.addingToCart = loading;
            } else {
                newStatus.loading = loading;
            }
            return newStatus;
        });
    }

    function selectOption(selectedOption, selectedValue){
        // alter variant states
        setVariants(oldVariants => {
            let newVariants = {...oldVariants};
            Object.keys(newVariants[selectedOption]).forEach(valueName => (newVariants[selectedOption][valueName] = valueName == selectedValue));
            return newVariants;
        });
        // set selected variants
        setSelectedVariant(oldSelectedVariant => {
            // clone options
            let newSelectedVariant = {...oldSelectedVariant};
            // save selected value
            newSelectedVariant[selectedOption] = selectedValue;
            // update
            return newSelectedVariant;
        });
    }

    function getSelectedVariant(){
        // set variant container
        let targetVariant = null;
        // search for variant
        ((product || {}).variants || []).forEach(v => {
            // get description {}
            let desc = v.description;
            // at least identical in key length
            if(Object.keys(selectedVariant).length === Object.keys(desc).length){
                // set flag
                let identical = true;
                // compare with all keys
                Object.keys(desc).forEach(key => {
                    // values from desc
                    let descVal = desc[key];
                    // compare, set to false with no mercy
                    if(descVal != selectedVariant[key]) identical = false;
                });
                if(identical) targetVariant = v;
            }
        });
        return targetVariant;
    }

    async function addToCart(){
        // start loading
        setLoading(true, true);
        // get selected variant Obj
        let variant_id = (getSelectedVariant() || {}).id || null;
        // get id?
        if(variant_id){
            // preset qty
            let _qty = qty || 0;
            // existed in cart?
            cart.items.forEach(item => {
                // append qty if already exists
                if(item.id == variant_id) _qty += item.qty;
            });
            // add to cart
            try {
                // success?
                await OS.cart.item.put(
                    cart.id, 
                    {
                        id  : variant_id, 
                        qty : _qty
                    }
                );
                // get cart items
                let items = await OS.cart.item.get(cart.id);
                // set cart items
                props.setCartItems(items);
                // finish loading
                setLoading(false, true);
            } catch(error) {
                // show alert msg
                alert("Failed to add item to cart");
                // finish loading
                setLoading(false, true);
            }
        }
    }

    // toggle qty
    const qtyButtonOnClick = (increament = true) => {
        // preset qty
        let _qty = increament == true ? (parseInt(qty)+1) : (parseInt(qty)-1);
        if(_qty < 1) _qty = 1;
        // get selected variant
        let v = getSelectedVariant() || { stock : 1 };
        if(_qty >= v.stock) _qty = v.stock;
        // set quantity
        setQty(_qty);
    };
    // ----------------------- /HELPERS -----------------------




    // ----------------------- RENDERING -----------------------
    function renderSlides(){
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
                {(() => {
                    // urls container
                    let urls = [];
                    // append variant media to urls container
                    (product.variants || []).forEach(v => v.media.forEach(m => urls.push(m.url)));
                    // return slides
                    return urls.filter((url, index) => urls.indexOf(url) === index).map((url, idx) => (
                        <div key={`slide-image-${idx}`} className="each-slide">
                            <div style={{ backgroundImage : `url(${url})`}}>
                            </div>
                        </div>
                    ));
                })()}
            </Slide>
        </div>
    }

    function renderVariants(){
        // only have one variant and one option, no need to choose
        if(Object.keys(variants).length == 1 && Object.values(variants).length == 1){
            return null;
        } else {
            return Object.keys(variants).map(o => <div key={`variant-list-${o}`} className="list">
                <h4>{o.toUpperCase()}</h4>
                <div className="items">
                    {Object.keys(variants[o]).map(v => {
                        return <div onClick={() => {selectOption(o, v)}} key={`variant-${o}-${v}`} className={`item ${variants[o][v] === true ? "selected" : ""}`}>{v}</div>
                    })}
                </div>
            </div>);   
        }
    }

    function renderQtySelector() {
        // should buttons disabled?
        let shouldDisabled = (getSelectedVariant() || {}).stock <= 0;
        // get select variant
        let v = getSelectedVariant() || { stock : 1 };
        return (
            <div className="qty">
                <button 
                    onClick={() => qtyButtonOnClick(false)}
                    disabled={shouldDisabled || qty == 1}
                >
                    <i className="fas fa-minus"></i>
                </button>
                <input value={qty}
                        min={1}
                        max={v.stock}
                        onChange={e => setQty(/^[0-9]+$/.test(e.target.value) ? parseInt(e.target.value) : parseInt(qty))} 
                        type="number" 
                        disabled={shouldDisabled}
                />
                <button 
                    onClick={() => qtyButtonOnClick(true)}
                    disabled={shouldDisabled || qty >= v.stock}>
                        <i className="fas fa-plus"></i>
                </button>
            </div>
        )
    }
    // ----------------------- /RENDERING -----------------------

    // get selected variant's object
    let selectedVariantObj = getSelectedVariant() || {};

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
            // product not found? back to product list
            redirect ? <Redirect to={redirect} /> : 
            (
                <div className="product-detail">
                    <div className="cols">
                        <div className="back-button-wrapper">
                            <Link to={"/products"}>
                                <i className="fas fa-chevron-left"></i>
                                {__("Back to products")}
                            </Link>
                        </div>
                        <div className="upper-row">
                            {renderSlides()}
                        </div>
                        <div className="lower-row">
                            <div className="description">
                                <h1>{product.name}</h1>
                                <div className="price">
                                    {shop.currency.toUpperCase()} {(selectedVariantObj.price || 0).toFixed(2)}
                                    {selectedVariantObj.stock == 0 ? <span className="out-of-stock">Out of stock</span> : null}
                                </div>
                                <p>{HTMLParser(product.description || "")}</p>
                                <div className="tags">
                                    {(product.tags || []).map(t => <div key={`product-tag-${t}`} className="tag">#{t}</div>)}
                                </div>
                            </div>
                            <div className="gap" style={{width:"50px"}}></div>
                            <div className="variants">
                                {renderVariants()}
                                {renderQtySelector()}
                                <button className="add-to-cart" onClick={addToCart} disabled={selectedVariantObj.stock == 0 || status.addingToCart}>
                                    {
                                        status.addingToCart ? 
                                        <MoonLoader 
                                            size={20}
                                            color={"white"}
                                            loading={true}
                                        /> :
                                        __("Add to Cart")
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);