import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function MyRec() {
    return (
        <View style={[styles.header]}>
            <Text style={styles.title}>My Records</Text>
            <Text></Text>
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