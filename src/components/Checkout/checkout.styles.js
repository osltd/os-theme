import { createUseStyles } from 'react-jss';

export default createUseStyles({
    wrapper: {
        padding: '0 9%',
        display: 'flex'
    },
    formGroup: {
        flex: 1,
        margin: '0 10px',
        '&:first-child': {
            marginLeft: 0
        },
        '&:last-child': {
            marginRight: 0
        }
    },
    formInput: {
        width: '100%',
        height: 40,
        borderRadius: 2,
        border: '1px #dadada solid',
        padding: '0 15px',
        transition : "border 0.3s",
        '&:focus' : {
            border: '1px black solid',
        }
    },
    inputSet: {
        margin: '15px -5px -5px',
        '&:first-child': {
            marginTop: -5
        }
    },
    inputGroup: {
        display: 'flex'
    },
    inputWrapper: {
        display: 'flex',
        flex: 1,
        margin: 5
    },
    phoneInput: {
        display: 'flex',
        '& > div': {
            flex: 1
        },
        '& > div > input': {
            width: '100%'
        }
    },

    item : {
        display : 'flex',
        flexDirection : 'row',
        flexWrap : 'wrap',
        width : "calc(100% - 30)",
        padding : 15
    },
    itemThumb : {
        padding : "0px 10px",
        width : 50,
        height : 50,
        objectFit : 'contain'
    },
    itemInfo : {
        display : 'flex',
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
        flexWrap : 'wrap'
    },
    itemName : {
        flex : 1,
        minWidth : 200,
        fontSize : 16,
        '& > span' : {
            fontSize : 14,
            color : '#333'
        }
    },
    itemPrice : {
        padding : "15px 0px",
        fontSize : 14,
        '& > span' : {
            fontSize : 14
        }
    },
    couponForm : {
        width : "100%",
        display : 'flex',
        flexDirection : 'row',
        flexWrap : 'wrap',
        padding : "0px 15px",
        margin : "15px 0px",
        '& > div' : {
            flex : 3,
            //minWidth : 200
        },
        '& > input' : {
            minWidth : 200,
            height: 30,
            borderRadius : 3
        }
    },
    checkCouponBtn : {
        backgroundColor : 'transparent',
        border : 'none',
        cursor : "pointer",
        transition : "opacity 0.3s",
        fontSize : 14,
        '&:hover' : {
            opacity : 0.6
        }
    },
    summary : {
        padding : 15
    },
    summaryRow : {
        display : 'flex',
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent : 'space-between',
        padding : "5px 0px",
        fontSize : 14,
        '& > *' : {
            fontSize : 14
        }
    },
    actionBtn : {
        backgroundColor : 'transparent',
        border : 'none',
        display : 'flex',
        width : "100%",
        justifyContent : 'center',
        alignItems : 'center',
        fontSize : 14,
        border : '1px black solid',
        transition : 'opacity 0.3s',
        borderRadius : 3,
        padding : 10,
        cursor : 'pointer',
        '&:hover, &:disabled' : {
            opacity : 0.6,
            border : '1px #BBB solid',
        }
    },
    termsnConditions : {
        paddingTop : 25,
        '& > span' : {
            color : "#777",
            fontSize : 12
        }
    },
    placeholder : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '35px 0',
        fontSize : 24
    },
    pickupmsg : {
        fontSize : 14,
        padding : 15,
        backgroundColor : '#EFEFEF',
        borderRadius : 3,
        marginTop : 15
    },

    // for tablet
    '@media (max-width: 1200px)': {
        inputGroup: {
            display: 'block'
        },
        inputSet: {
            '&:last-child': {
                marginTop: 30
            }
        }
    },



    // for mobile
    '@media (max-width: 600px)': {
        wrapper: {
            display: 'block'
        },
        formGroup: {
            margin: 0,
            '&:last-child': {
                marginTop: 60
            }
        },
        inputGroup: {
            display: 'block'
        },
        inputSet: {
            '&:last-child': {
                marginTop: 30
            }
        }
    }
});