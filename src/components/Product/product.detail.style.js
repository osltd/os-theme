import {createUseStyles} from 'react-jss';

export default createUseStyles({
    wrapper: {
        padding: '0 9%'
    },
    navigator: {
        marginBottom: 45
    },
    content: {
        display: 'flex',
        flexDirection: 'column'
    },
    detail: {
        flex : 1,
        paddingTop : 60,
        borderTop : "0.5px #DDD solid",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    detailWrapper : {
        display : 'flex',
        flexWrap : 'wrap',
        flex : 1,
        maxWidth : 1200,
        flexDirection : 'row',
        width : "100%"
    },
    leftCol : {
        display : 'flex',
        flex : 2,
        flexDirection : 'column',
        minWidth : 250
    },
    rightCol : {
        display : 'flex',
        flex : 1,
        flexDirection : 'column',
        minWidth : 250
    },

    backArrow: {
        cursor: 'pointer',
        backgroundColor: 'transparent',
        borderWidth: 0,
        display: 'flex',
        alignItems: 'center',
        padding: 0
    },
    backIcon: {
        fontSize: 20,
        marginRight: 5
    },
    backText: {
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif'
    },


    viewer: {
        display : 'flex',
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        borderBottom : '0.5 #DDD solid',
        marginBottom : 40
    },
    slideImageWrapper : {
        width : '100%',
        //maxWidth : 1200,
        maxHeight : 600,
        backgroundColor : 'white'
    },
    slideImage : {
        width : '100%',
        maxHeight : 600,
        objectFit : 'contain'
    },

    
    addBtn: {
        marginTop: 10,
        width : '100%',
        '& > button': {
            width : '100%',
            backgroundColor : "transparent",
            border: "1px black solid",
            padding: '10px 20px',
            borderRadius : "3px",
            cursor : "pointer"
        }
    },
    addBtnDisabled : {
        marginTop: 10,
        width : '100%',
        '& > button': {
            width : '100%',
            backgroundColor : "transparent",
            border: "1px #DDD solid",
            borderRadius : "3px",
            padding: '10px 20px',
            opacity : "0.6"
        }
    },


    title : {
        fontSize : 29,
        fontWeight : 300,
        color : '#333',
        marginTop : 0
    },
    description: {
        color : '#333',
        fontSize: 16,
        lineHeight : '150%',
        marginBottom : 35
    },
    stockPriceWrapper : {
        display:'flex', 
        flexDirection: 'row',
        alignItems : 'center'
    },
    stock : {
        padding : "10px 0px",
        '& > span > i' : {
            fontSize : 12
        }
    },
    price : {
        fontSize : 20,
        fontWeight : 300,
        marginRight : 6
    },
    form : {
        marginBottom : "15px"
    },  
    optionSelectorsWrapper : {
        marginBottom : "10px"
    },
    optionSelector : {
        //maxWidth : 400,
        width : "100%",
        marginBottom : 20
    },
    optionTitle : {
        fontSize : 12,
        marginBottom : 5
    },

    qtyGroup : {
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        height : 50,
        marginBottom : 15
    },
    qtyBtn : {
        border : 'none',
        backgroundColor : 'transparent',
        width : 55,
        '&:hover' : {
            opacity : 0.6
        },
        '&:disabled' : {
            opacity : 0.3
        },
        height : 50
    },
    qtyValue : {
        fontSize : 24,
        marginLeft : 50,
        marginRight : 50
    },
    qtyValueLabel : {
        fontSize : 12,
    },
    shares : {
        width : '100%'
    },


    // for mobile
    '@media (max-width: 600px)': {
        wrapper: {
            padding: '0 5%'
        },
        viewer: {
            width: '100%'
        },
        detail: {
            width: '100%'
        },
        content: {
            display: 'block'
        },
    }

});