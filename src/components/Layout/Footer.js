import PropTypes from "prop-types";
import React from 'react'
import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';
import SearchBar from '../Widget/SearchBar/email'
import FooterList from '../Widget/FooterList'

const styles = theme => ({
    root: {
        width: '100%',
        padding: '0 100px 20px 100px',
        marginTop: '30px',
        backgroundColor: 'black',
        color: 'white',
    }
});


class Footer extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <Grid container justify={'space-between'} className={classes.root}>
                <Grid item container lg={12} direction={'column'} alignItems={'center'} justify={'center'}>
                    <Grid item>
                        <Typography variant={'title'} color={'inherit'}>
                            NEWSLETTER
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'subheading'} color={'inherit'}>
                            Be the first to hear about new styles and offers and see how you’ve helped.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <SearchBar/>
                    </Grid>
                </Grid>
                <Grid item sm={4}>
                    <Typography variant={'display1'} color={'inherit'}>

                        THE BELL</Typography>
                    <Typography variant={'body2'} color={'inherit'}>

                        We are a team of designers and developers that create quality Wordpress, Magento, Prestashop,
                        Opencarte themes and provided premium and dedicated support to our products.

                        205 Arapahoe St, Schoenchen, KS 69696
                    </Typography>
                    <Typography variant={'title'} color={'inherit'}>

                        Email: your@example.com
                    </Typography>
                    <Typography variant={'title'} color={'inherit'}>

                        Phone: +1 123-456-6789
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant={'title'} color={'inherit'}>

                        USEFUL LINKS</Typography>
                    <FooterList/>
                </Grid>


                <Grid item>
                    <Typography variant={'title'} color={'inherit'}>
                        FIND US ON</Typography>
                    <FooterList/>

                </Grid>
                <Grid item>
                    <Typography variant={'title'} color={'inherit'}>

                        TAGS</Typography>
                    <FooterList/>

                </Grid>

            </Grid>);
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer)