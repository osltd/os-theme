import React, { useState } from 'react';
import Oneshop from 'oneshop.web';
import './checkout.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import actions from '../../helpers/actions';
import { MoonLoader } from 'react-spinners';
import Select from 'react-select';
import {getCodeList} from 'country-list';
import Tooltip from 'react-tooltip';
import { validate, getValueAtObjectByPath, setValueAtObjectByPath, deleteValueAtObjectByPath } from '../../helpers/formValidator';
import { Redirect } from 'react-router-dom';

// ------------------------ REDUX ------------------------
const mapStateToProps = state => ({
    cart : state.cart,
    shop : state.shop.session,
    user : state.user.session,
    i18n : state.i18n
});

const mapDispatchToProps = dispatch => ({
    setCartItems : (items) => dispatch({
        type    : actions.SET_CART_ITEMS,
        payload : items
    })
});
// ------------------------ /REDUX ------------------------



function Checkout(props){

    // oneshop instance
    const OS = new Oneshop();
    // get cart and shop
    let {cart, shop, user} = props;
    // steps
    let [step, setStep] = useState(1);
    // shipping methods
    let [shippingMethods, setShippingMethods] = useState([]);
    // loading?
    let [isLoading, setIsLoading] = useState(false);
    // preview
    let [preview, setPreview] = useState(null);
    // paid?
    let [paid, setPaid] = useState(null);
    // form
    let [form, setForm] = useState({
        contact : {
            first_name : "",
            last_name : "",
            email : "",
            phone : ""
        },
        payment : {
            card : "",
            csc : "",
            exp_date : ""
        },
        shipping : {
            address : null,
            country : "HK"
        },
        shippings : {
            [shop.id] : null
        },
        items : cart.id,
        notes : ""
    });
    let [formErrors, setFormErrors] = useState({});
    // country code list
    const countries = getCodeList();
    // translation method
    let { __ } = props.i18n;
    
    // -------------------- HELPERS --------------------
    async function loadShippingMethods(){
        // set loading
        setIsLoading(true);
        // setup shipping methods
        let shipping_methods = [];
        // process shipping methods
        try {
            // fetch shipping methods
            let customShippings = await fetch(
                '/api/shipping_methods', 
                { 
                    method : "GET" 
                }
            );
            // transform json
            customShippings = (((((await customShippings.json()) || {}).data || {}).rows || [])[0] || {}).shipping_methods || [];
            // append to container
            shipping_methods = shipping_methods.concat(customShippings.map(s => ({
                id               : s.code.replace(/\r?\n|\r/g, ""),
                charge           : s.charge,
                title            : s.title,
                address_required : s.shipping_address_required
            })));
            // has auto ship?
            if(shop.auto_ship){
                let autoShippings = await fetch(
                    `/api/carts/${cart.id}/shipment/rates`, 
                    {
                        method : "POST",
                        body : JSON.stringify({
                            shipping : {
                                address : "HK",
                                country : form.shipping.country
                            }
                        })
                    }
                );
                // transform json
                autoShippings = (await autoShippings.json()).data.rows;
                // append to container
                shipping_methods = shipping_methods.concat(autoShippings.filter(s => s.rates[shop.id] != undefined).map(s => ({
                    id               : s.id,
                    charge           : s.rates[shop.id],
                    title            : s.name,
                    address_required : true
                })));
            }
            // preselect one shipping method
            if(shipping_methods.length && form.shippings[shop.id] == null) {
                setFormValue(`shippings.${shop.id}`, shipping_methods[0].id);
            }
            // set shipping method
            setShippingMethods(shipping_methods);
            // got to step 2
            setStep(2);
            // finish loading
            setIsLoading(false);
        } catch (error) {
            alert("Failed to load shipping methods");
            // loading finish
            setIsLoading(false);
        }
    }

    async function previewOrder(){
        // set loading
        setIsLoading(true);
        try {
            // clone form
            let previewForm = {...form};
            // remove coupon field if coupons field is empty
            if((previewForm.coupons || "").trim().length == 0) delete previewForm.coupons;
            // remove shippings if not shipping method is selected
            if(previewForm.shippings[shop.id] == null) delete previewForm.shippings[shop.id];
            // fetch order previews
            let preview = await fetch(
                `/api/carts/${cart.id}/previews`, 
                { 
                    method : "POST",
                    body : JSON.stringify({
                        ...previewForm
                    })
                }
            );
            // parse json
            preview = (await preview.json());
            // got error
            if(preview.data){
                preview = preview.data.rows[0];
                // set preview object
                setPreview(preview);
                // go to step 3
                setStep(3);
            } else {
                alert(preview.messages ? (preview.messages || []).join("\n") : "Failed to confirm order amount.");
            }
            // loading finish
            setIsLoading(false);
        } catch (error) {
            alert("Failed to confirm order amount.");
            // loading finish
            setIsLoading(false);
        }
    }

    async function makePayment(){
        // set loading
        setIsLoading(true);
        // clone form
        let payload = {...form};
        // ----- manupulate form data
        // no coupon?
        if(!(payload.coupons || "").trim().length) delete form.coupons;
        // no notes?
        if(!(payload.notes || "").trim().length) delete form.notes;
        // split expiry
        payload.payment.exp_date = `${payload.payment.exp_date.slice(0,2)}/${payload.payment.exp_date.slice(2)}`;
        // trying to make payment
        try {
            // make payment
            let payment = user != null ? (await OS.consumer.checkout(payload)) : (await OS.order.create(payload));
            // success?
            if(payment.rows && 
                (payment.rows || []).length > 0){
                // set paid object and go to /checkout/success
                setPaid({
                    ...preview,
                    shipping : form.shipping,
                    contact : form.contact,
                    notes : form.notes || "",
                    items : [...cart.items],
                });
            } else {
                // unknown error
                alert("Unknown error occured, please try again");
            }
            // finished loading
            setIsLoading(false);
        } catch (error) {
            // error messages
            if(Array.isArray(error.message) && (error.message || []).length > 0){
                alert(error.message.join("\n"))
            } else {
                // unknow error
                alert("Unknown error occured, please try again");
            }
            // finished loading
            setIsLoading(false);
        }
        
    }

    function setFormValue(field, value){
        setForm(oldForm => {
            let newForm = {...oldForm};
            setValueAtObjectByPath(newForm, field, value);
            return newForm;
        });
    }
    // -------------------- /HELPERS --------------------


    // -------------------- ERROR HANDLING --------------------
    function getFormErrorView(path){
        // get error
        const error_msg = getValueAtObjectByPath(path, formErrors) || null;
        return <span className="error-msg">{error_msg || ""}</span>;
    }
    
    function validateField(field){
        // validate
        let error_msg = validate(field || "", form);
        // not null? translate
        if(error_msg != null) error_msg = `${__(error_msg.field)} ${__(error_msg.error)}`;
        // has error?
        setFormErrors(oldFormErrors => {
            let newFormErrors = {...oldFormErrors};
            // save error if has error has error msg
            // otherwise delete error message from formErrors
            error_msg ? setValueAtObjectByPath(newFormErrors, field, error_msg) : deleteValueAtObjectByPath(newFormErrors, field);
            return newFormErrors;
        });
    }

    function isFormValid(){
        // preset result
        let isValid = true;
        // loop through the process
        ['contact', 'payment', 'shipping'].forEach(field => {
            // field exists
            if(formErrors[field] != undefined && Object.keys(formErrors[field]).length > 0){
                isValid = false;
            }
        });
        return isValid;
    }
    // -------------------- /ERROR HANDLING --------------------


    // -------------------- FORM RENDERING --------------------
    function renderStep1(){
        return <div className="step-1">
            <h2>{__("Your Information")}</h2>
            <div className="row">
                <div className="form-group">
                    <label>{__("First Name")}</label>
                    <input placeholder={__("Peter")} 
                            value={form.contact.first_name} 
                            onChange={(e) => setFormValue('contact.first_name', e.target.value)}
                            onBlur={() => validateField("contact.first_name")}
                    />
                    {getFormErrorView("contact.first_name")}
                </div>
                <div className="form-group">
                    <label>{__("Last Name")}</label>
                    <input placeholder={__("Chan")}
                            value={form.contact.last_name} 
                            onChange={(e) => setFormValue('contact.last_name', e.target.value)}
                            onBlur={() => validateField("contact.last_name")}
                    />
                    {getFormErrorView("contact.last_name")}
                </div>
            </div>
            <div className="row">
                <div className="form-group">
                    <label>{__("Email")}</label>
                    <input placeholder="Peter.chan@abc.com" 
                            value={form.contact.email} 
                            onChange={(e) => setFormValue('contact.email', e.target.value)}
                            onBlur={() => validateField("contact.email")}
                    />
                    {getFormErrorView("contact.email")}
                </div>
                <div className="form-group">
                    <label>{__("Phone")}</label>
                    <input placeholder="+85291234567" 
                            value={form.contact.phone} 
                            onChange={(e) => setFormValue('contact.phone', e.target.value)}
                            onBlur={() => validateField("contact.phone")}
                    />
                    {getFormErrorView("contact.phone")}
                </div>
            </div>
            <div className="row">
                <div className="form-group">
                    <label>{__("Country")}</label>
                    <Select value={{ value : (form.shipping.country || "hk").toLowerCase(), label: countries[(form.shipping.country || "hk").toLowerCase()]}}
                            onChange={option => setFormValue('shipping.country', option.value.toUpperCase())}
                            options={Object.keys(countries).map(key => ({ value : key, label : countries[key]}))}
                    />
                </div>
                <div className="form-group"></div>
            </div>
            <div className="row">
                <div className="form-group"></div>
                <div className="form-group">
                    <button onClick={() => loadShippingMethods()} 
                            disabled={
                                !(form.contact.first_name || "").length ||
                                !(form.contact.last_name || "").length ||
                                !(form.contact.email || "").length ||
                                !(form.contact.phone || "").length ||  // triggers the button to disable at form init
                                !isFormValid()
                            }
                    >
                        {__("Shipping")} <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    }

    function renderStep2(){
        return <div className="step-2">
            <h2>{__("Select a Shipping Method")}</h2>
            <div className="row">
                <div className="shipping-methods">
                    {
                        shippingMethods.length ? 
                        shippingMethods.map(s => (
                            <div key={`shipping-method-${s.id}`} 
                                className={`shipping-method ${form.shippings[shop.id] == s.id ? "selected" : ""}`}
                                onClick={() => setFormValue(`shippings.${shop.id}`, s.id)}
                            >
                                {form.shippings[shop.id] == s.id ? <i className="fas fa-check-square"></i> : <i className="far fa-check-square"></i>}
                                <div className="title">{s.title}</div> - 
                                <div className="charge">{shop.currency.toUpperCase()} {s.charge}</div>
                            </div>
                        )) :
                        <div className="shipping-method-none">{__("No shipping method is available at the moment.")}</div>
                    }
                </div>
            </div>
            <h2>{__("Shipping Address")}</h2>
            <div className="row">
                <div className="form-group">
                    <input placeholder="1/F, ABC Building, 12 ABC Road, Hong Kong" value={form.shipping.address || ""} 
                            onChange={(e) => setFormValue('shipping.address', e.target.value)}
                            onBlur={() => validateField("shipping.address")}
                    />
                    {getFormErrorView("shipping.address")}
                </div>
            </div>
            <h2>{__("Coupons")}</h2>
            <div className="row">
                <div className="form-group">
                    <input placeholder="SUMMERSALE10" 
                            value={form.coupons || ""} 
                            onChange={(e) => setFormValue('coupons', e.target.value)}
                            onBlur={() => validateField("coupons")}
                    />
                    {getFormErrorView("coupons")}
                </div>
            </div>
            <h2>{__("Notes")}</h2>
            <div className="row">
                <div className="form-group">
                    <textarea 
                        value={form.notes || ""}
                        placeholder={__("Notes to us")}
                        maxLength={500}
                        onChange={(e) => setFormValue('notes', e.target.value)} 
                    />
                </div>
            </div>
            <div className="row">
                <div className="form-group">
                    <button onClick={() => {
                                setFormErrors({});
                                setStep(1);
                            }}
                    >
                        <i className="fas fa-chevron-left"></i> {__("Information")}
                    </button>
                </div>
                <div className="form-group">
                    <button onClick={() => previewOrder()}
                            disabled={!(form.shipping.address || "").length || !isFormValid()}
                    >
                        {__("Payment")} <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    }

    function renderStep3(){
        return <div className="step-3">
            <h2>{__("Payment")}</h2>
            <div className="row">
                <div className="form-group">
                    <label>{__("Card Number")}</label>
                    <input placeholder="4242-4242-4242-4242" 
                            value={((form.payment.card || "").match(new RegExp('[0-9]{1,4}', 'g')) || []).join("-")} 
                            onChange={(e) => setFormValue('payment.card', (e.target.value || "").split("-").join(""))} 
                            maxLength={19}
                            onBlur={() => validateField("payment.card")}
                    />
                    {getFormErrorView("payment.card")}
                </div>
            </div>
            <div className="row">
                <div className="form-group">
                    <label>{__("Expiry Date")}</label>
                    <input placeholder="10/20" 
                            value={((form.payment.exp_date || "").match(new RegExp('[0-9]{1,2}', 'g')) || []).join("/")} 
                            onChange={(e) => setFormValue('payment.exp_date', (e.target.value || "").split("/").join(""))} 
                            onBlur={() => validateField("payment.exp_date")}
                            maxLength={5}
                    />
                    {getFormErrorView("payment.exp_date")}
                </div>
                <div className="form-group">
                    <label>{__("CSC")}</label>
                    <input placeholder="123" 
                            type="password"
                            value={form.payment.csc || ""} 
                            onChange={(e) => setFormValue('payment.csc', e.target.value)} 
                            onBlur={() => validateField("payment.csc")}
                            maxLength={4}
                    />
                    {getFormErrorView("payment.csc")}
                </div>
            </div>
            <div className="row">
                <div className="form-group">
                    <button onClick={() => {
                        setPreview(null);
                        setFormErrors({});
                        setStep(2);
                    }}>
                        <i className="fas fa-chevron-left"></i> {__("Shipping")}
                    </button>
                </div>
                <div className="form-group">
                    <button className="pay-btn" 
                            onClick={makePayment}
                            disabled={
                                !(form.payment.card || "").length ||
                                !(form.payment.exp_date || "").length ||
                                !(form.payment.csc || "").length ||
                                !isFormValid()
                            }
                    >
                        {__("Confirm & Pay")} <i className="fas fa-check-circle"></i>
                    </button>
                </div>
            </div>
        </div>
    }

    const renderStep = [renderStep1, renderStep2, renderStep3];

    function renderOrderForm(){
        return (
            <div className="checkout">
                <h1>{__("Checkout")}</h1>
                <div className="checkout-wrapper">
    
                    {/* ---------------- Loading mask ---------------- */}
                    {
                        isLoading ? 
                        <div className="loading-mask">
                            <MoonLoader 
                                size={20}
                                color={"#000000"}
                                loading={true}
                            />
                        </div> : null
                    }
                    {/* ---------------- /Loading mask ---------------- */}
    
                    {/* ---------------------- STEPS ---------------------- */}
                    <div className="steps">
    
                        {/* --------------- Progress Bar --------------- */}
                        <div className="progress-bar">
                            {["Information", "Shipping", "Finish"].map((s, idx) => (
                                <div key={`step-label-${idx}`} className={`step-label ${step >= idx+1 ? "active" : ""}`}>
                                    {__(s)}
                                </div>
                            ))}
                            <div className="bar">
                                <div className="bar-fill" style={{width:`${((step-1)/2)*100}%`}}></div>
                            </div>
                        </div>
                        {/* --------------- /Progress Bar --------------- */}
    
                        {/* --------------- FORM --------------- */}
                        <div className="form">
                            {renderStep[step-1]()}
                        </div>
                        {/* --------------- /FORM --------------- */}
                        
                        {/* --------------- Back to shoping cart button ------------- */}
                        <div className="back-to-shopping-cart">
                            <Link to={"/cart"}>
                                <i className="fas fa-chevron-left"></i>
                                {__("Back to Shopping Cart")}
                            </Link>
                        </div>
                        {/* --------------- /Back to shoping cart button ------------- */}
                    </div>
                    {/* ---------------------- /STEPS ---------------------- */}
    
    
                    <div style={{width:15}}></div>
    
                    {/* ---------------------- SUMMARY ---------------------- */}
                    <div className="summary">
                        <div className="summary-wrapper">
                            <h3>{__("Summary")}</h3>
                            <div className="amounts">
                                <div className="amt subtotal">
                                    <label>{__("Subtotal")}</label> 
                                    <div className="amount">
                                        {shop.currency.toUpperCase()} {(() => {
                                            return preview ? preview.sub_total : 
                                            (cart.items || []).reduce((total, item) => {
                                                return total + (item.qty * item.price);
                                            }, 0)
                                        })().toFixed(2)}
                                    </div>
                                </div>
                                <div className="amt shipping-fee"> 
                                    <label>{__("Shipping fee")}</label>
                                    <div className="amount">
                                        {shop.currency.toUpperCase()} {(() => {
                                            // has preview?
                                            if(preview){
                                                return preview.shipping_fee;
                                            } else if(form.shippings[shop.id] != null){
                                                return (shippingMethods.filter(s => s.id == form.shippings[shop.id])[0] || {}).charge || 0;
                                            } else {
                                                return 0;
                                            }
                                        })().toFixed(2)}
                                    </div>
                                </div>
                                {
                                    preview && ((preview.breakdowns[0] || {}).discounts || []).length > 0 ?
                                    (
                                        <div className="amt discounts">
                                            <label>{__("Discounts")}</label>
                                            {preview.breakdowns[0].discounts.map(d => (<div key={`discount-${d.id}`} className="item">
                                                <label data-tip={d.title || ""}>
                                                    {(d.title || "").length > 20 ? `${(d.title || "").substring(0, 20)}...` : d.title}
                                                    <Tooltip />
                                                </label>
                                                <div className="deducted-amt">- {shop.currency.toUpperCase()} {d.amount}</div>
                                            </div>))}
                                        </div>
                                    ) : null
                                }
                                <div className="amt total">
                                    <label>{__("TOTAL")}</label>
                                    <div className="amount">
                                        {shop.currency.toUpperCase()} {(() => {
                                            return preview ? preview.gross_total : 
                                            (() => {
                                                // get sub total
                                                let subTotal = (cart.items || []).reduce((total, item) => {
                                                    return total + (item.qty * item.price);
                                                }, 0);
                                                // get shipping fee
                                                let shippingFee = form.shippings[shop.id] != null ? (shippingMethods.filter(s => s.id == form.shippings[shop.id])[0] || {}).charge : 0;
                                                // return grand total
                                                return subTotal + shippingFee;
                                            })()
                                        })().toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ---------------------- /SUMMARY ---------------------- */}
                </div>
            </div>
        );
    }
    // -------------------- /FORM RENDERING --------------------


    // Render starting point
    return paid ? <Redirect to={{ pathname : "/checkout/success", state : paid }} /> : renderOrderForm();
    
}


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);