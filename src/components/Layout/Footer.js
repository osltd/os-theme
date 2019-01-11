import PropTypes from "prop-types";
import React from 'react'
import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';
import SearchBar from '../Widget/SearchBar/email'
import FooterList from '../Widget/FooterList'
import Tag from '../Widget/Tags/Tag'
import SocialIcon from '../Widget/SocialIcon'

const styles = theme => ({
    root: {
        padding: '50px 100px 100px 100px',
        backgroundColor: 'black',
        color: 'white',
    },
    emailBar: {
        marginBottom: '30px',
    }
});


class Footer extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <Grid container justify={'space-between'} className={classes.root}>
                <Grid item container lg={12} direction={'column'} spacing={16} className={classes.emailBar}
                       >
                    <Grid item>
                        <Typography variant={'title'} color={'inherit'}>
                            NEWSLETTER
                        </Typography>
                    </Grid>

                    <Grid item>
                        <SearchBar/>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={3} container direction={'column'} spacing={8}>
                    <Grid item>
                        <Typography variant={'title'} color={'inherit'}>MYSHOP</Typography>

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
                    <Grid item>
                        <SocialIcon
                            type={'facebook'}
                        />
                        <SocialIcon
                            type={'youtube'}
                        /><SocialIcon
                        type={'twitter'}
                    /><SocialIcon
                        type={'reddit'}
                    /><SocialIcon
                        type={'whatsapp'}
                    />
                    </Grid>
                </Grid>

                <Grid item xs={6} md={3} container direction={'column'} spacing={8}>
                    <Grid item>
                        <Typography variant={'title'} color={'inherit'}>
                            FIND US ON</Typography>
                    </Grid>
                    <Grid item>
                        <FooterList/>
                    </Grid>

                </Grid>
                <Grid item xs={6} md={3} container direction={'column'} spacing={8}>
                    <Grid item>
                        <Typography variant={'title'} color={'inherit'}>TAGS</Typography>
                    </Grid>
                    <Grid item>
                        <Tag value={'color'}/>
                        <Tag value={'gaming'}/>
                        <Tag value={'gaming'}/>
                        <Tag value={'clothes'}/>
                        <Tag value={'iphoneX'}/>
                        <Tag value={'Play Station 4'}/>
                    </Grid>
                </Grid>

            </Grid>);
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer)