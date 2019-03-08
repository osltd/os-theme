import React, {useContext} from 'react';
import {Grid, Theme, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/styles";
import {Product} from "../../../../interfaces/server/Product";
import Slick from "../../../Widget/Slick/Products";
import Divider from "@material-ui/core/Divider";
import {addToCart, formatMoney, getVariantOptions, needLoginFirst} from "../../../../api/ApiUtils";
import Button from "@material-ui/core/Button";
import {reducer} from "../../../../context";
import {UserProfile} from "../../../../interfaces/server/Auth";
import {RouteComponentProps, withRouter} from "react-router-dom";
import SocialIcon from "../../../Widget/SocialIcon";
import Counter from "../../../Widget/Counter";
import Tag from "../../../Widget/Tags/Tag";

const useStyles = makeStyles((theme: Theme
) =>
    (
        {
            name: {
                color: 'black',
                fontSize: '28px',
                fontWeight: 600
            },
            productCategory: {
                backgroundColor: theme.palette.background.paper
            },
            price: {
                color: 'green',
                fontSize: '30px',
            },
            statusLabel: {
                color: 'green',
                fontWeight: 600,
            }
        }));

interface Props extends RouteComponentProps {
    product: Product
}

const SingleProductDetail: React.FunctionComponent<Props> = props => {

    const {product} = props;
    const {authReducer} = useContext(reducer);
    const classes= useStyles()
    const uniqueVariants = product.variants[0]
    const price = uniqueVariants.price
    console.log(getVariantOptions(product.variants))

  // const  getVariant = (keyName, index, variantOptions, needRender = true) => {
  //
  //       return needRender ? (keyName === 'color') ?
  //           <ColorPick
  //               colors={variantOptions[index]}
  //               onClick={color => this.props.editCartVariant(keyName, color)}
  //               selectedColor={this.props.draft[keyName]}
  //           /> :
  //           variantOptions[index].map(
  //               (options, k) => <Tag
  //                   key={k}
  //                   value={options}
  //                   onClick={() => this.props.editCartVariant(keyName, options)}
  //                   selected={(this.props.draft[keyName] === options)}
  //               />
  //           ) : null
  //
  //   }
    return <Grid spacing={16} container>
        <Grid item xs={10} sm={5}>
            <Slick
                data={(uniqueVariants.photos.length > 0 ? uniqueVariants : product).photos.map(n => ({url: n.url,}))}/>
        </Grid>
        <Grid item container xs={10} sm={7}>
            <Grid item xs={12}>
                <Typography variant={"h3"}>
                    $ {formatMoney(price)}
                </Typography>
                <br/>
                <br/>
                <br/>
                <Grid item container xs={12}>
                    <Grid item xs={5}>
                        <Button variant={"outlined"}
                                onClick={() => {

                                    const user = authReducer.state.user as UserProfile
                                    return  (!user)? needLoginFirst(props.history)
                                   : addToCart(user, product, props.history)
                                }}
                                color={"secondary"}>
                            加入購物車 </Button>
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={5}>

                        <Button variant={"text"} color={"primary"}>
                            打印頁面
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Divider/>
                <Typography variant={"subtitle1"}>
                    產品資訊
                </Typography>
                <Typography variant={"subtitle1"}>
                    {product.description}
                </Typography>
            </Grid>
        </Grid>

    </Grid>
};


export default withRouter(SingleProductDetail)
// <Dialog
// innerRef={e => dialog = e}
// title={}
// dialog={
// <Grid
//     style={
//         {
//             padding: '20px',
//         }
//     }
//     container direction={'column'} spacing={32} alignItems={'center'}>
//     <Grid item>
//         <Typography variant={'h6'}>
//             do u want to add to cart?
//         </Typography>
//     </Grid>
//     <Grid item container spacing={32} justify={'center'}>
//         <Grid item>
//             <Button variant="extendedFab"
//                     onClick={saveDraftToCart}
//
//             >
//                 yes
//             </Button>
//         </Grid>
//         <Grid item>
//             <Button variant="extendedFab"
//                     onClick={() => dialog.handleClose()}>
//                 no
//             </Button>
//         </Grid>
//     </Grid>
// </Grid>
// }
// />

//
// componentDidUpdate(prevProps, prevState, snap) {
//     if (props.location.pathname !== prevProps.location.pathname) initVariant()
// }
