import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
//import {changeName} from '../../actions';

export default function Detail({ item, navigation}) {
    const { id, img, name, temperament } = item;
    const dispatch = useDispatch();
    return (
        <View style={styles.card} onPress={() => navigation.navigate('Detail', {item: item.id, name: item.name})}>
            <Text style={styles.title}>{name}</Text>
            <Image style={styles.image} source={{ uri: img.url }} alt={name} width="100%" />
            {temperament ?
                <View style={styles.temperaments}>
                    <Text style={styles.label}>Temperaments:</Text>
                    <View style={styles.temperamentsContainer}>
                        {temperament.split(', ').map((e, i) =>
                            <View key={i} style={styles.test}>
                                <Text style={styles.temperament}>{e}</Text>
                            </View>
                        )}
                    </View>
                </View>
                :
                null
            }
            <Button style={styles.detailsButton} title='See details' />
        </View>
    );

    {/* <View style={styles.content}>
                <Text style={styles.title}>WELCOME</Text>
                <Text style={stylesd.description}>Get ready to learn more about dog breeds</Text>
                <Button onPress={() => dispatch(changeName('PAOLO'))} title="START" style={styles.button} />
            </View> */}
    {/* <StatusBar style="auto" /> */ }


    // <View style={styles.container}>
    //     <Text style={styles.title}>{item.name}</Text>

    // </View>


    // return (

    //   );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        flexWrap: 'wrap',
        marginBottom: 30,
        marginHorizontal: 20,
        backgroundColor: 'rgba(231, 233, 235, 0.5)',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center'
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
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        padding: 10,
        width: '100%',
        borderRadius: 16,
    },
    // temperaments: {
    //     back
    // }
});
