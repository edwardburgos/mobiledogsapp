import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function Item({ item, navigation }) {
    // Variables
    const { id, image, name, temperament } = item;

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{name}</Text>
            <Image source={{ uri: image }} style={{ resizeMode: 'contain', width: 300, height: 300, marginBottom: 16 }} />
            {temperament ?
                <>
                    <Text style={styles.label}>Temperaments:</Text>
                    <View style={styles.temperamentsContainer}>
                        {temperament.split(', ').map((e, i) =>
                            <View key={i} style={styles.test}>
                                <Text style={styles.temperament}>{e}</Text>
                            </View>
                        )}
                    </View>
                </>
                :
                null
            }
            <TouchableOpacity
                style={styles.button}
                onPress={() => { navigation.navigate('Detail', { id, name, image }) }}
            >
                <Text style={styles.buttonText}>See details</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        marginBottom: 16,
        backgroundColor: 'rgba(231, 233, 235, 0.5)',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        width: '100%'
    },
    image: {
        flex: 1,
        justifyContent: "center",
        flexDirection: 'row'
    },
    title: {
        marginTop: 0,
        marginBottom: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20
    },
    description: {
        marginBottom: 16,
        textAlign: 'center'
    },
    content: {
        backgroundColor: 'rgba(231, 233, 235, 0.6)',
        padding: 20,
        borderRadius: 16,
        alignSelf: 'flex-end',
        marginBottom: 50
    },
    button: {
        backgroundColor: '#2962ff',
        padding: 10,
        width: '100%',
        borderRadius: 5,
        //position: 'absolute'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    test: {
        backgroundColor: '#2962ff',
        padding: 8,
        borderRadius: 5,
        borderColor: 'transparent',
        borderWidth: 1,
        marginHorizontal: 4,
        marginBottom: 4
    },
    temperament: {
        color: '#fff'
    },
    temperamentsContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 12
    },
    label: {
        fontWeight: 'bold'
    }
});