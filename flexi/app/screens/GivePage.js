import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GivePage() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Give Page</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
