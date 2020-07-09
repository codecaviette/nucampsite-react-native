import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';


function Loading() {
    return (
        // Spinning circle + Loading... message
        <View style={styles.loadingView} >
            <ActivityIndicator size='large' color='#5637DD' />          
            <Text style={styles.loadingText}>Loading . . .</Text>
        </View>
    );
}

// Define styling to use in the above Loading comp. Rather than doing this in-line, this way keeps the code above cleaner-looking.
const styles = StyleSheet.create(
    {
        loadingView: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
        },
        loadingText: {
            color: '#5637DD',
            fontSize: 14,
            fontWeight: 'bold'
        }
    }
);

export default Loading;