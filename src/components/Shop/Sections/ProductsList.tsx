import React from "react";
import {Product} from "../../../interfaces/server/Product";

interface Props {
    products:Array<Product>
    tag:string
}


const  ProductsList:React.FunctionComponent<Props> = props => {
    const {products,tag }= props
    return <div>
        ggg
    </div>
    //
    // if (products.length === 0) {
    //     return <Typography variant={'subtitle1'}> there are no products under <strong>{
    //         tag
    //     }</strong> category yet</Typography>
    // }else <div>gggg</div>
    // // return props.viewMode === 'form' ?
    //     getProductProperty(products, 'display').map((n, i) =>
    //         <Grid item xs={12} sm={6} md={4} key={i}
    //         >
    //             <ProductOverviewBox
    //                 name={refactorTextLength(n.name)}
    //                 id={n.id}
    //                 src={handleImgValid(n.photos[0])}
    //                 category={n.tags}
    //                 regPrice={n.variants[0] ? n.variants[0].price : 'not a reg price'}
    //                 promotePrice={n.promotePrice}
    //             />
    //         </Grid>
    //     ) : getProductProperty(products, 'display').map((n, i) => (<ProductOverviewListForm
    //         key={i}
    //         src={handleImgValid(n.photos[0])}
    //         name={refactorTextLength(n.name)}
    //         category={n.tags}
    //         regPrice={n.variants[0] ? n.variants[0].price : 'not a reg price'}
    //         promotePrice={n.promotePrice}
    //         description={n.description}
    //         id={n.id}
    //     />))
};

export default ProductsList