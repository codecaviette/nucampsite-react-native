// This Main component is a container component, the parent to presentational components 
// This React Native component looks exactly like React! 


import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import { CAMPSITES } from '../shared/campsites';


class Main extends Component {              // We use class component so that we can hold state in this comp.
    constructor(props){
        super(props);
        this.state = {
            campsites: CAMPSITES            // Create Main comp state from CAMPSITES variable in campsites.js
        };
    }
    
    render() {
        return (
                <Directory campsites={this.state.campsites} />         // Passing Main comp's state as campsite prop to Directory comp
        );
    }
}

export default Main;
