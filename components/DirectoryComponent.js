import React from 'react';
import { FlatList } from 'react-native';                    // These two comp's, FlatList and ListItem, work very well together; They are analogous to HTML's ul and li
import { ListItem } from 'react-native-elements';           // ListItem will wrap around each list item; FlatList will wrap around all list items.



function Directory(props) {             // Pass a param of "props" bc Directory receives props from its parent Main comp
    
    // Define function used in FlatList
    const renderDirectoryItem = ({item}) => {         // In this arrow fxn, for the params, by default, FlatLine passes an object as argument. We're only interested in one property of that object, item (destructured object)
        return (
            <ListItem  
                title={item.name}                     // Destructure item property
                subtitle={item.description}
                onPress={() => props.onPress(item.id)}
                leftAvatar={{ source: require('./images/react-lake.jpg')}}         // leftAvatar prop requires an object. Need double {} - first {} allows us to use JS in JSX (React HTML), second {} defines object literal. Object takes a property of source, plus a nodeJS "require"  
            />
        )
    };

    return (                                                 // No <div> wrapper needed 
            <FlatList                                        // FlatList comp expects some props: data, renderItem, keyExtractor. FlatList iterates through items in data prop and performs function specified in renderItem. 
                data={props.campsites}                       // data tells FlatList where it's getting its data from. FlatList expects data prop to get an array. We're setting this data prop equal to the passed prop from parent Main
                renderItem={renderDirectoryItem}             // renderItem specifies how to render each item in the list; will do this by using callback function which we'll define and supply 
                keyExtractor={item => item.id.toString()}    // Similar to how in React when we render a list from array we had to set up unique key; FlatList gives us an easy way to do that - since each of our campsite items has a unique id, we can pull that out here. FlatList expects a string.
            />        
    )
}

export default Directory; 