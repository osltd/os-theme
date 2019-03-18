export const greyInputBackGround = '#F5F7F7';
export const purpleText = '#321052';
export const greyPaperShadow = '#E3E1E8';
export const lighterText = '#7B688C';
export const purpleButton = '#905CC4';
export const greyDivider = '#E8E4ED';
export const lightGreyText = '#969696';
export const lightPurple = '#9d91ab';
export const XXXL = '28px';
export const XXL = '18px';
export const XL = '16px';
export const L = '14px';
export const M = '12px';
export const S = '10px';
export const XS = '8px';
export const formBlock = {
    boxShadow: '-7px 8px 16px 8px #F0F1F3',
    borderRadius: '5px',
    border: regBorder,
    padding: '30px 30px 50px 30px',
    backgroundColor: 'white',
};
export const tableBlock = {
    boxShadow: '-7px 8px 16px 0px #F0F1F3',
    borderRadius: '5px',
    border: regBorder,
    padding: '0',
    backgroundColor: 'white',
};
export const regBorder = '1px solid #E8E4ED';
export const shopListItem = {
    height: '100%',
    width: '100%',
    marginTop: '5px',
};
export const regMainBodyPadding = '0px 40px 40px 40px';
export const textBoxShadow = 'inset 0 2px 2px 0 #efefef';

export const tableHeader = {
    fontFamily: 'ocsSemiBold',
    fontSize: M,
    textTransform: 'uppercase',
    color: '#9d91ab',

};
export const headerDivider = {
    marginBottom: '30px',
};
export const imgWraper = {
    width: '85px',
    minHeight: "85px",
    maxHeight: 'auto',
    float: 'left',
    height: '85px',
    margin: '3px 20px 3px 3px',
    padding: '3px',
    borderRadius: '2px',

};
export const imgWraped = {
    maxWidth: '100%',
    objectFit: 'cover',
    minHeight: '85px',
    height: 'auto',
    borderRadius: '2px',
};
export const blogContainer = {
    padding: '0px 30px',
};
export const sticky = {
    position: 'sticky',
    top: '0',
    zIndex: '10',

};

const dot = (color = '#ccc') => ({
    alignItems: 'flex-start',
    display: 'flex',

    ':before': {
        backgroundColor: color,
        borderRadius: 10,
        display: 'block',
        marginRight: 8,
        height: 10,
        width: 10,
    },
});
export const feedsTagsBar = {
    backgroundColor: 'white',
    '& > div:last-child': {
        margin: '0px',
        padding: '0px',
        height: '30px',
    },
    '& > div:nth-child(3)': {
        height: '0px',
        margin: '-19px 0px 0px 0px',
    },
};
export const whiteButton = {
    width: 'auto',
    // display: 'inline-block',
    backgroundColor: 'white',
    border: '1px solid' + greyDivider,
    cursor: 'pointer',
    display: 'inline-block',
    padding: '10px',
};
const generalSnackbar = {
    autoHideDuration: 2000

};
export const infoSnackbar = {
    ...generalSnackbar,
    variant: 'info',
};
export const successSnackbar = {
    ...generalSnackbar,

    variant: 'success',
};
export const warningSnackbar = {
    ...generalSnackbar,

    variant: 'warning',
};
export const errorSnackbar = {
    ...generalSnackbar,

    variant: 'error',
};