import React from 'react';
import {  Link } from 'react-router-dom';
import './footer.css';
import { connect } from 'react-redux';
import { extractByLocaleCode } from '../../helpers/AttributesHelper';


const mapStateToProps = state => ({
    shop: state.shop.session,
    settings : state.shop.settings,
    i18n : state.i18n
});


function Footer(props){

    // get shop
    const { shop } = props;
    // get i18n settings
    const { __, locale } = props.i18n;
    // get shop attributes
    const { attributes } = shop;
    // special footer titles
    const customizeTitles = extractByLocaleCode({
        locale, shop
    });
    
    return <div className="footer">
        <div className="cols">
            <div className="col shop">
                <div className="shop-title">
                    {shop.name}
                </div>
                <div className="shop-desc">
                    {shop.description}
                </div>
            </div>
            <div className="col links">
                <Link to="/">
                    {customizeTitles.nav_home || __("Home")}
                </Link>
                <Link to="/blogs">
                    {customizeTitles.nav_blog ||__("Blog")}
                </Link>
                <Link to="/products">
                    {customizeTitles.nav_shop ||__("Shop")}
                </Link>
                <Link to="/cart">
                    {__("Cart")}
                </Link>
                <Link to="/users">
                    {__("My Account")}
                </Link>
            </div>
            <div className="col links">
                <Link to="/pages/terms_and_conditions">
                    {__("Terms and Conditions")}
                </Link>
                <Link to="/pages/privacy_policy">
                    {__("Privacy Policy")}
                </Link>
                <Link to="/pages/shipping_policy">
                    {__("Shipping Policy")}
                </Link>
            </div>
            <div className="col links social">
                {(() => {
                    const fontawesomeMap = {
                        facebook  : "fab fa-facebook",
                        instagram : "fab fa-instagram",
                        twitter   : "fab fa-twitter",
                        youtube   : "fab fa-youtube",
                        pinterest : "fab fa-pinterest"
                    };
                    return Object.keys(fontawesomeMap)
                            .filter(s => attributes[s] !== undefined && /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/i.test(attributes[s]))
                            .map(s => (
                                <a key={`footer-social-link-${s}`} href={attributes[s]} target="_blank">
                                    <i className={fontawesomeMap[s]}></i>
                                </a>
                            ));
                })()}
            </div>
        </div>
        <div className="copyright">
            <div>Copyright@{new Date().getFullYear()} {shop.name}.</div>
            <div className="powered-by"> 
                <a href="https://oneshop.cloud">
                    <img src="/assets/images/oneshop_logo.png"/> Powered by Oneshop.
                </a>
            </div>
        </div>
    </div>

}

export default connect(mapStateToProps)(Footer);