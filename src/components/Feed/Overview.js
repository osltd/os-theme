import React from 'react';
import {createUseStyles} from 'react-jss';
import {connect} from 'react-redux';
import _ from 'lodash';




import withWidth, {isWidthUp} from '@material-ui/core/withWidth/index';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';




import FeedOverviewBox from '../Widget/Feed/overviewBox'
import Header from '../Layout/Body/Header'
import List from '../Widget/List'
import SearchBar from '../Widget/SearchBar/original'
import {getTagsCountsArray, refactorTextLength} from "../../api/ApiUtils";

import Gallery from './Gallery'
import {FEED_EDIT_FILTER} from "../../constants/actionType";
import LoadingPage from '../Layout/LoadingPage'
import {I18nText} from "../Widget/I18nText";
import {keyOfI18n} from "../../constants/locale/interface";
import {useI18nText} from "../../hooks/useI18nText";



const styles = createUseStyles({
    // for desktop & tablet
    wrapper: {
        display: 'flex',
        padding: '0 9%'
    },
    menu: {
        width: '25%'
    },
    list: {
        width: 'calc(75% - 35px)',
        marginLeft: 35,
        display: 'flex',
        flexWrap: 'wrap'
    },
    
    searchBox: {
        marginBottom: 35
    },

    menuTitle: {
        flex: 1,
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
        fontSize: 20,
        fontWeight: 400,
        padding: 0,
        marginTop: 0,
        backgroundColor: 'transparent'
    },

    placeholder: {
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif'
    },
    item: {
        width: 'calc(33.3% - 30px)',
        backgroundColor: 'transparent',
        borderWidth: 0,
        flexBasis: 'auto',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        margin: 15,
        padding: 0
    },
    
    '@media (max-width: 1279px)': {
        item: {
            width: '100%'
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
        }
    }
});


const mapStateToProps = state => ({
    feeds: state.feed.feeds,
    sort: state.feed.sort,
    filter: state.feed.filter,

});


const mapDispatchToProps = dispatch => ({
        editFeedFilter: (key, value) => dispatch({
            type: FEED_EDIT_FILTER,
            payload: {
                key: key,
                value: value,
            },
        }),

    }
);

// class ResponsiveDialog extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             timer: () => null
//         }

//     }
//     onChange = value => {
//         clearTimeout(this.state.timer);
//         this.setState(
//             {
//                 timer: setTimeout(() => this.props.editFeedFilter('keyword', value), 500)
//             }
//         )
//     };


//     renderMenu() {
//         const classes = styles();
//         const {width} = this.props;
//         const isMobile = !isWidthUp('sm', width);
//         return <div
//             className={isMobile ? '' : classes.menu}
//         >
            
//             <div>
//                 <div style={{
//                     display: 'flex'
//                 }}>
//                     <h3
//                         className={classes.menuTitle}
//                     >
//                         <I18nText keyOfI18n={keyOfI18n.FEED_CATEGORY}/>
//                     </h3>
//                     {isMobile && <div>
//                         <button
//                             type="button"
//                             onClick={() => this.setState({
//                                 showCategories: !this.state.showCategories
//                             })}
//                             style={{
//                                 width: '100%',
//                                 height: '100%',
//                                 borderWidth: 0,
//                                 backgroundColor: 'transparent',
//                                 display: 'flex',
//                                 cursor: 'pointer'
//                             }}
//                         >
//                             {this.state.showCategories ? <ExpandMoreIcon/> : <ExpandLessIcon/>}
//                         </button>
//                     </div>}
//                 </div>
//                 <List
//                     data={getTagsCountsArray(this.props.feeds, (tag, number) => {
//                         this.props.editFeedFilter('tag', tag)
//                     })}
//                     selectedValue={this.props.filter.tag}
//                     closed={this.state.showCategories == undefined ? isMobile : !this.state.showCategories}
//                 />
//             </div>
//         </div>;
//     }
//     renderList() {
//         const classes = styles();
//         const {feeds, width} = this.props;
//         const isMobile = !isWidthUp('sm', width);
//         return <div
//             className={isMobile ? '' : classes.list}
//         >
//             <Gallery
//                 elements={feeds == undefined ? <LoadingPage/> : (
//                     feeds.length > 0 ? feeds.map((n, i) => <FeedOverviewBox
//                         id={n.id}
//                         medias={n.sections[0].media}
//                         src={n.sections && n.sections.find(section => !!section.media[0]
//                         ) ? n.sections.find(section => section.media[0]).media[0].url :
//                             'https://www.freeiconspng.com/uploads/no-image-icon-15.png'}

//                         subTitle={refactorTextLength(n.sections[0].description)}
//                         title={n.sections[0].title}
//                         author={(n.reactor && n.reactor.length > 0 )? n.authors[0].name.first + ' ' + n.authors[0].name.last : useI18nText(keyOfI18n.NO_AUTHORS)}
//                         postDate={n.time}
//                         comments={0}
//                     />) : 
//                 )}
//             />
//         </div>;
//     }


//     render() {
//         const {width} = this.props;
//         const isMobile = !isWidthUp('sm', width);
//         return <div>
//                 {!isMobile && <Header/>}
                
//         </div>;
//     }
// }


const ResponsiveDialog = props => {
    const classes = styles();
    const {feeds} = props;

    const renderMenu = () => <div className={classes.menu}>
        <div className={classes.searchBox}>
            <h3 className={classes.menuTitle}>
                <I18nText keyOfI18n={keyOfI18n.SEARCH}/>
            </h3>
            <div>
                <SearchBar
                    value={props.filter.keyword}
                    // onChange={value => this.onChange(value)}
                    placeholder={useI18nText(keyOfI18n.TYPE_KEYWORDS)}/>
            </div>
        </div>
    </div>;
    const renderList = () => <div className={classes.list}>
        {feeds == undefined ? <LoadingPage/> : (
            feeds.length < 1 ? <p className={classes.placeholder}>
                    <I18nText keyOfI18n={keyOfI18n.NO_POST_AVAILABLE}/>
            </p> : feeds.map((n, i) => <button
                key={i}
                type="button"
                className={classes.item}
            >
                test
            </button>)
        )}
    </div>;

    return <div>
        <Header/>
        <div className={classes.wrapper}>
            {renderMenu()}
            {renderList()}
        </div>
    </div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDialog)