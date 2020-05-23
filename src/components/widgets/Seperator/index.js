import React from 'react';

function Separator(props) {
    return <div id={props.id} 
                style={{ 
                    width : "100%", 
                    height : 1, 
                    backgroundColor : "#dfdfdf", 
                    ...props.styles
            }}></div>;
}

export default Separator;