import React, {FunctionComponent} from 'react'
import Dropzone from 'react-dropzone'
import {Theme} from '@material-ui/core'
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(
    (theme: Theme) => ({
        dropZone: {
            width: '100%',

            borderRadius: '5px',
            border: '1px dashed red',
            cursor: 'pointer',

        },
    })
);

interface Props {
    [key: string]: any

}

const DragDropZone: FunctionComponent<Props> = props => {

    const {classes, onDrop} = props;
    return (
        <Dropzone
            accept="image/jpeg, image/png"
            onDrop={onDrop}
            className={classes.dropZone}
        >
            <div>
                Photo/Video
            </div>
        </Dropzone>
    );
};

export default (DragDropZone)