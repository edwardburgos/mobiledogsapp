import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Detail({ route }) {
    // Own states
    const [dog, setDog] = useState({});
    const [errorGlobal, setErrorGlobal] = useState('');

    // Variables
    const { id, image } = route.params;

    // This hook allows us to get the dog breed data
    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        async function findDog(id) {
            try {
                const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`, { cancelToken: source.token });
                if (response.status === 200) {
                    setDog(response.data);
                } else {
                    return setErrorGlobal('Sorry, an error ocurred')
                }
            } catch (e) {
                return setErrorGlobal('Sorry, an error ocurred')
            }
        }
        findDog(id);
        return () => source.cancel("Unmounted");
    }, [id])

    return (
        <View style={styles.container}>
            {errorGlobal ?
                <View style={styles.containerError}>
                    <View style={styles.contentCenter}>
                        <Text style={styles.errorGlobal}>{errorGlobal}</Text>
                    </View>
                </View>
                :
                Object.keys(dog).length ?
                    <ScrollView contentContainerStyle={styles.scroll}>
                        <View>
                            <Image source={{ uri: image }} style={{ resizeMode: 'contain', width: 360, height: 250, marginBottom: 16, alignSelf: 'center', marginTop: 4 }} />
                            {dog.weight.metric ?
                                <View style={styles.oneLine}>
                                    <Text style={styles.label}>Weight:</Text>
                                    <Text style={styles.description}>{`${dog.weight.metric} kg`}</Text>
                                </View> : null}
                            {dog.height.metric ?
                                <View style={styles.oneLine}>
                                    <Text style={styles.label}>Height:</Text>
                                    <Text style={styles.description}>{`${dog.height.metric} cm`}</Text>
                                </View> : null}
                            {dog.life_span ?
                                <View style={styles.oneLine}>
                                    <Text style={styles.label}>Life expectancy:</Text>
                                    <Text style={styles.description}>{`${dog.life_span}`}</Text>
                                </View> : null}
                            {dog.bred_for ?
                                <View style={styles.oneLine}>
                                    <Text style={styles.label}>Bred for:</Text>
                                    <Text style={styles.description}>{`${dog.bred_for}`}</Text>
                                </View> : null}
                            {dog.breed_group ?
                                <View style={styles.oneLine}>
                                    <Text style={styles.label}>Breed group:</Text>
                                    <Text style={styles.description}>{`${dog.breed_group}`}</Text>
                                </View> : null}
                            {dog.temperament ?
                                <>
                                    <Text style={styles.temperamentsLabel}>Temperaments:</Text>
                                    <View style={styles.temperamentsContainer}>
                                        {dog.temperament.split(', ').map((e, i) =>
                                            <Text key={i} style={styles.temperament}>{e}</Text>
                                        )}
                                    </View>
                                </>
                                :
                                null
                            }
                        </View>
                    </ScrollView>
                    :
                    <View style={styles.containerLoadingImage}>
                        <Image source={require('../assets/loadingGif.gif')} style={{ resizeMode: 'contain', width: 50, height: 50 }} />
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%'
    },
    scroll: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: '5%',
    },
    content: {
        width: '90%'
    },
    oneLine: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'center',
    },
    label: {
        fontWeight: 'bold',
        width: '30%',
        paddingRight: 10
    },
    description: {
        width: '70%',
    },
    temperamentsLabel: {
        fontWeight: 'bold',
        paddingRight: 10
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
        marginTop: 4,
    },
    containerError: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: '5%'
    },
    contentCenter: {
        backgroundColor: '#f8d7da',
        borderWidth: 1,
        borderColor: "#f5c2c7",
        borderRadius: 5,
        padding: 10,
        width: '100%',
    },
    errorGlobal: {
        color: '#842029',
        textAlign: 'center'
    },
    containerLoadingImage: {
        flex: 1,
        justifyContent: 'center'
    }
});