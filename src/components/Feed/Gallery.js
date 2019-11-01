import * as React from 'react';
import {withStyles} from "@material-ui/core/styles/index";

import Masonry from 'react-masonry-component';

const masonryOptions = {
    transitionDuration: '1s',
    horizontalOrder: true,
    gutter: 20,


};

const imagesLoadedOptions = {background: '.my-bg-image-el'};



const styles = theme => ({

    root: {
        display: 'flex',
        flexWrap: 'wrap'
    }

});

class Gallery extends React.Component {
    render() {
        const childElements = this.props.elements;
        const classes = this.props.classes;

        return (
            <div
                className={classes.root} // default ''
                // options={masonryOptions} // default {}
                // disableImagesLoaded={false} // default false
                // updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                // imagesLoadedOptions={imagesLoadedOptions} // default {}
            >
                {childElements}
            </div>
        );
    }
}

export default withStyles(styles)(Gallery);