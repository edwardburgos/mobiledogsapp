import { RouteManagerContext } from '@ionic/react';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

//import {changeName} from '../../actions';

export default function Detail({ route }) {

    const [dog, setDog] = useState({});
    const [errGlobal, setErrGlobal] = useState('')
    const { id, name, image } = route.params

    useEffect(() => {
        async function findDog(id) {
            try {
                const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`);
                if (response.status === 200) {
                    setDog(response.data);
                } else {
                    return setErrGlobal('Sorry, an error ocurred')
                }
            } catch (e) {
                return setErrGlobal('Sorry, an error ocurred')
            }
        }
        findDog(id);
    }, [id])

    const dispatch = useDispatch();

    return (
        <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
            {/* /</View>/<View style={styles.content}> */}
            <ScrollView contentContainerStyle={{ alignItems: 'center',  width: '90%' }}>
            {/* card: {
        flex: 1,
        //flexWrap: 'wrap',
       
        padding: 16,
        alignItems: 'center',
        width: '100%'
    }, */}
            {
                Object.keys(dog).length ?
                    <>
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
                    </>
                    : null
            }
            {/* style={styles.card} onPress={() => navigation.navigate('Detail', {item: item.id, name: item.name})} */}
            </ScrollView>
            </SafeAreaView>
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
        alignItems: 'center'
    },
    content: {
        width: '90%'
    },
    // card: {
    //     flex: 1,
    //     //flexWrap: 'wrap',
    //     marginBottom: 16,
    //     backgroundColor: 'rgba(231, 233, 235, 0.5)',
    //     padding: 16,
    //     borderRadius: 16,
    //     alignItems: 'center',
    //     width: '100%'
    // },
    // image: {
    //     flex: 1,
    //     justifyContent: "center",
    //     flexDirection: 'row'
    // },
    // title: {
    //     marginTop: 0,
    //     marginBottom: 16,
    //     fontWeight: 'bold',
    //     textAlign: 'center',
    //     fontSize: 20
    // },
    description: {
        marginBottom: 16,
        textAlign: 'center'
    },
    // content: {
    //     backgroundColor: 'rgba(231, 233, 235, 0.6)',
    //     padding: 20,
    //     borderRadius: 16,
    //     alignSelf: 'flex-end',
    //     marginBottom: 50

    // },
    // button: {
    //     backgroundColor: '#2962ff',
    //     padding: 10,
    //     width: '100%',
    //     borderRadius: 5,
    // },
    // buttonText: {
    //     color: '#fff',
    //     fontWeight: 'bold',
    //     textAlign: 'center'
    // },
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


// import loading from '../../img/loadingGif.gif';


// export default function Detail({ id }) {
//     // Own states
//     const [dog, setDog] = useState({});
//     const [errGlobal, setErrGlobal] = useState('')

//     // Hooks

//     // This hook load the dog data
//     useEffect(() => {
//         async function findDog(id) {
//             try {
//                 let response = await axios.get(`http://localhost:3001/dogs/${id}`);
//                 if (response.status === 200) {
//                     setDog(response.data);
//                 }
//             } catch (e) {
//                 return setErrGlobal('Sorry, an error ocurred')
//             }

//         }
//         findDog(id);
//     }, [id])

//     return (
//         <>
//             {!errGlobal ?
//                 Object.keys(dog).length ?
//                     <div className={s.container}>
//                         <div className={s.cardDetail}>
//                             <h1 className={s.title}>{dog.name}</h1>
//                             <img src={dog.image} className={s.image} alt={dog.name}></img>
//                             {dog.temperament ?
//                                 <>
//                                     <span className={s.label}>Temperament :</span>
//                                     <div className={s.temperamentsContainer}>
//                                         {dog.temperament.split(', ').map((e, i) =>
//                                             <div key={i} className={s.test}>
//                                                 <div className={s.temperament}>{e}</div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </>
//                                 :
//                                 null
//                             }
//                             <div>
//                                 <span className={s.label}>Height :</span>
//                                 <p>{dog.height} cm</p>
//                             </div>
//                             <div>
//                                 <span className={s.label}>Weight :</span>
//                                 <p>{dog.weight} kg</p>
//                             </div>
//                             <div>
//                                 <span className={s.label}>Lifespan :</span>
//                                 <p>{dog.lifespan}</p>
//                             </div>
//                         </div>
//                     </div>
//                     :
//                     <div className={s.containerCenter}>
//                         <div className={s.contentCenter}>
//                             <img src={loading} alt='loadingGif' width="25%"></img>
//                         </div>
//                     </div>
//                 :
//                 <div className={s.containerCenter}>
//                     <div className={s.contentCenter}>
//                         {errGlobal ? <p className={s.errorGlobal}>{errGlobal}</p> : null}
//                     </div>
//                 </div>
//             }
//         </>

//     );
// }
