import React, {Fragment} from 'react';
import {Dialog} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const styles = {}

class ResponsiveDialog extends React.Component {

    handleClickOpen = () => {
        this.setState({open: true});
    };
    handleClose = () => {

        this.setState({open: false});
    };
    //in parent
    //                                innerRef={e => this.popUp = e}
//this.popUp.handleClose()

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            open: false,
        }
    }

    render() {
        const {fullScreen, dialog, title} = this.props;

        return (
            <Fragment>
                <span onClick={this.handleClickOpen}>{title}</span>
                <Dialog
                    fullScreen={fullScreen ? (fullScreen) : false}
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    {dialog}
                </Dialog>
            </Fragment>
        );
    }
}


export default withStyles(styles)(ResponsiveDialog)