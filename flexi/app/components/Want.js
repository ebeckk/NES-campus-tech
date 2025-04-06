import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';

export default function Want() {
    return (
        <View style={[styles.header]}>
            <Text style={styles.title}>Need Food</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 50,

        color: 'green',




    },
    title: {
        color: 'white',
        fontSize: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});