import {createUseStyles} from 'react-jss';

export default createUseStyles({
    tips: {
        padding: '0 3%',
        marginTop: 50
    },
    tipsWrapper: {
        margin: 0,
        display: 'flex',
        flexWrap: 'wrap',
        padding: 0,
    },
    tipsItem: {
        display: 'flex',
        width: 'calc(50% - 20px)',
        backgroundColor: '#f7f7f7',
        margin: 10,
        cursor : "pointer",
        transition : "box-shadow 0.3s",
        "&:hover" : {
            boxShadow : "3px 3px 15px #EFEFEF"
        }
    },

    featuredMerchandises: {
        padding: '0 3%',
        marginTop: 50
    },
    featuredMerchandisesWrapper: {
        display: 'flex',
        margin: 0,
        padding: 0
    },
    featuredMerchandisesItem: {
        display:'flex',
        flexDirection : 'column',
        width: 'calc(20% - 20px)',
        margin: 10,
        backgroundColor: 'transparent',
        alignItems : 'center',
        borderWidth: 0,
        cursor: 'pointer',
        transition : "box-shadow 0.3s",
        "&:hover" : {
            boxShadow : "3px 3px 15px #EFEFEF"
        }
    },
    itemName : {
        textAlign : "left",
        paddingBottom : 7,
        fontSize : 19,
        fontWeight : 500,
        color : "#000"
    },
    itemPrice : {
        textAlign : "left",
        paddingBottom : 15,
        fontSize : 17,
        fontWeight : 300,
        textAlign : "left",
        color : "#666"
    },

    // for mobile
    '@media (max-width: 600px)': {
        tipsItem: {
            display: 'block',
            width: 'calc(100% - 20px)'
        },
        featuredMerchandisesWrapper: {
            display: 'block'
        },
        featuredMerchandisesItem: {
            width: 'calc(100% - 20px)'
        }
    }
});