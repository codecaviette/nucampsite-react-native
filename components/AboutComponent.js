import React, { Component } from "react";
import { ScrollView, Text, FlatList } from "react-native";
import { Card, ListItem } from "react-native-elements";
import { connect } from 'react-redux';                      // During conversion from React to Redux, connect replaces {PARTNERS} file
import { baseUrl } from '../shared/baseUrl';                // During React--Redux conversion, imported this bc it includes my IP address which is where we'll be pulling partners data from
// import { PARTNERS } from "../shared/partners";           // During React--Redux conversion, removed this b/c we'll be pulling this data from the json-server instead
import Loading from './LoadingComponent';                   // Loading comp does not need curly braces bc it is the default export
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {      // This Redux function receives state as a prop from Redux store and returns only partners data from the state. This is the Redux way to signal what part of 
  return {                              // the state we're interested in using, rather than grabbing the entire state.
    partners: state.partners            // In this comp, we're only interested in the partners data from the entire state
  }
}


function Mission() {
  return (
    <Card title="Our Mission" wrapperStyle={{ margin: 20 }}>
      <Text>
        We present a curated database of the best campsites in the vast woods
        and backcountry of the World Wide Web Wilderness. We increase access to
        adventure for the public while promoting safe and respectful use of
        resources. The expert wilderness trekkers on our staff personally verify
        each campsite to make sure that they are up to our standards. We also
        present a platform for campers to share reviews on campsites they have
        visited with each other.
      </Text>
    </Card>
  );
}

class About extends Component {

  // During React--Redux conversion, we removed the local state since we'll be accessing state from Redux store now. We also need to remove any reference to the local state below.

  static navigationOptions = {
    title: "About Us",
  };

  render() {
    const renderPartner = ({item}) => {
        return (
            <ListItem
                title={item.name}
                subtitle={item.description}
                leftAvatar={{source: {uri: baseUrl + item.image}}}
            />
        );
    };

    if (this.props.partners.isLoading) {
        return (
            <ScrollView>
                <Mission />
                <Card
                    title='Community Partners'>
                    <Loading />
                </Card>
            </ScrollView>
        );
    }
    if (this.props.partners.errMess) {
        return (
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>   
                  <Mission />
                  <Card
                      title='Community Partners'>
                      <Text>{this.props.partners.errMess}</Text>
                  </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
    return (
        <ScrollView>
          <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>   
            <Mission />
            <Card title="Community Partners">
              <FlatList
                data={this.props.partners.partners}              // this.props bc we inherited state from store and are now passing it to FlatList assigned to data prop. Why 2 partners? Look at partneres.js in redux folder: the 1st partners is the variable partners, and the 2nd is the partners array which is what we want.
                renderItem={renderPartner}                       // renderItem function has a built-in item property which expects an object, so we can destructure it in the renderPartner fxn
                keyExtractor={(item) => item.id.toString()}
              />
            </Card>
          </Animatable.View>  
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(About);              // Inserting connection function (from react-redux) ensures that the About comp receives partners props from the Redux store
