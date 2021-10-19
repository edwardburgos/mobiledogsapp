import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function RadioButton({ selected, extraStyles }) {
    return (
        <View style={[styles.border, extraStyles]}>
            <View style={styles.selected} />
            {/* {
                props.selected ?
                    <View style={styles.selected} />
                    : null
            } */}
        </View>
    );
}

const styles = StyleSheet.create({
    border: {
        height: 18,
        width: 18,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    selected: {
        height: 6,
        width: 6,
        borderRadius: 6,
        backgroundColor: '#000',
    },
})