module.exports = {
    // Shop settings goes here
    settings : {
        layout : {
            // nav-bar settings
            navBar : {
                display : {
                    blog : true,
                    shop : true,
                    user : true
                }
            },
            // Key - widget name
            content : [
                /**
                 *  Banner (articles)
                 */
                {
                    widget : "Banner", // type is required
                    // filters
                    tags : "",
                    ordering : "",
                    numberToShow : 1,
                    ids : "",
                    collections : "",
                    // silder settings
                    duration : 5000,
                    transitionDuration : 300,
                    infinite : true,
                    indicators : false,
                    arrows : false,
                    // styles to override
                    styles : {
                        height : 630
                    }
                },

                /** Products */
                {
                    widget : "Product", // type is required
                    // filters
                    tags : "",
                    ordering : "",
                    ids : "",
                    rows : 1,
                    cols : 4,
                    collections : "50",
                    // title
                    title : "Best Sellers",
                    type : "sale",
                    // styles to override
                    styles : {
                    }
                },

                /** */
                {
                    widget : "Seperator",
                    styles : {
                        margin : "50px 0px 60px 0px",
                        height : "0.5px"
                    }
                },

                /** Article Tile */
                {
                    widget : "ArticleTile", // type is required
                    // filters
                    tags : "",
                    ordering : "",
                    ids : "",
                    rows : 1,
                    cols : 4,
                    collections : "",
                    // title
                    title : "Latest",
                    type : "sale",
                    // styles to override
                    styles : {
                    }
                },

                /**  Seperator */
                /*
                {
                    widget : "Seperator",
                    styles : {
                        margin : "10px 0px"
                    }
                }
                */
            ]            
        },
        links : {
            policies : {
                shipping_policy      : "shipping_policy", // the file name id of your shipping policy (path: /public/assets/text_files)
                privacy_policy       : "privacy_policy", // the file name id of your privacy policy (path: /public/assets/text_files)
                terms_and_conditions : "terms_and_conditions"  // the file name id of your terms and condition (path: /public/assets/text_files)
            },
            social : {
                facebook : "https://facebook.com",
                instagram : "https://instagram.com",
                youtube : "https://youtube.com",
                twitter : "https://twitter.com",
                pinterest : "https://pinterest.com"
            }
        }
    }
};