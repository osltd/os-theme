import * as React from 'react';
import Masonry from 'react-masonry-component';

const masonryOptions = {
    transitionDuration: '1s',
    horizontalOrder: true,
    gutter: 20,


};

const imagesLoadedOptions = {background: '.my-bg-image-el'};

class Gallery extends React.Component {
    render() {
        const childElements = this.props.elements;

        return (
            <Masonry
                className={'my-gallery-class'} // default ''
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                imagesLoadedOptions={imagesLoadedOptions} // default {}
            >
                {childElements}
            </Masonry>
        );
    }
}

export default Gallery;