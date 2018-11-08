import React from 'react'

class Shield extends React.Component {
    constructor(props) {
        super(props);
        // Add some default error states
        this.state = {
            error: false,
            info: null,
        };
    }

    componentDidCatch(error, info) {
        // Something happened to one of my children.
        // Add error to state
        this.setState({
            error: error,
            info: info,
        });
    }

    render() {
        if (this.state.error) {
            // Some error was thrown. Let's display something helpful to the user
            return (
                <div>
                    <h5>Sorry. More than five characters!</h5>
                    <details style={{whiteSpace: 'pre-wrap'}}>
                        {this.state.info.componentStack}
                    </details>
                </div>
            );
        }
        // No errors were thrown. As you were.
        return this.props.children;
    }
}

export default Shield