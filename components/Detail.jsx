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
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            {errorGlobal ?
                <View style={styles.containerError}>
                    <View style={styles.contentCenter}>
                        <Text style={styles.errorGlobal}>{errorGlobal}</Text>
                    </View>
                </View>
                :
                Object.keys(dog).length ?
                    <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', width: '100%', paddingHorizontal: '5%' }}>

                        <Image source={{ uri: image }} style={{ resizeMode: 'contain', width: 300, height: 300, marginBottom: 16 }} />
                        {dog.weight.metric ? <>
                            <Text style={styles.label}>Weight:</Text>
                            <Text style={styles.description}>{`${dog.weight.metric} kg`}</Text>
                        </> : null}
                        {dog.height.metric ? <>
                            <Text style={styles.label}>Height:</Text>
                            <Text style={styles.description}>{`${dog.height.metric} cm`}</Text>
                        </> : null}
                        {dog.life_span ? <>
                            <Text style={styles.label}>Life expectancy:</Text>
                            <Text style={styles.description}>{`${dog.life_span}`}</Text>
                        </> : null}
                        {dog.bred_for ? <>
                            <Text style={styles.label}>Bred for:</Text>
                            <Text style={styles.description}>{`${dog.bred_for}`}</Text>
                        </> : null}
                        {dog.breed_group ? <>
                            <Text style={styles.label}>Breed group:</Text>
                            <Text style={styles.description}>{`${dog.breed_group}`}</Text>
                        </> : null}
                        {dog.temperament ?
                            <>
                                <Text style={styles.label}>Temperaments:</Text>
                                <View style={styles.temperamentsContainer}>
                                    {dog.temperament.split(', ').map((e, i) =>
                                        <View key={i} style={styles.test}>
                                            <Text style={styles.temperament}>{e}</Text>
                                        </View>
                                    )}
                                </View>
                            </>
                            :
                            null
                        }
                    </ScrollView>
                    :
                    <View style={styles.containerLoadingImage}>
                        <Image source={require('../assets/loadingGif.gif')} style={{ resizeMode: 'contain', width: 150, height: 150 }} />
                    </View>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    content: {
        width: '90%'
    },
    description: {
        marginBottom: 16,
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
        padding: 10
    },
    errorGlobal: {
        color: '#842029'
    },
    containerLoadingImage: {
        flex: 1,
        justifyContent: 'center'
    }
});