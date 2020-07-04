import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';

function RenderCampsite({campsite}) {           // From the props object this component receives, we're only going to use the property of the campsite object, so we'll destructure it here in the params.
    if (campsite) {                             // We want to make sure campsite is not null or undefined, so use if stmt
        return (                                // if campsite is truthy, then return this card from RN Elements 3rd party UI library
            <Card 
                featuredTitle={campsite.name}
                image={require('./images/react-lake.jpg')} 
                >
                <Text style={{margin:10}}>      {/* Text comp from RN; style prop uses {{}} bc it's an object in JSX - it looks like CSS but it's really JS  */}
                    {campsite.description}
                </Text>
            </Card>
        );
    }
    return <View /> ;                 // otherwise, if campsite is falsy...
}

class CampsiteInfo extends Component {           // Update this functional copm to a class comp so can hold state
    
    constructor(props) {                         // Create local state
        super(props);
        this.state = {
            campsites: CAMPSITES
        };
    }

    static navigationOptions = {             // Configure the text for the header title of each view by using static keyword (from JS) to apply a method on class itself rather than the object that's created from class
        title: 'Campsite Information'
    }

    render(){
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.state.campsites.filter(campsite => campsite.id === campsiteId)[0];
        return <RenderCampsite campsite={campsite} />;
    }
}

export default CampsiteInfo;