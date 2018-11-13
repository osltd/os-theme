const defaultState = {
    category: [{
        name: 'shop men',
        img: 'https://d29u17ylf1ylz9.cloudfront.net/thebell-v2/thebell/assets/img/categories/home-two/product-category/home2-category1.jpg'
    },
        {
            name: 'shop kid',
            img: 'https://d29u17ylf1ylz9.cloudfront.net/thebell-v2/thebell/assets/img/categories/home-two/product-category/home2-category2.jpg'
        },
        {
            name: 'shop women',
            img: 'https://d29u17ylf1ylz9.cloudfront.net/thebell-v2/thebell/assets/img/categories/home-two/product-category/home2-category3.jpg'
        },
    ]
};

export default (state = defaultState, action) => {
    switch (action.type) {

        default:
            return state
    }
}


