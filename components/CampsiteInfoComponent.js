import React, { Component } from "react";
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, Alert, PanResponder } from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from 'react-redux';                      // During conversion from React to Redux, connect replaces {CAMPSITES} and {COMMENTS} files
import { baseUrl } from '../shared/baseUrl';                // During React--Redux conversion, imported this bc it includes my IP address which is where we'll be pulling campsites/comments data from
// import { CAMPSITES } from "../shared/campsites";         // During React--Redux conversion, removed this b/c we'll be pulling this data from the json-server instead of this file
// import { COMMENTS } from '../shared/comments';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {      // This Redux function receives state as a prop from Redux store and returns only campsites and comments data from the state. This is the Redux way to signal what part of 
  return {                              // the state we're interested in using, rather than grabbing the entire state.
    campsites: state.campsites,         // In this comp, we're only interested in the campsites and comments data from the entire state
    comments: state.comments,
    favorites: state.favorites
    };
};

const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId)),
    postComment: (campsiteId, rating, author, text) =>  postComment(campsiteId, rating, author, text),
};


function RenderCampsite(props) {                     // In the render-return stmt, RenderCampsite is passed multiple props in the props object; we need all of them, instead of just some of them, so here, we're passing the entire props object as the argument

    const {campsite} = props;                        // Destructure campsite object/array from entire props object that was passed to RenderCampsite comp

    const recognizeDrag = ({dx}) => (dx < -200) ? true : false;             // This arrow function's parameter takes object and destructures from it a property called dx, which is the distance of a gesture across x-axis 

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderEnd: (e, gestureState) => {
            console.log('pan responder end', gestureState);
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + campsite.name + ' to favorites?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ?
                                console.log('Already set as a favorite') : props.markFavorite()
                        }
                    ],
                    { cancelable: false }
                );
            }
            return true;
        }
    });

    if (campsite) {                                  // We want to make sure campsite is not null or undefined, so use if stmt
        return (                                     // if campsite is truthy, then return this card from RN Elements 3rd party UI library
            // image: the uri tells the leftAvatar so use the baseUrl (server) and image of the item object for each campsite in the array 
            <Animatable.View 
                animation='fadeInDown' 
                duration={2000} 
                delay={1000}
                {...panResponder.panHandlers} >               
                <Card
                    featuredTitle={campsite.name}
                    image={{uri: baseUrl + campsite.image}} >             
                    
                    <Text style={{ margin: 10 }}>                       {/* Text comp from RN; style prop uses {{}} bc it's an object in JSX - it looks like CSS but it's really JS - outer {} tells JSX parser that everything within in JS, inner {} is bc its an object which is what style attribute accepts  */}
                        {campsite.description}
                    </Text>
                    <View style={styles.cardRow}>
                        <Icon
                            name={props.favorite ? 'heart' : 'heart-o' }
                            type='font-awesome'
                            color='#f50'
                            raised
                            reverse
                            onPress={() => props.favorite ?
                                console.log('Already set as a favorite') : props.markFavorite()}
                        />
                        <Icon
                            name='pencil'
                            type='font-awesome'
                            color='#5637DD'
                            raised
                            reverse
                            onPress={() => props.onShowModal()}
                            style={styles.cardItem}
                        />
                    </View>
                </Card>
            </Animatable.View>
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
                <Rating 
                    startingValue={item.rating} 
                    imageSize={10} 
                    style={{ alignItems: 'flex-start', paddingVertical: '5%' }} 
                    readonly 
                />
                <Text style={{fontSize: 12}}>  {`--${item.author}, ${item.date}`} </Text>           
            </View>
        )
    }

    return (
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>   
            <Card title='Comments'>
                <FlatList                                // Bc we know our incoming data (comments array) is an array, we can use FlatList which expects an array
                    data={comments}                      // data = comments array
                    renderItem={renderCommentItem}       // We'll create this function
                    keyExtractor={item => item.id.toString()}       // Bc each comment has a unique id, we can set that to be its unique key
                />
            </Card>
        </Animatable.View>
    )
}


class CampsiteInfo extends Component {                // Update this functional comp to a class comp so can hold state;  or, can use hook with functional comp to hold state

    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            rating: 5,
            author: '',
            text: ''
        }
    }

    static navigationOptions = {                      // Configure the text for the header title of each view by using static keyword (from JS) to apply a method on class itself rather than the object that's created from class
        title: "Campsite Information",
    };

    markFavorite(campsiteId){                         // Bc we're in a class component, we cannot use the function keyword; instead, we create methods 
        this.props.postFavorite(campsiteId);
    }

    toggleModal(){
        this.setState({ showModal: !this.state.showModal});
    }

    handleComment(campsiteId){
        // console.log(JSON.stringify(this.state));            // This is a test that allows us to click submit modal to make sure it's grabbing info we need
        this.props.postComment(campsiteId, this.state.rating, this.state.author, this.state.text);
        this.toggleModal();
    }

    resetForm(){
        this.setState({
            showModal: false,
            rating: 5,
            author: '',
            text: ''
        })
    }

    render() {
        const campsiteId = this.props.navigation.getParam("campsiteId");        // React Navigation gives each screen component in your app access to the navigation prop automatically. The prop contains various convenience functions that dispatch navigation actions on the route's router, one being getParam which gets a specific param with fallback
        const campsite = this.props.campsites.campsites.filter((campsite) => campsite.id === campsiteId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId);          // Create a comments variable (to render/display in return stmt below) by filtering through comments array and creating a new array where the comment being iterated has a campsiteId (comments.campsiteId) that matches the campsiteId of th campsite we want to display 
        
        return (
            // ScrollView: Top-level return can only return one item, so here we chose to use ScrollView to wrap multiple components
                // favorite: campsiteId is coming from const defined above
                // RenderComments: We're passing the comments array created above to the RenderComments comp as a prop; the comments array is wrapped in {} so JSX parser knows its JS within 
            <ScrollView>                
                <RenderCampsite 
                    campsite={campsite} 
                    favorite={this.props.favorites.includes(campsiteId)}
                    markFavorite={() => this.markFavorite(campsiteId)}
                    onShowModal={() => this.toggleModal()}
                />
                <RenderComments comments={comments} /> 
                <Modal 
                    animationType={'slide'} 
                    transparent={false} 
                    visible={this.state.showModal} 
                    onRequestClose={() => this.toggleModal()} >
                    <View style={styles.modal}>
                        <Rating 
                            showRating
                            startingValue={this.state.rating}
                            imageSize={40}
                            onFinishRating={(rating)=>this.setState({rating: rating})}      // As soon as you're done sliding finger/giving rating, it's taking final rating and doing a setState on it
                            style={{paddingVertical: 10}}
                        />
                        <Input 
                            placeholder='Author'
                            leftIcon={<Icon name='user-o' type='font-awesome' /> }
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={(text) => this.setState({ author: text})}         // As long as the param is not in {} the text can be named whatever - just matches whatever author is set to
                            value={this.state.author}
                        />
                        <Input 
                            placeholder='Comment'
                            leftIcon={<Icon name='comment-o' type='font-awesome' /> }
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={(text) => this.setState({ text: text})}
                            value={this.state.text}
                        />
                        <View style={{ margin: 10 }}>
                            <Button  
                                title='Submit' 
                                color={'#5637DD'} 
                                onPress={() => {
                                    this.handleComment(campsiteId); 
                                    this.resetForm()
                                }}  
                            />        
                        </View>
                        <View style={{ margin: 10 }}>                       
                            <Button title='Cancel' color={'#808080'} onPress={() => this.toggleModal()} />
                        </View>
                    </View>                    
                </Modal>         
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardItem: {
        flex:1, 
        margin: 10
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);
