import {createUseStyles} from 'react-jss';

export default createUseStyles({
    wrapper: {
        padding: '0 9%'
    },
    table: {
        width: '100%',
        //backgroundColor: '#f7f7f7',
        //boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
        //borderRadius: 4,
        padding : "15px"
    },
    headerColumn: {
        color: 'rgba(0, 0, 0, 0.54)'
    },
    footerColumn: {
        borderTop: '1px solid rgb(224, 224, 224)'
    },
    placeholder: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '35px 0',
        fontSize : 24
    },

    itemList : {
        display : 'flex',
        flexDirection : 'column',
        width : "100%",
        alignItems : 'center'
    },
    itemWrapper : {
        display : 'flex',
        flexDirection : 'row',
        width : "100%",
        flex : 1,
        flexWrap : 'wrap',
        alignItems : 'center',
        borderBottom : '1px #DDD solid',
        padding : "15px 0px",
        '& > input' : {
            height : 30
        },
        maxWidth : 1000
    },
    thumbnail : {
        paddingRight : 15,
        paddingLeft : 15,
        minWidth : 150,
        '& > img' : {
            objectFit : 'contain',
            width : "100%",
            maxWidth : 150,
            height : 90
        },
    },
    infoWrapper : {
        flex : 2,
        padding : 15,
        flexWrap : 'wrap',
        minWidth : 250
    },
    name : {
        fontSize : 18,
        paddingBottom : 5
    },
    variant : {
        '& > i' : {
            fontSize : 14,
            color : "#666"   
        }
    },
    price : {
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        padding : "0px 15px",
        flex : 1
    },
    qtyBtns : {
        display : 'flex',
        flexDirection : 'column'
    },
    qtyBtn : {
        border : 'none',
        backgroundColor : 'transparent',
        width : 50,
        cursor : "pointer",
        transition : "opacity 0.3s",
        '&:hover' : {
            opacity : 0.6
        },
        '&:disabled' : {
            opacity : 0.3
        },
        height : 25
    },
    qtyValue : {
        fontSize : 18
    },
    subTotal : {
        fontSize : 18,
        fontWeight : 600,
        flex : 1,
        minWidth : 100
    },
    removeBtn : {
        '& > button' : {
            backgroundColor : 'transparent',
            border : 'none'
        }
    },
    summary : {
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'flex-end',
        justifyContent : 'center',
        flexWrap : 'wrap',
        maxWidth : 1000,
        width : "100%"
    },
    grandTotal : {
        fontSize : 24,
        padding : "30px 15px",
        '& > span' : {
            fontSize : 24
        }
    },
    checkoutBtn : {
        cursor : "pointer",
        display : 'flex',
        padding : "10px 30px",
        alignItems : 'center',
        justifyContent : 'center',
        border : '1px black solid',
        borderRadius : 3,
        minWidth : 250,
        maxWidth : 350,
        width : "100%",
        backgroundColor : 'transparent',
        transition : "background-color 0.3s, color 0.3s",
        '&:hover' : {
            backgroundColor : 'black',
            color : 'white'
        }
    }
});