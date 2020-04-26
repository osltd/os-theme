import {createUseStyles} from 'react-jss';

const styles = createUseStyles({
    wrapper: {
        display: 'flex',
        padding: '0 9%',
        flexDirection : 'column'
    },


    menu: {
        width: 'calc(100% - 35px)',
    },
    categoryList: {
        display:'flex',
        flexDirection : 'row',
        alignItems : 'center',
        overflow : 'scroll',
        padding: 15,
        '& > button' : {
            fontSize : 13,
            padding : "10px 20px",
            border : 'none',
            margin : 5,
            backgroundColor : 'transparent',
            borderRadius : 25,
            cursor : 'pointer',
            transition : 'opacity 0.3s',
            '&:hover' : {
                opacity : 0.6
            }
        }
    },


    list: {
        width: 'calc(100% - 35px)',
        // marginLeft: 35
    },
    topbar: {
        display: 'flex',
        borderTop: '1px solid #efefef',
        //borderBottom: '1px solid #efefef',
        padding: '15px 15px',
        alignItems: 'center',
        '& > div': {
            flex: 1
        },
        '& > div:nth-child(2)': {
            flex: 2.5
        }
    },
    modes: {
        '& > button': {
            marginLeft: 5,
            border: '1px solid #eee',
            backgroundColor: 'transparent',
            border : "none",
            transition : "opacity 0.3s",
            '&:hover' : {
                opacity : 0.6
            }
        },
        '& > button:first-child': {
            marginLeft: 0
        }
    },
    icon: {
        padding: 10,
        cursor: 'pointer',
        alignItems: 'center',
        border: '1px solid black',
    },
    status: {
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
        textAlign: 'center',
        //textTransform: 'uppercase'
    },
    sort: {
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
        textAlign: 'right',
        //textTransform: 'uppercase'
    },
    context: {
        display: 'flex',
        flexWrap: 'wrap'
    },


    // ------------------ Items
    item: {
        display : 'flex',
        flexDirection : "column",
        width: 'calc(33.3% - 50px)',
        backgroundColor: 'transparent',
        flexBasis: 'auto',
        margin: 25,
        padding: '10px 15px',
        cursor: 'pointer',
        border: 'none',
        transition : "opacity 0.3s",
        '&:hover': {
            opacity : 0.6
        }
    },
    media: {
        marginBottom: 25,
        height : 250,
        '& > img': {
            width: '100%',
            height : "100%",
            objectFit : "contain"
        }
    },
    name: {
        textAlign : "left",
        marginTop: 3,
        padding: 0,
        fontSize : 18,
        color : "#333"
    },
    price: {
        textAlign : "left",
        color : "#333"
    },
    tags: {
        padding : "10px 0px",
        textAlign : 'left',
        fontSize: 10,
        color: '#666',
        wordBreak: 'break-word',
        textTransform : 'uppercase',
    },


    rowItem: {
        display : 'flex',
        flexDirection : "row",
        width: 'calc(100% - 50px)',
        backgroundColor: 'transparent',
        flexBasis: 'auto',
        margin: 25,
        flexWrap : 'wrap',
        padding: '10px 15px',
        cursor: 'pointer',
        border: 'none',
        transition : "opacity 0.3s",
        '&:hover': {
            opacity : 0.6
        }
    },
    rowItemInfo : {
        display : 'flex',
        flexDirection : 'column',
        padding : 10,
        flexWrap : 'wrap',
        minWidth : 200,
        flex : 2,
        alignItems : "flex-start",
        justifyContent : "center"
    },
    rowItemMedia: {
        flex : 1,
        minWidth : 180,
        marginBottom: 15,
        height : 180,
        '& > img': {
            width: '100%',
            height : "100%",
            objectFit : "contain"
        }
    },
    rowItemName: {
        textAlign : "left",
        marginTop: 5,
        padding: 0,
        fontSize : 18,
        color : "#333"
    },
    rowItemDescription : {
        textAlign : "left",
        color : "#666",
        fontSize : 13,
    },
    rowItemPrice: {
        textAlign : "left",
        margin: '3px 0px 5px 0px',
        color : "#333"
    },
    stockStatus : {
        fontSize:12, 
        margin : "5px 0px",
        textAlign : 'left',
        '& > span > i' : {
            fontSize:12
        }
    },

    loadMoreBtnWrapper : {
        width : "100%",
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
        '& > button' : {
            marginTop : 25,
            width : 150,
            border : 'none',
            backgroundColor : '#f6f6f6',
            fontSize : 12,
            padding : "10px 20px",
            transition : 'opacity 0.3s',
            cursor : "pointer",
            '&:hover' : {
                opacity : 0.6
            }
        }
    },


    sortSelect: {
        position: 'relative',
        display : 'flex',
        justifyContent : 'flex-end',
        minWidth: 100,
        '& > div > button': {
            display: 'block',
            cursor: 'pointer',
            borderWidth: 0,
            backgroundColor: 'transparent',
            fontSize: 14,
            transition : 'opacity 0.3s',
            '&:focus': {
                outline: 0
            },
            '&:hover' : {
                opacity : 0.6
            }
        }
    },
    sortOptions: {
        width: '100%',
        position: 'absolute',
        display: 'none',
        marginTop: 35,
        padding: 0,
        boxShadow: '0 3px 8px 3px rgba(92, 92, 92, 0.2)',
        '&:before': {
            content: '""',
            position: 'absolute',
            borderColor: 'transparent transparent #f3f3f3',
            borderStyle: 'solid',
            borderWidth: '10px 15px',
            top: -20,
            left: 'calc(90% - 15px)'
        },
        '& > li': {
            listStyle: 'none'
        },
        '& > li > button': {
            display: 'block',
            width: '100%',
            borderWidth: 0,
            backgroundColor: '#f3f3f3',
            cursor: 'pointer',
            padding: '5px 0',
            fontSize: 15,
            '&:focus': {
                outline: 0
            }
        }
    },




    // for mobile
    '@media (max-width: 600px)': {
        wrapper: {
            display: 'block',
            padding: '0 5%'
        },
        menu: {
            width: '100%'
        },
        list: {
            width: '100%',
            marginLeft: 0
        },

        topbar: {
            display: 'none'
        },

        categoryList: {
            display: 'none',
            marginBottom: 20
        },

        menuTool: {
            display: 'block',
            transform: 'rotate(270deg)',
            paddingTop: 45
        },

        item: {
            width: 'calc(100% - 50px)'
        },
        name: {
            fontSize: 14
        },

        rowItem : {
            alignItems : 'center',
            justifyContent : 'center'
        },
        rowItemDescription : {
            display : 'none'
        }
    }
});

export default styles;