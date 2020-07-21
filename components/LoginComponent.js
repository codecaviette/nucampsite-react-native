import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';               // Import everything from secure store module under SecureStore namespace


class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        };
    }

    static navigationOptions = {                // Set this up bc we know this comp will be included as screen in navigation
        title: 'Login'
    }

    handleLogin() {                             // Set up this function bc we know we'll have a login button and we need to tell code how to handle that
        console.log(JSON.stringify(this.state));
        // If the state's remember property is true, or checked, then save the username/password in secure store's state to whatever's entered in using SecureStore.setItemAsync method. 
        if (this.state.remember) {
            // All SecureStore methods require an argument of key (userinfo); (setItemAsync also requires a value argument (username/password), which needs to be a string value in order to be stored, so we use JSON.stringify to convert object to string)
            SecureStore.setItemAsync('userinfo', JSON.stringify(
                {username: this.state.username, password: this.state.password}))
                // All SecureStore methods return a promise that will reject if there's an error. Check for rejected promise using .catch 
                .catch(error => console.log('Could not save user info', error));
        // If the state's remember property is false, or not checked, then it will delete any data stored under the userinfo key
        } else {
            SecureStore.deleteItemAsync('userinfo')
                .catch(error => console.log('Could not delete user info', error));
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then(userdata => {
                const userinfo = JSON.parse(userdata);
                if(userinfo){
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true})
                }
            })
    }


    render() {
        return (
            // onChangeText: This will update the username/password in the state whenever the username/password is updated in this input field 
            // value: Input's value is controlled by the state
            // onPress: When box is pressed, the remember property of the state will be updated to the opposite of what it currently is
            <View style={styles.container} >
                <Input 
                    placeholder='Username'
                    leftIcon={{type: 'font-awesome', name: 'user-o'}}
                    onChangeText={username => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input 
                    placeholder='Password'
                    leftIcon={{type: 'font-awesome', name: 'key'}}
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton} >
                    <Button 
                        onPress={() => this.handleLogin()}
                        title='Login'
                        color='#5637DD'
                    />
                </View>
            </View>
        )
    }
}


// Set up Stylesheet (create by trial and error)
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 10
    }, 
    formCheckbox: {
        margin: 10, 
        backgroundColor: null    
    },
    formButton: {
        margin: 40
    }
})


export default LoginComponent
