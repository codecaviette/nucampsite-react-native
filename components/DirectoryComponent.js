import React, { Component } from 'react';
import { FlatList } from 'react-native';                    // These two comp's, FlatList and ListItem, work very well together; They are analogous to HTML's ul and li
import { Tile } from 'react-native-elements';               // During React--Redux conversion, we traded out ListItem for Tile
import { connect } from 'react-redux';                      // During conversion from React to Redux, connect replaces {CAMPSITES} files
import { baseUrl } from '../shared/baseUrl';                // During React--Redux conversion, imported this bc it includes my IP address which is where we'll be pulling campsites data from
// import { CAMPSITES } from "../shared/campsites";         // During React--Redux conversion, removed this b/c we'll be pulling this data from the json-server instead of this file


const mapStateToProps = state => {          // This Redux function receives state as a prop from Redux store and returns only campsites data from the state. This is the Redux way to signal what part of 
    return {                                // the state we're interested in using, rather than grabbing the entire state.
        campsites: state.campsites,         // In this comp, we're only interested in the campsites data from the entire state
    };
};

class Directory extends Component {             // Update Directory comp from functional comp to class comp so we can hold state
    
    static navigationOptions = {                // Configure the text for the header title of each view by using static keyword (from JS) to apply a method on class itself rather than the object that's created from class
        title: 'Directory'
    };

    render() {
        
        // react-navigation provides each screen comp in the app with the navigation prop automatically; this nav prop gives us access to functions such as navigate
        const { navigate } = this.props.navigation;       // Since the navigate function is all we need from navigation prop reference we can destructure it like this; use this to navigate to a campsite depending on what campsite user taps on 

        // Define function used in FlatList
        const renderDirectoryItem = ({item}) => {         // In this arrow fxn, for the params, by default, FlatLine passes an object as argument. We're only interested in one property of that object: item, which we've destructured from passed state called campsites (in FlatList)
            return (
                <Tile  
                    title={item.name}                     // Destructure item property; need {} so JSX parser knows to process item.name as JS rather than a string
                    caption={item.description}
                    featured
                    onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })}   // For onPress prop, we wrap navigate fxn in an arrow fxn so it can be called multiple times, ie each time it's pressed. If no arrow fxn, could only be called once and not reused. 
                    imageSrc={{uri: baseUrl + item.image}}
                    />
            );
        };

        return (                                                 // No <div> wrapper needed 
                <FlatList                                        // FlatList comp expects some props: data, renderItem, keyExtractor. FlatList iterates through items in data prop and performs function specified in renderItem. 
                    data={this.props.campsites.campsites}        // data tells FlatList where it's getting its data from. FlatList expects data prop to get an array. We're setting this data prop equal to the passed prop from Redux store
                    renderItem={renderDirectoryItem}             // renderItem specifies how to render each item in the list; will do this by using callback function which we'll define and supply 
                    keyExtractor={item => item.id.toString()}    // Similar to how in React when we render a list from array we had to set up unique key; FlatList gives us an easy way to do that - since each of our campsite items has a unique id, we can pull that out here. FlatList expects a string.
                />        
        );
    }
}

export default connect(mapStateToProps)(Directory); 