import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Item({ item, navigation }) {
    // Variables
    const { id, image, name, temperament } = item;

    return (
        <Pressable
            style={({ pressed }) => [styles.card, pressed ? styles.border : '' ]}
            onPress={() => { navigation.navigate('Detail', { id, name, image }) }}
        >
            <View>
                <Text style={styles.title}>{name}</Text>
                <Image source={{ uri: image }} style={{ resizeMode: 'contain', width: 335, height: 180, alignSelf: 'center' }} />
                {temperament ?
                    <>
                        <Text style={styles.label}>Temperaments:</Text>
                        <View style={styles.temperamentsContainer}>
                            {temperament.split(', ').map((e, i) =>
                                    <Text key={i} style={styles.temperament}>{e}</Text>
                            )}
                        </View>
                    </>
                    :
                    null
                }
            </View>
        </Pressable>
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
        width: '100%',
        padding: '3%'
    },
    border: {
        borderColor: "#2962ff",
        borderWidth: 2,
    },  
    image: {
        flex: 1,
        justifyContent: "center",
        flexDirection: 'row'
    },
    title: {
        marginTop: 0,
        marginBottom: 8,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 4
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
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    temperament: {
        backgroundColor: '#2962ff',
        color: '#fff',
        padding: 8,
        borderRadius: 5,
        borderColor: 'transparent',
        borderWidth: 1,
        marginRight: 4,
        marginBottom: 4
    },
    temperamentsContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 4,
        marginBottom: 12
    },
    label: {
        fontWeight: 'bold',
        marginTop: 8,
        textAlign: 'center'
    }
});