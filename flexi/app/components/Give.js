import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function Give() {
    return (
        <View style={[styles.header]}>
            <Text style={styles.title}>Give</Text>
            <Text></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 1,

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