import React, { Component } from 'react';
import { FlatList } from 'react-native';                    // These two comp's, FlatList and ListItem, work very well together; They are analogous to HTML's ul and li
import { ListItem } from 'react-native-elements';           // ListItem will wrap around each list item; FlatList will wrap around all list items.
import { CAMPSITES } from '../shared/campsites';


class Directory extends Component {             // Update Directory comp from functional comp to class comp so we can hold state
    
    constructor(props) {                        // Moved state from Main to Directory
        super(props);
        this.state = {
            campsites: CAMPSITES
        };
    }

    static navigationOptions = {            // Configure the text for the header title of each view by using static keyword (from JS) to apply a method on class itself rather than the object that's created from class
        title: 'Directory'
    };



    render() {
        // react-navigation provides each screen comp in the app with the navigation prop automatically; this nav prop gives us access to functions such as navigate
        const { navigate } = this.props.navigation;       // Since the navigate function is all we need from navigation prop reference we can destructure it like this; use this to navigate to a campsite depending on what campsite user taps on 

        // Define function used in FlatList
        const renderDirectoryItem = ({item}) => {         // In this arrow fxn, for the params, by default, FlatLine passes an object as argument. We're only interested in one property of that object: item, which we've destructured from passed state called campsites (in FlatList)
            return (
                <ListItem  
                    title={item.name}                     // Destructure item property; need {} so JSX parser knows to process item.name as JS rather than a string
                    subtitle={item.description}
                    onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })}   // For onPress prop, we wrap navigate fxn in an arrow fxn so it can be called multiple times, ie each time it's pressed. If no arrow fxn, could only be called once and not reused. 
                    leftAvatar={{ source: require('./images/react-lake.jpg')}}          // leftAvatar prop requires an object, so need double {} - first {} allows us to use JS in JSX (React HTML), second {} defines object literal. Object takes a property of source, plus a nodeJS "require"  
                />
            );
        };

        return (                                                 // No <div> wrapper needed 
                <FlatList                                        // FlatList comp expects some props: data, renderItem, keyExtractor. FlatList iterates through items in data prop and performs function specified in renderItem. 
                    data={this.state.campsites}                  // data tells FlatList where it's getting its data from. FlatList expects data prop to get an array. We're setting this data prop equal to the passed prop from parent Main
                    renderItem={renderDirectoryItem}             // renderItem specifies how to render each item in the list; will do this by using callback function which we'll define and supply 
                    keyExtractor={item => item.id.toString()}    // Similar to how in React when we render a list from array we had to set up unique key; FlatList gives us an easy way to do that - since each of our campsite items has a unique id, we can pull that out here. FlatList expects a string.
                />        
        );
    }
}

export default Directory; 