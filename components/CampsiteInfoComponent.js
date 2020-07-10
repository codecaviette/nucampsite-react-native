import React, { Component } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";
import { Card, Icon } from "react-native-elements";
import { connect } from 'react-redux';                      // During conversion from React to Redux, connect replaces {CAMPSITES} and {COMMENTS} files
import { baseUrl } from '../shared/baseUrl';                // During React--Redux conversion, imported this bc it includes my IP address which is where we'll be pulling campsites/comments data from
// import { CAMPSITES } from "../shared/campsites";         // During React--Redux conversion, removed this b/c we'll be pulling this data from the json-server instead of this file
// import { COMMENTS } from '../shared/comments';
import { postFavorite } from '../redux/ActionCreators';


const mapStateToProps = state => {      // This Redux function receives state as a prop from Redux store and returns only campsites and comments data from the state. This is the Redux way to signal what part of 
  return {                              // the state we're interested in using, rather than grabbing the entire state.
    campsites: state.campsites,         // In this comp, we're only interested in the campsites and comments data from the entire state
    comments: state.comments,
    favorites: state.favorites
    };
};

const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId))
};


function RenderCampsite(props) {                     // In the render-return stmt, RenderCampsite is passed multiple props in the props object; we need all of them, instead of just some of them, so here, we're passing the entire props object as the argument

    const {campsite} = props;                        // Destructure campsite object/array from entire props object that was passed to RenderCampsite comp

    if (campsite) {                                  // We want to make sure campsite is not null or undefined, so use if stmt
        return (                                     // if campsite is truthy, then return this card from RN Elements 3rd party UI library
            // image: the uri tells the leftAvatar so use the baseUrl (server) and image of the item object for each campsite in the array 
            <Card
                featuredTitle={campsite.name}
                image={{uri: baseUrl + campsite.image}} >             
                
                <Text style={{ margin: 10 }}>                       {/* Text comp from RN; style prop uses {{}} bc it's an object in JSX - it looks like CSS but it's really JS - outer {} tells JSX parser that everything within in JS, inner {} is bc its an object which is what style attribute accepts  */}
                    {campsite.description}
                </Text>

                <Icon
                    name={props.favorite ? 'heart' : 'heart-o' }
                    type='font-awesome'
                    color='#f50'
                    raised
                    reverse
                    onPress={() => props.favorite ?
                        console.log('Already set as a favorite') : props.markFavorite()}
                />
            </Card>
        );
    }
        return <View />;         // otherwise, if campsite is falsy, return the View RN element
}


function RenderComments({ comments }) {              // In the render-return stmt, RenderComments fxn is passed a comments array as a property of the props object (functional React components accept a single "props" object argument with data and returns a React element). Bc we only need this object, we'll use it as the argument and warp in curly braces which means we're destructuring the array.

    const renderCommentItem = ({ item }) => {
        return (
            // In 3rd Text element, use template literal syntax so we get a   -- and ,  displayed in the text
            <View style={{margin:10}}>
                <Text style={{fontSize: 14}}>  {item.text} </Text>
                <Text style={{fontSize: 12}}>  {item.rating} Stars </Text>
                <Text style={{fontSize: 12}}>  {`--${item.author}, ${item.date}`} </Text>           
            </View>
        )
    }

    return (
        <Card title='Comments'>
            <FlatList                                // Bc we know our incoming data (comments array) is an array, we can use FlatList which expects an array
                data={comments}                      // data = comments array
                renderItem={renderCommentItem}       // We'll create this function
                keyExtractor={item => item.id.toString()}       // Bc each comment has a unique id, we can set that to be its unique key
            />
        </Card>
    )
}


class CampsiteInfo extends Component {                // Update this functional comp to a class comp so can hold state;  or, can use hook with functional comp to hold state

    markFavorite(campsiteId){                                   // WHY would you not assign this function to a variable??
        this.props.postFavorite(campsiteId);
    }

    static navigationOptions = {                      // Configure the text for the header title of each view by using static keyword (from JS) to apply a method on class itself rather than the object that's created from class
        title: "Campsite Information",
    };

    render() {
        const campsiteId = this.props.navigation.getParam("campsiteId");        // React Navigation gives each screen component in your app access to the navigation prop automatically. The prop contains various convenience functions that dispatch navigation actions on the route's router, one being getParam which gets a specific param with fallback
        const campsite = this.props.campsites.campsites.filter((campsite) => campsite.id === campsiteId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId);          // Create a comments variable (to render/display in return stmt below) by filtering through comments array and creating a new array where the comment being iterated has a campsiteId (comments.campsiteId) that matches the campsiteId of th campsite we want to display 
        
        return (
            // ScrollView: Top-level return can only return one item, so here we chose to use ScrollView to wrap multiple components
                // RenderComments: We're passing the comments array created above to the RenderComments comp as a prop; the comments array is wrapped in {} so JSX parser knows its JS within 
            <ScrollView>                
                <RenderCampsite campsite={campsite} 
                    favorite={this.props.favorites.includes(campsiteId)}
                    markFavorite={() => this.markFavorite(campsiteId)}
                />
                <RenderComments comments={comments} />          
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);
