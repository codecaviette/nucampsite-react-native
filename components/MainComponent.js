// This Main component is a container component, the parent to presentational components 
// This React Native component looks exactly like React! 


import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';


// Create Stack Navigator, similar to Route components in React
// Store it in a const variable
const DirectoryNavigator = createStackNavigator(            // createStackNavigator is a fxn that requires one argument called a router configuration object. In this argument is where we set what's available to stack.
    {
        Directory: { screen: Directory },                   // This is the router config object and it's where we set what's available to Stack Nav
        CampsiteInfo: { screen: CampsiteInfo }
    },
    {                                                       // Optional second argument
        initialRouteName: 'Directory',                      // When app opens, it'll default to showing this component
        navigationOptions: {                                // Configure settings for header
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);


class Main extends Component {              // We use class component so that we can hold state in this comp.
    render() {
        return (
            // View comp: Like in React, in RN can only return and render one top-level comp, so use View comp wrapper. Set style prop to flex comp of normal size                 
            <View style={{
                flex:1,
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight         // To account for different device types (iOS vs Android), we'll set padding differently depending on device type using a React Native built-in comp called Platform that we imported
                }} >              
                <DirectoryNavigator />                                                                                       
            </View>  
        );
    }
}

export default Main;
