import PropTypes from "prop-types";
import React from 'react'
import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';
import SearchBar from '../Widget/SearchBar/email'
import FooterList from '../Widget/FooterList'
import Tag from '../Widget/Tags/Tag'

const styles = theme => ({
    root: {
        width: '100%',
        padding: '50px 100px 100px 100px',
        marginTop: '30px',
        backgroundColor: 'black',
        color: 'white',
    },
    emailBar:{
        marginBottom:'30px',
    }
});


class Footer extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <Grid container justify={'space-between'} spacing={16} className={classes.root}>
                <Grid item container lg={12} direction={'column'} spacing={16} className={classes.emailBar} alignItems={'center'} justify={'center'}>
                    <Grid item>
                        <Typography variant={'subheading'} color={'inherit'}>
                            NEWSLETTER
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'body1'} color={'inherit'}>
                            Be the first to hear about new styles and offers and see how you’ve helped.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <SearchBar/>
                    </Grid>
                </Grid>
                <Grid item sm={3} container direction={'column'} spacing={8}>
                    <Grid item>
                        <Typography variant={'title'} color={'inherit'}>

                            THE BELL</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'caption'} color={'inherit'}>

                            We are a team of designers and developers that create quality Wordpress, Magento,
                            Prestashop,
                            Opencarte themes and provided premium and dedicated support to our products.

                            205 Arapahoe St, Schoenchen, KS 69696
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'subheading'} color={'inherit'}>

                            Email: your@example.com
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'subheading'} color={'inherit'}>

                            Phone: +1 123-456-6789
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={3} container direction={'column'} spacing={8}>
                    <Grid item >
                    <Typography variant={'title'} color={'inherit'}>
                        USEFUL LINKS</Typography>
                    </Grid>
                    <Grid item >
                        <FooterList/>
                    </Grid>
                </Grid>
                <Grid item xs={3} container  direction={'column'} spacing={8}>
                    <Grid item>
                        <Typography variant={'title'} color={'inherit'}>
                            FIND US ON</Typography>
                    </Grid>
                    <Grid item>
                        <FooterList/>
                    </Grid>

                </Grid>
                <Grid item xs={3} container direction={'column'} spacing={8}>
                    <Grid item>
                        <Typography variant={'title'} color={'inherit'}>

                            TAGS</Typography>
                    </Grid>
                    <Grid item>
                        <Tag

                        value={'color'}
                        />
                        <Tag
                            value={'gaming'}

                        />
                        <Tag
                            value={'gaming'}

                        />
                    </Grid>
                </Grid>

            </Grid>);
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer)