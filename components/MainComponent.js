// This Main component is a container component, the parent to presentational components 
// This React Native component looks exactly like React! 


import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';


// Stack Navigator for Home page
const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        navigationOptions: {
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

// Stack Navigator for Directory page
const DirectoryNavigator = createStackNavigator(
    {
        Directory: { screen: Directory },        // With Stack Navs, order of items doesn't matter like it does with Drawer Nav
        CampsiteInfo: { screen: CampsiteInfo }
    },
    {
        initialRouteName: 'Directory',           // Dictates which screen loads first
        navigationOptions: {
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

// Stack Navigator for About page
const AboutNavigator = createStackNavigator(
    {
        About: { screen: About }
    },
    {
        navigationOptions: {
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

// Stack Navigator for Contact page
const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
    },
    {
        navigationOptions: {
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

// Drawer Navigator slides out from side of app; from here, can access Stack Navigators
const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator },
        Directory: { screen: DirectoryNavigator },
        About: { screen: AboutNavigator },
        Contact: { screen: ContactNavigator }
    },
    {
        drawerBackgroundColor: '#CEC8FF'
    }
);

class Main extends Component {
    render() {
        return (
            <View style={{                         // Need {{}} to do in-line styling. Alternatively, we could create a variable below the class comp and define the styling there, 
                flex: 1,                           // and insert the variable equal to style prop - useful for when you have lots of inline styling - would need to import react native's StyleSheet built-in component
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight      // If platform is ios then paddingTop will be 0; otherwise, it'll push content down on that device
            }}>
                <MainNavigator />
            </View>
        );
    }
}

export default Main;