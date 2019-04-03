import React, {useState} from "react";
import {Product} from "../../../../interfaces/server/Product";
import {TonerVariants} from "../../../../interfaces/client/structure";
import {validateTonerProduct} from "./Effect";
import _ from 'lodash'
import {Grid, Theme} from '@material-ui/core'
import Header from './Sections/Header'
import TonerTable from './Sections/TonerTable'
import {makeStyles} from "@material-ui/styles";

const useStyle = makeStyles(
    (theme: Theme) => ({
        root: {
            backgroundColor: theme.palette.background.paper
        }
    })
);

interface Props {
    products: Array<Product>
}

const Toner: React.FunctionComponent<Props> = props => {
    const {products} = props;
    const classes = useStyle();
    const validatedProducts: Array<TonerVariants & Product> = validateTonerProduct(products);
    const companyList: Array<string> = _.uniq(validatedProducts.map(n => n.company[0]));
    const [company, setCompany] = useState(companyList[0]);
    const selectedProducts = validatedProducts.filter(n => n.company[0] === company);

    return <Grid container className={classes.root}>
        <Header data={companyList.map(n => ({
            label: n,
            value: n,
            onClick: () => setCompany(n)
        }))} tag={company}/>
        <TonerTable data={selectedProducts}/>
    </Grid>

};

export default React.memo(Toner)