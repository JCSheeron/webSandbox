import React from 'react';

class Component1 extends React.Component {

    constructor(props) {
        // ctor usually used to initialize local state, and bind event handlers
        super(props); // do this first or this.props will be undefined
        // ctor
        // Use this.state and not setState() in ctor, and setState() everywhere else
        this.state = {
            shared: false,
            unDoneItems: [],
            doneItems: []
        };

        // bind event handlers
        this.toggleShared = this.toggleShared.bind(this);
    }

    componentDidMount() {
        console.log("Component1 just mounted!")
    }

    componentDidUpdate() {
        console.log("Component1 just updated.")
    }

    componentWillUnmount() {
        console.log("Component1 will unmount.")
    }

    toggleShared = () => {
        this.setState(prevState => ({
            shared: !prevState.shared
        }));
    }
    
    render() {
        console.log(this)
        return(
            <div>
                <h1>Component1 is {this.state.shared ? 'Shared' : 'Not Shared'}</h1>
                <button onClick={this.toggleShared}>Shared</button>
            </div>
        )
    }
}

export default Component1;
