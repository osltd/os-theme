import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';

const styles = theme => ({
    root: {
        overflow: 'auto',
        maxHeight:'500px',
    }, img: {
        width: '100%',
        padding:'20px',
    }
});

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function SimpleList(props) {
    const {classes} = props;
    const data = [
        {

            src: 'https://d29u17ylf1ylz9.cloudfront.net/thebell-v2/thebell/assets/img/products/home-two/product-2.jpg',
            category: 'bedroom',
            name: 'socii natogue',
            regPrice: '50',
            promotePrice: '40',
            SKU: 'KU MH03',
            status: 'in stock',
            description: ' There is a person who is the hero of every BBQ or family cookout and that is the Grill Master. We always looked up to our Mom or Dad as they tended the grill and looked forward to the day when we could be in charge of charring the meatstuff and searing delicious slices of fresh pineapple. Now that we\'re adults, it\'s finally our turn and technology has smiled upon us, giving us a tool that is destined to impress.',
            size: '5',
            color: 'red,yellow,green',

        }, {

            src: 'https://d29u17ylf1ylz9.cloudfront.net/thebell-v2/thebell/assets/img/products/home-two/product-6.jpg',
            category: 'bedroom',
            name: 'socii natogue',
            regPrice: '50',
            promotePrice: '40',
            description: ' There is a person who is the hero of every BBQ or family cookout and that is the Grill Master. We always looked up to our Mom or Dad as they tended the grill and looked forward to the day when we could be in charge of charring the meatstuff and searing delicious slices of fresh pineapple. Now that we\'re adults, it\'s finally our turn and technology has smiled upon us, giving us a tool that is destined to impress.',
            SKU: 'KU MH03',
            status: 'in stock',
            size: '5',
            color: 'red,yellow,green',

        }, {
            src: 'https://d29u17ylf1ylz9.cloudfront.net/thebell-v2/thebell/assets/img/products/home-two/product-10.jpg',
            category: 'bedroom',
            description: ' There is a person who is the hero of every BBQ or family cookout and that is the Grill Master. We always looked up to our Mom or Dad as they tended the grill and looked forward to the day when we could be in charge of charring the meatstuff and searing delicious slices of fresh pineapple. Now that we\'re adults, it\'s finally our turn and technology has smiled upon us, giving us a tool that is destined to impress.',
            name: 'socii natogue',
            regPrice: '50',
            promotePrice: '40',
            SKU: 'KU MH03',
            status: 'in stock',
            size: '5',
            color: 'red,yellow,green',

        }, {
            src: 'https://d29u17ylf1ylz9.cloudfront.net/thebell-v2/thebell/assets/img/products/home-two/product-14.jpg',

            category: 'bedroom',
            name: 'socii natogue',
            regPrice: '50',
            promotePrice: '40',
            description: ' There is a person who is the hero of every BBQ or family cookout and that is the Grill Master. We always looked up to our Mom or Dad as they tended the grill and looked forward to the day when we could be in charge of charring the meatstuff and searing delicious slices of fresh pineapple. Now that we\'re adults, it\'s finally our turn and technology has smiled upon us, giving us a tool that is destined to impress.',

            SKU: 'KU MH03',
            status: 'in stock',
            size: '5',
            color: 'red,yellow,green',

        }, {
            src: 'https://d29u17ylf1ylz9.cloudfront.net/thebell-v2/thebell/assets/img/products/home-two/product-4.jpg',
            category: 'bedroom',
            name: 'socii natogue',
            regPrice: '50',
            promotePrice: '40',
            SKU: 'KU MH03',
            status: 'in stock',
            description: ' There is a person who is the hero of every BBQ or family cookout and that is the Grill Master. We always looked up to our Mom or Dad as they tended the grill and looked forward to the day when we could be in charge of charring the meatstuff and searing delicious slices of fresh pineapple. Now that we\'re adults, it\'s finally our turn and technology has smiled upon us, giving us a tool that is destined to impress.',

            size: '5',
            color: 'red,yellow,green',

        }, {
            src: 'https://d29u17ylf1ylz9.cloudfront.net/thebell-v2/thebell/assets/img/products/home-two/product-8.jpg',
            category: 'bedroom',
            name: 'socii natogue',
            regPrice: '50',
            promotePrice: '40',
            SKU: 'KU MH03',
            description: ' There is a person who is the hero of every BBQ or family cookout and that is the Grill Master. We always looked up to our Mom or Dad as they tended the grill and looked forward to the day when we could be in charge of charring the meatstuff and searing delicious slices of fresh pineapple. Now that we\'re adults, it\'s finally our turn and technology has smiled upon us, giving us a tool that is destined to impress.',

            status: 'in stock',
            size: '5',
            color: 'red,yellow,green',

        }, {
            src: 'https://d29u17ylf1ylz9.cloudfront.net/thebell-v2/thebell/assets/img/products/home-two/product-5.jpg',
            category: 'bedroom',
            name: 'socii natogue',
            regPrice: '50',
            description: ' There is a person who is the hero of every BBQ or family cookout and that is the Grill Master. We always looked up to our Mom or Dad as they tended the grill and looked forward to the day when we could be in charge of charring the meatstuff and searing delicious slices of fresh pineapple. Now that we\'re adults, it\'s finally our turn and technology has smiled upon us, giving us a tool that is destined to impress.',

            promotePrice: '40',
            SKU: 'KU MH03',
            status: 'in stock',
            size: '5',
            color: 'red,yellow,green',

        }, {
            src: 'https://d29u17ylf1ylz9.cloudfront.net/thebell-v2/thebell/assets/img/products/home-two/product-4.jpg',
            category: 'bedroom',
            name: 'socii natogue',
            regPrice: '50',
            promotePrice: '40',
            SKU: 'KU MH03',
            status: 'in stock',
            description: ' There is a person who is the hero of every BBQ or family cookout and that is the Grill Master. We always looked up to our Mom or Dad as they tended the grill and looked forward to the day when we could be in charge of charring the meatstuff and searing delicious slices of fresh pineapple. Now that we\'re adults, it\'s finally our turn and technology has smiled upon us, giving us a tool that is destined to impress.',
            size: '5',
            color: 'red,yellow,green',

        }, {
            src: 'https://d29u17ylf1ylz9.cloudfront.net/thebell-v2/thebell/assets/img/products/home-two/product-8.jpg',
            category: 'bedroom',
            name: 'socii natogue',
            regPrice: '50',
            promotePrice: '40',
            description: ' There is a person who is the hero of every BBQ or family cookout and that is the Grill Master. We always looked up to our Mom or Dad as they tended the grill and looked forward to the day when we could be in charge of charring the meatstuff and searing delicious slices of fresh pineapple. Now that we\'re adults, it\'s finally our turn and technology has smiled upon us, giving us a tool that is destined to impress.',

            SKU: 'KU MH03',
            status: 'in stock',
            size: '5',
            color: 'red,yellow,green',

        }, {
            src: 'https://d29u17ylf1ylz9.cloudfront.net/thebell-v2/thebell/assets/img/products/home-two/product-8.jpg',
            category: 'bedroom',
            name: 'socii natogue',
            regPrice: '50',
            promotePrice: '40',
            SKU: 'KU MH03',
            description: ' There is a person who is the hero of every BBQ or family cookout and that is the Grill Master. We always looked up to our Mom or Dad as they tended the grill and looked forward to the day when we could be in charge of charring the meatstuff and searing delicious slices of fresh pineapple. Now that we\'re adults, it\'s finally our turn and technology has smiled upon us, giving us a tool that is destined to impress.',

            status: 'in stock',
            size: '5',
            color: 'red,yellow,green',

        }, {
            src: 'https://d29u17ylf1ylz9.cloudfront.net/thebell-v2/thebell/assets/img/products/home-two/product-5.jpg',
            category: 'bedroom',
            name: 'socii natogue',
            regPrice: '50',
            description: ' There is a person who is the hero of every BBQ or family cookout and that is the Grill Master. We always looked up to our Mom or Dad as they tended the grill and looked forward to the day when we could be in charge of charring the meatstuff and searing delicious slices of fresh pineapple. Now that we\'re adults, it\'s finally our turn and technology has smiled upon us, giving us a tool that is destined to impress.',

            promotePrice: '40',
            SKU: 'KU MH03',
            status: 'in stock',
            size: '5',
            color: 'red,yellow,green',

        }, {
            src: 'https://d29u17ylf1ylz9.cloudfront.net/thebell-v2/thebell/assets/img/products/home-two/product-4.jpg',
            category: 'bedroom',
            name: 'socii natogue',
            regPrice: '50',
            promotePrice: '40',
            SKU: 'KU MH03',
            status: 'in stock',
            description: ' There is a person who is the hero of every BBQ or family cookout and that is the Grill Master. We always looked up to our Mom or Dad as they tended the grill and looked forward to the day when we could be in charge of charring the meatstuff and searing delicious slices of fresh pineapple. Now that we\'re adults, it\'s finally our turn and technology has smiled upon us, giving us a tool that is destined to impress.',
            size: '5',
            color: 'red,yellow,green',

        }, {
            src: 'https://d29u17ylf1ylz9.cloudfront.net/thebell-v2/thebell/assets/img/products/home-two/product-8.jpg',
            category: 'bedroom',
            name: 'socii natogue',
            regPrice: '50',
            promotePrice: '40',
            description: ' There is a person who is the hero of every BBQ or family cookout and that is the Grill Master. We always looked up to our Mom or Dad as they tended the grill and looked forward to the day when we could be in charge of charring the meatstuff and searing delicious slices of fresh pineapple. Now that we\'re adults, it\'s finally our turn and technology has smiled upon us, giving us a tool that is destined to impress.',

            SKU: 'KU MH03',
            status: 'in stock',
            size: '5',
            color: 'red,yellow,green',

        },
    ]
    return (
        <div className={classes.root}>
            {
                data.map((n, i) => <img className={classes.img} src={n.src}/>)
            }


        </div>
    );
}

SimpleList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);