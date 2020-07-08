import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';                      // During conversion from React to Redux, connect replaces {CAMPSITES} {PROMOTIONS} {PARTNERS} files
import { baseUrl } from '../shared/baseUrl';                // During React--Redux conversion, imported this bc it includes my IP address which is where we'll be pulling campsites,promotions,partners data from
// import { CAMPSITES } from "../shared/campsites";         // During React--Redux conversion, removed this b/c we'll be pulling this data from the json-server instead of this file
// import { PROMOTIONS } from '../shared/promotions';
// import { PARTNERS } from '../shared/partners';

const mapStateToProps = state => {          // This Redux function receives state as a prop from Redux store and returns only campsites data from the state. This is the Redux way to signal what part of 
    return {                                // the state we're interested in using, rather than grabbing the entire state.
        campsites: state.campsites,         // In this comp, we're only interested in the campsites,promotions,partners data from the entire state
        promotions: state.promotions,
        partners: state.partners
    };
};

function RenderItem({item}) {           // ({item}) = Object destructuring within RenderItem function
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

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            // item prop equals an object that's created by filtering through campsites array and returning first item where the campsite is the featured campsite
            <ScrollView>
                <RenderItem 
                    item={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]} />         
                <RenderItem 
                    item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]} />
                <RenderItem 
                    item={this.props.partners.partners.filter(partner => partner.featured)[0]} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);