import React from 'react';
import {Grid, Typography} from '@material-ui/core'
import ImageWrapper from "../Widget/Img";

interface Props {
    title: Node
    subTitle: Node
    img?: string
}

export const SwalContent: React.FunctionComponent<Props> = props => {
    const {title, subTitle, img} = props
    console.log(props)
    return (<Grid container alignItems={'center'} spacing={16} direction={'column'}>
        <Grid item> <Typography variant={'h5'}>

            {title}
        </Typography>

        </Grid>
        <Grid item>

            <Typography variant={"subtitle1"} style={
                {
                    color: 'grey'
                }
            }>

                {subTitle}
            </Typography>
        </Grid>

        <Grid item xs={6}>
            {false && <span className={'icon-like'}
                            style={{
                                fontSize: '80px',
                                color: 'hsla(100,55%,69%,.5)',
                                padding: '20px',
                                display: 'block',
                                width: '80px',
                                height: '80px',
                                border: '4px solid hsla(98,55%,69%,.2)',
                                borderRadius: '50%',
                                boxSizing: 'content-box',
                            }}
            />}
            <ImageWrapper src={img ? img : '/img/snackBar/add_to_cart.png'}/>
        </Grid>
    </Grid>)
};


