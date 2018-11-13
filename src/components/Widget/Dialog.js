import React, {Fragment} from 'react';
import {Dialog} from '@material-ui/core';

class ResponsiveDialog extends React.Component {

    handleClickOpen = () => {
        this.setState({open: true});
    };
    handleClose = () => {

        this.setState({open: false});
    };

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            open: false,
        }
    }

    render() {
        const {fullScreen, child, title} = this.props;

        return (
            <Fragment>
                <span onClick={this.handleClickOpen}>{title}</span>
                <Dialog
                    fullScreen={fullScreen ? (fullScreen) : false}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >

                    {child}
                </Dialog>
            </Fragment>
        );
    }
}


export default ResponsiveDialog