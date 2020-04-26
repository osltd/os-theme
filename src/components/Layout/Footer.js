import React, {useContext} from 'react';
import {createUseStyles} from 'react-jss';
import {connect} from 'react-redux';

import _ from 'lodash';

import SocialIcon from '../Widget/SocialIcon'
import {redirectUrl} from "../../api/ApiUtils";
import {I18nText} from "../Widget/I18nText";
import {keyOfI18n} from "../../constants/locale/interface";
import {reducer} from "../../context";


const styles = createUseStyles({
    footer: {
        marginTop: '50px',
        backgroundColor: '#fafafa',
        color: 'black',
        display: 'flex',
        flexDirection: 'row-reverse',
        padding: '60px 9%',
        '& > div': {
            flex: 1
        }
    },

    shopInfo: {
        marginBottom: 15
    },
    shopName: {
        margin: '0 0 8px',
        padding: 0,
        fontWeight : 100,
        fontSize : 30,
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif'
    },
    shopDesc: {
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif'
    },

    shortcuts: {

    },
    shortcutsTitle: {
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
        marginBottom: 7,
        fontWeight: 600,
    },
    shortcutLinks: {
        padding: 0,
        margin: 0,
        listStyle: 'none'
    },
    shortcutLink: {
        padding : "5px 0px"
    },
    shortcutLinkButton: {
        backgroundColor: 'transparent',
        color: 'gray',
        borderWidth: 0,
        cursor: 'pointer',
        fontSize: 15,
        padding : 0
    },

    // for mobile
    '@media (max-width: 600px)': {
        footer: {
            display: 'block'
        },
        shortcuts: {
            marginBottom: 35
        }
    }
});


const mapStateToProps = state => ({
    products: state.product.products,
    feeds: state.feed.feeds,
    category: state.category.category,
    shopInfo: state.common.shopInfo,

});


const mapDispatchToProps = dispatch => ({}
);


const shortcuts = [
    {label: 'SHOPPING_CART', url: "shoppingcart"}
    , {label: 'CHECKOUT', url: "checkout"}
    , {label: 'MY_ACCOUNT', url: ""}
    , {label: 'LOGIN', url: "login"}
    , {label: 'REGISTER', url: "register"}
];


const Footer = props => {
    const {commonReducer} = useContext(reducer);
    const classes = styles();


    const renderShopInfo = () => <div>
        <div className={classes.shopInfo}>
            <h6 className={classes.shopName}>{props.shopInfo.name}</h6>
            <p className={classes.shopDesc}>{props.shopInfo.description}</p>
        </div>
        <div>
            <SocialIcon type={'facebook'}/>
            <SocialIcon type={'youtube'}/>
            <SocialIcon type={'twitter'}/>
            <SocialIcon type={'reddit'}/>
            <SocialIcon type={'whatsapp'}/>
        </div>
    </div>;
    const renderShortcuts = () => <div className={classes.shortcuts}>
        <div className={classes.shortcutsTitle}>
            <I18nText keyOfI18n={keyOfI18n.FOOTER_FIND_US_ON}/>
        </div>
        <ul className={classes.shortcutLinks}>
            {shortcuts.map((s, i) => <li
                key={i}
                className={classes.shortcutLink}
            >
                <button
                    type="button"
                    className={classes.shortcutLinkButton}
                >
                    <I18nText keyOfI18n={keyOfI18n[s.label]}/>
                </button>
            </li>)}
        </ul>
    </div>;


    return <div className={classes.footer}>
        {renderShortcuts()}
        {renderShopInfo()}
    </div>;
}


export default connect(mapStateToProps, mapDispatchToProps)(Footer)