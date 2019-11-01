import * as React from 'react';
import {withStyles} from "@material-ui/core/styles/index";


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
                className={classes.root}
            >
                {childElements}
            </div>
        );
    }
}

export default withStyles(styles)(Gallery);