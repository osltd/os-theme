import React, {useState, useEffect, useRef} from 'react';
import {createUseStyles} from 'react-jss';
import {connect} from 'react-redux';

import Cookies from 'universal-cookie';

import classNames from 'classnames';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';

import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


import agent from '../../agent';
import {redirectUrl} from "../../api/ApiUtils";

import { I18nText } from "../Widget/I18nText";
import { keyOfI18n } from "../../constants/locale/interface";
import SocialIcon from '../Widget/SocialIcon';

import Header from '../Layout/Body/Header';
import LoadingPage from '../Layout/LoadingPage';

import ReactSelect from 'react-select';

import {
    INIT_CART
} from "../../constants/actionType";



const styles = createUseStyles({
    wrapper: {
        padding: '0 9%'
    },
    navigator: {
        marginBottom: 45
    },
    content: {
        display: 'flex',
        flexDirection: 'column'
    },
    detail: {
        flex : 1,
        paddingTop : 30,
        borderTop : "0.5px #DDD solid"
    },
    detailWrapper : {
        display : 'flex',
        flexWrap : 'wrap',
        flex : 1,
        maxWidth : 1200,
        flexDirection : 'row'
    },
    leftCol : {
        display : 'flex',
        flex : 2,
        flexDirection : 'column',
        minWidth : 250
    },
    rightCol : {
        display : 'flex',
        flex : 1,
        flexDirection : 'column',
        minWidth : 250
    },

    backArrow: {
        cursor: 'pointer',
        backgroundColor: 'transparent',
        borderWidth: 0,
        display: 'flex',
        alignItems: 'center',
        padding: 0
    },
    backIcon: {
        fontSize: 20,
        marginRight: 5
    },
    backText: {
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif'
    },


    viewer: {
        display : 'flex',
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        borderBottom : '0.5 #DDD solid'
    },
    slideImageWrapper : {
        width : '100%',
        //maxWidth : 1200,
        maxHeight : 600,
        backgroundColor : 'white'
    },
    slideImage : {
        width : '100%',
        maxHeight : 600,
        objectFit : 'contain'
    },

    
    addBtn: {
        marginTop: 10,
        width : '100%',
        '& > button': {
            width : '100%',
            backgroundColor : "transparent",
            border: "1px black solid",
            padding: '10px 20px',
            borderRadius : "3px",
            cursor : "pointer"
        }
    },
    addBtnDisabled : {
        marginTop: 10,
        width : '100%',
        '& > button': {
            width : '100%',
            backgroundColor : "transparent",
            border: "1px #DDD solid",
            borderRadius : "3px",
            padding: '10px 20px',
            opacity : "0.6"
        }
    },


    title : {
        fontSize : 29,
        fontWeight : 300,
        color : '#333',
        marginTop : 0
    },
    description: {
        color : '#333',
        fontSize: 16,
        lineHeight : '150%',
        marginBottom : 35
    },
    stockPriceWrapper : {
        display:'flex', 
        flexDirection: 'row',
        alignItems : 'center'
    },
    stock : {
        padding : "10px 0px",
        '& > span > i' : {
            fontSize : 12
        }
    },
    price : {
        fontSize : 20,
        fontWeight : 300,
        marginRight : 6
    },
    form : {
        marginBottom : "15px"
    },  
    optionSelectorsWrapper : {
        marginBottom : "10px"
    },
    optionSelector : {
        //maxWidth : 400,
        width : "100%",
        marginBottom : 20
    },
    optionTitle : {
        fontSize : 12,
        marginBottom : 5
    },

    qtyGroup : {
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        height : 50,
        marginBottom : 15
    },
    qtyBtn : {
        border : 'none',
        backgroundColor : 'transparent',
        width : 55,
        '&:hover' : {
            opacity : 0.6
        },
        '&:disabled' : {
            opacity : 0.3
        },
        height : 50
    },
    qtyValue : {
        fontSize : 24,
        marginLeft : 50,
        marginRight : 50
    },
    qtyValueLabel : {
        fontSize : 12,
    },
    // for mobile
    '@media (max-width: 600px)': {
        wrapper: {
            padding: '0 5%'
        },
        viewer: {
            width: '100%'
        },
        detail: {
            width: '100%'
        },
        content: {
            display: 'block'
        },
    }

    // productCategory: {
    //     backgroundColor: theme.palette.background.paper
    // },
    // toolBar: {
    //     backgroundColor: ''
    // },

});


const mapStateToProps = state => ({
    products: state.product.products,
    feeds: state.feed.feeds,
    category: state.category.category,
});


const mapDispatchToProps = dispatch => ({
    addToCart: async (selectedVariant, qty) => {
        // no selected variant
        if (!selectedVariant) {
            alert('Please select a variant first.');
        } else {
            // get shopping cart
            let cart = cookies.get('cart'), result = null;
            // no shopping cart
            if (!cart) {
                result = await agent.Checkout.getCart();
                cart = (((((result || {}).data || {}).data || {}).rows || []).shift() || {}).id;
                if (cart) cookies.set('cart', cart);
            }
            // add item
            result = await agent.Checkout.addItem(cart, {
                id: selectedVariant.id,
                qty
            });
            if (!((result || {}).data || {}).result) {
                alert((((result || {}).data || {}).messages || []).join("\n") || 'Failed.');
            } else {
                // reload items
                agent.Checkout.initCart(cart).then(res => dispatch(
                    {
                        type: INIT_CART,
                        payload: res.data.data.rows,
                    }
                )).catch(err => dispatch(
            
                    {
                        type: INIT_CART,
                        payload: [],
                    }
                ))
                // return result
                toast.success('Item added.', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
    }
});


const cookies = new Cookies();


const ResponsiveDialog = props => {
    const classes = styles();
    const {products, match, history} = props;
    const product = products ? products.find(n => n.id.toString() === match.params.id) : null;

    console.log("=====> ", product)

    let options = {}, variants = {};
    ((product || {}).variants || []).forEach(v => (v.description||'').split(',').forEach(desc => {
        let optr = desc.indexOf(':');
        const key = desc.substr(0, optr);
        const value = desc.substring(optr + 1);
        options[key] = (options[key] || []).concat([value]).filter((val, i, a) => a.indexOf(val) == i);
        variants[v.id] = variants[v.id] || {
            id: v.id,
            media: v.media,
            price: v.price,
            stock: v.stock,
            sku: v.sku,
            description: []
        };
        variants[v.id].description.push(desc);
    }));

    
    const [form, setForm] = useState({
        qty: 1,
        variant: null
    });

    if (products == undefined) return <LoadingPage/>;
    if (!product) return null;


    const getSelectedVariant = function() {
        // get variant
        let variant = Object.keys(form.variant || {}).map(o => `${o}:${form.variant[o]}`);
        return variants[Object.keys(variants).filter(id => variants[id].description.length == variants[id].description.filter(v => variant.indexOf(v) >= 0).length)[0]];
    };


    form.variant = form.variant || ((((product || {}).variants || [])[0] || {}).description || '').split(/ *, */).filter(v => v).reduce((container, v) => {
        const optr = v.indexOf(':');
        return {
            ...container,
            [v.substr(0, optr)]: v.substring(optr + 1)
        };
    }, {});
    const variant = getSelectedVariant();


    return <div>
        <Header
            title={product.name}
            classes={{}}
        />
        <div className={classes.wrapper}>
            <div className={classes.navigator}>
                <button
                    type="button"
                    className={classes.backArrow}
                    onClick={() => redirectUrl('/products', history)}
                >
                    <i className={classNames('icon-circle-left', classes.backIcon)}/>&nbsp;
                    <b><I18nText keyOfI18n={keyOfI18n.FEED_DETAIL_BACK_TO_FEED_LIST}/></b>
                </button>
            </div>
            {/* --------------------------- content --------------------------- */}
            <div className={classes.content}>

                {/* --------------------------- Image slider --------------------------- */}
                <div className={classes.viewer}>
                    <Carousel
                        showStatus={false}
                        emulateTouch={true}
                        useKeyboardArrows={true}
                        autoPlay={true}
                        centerMode={(variant.media || product.media).length > 2}
                        showThumbs={(variant.media || product.media).length > 1}
                        showIndicators={(variant.media || product.media).length > 1}
                    >
                        {(variant.media || product.media).map((m, i) => <div className={classes.slideImageWrapper} key={i}>
                            <img className={classes.slideImage} src={m.url}/>
                        </div>)}
                    </Carousel>
                </div>
                {/* --------------------------- /Image slider --------------------------- */}


                {/* --------------------------- Product detail --------------------------- */}
                <div className={classes.detail}>
                    <div className={classes.detailWrapper}>

                        {/* ------------------ Left col ------------------ */}
                        <div className={classes.leftCol}>
                            
                            <h1 className={classes.title}>
                                {product.name}
                            </h1>
                            <div className={classes.stockPriceWrapper}>
                                <div className={classes.price}>
                                    <NumberFormat
                                        value={variant.price}
                                        thousandSeparator={true}
                                        prefix={'HK$'}
                                        displayType={'text'}
                                        renderText={v => v}
                                    />
                                </div>
                                <div className={classes.stock}>
                                    {variant.stock > 0 ? 
                                    <span style={{color:"#1fa141"}}><i>In Stock</i></span> :
                                    <span style={{color:"#e0674f"}}><i>Out of Stock</i></span>}
                                </div>
                            </div>
                            <p className={classes.description}>
                                {product.description}
                            </p>
                        </div>
                        {/* ------------------ /Left col ------------------ */}


                        <div style={{width:"50px"}}></div> {/* ----gap---- */}

                        {/* ------------------ Right col ------------------ */}
                        <div className={classes.rightCol}>
                            {/* ------------------ Option select ------------------ */}
                            <div className={classes.optionSelectorsWrapper}>
                                {(function(){
                                    return Object.keys(options).map((o, oi) => <div className={classes.optionSelector} key={oi}>
                                        <div className={classes.optionTitle}>
                                            {o.toUpperCase()}
                                        </div>
                                        <ReactSelect
                                            placeholder={o}
                                            name={o}
                                            value={(function(){
                                                var selectOptionObj = (variant.description || []).reduce((o, c) => {
                                                    var selecteOptionPair = c.split(":");
                                                    return Object.assign(o, { [selecteOptionPair[0]] : selecteOptionPair[1] });
                                                }, {});
                                                return {
                                                    label : selectOptionObj[o]
                                                };
                                            })()}
                                            onChange={v => setForm({
                                                ...form,
                                                variant: {
                                                    ...form.variant,
                                                    [o]: v.value
                                                }
                                            })}
                                            options={options[o].map((v, vi) => ({
                                                value : v,
                                                label : v
                                            }))}
                                        />
                                    </div>)
                                })()}
                            </div>
                            {/* ------------------ /Option select ------------------ */}
                            
                            <div className={classes.form}>
                                <div className={classes.qtyValueLabel}>QUANTITY</div>
                                <div className={classes.qtyGroup}>
                                    <button className={classes.qtyBtn} 
                                            onClick={() => {
                                                if(form.qty > 1){
                                                    setForm({
                                                        ...form,
                                                        qty: form.qty-1
                                                    });
                                                }
                                            }}
                                            disabled={form.qty <= 1 || !variant.stock}
                                    >
                                        <i className="icon-minus"></i>
                                    </button>
                                    <span className={classes.qtyValue}>{variant.stock == 0 ? 0 : form.qty}</span>
                                    <button className={classes.qtyBtn} 
                                            onClick={() => {
                                                if(form.qty < variant.stock){
                                                    setForm({
                                                        ...form,
                                                        qty: form.qty+1
                                                    });
                                                }
                                            }}
                                            disabled={form.qty == variant.stock || !variant.stock}
                                    >
                                        <i className="icon-plus"></i>
                                    </button>
                                </div>
                                <div className={variant.stock > 0 ? classes.addBtn : classes.addBtnDisabled}>
                                    <button
                                        type="button"
                                        onClick={e => props.addToCart(getSelectedVariant(), form.qty)}
                                        disabled={!variant.stock}
                                    >
                                        <i className={'icon-cart'}/>&nbsp;&nbsp;
                                        <I18nText keyOfI18n={keyOfI18n.ADD_TO_CART}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* ------------------ /Right col ------------------ */}
                    </div>



                    <div className={classes.shares}>
                        <h6>
                            <I18nText keyOfI18n={keyOfI18n.PRODUCT_DETAILS_SHARE_THIS_PRODUCT}/>
                        </h6>
                        <div className={classes.shareIcons}>
                            <SocialIcon
                                type={'whatsapp'}
                                onClick={() => window.open('https://web.whatsapp.com/send?text=' + window.location.href)}
                            />
                            <SocialIcon
                                type={'facebook'}
                                onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href)}
                            />
                        </div>
                    </div>


                </div>
                {/* --------------------------- Product detail --------------------------- */}
            </div>
        </div>
    </div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDialog)