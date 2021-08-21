import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { useDispatch } from 'react-redux';
//import {changeName} from '../../actions';

export default function Item({ item, navigation}) {
    const { id, image, name, temperament } = item;
    const dispatch = useDispatch();
    // let divisor = image.width;
    // if (image.width > 1500)
    return (
        <View style={styles.card} onPress={() => navigation.navigate('Detail', {item: item.id, name: item.name})}>
            <Text style={styles.title}>{name}</Text>
            {/* <Image style={styles.image} source={{ uri: image }} alt={name} /> */}
            <Image source={{uri: image.url}} style={{resizeMode: 'contain', width: 300, height: 300, marginBottom: 16}} />
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
        //flexWrap: 'wrap',
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
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        padding: 10,
        width: '100%',
        borderRadius: 16,
    },
    temperament: {
        backgroundColor: '#2962ff',
        color: '#fff',
        padding: 8,
        borderRadius: 5,
        borderColor: 'transparent',
        borderWidth: 1,
        marginHorizontal: 4,
        marginBottom: 4
    },   
    temperamentsContainer: {
        flex: 1,
        width: '100%',
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


// import s from './Card.module.css';
// import React from 'react';
// import { useHistory } from 'react-router';

// export default function Card({ name, img, temperament, id }) {
//   // Variables
//   const history = useHistory();

//   return (
//     <div style={styles.card} onClick={() => history.push(`/detail/${id}`)}>
//       <p style={styles.title}>{name}</p>
//       <img style={styles.image} src={img} alt={name} width="100%" />
//       {temperament ?
//         <div style={styles.temperaments}>
//           <span style={styles.label}>Temperaments:</span>
//           <div style={styles.temperamentsContainer}>
//             {temperament.split(', ').map((e, i) =>
//               <div key={i} style={styles.test}>
//                 <div style={styles.temperament}>{e}</div>
//               </div>
//             )}
//           </div>
//         </div>
//         :
//         null
//       }
//       <div style={styles.detailsButton}>See details</div>
//     </div>
//   );
// }

