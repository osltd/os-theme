import React, {useEffect, useState} from 'react'
import {Grid} from "@material-ui/core";

const fadeIn = `
  @keyframes gracefulimage {
    0%   { opacity: 0.25; }
    50%  { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;
const url = 'https://i.gifer.com/EXfZ.gif';

interface Props {
    src: string
    onClick?: () => void
    className?: string
}

export const ImageWrapper: React.FunctionComponent<Props> = props => {

    const [loaded, setLoaded] = useState(false);
    useEffect(
        () => {
if(document.head){

            const exists = document.head.querySelectorAll('[data-gracefulimage]');

            if (!exists.length) {
                const styleElement: any = document.createElement('style');
                // change exists attribute value to true
                styleElement.setAttribute('data-gracefulimage', 'exists');

                document.head.appendChild(styleElement);
                styleElement.sheet.insertRule(fadeIn, styleElement.sheet.cssRules.length);
            }
}

        }, [loaded]
    );


    const {onClick, src, className} = props;
    return <Grid item xs={12}>

        {(!loaded) ? <img
            src={url}
            style={{
                backgroundColor: 'none',
                cursor: 'pointer',
                width: '100%'
            }}
        /> : null}
        <img
            src={src}
            onClick={onClick}
            className={className}
            onLoad={() => setLoaded(true)}
            style={{
                animationName: 'gracefulimage',
                animationDuration: '0.3s',
                animationIterationCount: 1,
                width: '100%',
                cursor: 'pointer',
                animationTimingFunction: 'ease-in',
                display: !loaded ? 'none' : undefined,
            }}
        />
    </Grid>


};

export default ImageWrapper
