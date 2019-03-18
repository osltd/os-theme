import React from "react";
import ColorPick from '../../Widget/ColorPicker'
import Tag from '../../Widget/Tags/Tag'

let Variants = (props) => {
    const {keyName, index, variantOptions, needRender = true} = props;
    console.log('variants');
    console.log(props);
    let needInit = !(props.draft[keyName]);
    if (needInit || !needRender) props.editCartVariant(keyName, variantOptions[index][0]);
    return needRender ? (keyName === 'color') ?
        <ColorPick
            colors={variantOptions[index]}
            onClick={color => props.editCartVariant(keyName, color)}
            selectedColor={props.draft[keyName]}
        /> :
        variantOptions[index].map((options, k) => <Tag
                key={k}
                value={options}
                onClick={() => props.editCartVariant(keyName, options)}
                selected={(props.draft[keyName] === options)}
            />
        ) : null

};

export default Variants