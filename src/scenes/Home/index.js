import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import { connect } from 'react-redux';
import actions from '../../helpers/actions';
import { MoonLoader } from 'react-spinners';
import widgets from '../../components/widgets';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

// ------------------------ REDUX ------------------------
const mapStateToProps = state => ({
    session : state.shop.session,
    settings : state.shop.settings
});
// ------------------------ /REDUX ------------------------


function Home(props){

    // get settings
    let { settings } = props;
    // get layout
    const layout = settings.layout;

    return (
        <div className="home">
            {layout.content.map((widgetSettings, idx) => {
                // get widget
                let Widget = widgetSettings.widget != undefined && widgetSettings.widget.length > 0 ? widgets[widgetSettings.widget] : undefined;
                // widget found?
                if(Widget != undefined) {
                    // return widget
                    return <Widget 
                                index={idx}
                                key={`widget-${widgetSettings.widget}-${idx}`} 
                                id={`widget-${widgetSettings.widget}-${idx}`} 
                                {...widgetSettings}
                            />;
                }
            })}
        </div>
    );
}

export default connect(mapStateToProps)(Home);