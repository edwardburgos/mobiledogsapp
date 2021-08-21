import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
import {changeName} from '../../actions';

export default function Landing({navigation}) {

    const dispatch = useDispatch();
    return (
    <View style={styles.container}>
        <ImageBackground source={require('../../assets/landingImage.jpg')} resizeMode="cover" style={styles.image}>
            <View style={styles.content}>
                <Text style={styles.title}>WELCOME</Text>
                <Text style={styles.description}>Get ready to learn more about dog breeds</Text>
                <Button onPress={() => dispatch(changeName('PAOLO'))} title="START" style={styles.button} />
            </View>
        </ImageBackground>
        {/* <StatusBar style="auto" /> */}
    </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
    }
});
