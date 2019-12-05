import React from 'react';
import {createUseStyles} from 'react-jss';
import {connect} from 'react-redux';
import { redirectUrl } from '../../api/ApiUtils';




// import Carousel from '../Widget/Slick/SingleItem'
// import CategoryOverviewBox from '../Widget/CategoryOverviewBox'
// import {isImgOnlySections} from "../../api/ApiUtils";
// import LoadingPage from '../Layout/LoadingPage'


// const SectionBanner = lazy(() => import('./Sections/Banner'));
// const SectionTopInterest = lazy(() => import('./Sections/TopInterest'));
// const SectionFeatureProducts = lazy(() => import('./Sections/FeatureProducts'));
// const FEATURED_PRODUCTS = 'featured';


const styles = createUseStyles({
    featuredItems: {
        display: 'flex',
        padding: '0 9%'
    }
    // section: {
    //     width: '100%',
    //     margin: '0 80px'
    // },
    // productCategory: {
    //     paddingTop: '40px',

    //     paddingBottom: '40px',
    //     // backgroundColor: theme.palette.background.paper
    // },
    // text: {
    //     textAlign: 'center',
    //     // color: theme.palette.secondary.light,
    //     marginBottom: '30px',
    //     wordWrap: 'break-word',
    //     wordBreak: 'break-all'

    // },
    // title: {
    //     paddingTop: '20px',
    //     marginTop: '50px',
    //     fontWeight: '700',
    //     // color: theme.palette.primary.dark,
    //     marginBottom: '20px',
    //     textAlign: 'center'
    // }
});


const mapStateToProps = state => ({
    featuredItems: state.collection.items,
});


const mapDispatchToProps = dispatch => ({

});


const MainPageOverview = props => {
    const classes = styles();
    const {featuredItems, history} = props;


    // const {feeds, products, history, category} = props;
    // let getDataFromAPI = (feeds === null && products === null);
    // if (getDataFromAPI) return <LoadingPage/>;
    
    // let latestArticle = feeds && feeds.filter((n, i) => isImgOnlySections(n.sections)).filter((n, i) => i < 3);
    // let hasProductsToShow = (products && products.length > 0);
    // let hasFeedsToShow = (feeds && feeds.length > 0);
    // let hasCategoryToShow = (category.length > 0);
    // let hasSelectedProductsToShow = hasProductsToShow && products
    //     .filter(n => n.tags.find(m => m.toLowerCase() === FEATURED_PRODUCTS)).length > 0;



    return <div>
        <div className={classes.featuredItems}>
            {featuredItems.map((item, idx) => <button
                key={idx}
                type="button"
                onClick={() => redirectUrl(`/products/${item.id}`, history)}
            >
                {item.name}
            </button>)}
        </div>
        
    </div>;
};


export default connect(mapStateToProps, mapDispatchToProps)(MainPageOverview)