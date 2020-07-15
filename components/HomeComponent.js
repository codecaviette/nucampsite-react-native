import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';                      // During conversion from React to Redux, connect replaces {CAMPSITES} {PROMOTIONS} {PARTNERS} files
import { baseUrl } from '../shared/baseUrl';                // During React--Redux conversion, imported this bc it includes my IP address which is where we'll be pulling campsites,promotions,partners data from
// import { CAMPSITES } from "../shared/campsites";         // During React--Redux conversion, removed this b/c we'll be pulling this data from the json-server instead of this file
// import { PROMOTIONS } from '../shared/promotions';
// import { PARTNERS } from '../shared/partners';
import Loading from './LoadingComponent';


const mapStateToProps = state => {          // This Redux function receives state as a prop from Redux store and returns only campsites data from the state. This is the Redux way to signal what part of 
    return {                                // the state we're interested in using, rather than grabbing the entire state.
        campsites: state.campsites,         // In this comp, we're only interested in the campsites,promotions,partners data from the entire state
        promotions: state.promotions,
        partners: state.partners
    };
};

function RenderItem(props) {           // We're passing the entire props object into the RederItem function, and inside the fxn is where we'll destructure it to get the parts we need
    const {item} = props;              // Destructure item objection from entire props object that was passed as argument

    // If stmt to determine what's shown to user depending on state?
    if (props.isLoading){
        return <Loading />;
    }
    if (props.errMess){
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }
    if (item) {
        return (
            <Card
                featuredTitle={item.name}
                image={{uri: baseUrl + item.image}}>
                <Text
                    style={{margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class Home extends Component {

    constructor(props) {                            // Create local store so that it can hold animated value 
        super(props);
        this.state = {
            scaleValue: new Animated.Value(0)       // Key name is arbitrary - doesn't have to be called scaleValue, but it helps to be descriptive.
        };
    }

    animate() {                                     // The animate method's name is arbitrary - can be anything.
        Animated.timing(                            // Animated.timing method takes 2 arguments:
            this.state.scaleValue,                  // 1st argument: name of animated value that we want to have change over time
            {                                       // 2nd argument: toValue = what we want the animated value to change to from its initial value
                toValue: 1,                                 // duration = hwo long it'll take from animate from 0 to 1, which is 1500 milliseconds
                duration: 1500 
            }
        ).start();                                  // This starts the animation
    }

    componentDidMount(){                            // Once this component mounts/loads, the animate method will be called
        this.animate();
    }

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            // item prop equals an object that's created by filtering through campsites array and returning first item where the campsite is the featured campsite
            <Animated.ScrollView style={{transform: [{scale: this.state.scaleValue} ]}}>
                <RenderItem
                    item={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                />
                <RenderItem
                    item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess} 
                />
                <RenderItem
                    item={this.props.partners.partners.filter(partner => partner.featured)[0]}
                    isLoading={this.props.partners.isLoading}
                    errMess={this.props.partners.errMess} 
                />
            </Animated.ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);