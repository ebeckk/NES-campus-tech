import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

export default function Header() {
    return (
        <SafeAreaView style={styles.header}>
            <Text style={styles.title}>Flexi Fairy</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 1,
        backgroundColor: 'green',
        alignItems: 'top',
        borderBottomWidth: 1,
        borderColor: '#ddd',

    },
    title: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold',
    },
});
