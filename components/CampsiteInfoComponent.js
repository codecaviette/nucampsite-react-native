import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

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
        )
    }
    return <View />                 // otherwise, if campsite is falsy...
}


function CampsiteInfo(props) {           // Pass a param of "props" bc CampsiteInfo receives props from its parent Main comp
    return (                             // <div> wrapped not needed in return statement of RN
        <RenderCampsite campsite={props.campsite} />        // Pass inherited props to child component, RenderCampsite, as a new prop called campsite
    )
}

export default CampsiteInfo;