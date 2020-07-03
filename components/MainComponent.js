// This Main component is a container component, the parent to presentational components 
// This React Native component looks exactly like React! 


import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { View } from 'react-native';
import { CAMPSITES } from '../shared/campsites';


class Main extends Component {              // We use class component so that we can hold state in this comp.
    constructor(props){
        super(props);
        this.state = {                      // Local state
            campsites: CAMPSITES,           // Create Main comp state from CAMPSITES variable in campsites.js
            selectedCampsite: null          // Reserves space in local state for selected campsite so we know which one to tell CampsiteInfo comp to display at bottom of page
        };
    }
    
    // Event handler to handle when a campsite is selected by viewer
    onCampsiteSelect(campsiteId) {
        this.setState({selectedCampsite: campsiteId})           // this.setState updates the React state
    }

    render() {
        return (
            // View comp: Like in React, in RN can only return and render one top-level comp, so use View comp wrapper. Set style prop to flex comp of normal size                 
            <View style={{flex:1}} >              
                <Directory 
                    campsites={this.state.campsites}                            // Passing Main comp's state as campsite prop to Directory comp 
                    onPress={campsiteId => this.onCampsiteSelect(campsiteId)}  // Passing onCampsitesSelect method to Directory comp. Using arrow fxn. We're not calling the onCampsiteSelect function - we're passing it to Directory comp with campsiteId param, so it's available to be triggered from Directory comp
                />
                <CampsiteInfo
                    campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]}   // To pass the CampsiteInfo comp an entire object from the Main's state, we filter thru the state's array which creates a new array, and from that we'll 
                                                                                                                         // select the 1st item, [0], which is the campsite object where the campsiteId matches what's in selectedCampsite
                />                                                                                                       
            </View>  
        );
    }
}

export default Main;
