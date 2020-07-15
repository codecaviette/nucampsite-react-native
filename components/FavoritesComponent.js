import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { deleteFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {                  // mapStateToProps allows this comp to access Redux state and pull in campsites and favorites pieces of state
    return {
        campsites: state.campsites,
        favorites: state.favorites
    };
};

const mapDispatchToProps = { deleteFavorite: campsiteId => (deleteFavorite(campsiteId)) };          // mapDispatchToProps allows this comp to dispatch an action creator 


class Favorites extends Component {

    static navigationOptions = {                    // What Drawer Navigation displays for this comp
        title: 'My Favorites'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderFavoriteItem = ({item}) => {                // WHERE IS ITEM COMING FROM? CAN IT BE NAMED ANYTHING? 
            const rightButton = [
                {
                    text: 'Delete', 
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Favorite?',
                            'Are you sure you wish to delete the favorite campsite ' + item.name + '?',
                            [
                                { 
                                    text: 'Cancel', 
                                    onPress: () => console.log(item.name + 'Not Deleted'),
                                    style: ' cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => this.props.deleteFavorite(item.id)
                                }
                            ],
                            { cancelable: false }
                        );
                    }
                }
            ];
            return (
                <Swipeout right={rightButton} autoClose={true} >        
                    <ListItem
                        title={item.name}
                        subtitle={item.description}
                        leftAvatar={{source: {uri: baseUrl + item.image}}}
                        onPress={() => navigate('CampsiteInfo', {campsiteId: item.id})}
                    />
                </Swipeout>
            );
        };

        if (this.props.campsites.isLoading) {
            return <Loading />;
        }
        if (this.props.campsites.errMess) {
            return (
                <View>
                    <Text>{this.props.campsites.errMess}</Text>
                </View>
            );
        }
        return (
            <FlatList
                data={this.props.campsites.campsites.filter(
                    campsite => this.props.favorites.includes(campsite.id)
                )}
                renderItem={renderFavoriteItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);