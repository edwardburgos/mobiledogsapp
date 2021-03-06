import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function RadioButton({ selected, extraStyles }) {

    return (
            <View style={[selected ? styles.selectedBorder : styles.border, extraStyles]}>
                {
                    selected ?
                        <View style={styles.selected} />
                        : null
                }
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
    },
    selectedBorder: {
        height: 18,
        width: 18,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#2962ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selected: {
        height: 6,
        width: 6,
        borderRadius: 6,
        backgroundColor: '#2962ff',
    }
})