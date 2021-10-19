import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

export default function RadioButton({ selected, extraStyles }) {

    const [selectedRadio, setSelectedRadio] = useState(selected)

    return (
        <TouchableOpacity
            style={styles.fondo}
            onPress={() => setSelectedRadio(true)}
        >
            <View style={[selectedRadio ? styles.selectedBorder : styles.border, extraStyles]}>
                {
                    selectedRadio ?
                        <View style={styles.selected} />
                        : null
                }
            </View>
        </TouchableOpacity>
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
    },
    fondo: {
        marginRight: 10
    }
})