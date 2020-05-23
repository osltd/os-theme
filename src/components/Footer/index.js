import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './footer.css';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
    shop: state.shop.session,
    settings : state.shop.settings
});


function Footer(props){

    // get shop
    let { shop, settings } = props;
    
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
                    Home
                </Link>
                <Link to="/blogs">
                    Blog
                </Link>
                <Link to="/products">
                    Shop
                </Link>
                <Link to="/cart">
                    Cart
                </Link>
                <Link to="/users">
                    My Account
                </Link>
            </div>
            <div className="col links">
                <Link to="/pages/terms_and_conditions">
                    Terms and Conditions
                </Link>
                <Link to="/pages/privacy_policy">
                    Privacy Policy
                </Link>
                <Link to="/pages/shipping_policy">
                    Shipping Policy
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
                    const socialLinks = ((settings || {}).links || {}).social || {};
                    return Object.keys(socialLinks)
                    .filter(s => socialLinks[s].length > 0 || socialLinks[s] != "#").map(s => (
                        <a key={`footer-social-link-${s}`} href={socialLinks[s]} target="_blank">
                            <i className={fontawesomeMap[s]}></i>
                        </a>
                    ));
                })()}
            </div>
        </div>
        <div className="copyright">
            Copyright@{new Date().getFullYear()} {shop.name}
        </div>
    </div>

}

export default connect(mapStateToProps)(Footer);