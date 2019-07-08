import React, {
    forwardRef,
    ForwardRefExoticComponent,
    PropsWithoutRef,
    ReactNode,
    RefAttributes,
    useImperativeHandle,
    useState
} from 'react';
import {Dialog} from '@material-ui/core';
import classNames from 'classnames'
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    dialog: {
        backgroundColor: 'white',
        opacity: 0.91,
        maxWidth: '100%',

    },
    opacity: {
        opacity: 1,
    }

});

interface Props {
    fullScreen?: boolean
    dialog: ReactNode
    title: ReactNode
    opacity?: boolean

}

export interface DialogRefProps {
    handleClose: () => void
}

/**
 * in parent,const tempRef = useRef<DialogRefProps>(null);
 * <Dialog ref={tempRef}/>
 * call handleClose by    if (tempRef.current) {
                                        tempRef.current.handleClose()
                                    }
 *
 */
type T = PropsWithoutRef<Props> & RefAttributes<DialogRefProps>
export const ResponsiveDialog: ForwardRefExoticComponent<T> = forwardRef((props, ref) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const {fullScreen, dialog, opacity, title} = props;
    useImperativeHandle(ref, () => ({
        handleClose: () => {
            setOpen(false)
        }
    }));
    return (
        <>
            <span onClick={() => setOpen(true)}>{title}</span>
            <Dialog
                className={classNames(opacity ? classes.opacity : '', classes.dialog)}
                fullScreen={(fullScreen)}
                open={open}
                onClose={() => setOpen(false)}
            >
                {dialog}
            </Dialog>
        </>
    );
});

export default ResponsiveDialog