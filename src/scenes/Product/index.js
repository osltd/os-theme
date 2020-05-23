import React, { useState, useEffect } from 'react';
import Oneshop from 'oneshop.web';
import { Link } from 'react-router-dom';
import './products.css';
import { connect } from 'react-redux';
import actions from '../../helpers/actions';
import { MoonLoader } from 'react-spinners';

// ------------------------ REDUX ------------------------
const mapStateToProps = state => ({
    products : state.product.products
});

const mapDispatchToProps = dispatch => ({
    setProducts : (products) => dispatch({
        type    : actions.SET_PRODUCTS,
        payload : products
    })
});
// ------------------------ /REDUX ------------------------


function Product(props){

    // oneshop instance
    const OS = new Oneshop();
    // get products
    let { products } = props;
    // statuses
    var [status, setStatus] = useState({
        loading : false
    });



    // ----------------------- LIFECYCYLE -----------------------
    useEffect(() => {
        // active fetch products if no product is loaded
        if(!(products || []).length) fetchProducts();
    }, []);


    function fetchProducts(){
        // start loading
        toggleLoading();
        // fetch products
        OS.merchandise.get({
            page : Math.ceil(products.length/15) + 1
        })
        // got products
        .then((rows) => {
            // set products
            props.setProducts(products.concat(rows));
            // has result
            toggleLoading();
        })
        // error
        .catch(error => console.error(error));
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
            <h1>Products - All</h1>
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
                                    <div className="price">HKD {p.price}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);