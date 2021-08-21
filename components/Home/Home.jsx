
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Cards from '../Cards/Cards';
// import * as actionsCreators from '../../actions';
// import { useDispatch, useSelector } from 'react-redux';
// import PaginationComponent from '../PaginationComponent/PaginationComponent';
import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, ImageBackground, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IonContent, IonItem, IonLabel, IonList, IonListHeader, IonSelect, IonSelectOption, IonPage, IonItemDivider } from '@ionic/react';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useEffect } from 'react';
import axios from 'axios';
import { receiveDogs, modifyFinalResult } from '../../actions';
import Item from '../Item';


export default function Home({ navigation }) {
  // Redux states
  const actualPageRedux = useSelector(state => state.actualPage);
  const dogs = useSelector(state => state.dogs)
  const finalResultRedux = useSelector(state => state.finalResult)

  // Own States
  const [temperaments, setTemperaments] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [temperament, setTemperament] = useState('');
  const [property, setProperty] = useState('');
  const [errorGlobal, setErrorGlobal] = useState('');
  const [gender, setGender] = useState('')
  // Variables
  const dispatch = useDispatch();

  const renderItem = ({ item }) => (
    <Item item={item} />
  );

  // 
  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    async function requesting() {
      try {
        let completeDogs = await axios.get(`https://api.thedogapi.com/v1/breeds`, { cancelToken: source.token });
        if (completeDogs.status === 200) {
          completeDogs = completeDogs.data.map(e => { return { id: e.id, image: e.image, name: e.name, temperament: e.temperament ? e.temperament : '' } })
          dispatch(receiveDogs(completeDogs));
          dispatch(modifyFinalResult(completeDogs));
          let temperaments = [];
          completeDogs.forEach(e => {
            if (!e.temperament) return;
            var newTemperaments = e.temperament.split(', ');
            temperaments = [...temperaments, ...newTemperaments]
          })
          return setTemperaments([...new Set(temperaments)].sort())
        } else {
          return setErrorGlobal('Sorry, an error ocurred');
        }
      } catch (e) {
        if (e.message !== "Unmounted") setErrorGlobal('Sorry, an error ocurred');
      }
    }
    requesting();
    return () => source.cancel("Unmounted");
  }, [dispatch])



  // Functions
  function filter(data) {
    if (!dogs.length) return setError('Wait a moment please');
    let componentValue = data[1];
    let componentId = data[0];
    let finalResult = [];
    let actualsearchterm = searchTerm;
    let actualtemperament = temperament;
    if (componentId === 'searchTerm') { actualsearchterm = componentValue; setSearchTerm(componentValue) }
    if (componentId === 'temperament') { actualtemperament = componentValue; setTemperament(componentValue) }
    if (componentId === 'deleteSearch') { finalResult = dogs; setSearchTerm(''); } else {
      finalResult = dogs.filter((e) => e.name.toLowerCase().includes(actualsearchterm.toLowerCase()))
    }
    if (componentId === 'deleteTemperamentFilter' || (componentId === 'temperament' && componentValue === 'default')) { setTemperament('') } else {
      finalResult = finalResult.filter(e => e.temperament ? e.temperament.toLowerCase().includes(actualtemperament.toLowerCase()) : false);
    }
    if (!finalResult.length) setError('Not results found')
    dispatch(modifyFinalResult(finalResult))
  }

  return (
    <View style={styles.container}>
      {
        errorGlobal ?
          <View style={styles.containerError}>
            <View style={styles.contentCenter}>
              <Text style={styles.errorGlobal}>{errorGlobal}</Text>
            </View>
          </View>
          :
          <View style={styles.containerHome}>
            <Text style={styles.title}>Dog breeds</Text>
            <View style={styles.filterSection}>
              <Text style={styles.label}>Search a breed</Text>
              <TextInput style={styles.searchInput} id="searchTerm" placeholder="Insert a dog breed" value={searchTerm} onChangeText={text => filter(['searchTerm', text])} />
              <Button title='Delete search' style={styles.button} id="deleteSearch" onPress={() => { filter(['deleteSearch']) }} />
            </View>
            <View style={styles.filterSection}>
              <Text style={styles.label}>Filter by temperament</Text>
              <View style={styles.selectContainer}>
                <Picker
                  selectedValue={temperament}
                  onValueChange={(itemValue) =>
                    filter(['temperament', itemValue])
                  }>
                  <Picker.Item key='default' label="Select a temperament" value="default" />
                  {temperaments.length ?
                    temperaments.map(t => {
                      return <Picker.Item key={t.toLowerCase()} label={t} value={t.toLowerCase()} />
                    })
                    :
                    <Picker.Item key='loading' label="Loading" value="loading" />
                  }
                </Picker>
              </View>

              <Button title='Delete filter' style={styles.button} id="deleteTemperamentFilter" onPress={() => { filter(['deleteTemperamentFilter']) }} />
            </View>
            <View style={styles.flatlistSection}>
              {finalResultRedux.length ?
                <FlatList
                  data={finalResultRedux}
                  renderItem={renderItem}
                  keyExtractor={item => `${item.id}`} />
                :
                <Text>{error}</Text>
              }
            </View>
          </View>
      }
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  containerError: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%'
  },
  contentCenter: {
    backgroundColor: '#f8d7da',
    borderWidth: 1,
    borderColor: "#f5c2c7",
    borderRadius: 5,
    padding: 10,
    // paddingHorizontal: '0',


    // marginBottom: 16,
    //width: '100%',
    //maxWidth: '330',
    //margin: '0 auto'
  },
  errorGlobal: {



    color: '#842029',
    // width: '100%',
    // display: 'block',


  },
  containerHome: {
    flex: 1,
    alignItems: 'center',
    width: '90%'
  },
  title: {
    marginTop: 16,
    fontWeight: 'bold',
    fontSize: 20
  },
  filterSection: {
    marginTop: 16,
    width: '100%',

  },
  flatlistSection: {
    flex: 1,
    marginTop: 30,
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8
  },
  searchInput: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#bacbe6",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  selectContainer: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#bacbe6",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 0
  },


})

// export default function Home() {
//   // Redux states
//   const finalResultRedux = useSelector(state => state.finalResult);
//   const actualPageRedux = useSelector(state => state.actualPage);
//   const dogs = useSelector(state => state.dogs)

//   // Own States
//   const [temperaments, setTemperaments] = useState([]);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [temperament, setTemperament] = useState('');
//   const [property, setProperty] = useState('');
//   const [errorGlobal, setErrorGlobal] = useState('')
//   // Variables
//   const dispatch = useDispatch();

//   // Hooks

//   // This hook load the dogs and the temperaments for the filter
//   useEffect(() => {
//     const cancelToken = axios.CancelToken;
//     const source = cancelToken.source();
//     async function requesting() {
//       try {
//         const completeDogs = await axios.get(`http://localhost:3001/dogs/all`, { cancelToken: source.token });
//         dispatch(actionsCreators.receiveDogs(completeDogs.data));
//         dispatch(actionsCreators.modifyFinalResult(completeDogs.data));
//         const temperaments = await axios.get('http://localhost:3001/temperament', { cancelToken: source.token });
//         setTemperaments(temperaments.data);
//       } catch (e) {
//         if (e.message !== "Unmounted") setErrorGlobal('Sorry, an error ocurred');
//       }
//     }
//     requesting();
//     return () => source.cancel("Unmounted");
//   }, [dispatch])

//   // Functions 

//   function filter(e) {
//     if (e.target.id !== 'own' && e.target.id !== 'notOwn') { e.preventDefault(); }
//     if (dogs.length < 9) return setError('Wait a moment please');
//     let componentValue = e.target.value;
//     let componentId = e.target.id;
//     let finalResult = [];
//     let actualsearchterm = searchTerm;
//     let actualtemperament = temperament;
//     let actualproperty = property;
//     if (componentId === 'searchTerm') { actualsearchterm = componentValue; setSearchTerm(componentValue) }
//     if (componentId === 'temperament') { actualtemperament = componentValue; setTemperament(componentValue) }
//     if (componentId === 'own') { actualproperty = 'own'; setProperty('own') }
//     if (componentId === 'notOwn') { actualproperty = 'notOwn'; setProperty('notOwn') }
//     if (componentId === 'deleteSearch') { finalResult = dogs; setSearchTerm(''); } else {
//       finalResult = dogs.filter((e) => e.name.toLowerCase().includes(actualsearchterm.toLowerCase()))
//     }
//     if (componentId === 'deleteTemperamentFilter' || (componentId === 'temperament' && componentValue === 'default')) { setTemperament('') } else {
//       finalResult = finalResult.filter(e => e.temperament ? e.temperament.toLowerCase().includes(actualtemperament.toLowerCase()) : false);
//     }
//     if (componentId === 'deletePropertyFilter') { setProperty('') } else {
//       if (actualproperty === "own") {
//         finalResult = finalResult.filter(e => e.id >= 265);
//       } else if (actualproperty === "notOwn") {
//         finalResult = finalResult.filter(e => e.id < 265);
//       }
//     }
//     if (!finalResult.length) setError('Not results found')
//     dispatch(actionsCreators.modifyFinalResult(finalResult))
//   }

