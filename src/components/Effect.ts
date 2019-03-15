import actionType from "../context/actionType";
import {language} from "../I18N";
import agent from "../agent";
import {Product} from "../interfaces/server/Product";
import _ from "lodash";
import {useContext} from "react";
import {reducer} from "../context";
import {ProductReducer} from "../context/Product";
import {UserProfile} from "../interfaces/server/Auth";

export const initApps = () => {
    const {productReducer, feedReducer, authReducer, commonReducer} = useContext(reducer);

    let getAllProducts = async (page: number = 1, products: Array<Product> = []): Promise<null> => {
        let data: Array<Product> = await agent.Products.initProducts(`?page=${page}`).then(res => res.data.data.merchandises).catch(err => []);
        if (data.length > 0) return getAllProducts(page + 1, _.concat(products, data));
        else {
            productReducer.dispatch(
                {
                    type: actionType.product.PRODUCT_INIT_PRODUCTS,
                    payload: {
                        products: products
                    }
                }
            );
            return null
        }


    };
    commonReducer.dispatch(
        {
            type: actionType.common.COMMON_INIT_I18N,
            payload: {locale: language()}
        }
    );
    agent.Auth.getAccount().then(user =>
        authReducer.dispatch(
            {
                type: actionType.auth.AUTH_INIT_USER,
                payload: (user.data && user.data.data) ? {
                    user: user.data.data
                } : {},

            }
        )
    ).catch(err => err);
    getAllProducts();
    agent.Feeds.initFeeds().then(res =>
        feedReducer.dispatch(
            {
                type: actionType.feed.FEED_INIT_FEEDS,
                payload: res.data.data.posts,
            }
        )
    ).catch(err => feedReducer.dispatch(
        {
            type: actionType.feed.FEED_INIT_FEEDS,
            payload: {
                feeds: []
            },
        }
    ));


};


export const getAllProducts = async (productReducer: ProductReducer, page: number = 1, products: Array<Product> = []): Promise<null> => {
    let data: Array<Product> = await agent.Products.initProducts(`?page=${page}`).then(res => res.data.data.merchandises).catch(err => []);
    if (data.length > 0) return getAllProducts(productReducer, page + 1, _.concat(products, data));
    else {
        productReducer.dispatch(
            {
                type: actionType.product.PRODUCT_INIT_PRODUCTS,
                payload: {
                    products: products
                }
            }
        );
        return null
    }
};

export const getNewProfile = (): Promise<UserProfile> => agent.Auth.getAccount().then(user =>
    (user.data && user.data.data) ? {
        user: user.data.data
    } : {},).catch(err => err);
