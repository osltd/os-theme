import {Table, TableBody, TableCell, TableHead, TableRow, Theme} from "@material-ui/core";
import React, {useContext} from "react";
import {makeStyles} from "@material-ui/styles";
import {Product} from "../../../../../interfaces/server/Product";
import {TonerVariants} from "../../../../../interfaces/client/structure";
import {reducer} from "../../../../../context";
import {addToCart, needLoginFirst} from "../../../../../api/ApiUtils";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {UserProfile} from "../../../../../interfaces/server/Auth";

interface Props extends RouteComponentProps {
    data: Array<Product & TonerVariants>
}

const useStyles = makeStyles(
    (theme: Theme) => ({

        root: {
            width: '100%',
            marginTop: theme.spacing.unit * 3,
            overflowX: 'scroll',
        },
        table: {}, img: {
            width: '100px',
            margin: '10px',
        }
        ,
        button: {
            margin: '20px 0',
        },
        counter: {
            minWidth: '170px',
        },
        block: {
            //   border: ' 1px solid ' + theme.palette.secondary.light,
        }

    })
);
const TagList: React.FunctionComponent<Props> = props => {

    const classes = useStyles();
    const {data, history} = props;
    const {authReducer} = useContext(reducer);
    return <Table className={classes.table}>
        <TableHead>
            <TableRow>
                <TableCell className={classes.block}>型號</TableCell>
                <TableCell className={classes.block} numeric>適用打印機型號</TableCell>
                <TableCell className={classes.block} numeric>打印頁數</TableCell>
                <TableCell className={classes.block} numeric>色彩</TableCell>
                <TableCell className={classes.block} numeric>售價</TableCell>
                <TableCell className={classes.block} numeric>加入購物車</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {data.map((n, i) => <TableRow key={i}>
                <TableCell className={classes.block}>
                    {
                        n.name
                    }

                </TableCell>
                <TableCell className={classes.block} numeric>
                    {
                        n.suitable.map(
                            m => <div>
                                {m}
                            </div>
                        )
                    }
                </TableCell>
                <TableCell className={classes.block} numeric>
                    {
                        n.pageCapacity
                    }
                </TableCell>
                <TableCell className={classes.block} numeric>
                           <span className={'icon-droplet'}
                                 style={
                                     {
                                         color: n.color[0],
                                         fontSize: '30px',
                                     }
                                 }

                           />
                </TableCell>
                <TableCell className={classes.block} numeric>
                    {
                        n.variants[0].price
                    }
                </TableCell>
                <TableCell className={classes.block} numeric>
                           <span
                               className={'icon-cart'}
                               style={
                                   {
                                       cursor: 'pointer',
                                       fontSize: '30px',
                                   }
                               }
                               onClick={() => {
                                   const user = authReducer.state.user as UserProfile;
                                   if (!!user) needLoginFirst(history);
                                   addToCart(user, n, history)
                               }}
                           />
                </TableCell>
            </TableRow>)}
        </TableBody>
    </Table>


};

export default withRouter(TagList)