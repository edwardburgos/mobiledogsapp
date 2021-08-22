import React from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useEffect } from 'react';
import axios from 'axios';
import { receiveDogs, modifyFinalResult } from '../actions';
import Item from './Item';
import PickerModal from 'react-native-picker-modal-view';
import temperamentsJSON from '../assets/temperaments.json';

export default function Home({ navigation }) {
  // Redux states
  const dogs = useSelector(state => state.dogs)
  const finalResultRedux = useSelector(state => state.finalResult)

  // Own States
  const [temperaments, setTemperaments] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [temperament, setTemperament] = useState('');
  const [errorGlobal, setErrorGlobal] = useState('');

  // Variables
  const dispatch = useDispatch();
  const renderItem = ({ item }) => (
    <Item item={item} navigation={navigation} />
  );

  // This hook allows us to get the dogs and temperaments
  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    async function requesting() {
      try {
        let completeDogs = await axios.get(`https://api.thedogapi.com/v1/breeds`, { cancelToken: source.token });
        if (completeDogs.status === 200) {
          completeDogs = completeDogs.data.map(e => { return { id: e.id, image: e.image.url, name: e.name, temperament: e.temperament ? e.temperament : '' } })
          dispatch(receiveDogs(completeDogs));
          dispatch(modifyFinalResult(completeDogs));
          let temperaments = [];
          completeDogs.forEach(e => {
            if (!e.temperament) return;
            var newTemperaments = e.temperament.split(', ');
            temperaments = [...temperaments, ...newTemperaments]
          })
          return setTemperaments([...new Set(temperaments)].sort().map(temperament => { return { "Name": `${temperament}` } }))
        } else {
          return setErrorGlobal('Sorry, an error ocurred');
        }
      } catch (e) {
        return setErrorGlobal('Sorry, an error ocurred');
      }
    }
    requesting();
    return () => source.cancel("Unmounted");
  }, [dispatch])

  // Functions

  // This function is executed when a temperament is selected
  function onSelected(selected) {
    Object.keys(selected).length ? filter(['temperament', JSON.parse(JSON.stringify(selected)).Name]) : filter(['deleteTemperamentFilter'])
  }

  // This function allows to filter the information
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
    <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
      {
        errorGlobal ?
          <View style={styles.containerError}>
            <View style={styles.contentCenter}>
              <Text style={styles.errorGlobal}>{errorGlobal}</Text>
            </View>
          </View>
          :
          dogs.length && temperaments.length ?
            <View style={styles.containerHome}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <View style={styles.filterSection}>
                  <Text style={styles.label}>Search a breed</Text>
                  <TextInput style={styles.searchInput} id="searchTerm" placeholder="Insert a dog breed" value={searchTerm} onChangeText={text => filter(['searchTerm', text])} />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => { Keyboard.dismiss(); filter(['deleteSearch']); }}
                  >
                    <Text style={styles.buttonText}>Delete search</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <View style={styles.filterSection}>
                  <Text style={styles.label}>Filter by temperament</Text>
                  <PickerModal
                    renderSelectView={(disabled, selected, showModal) =>
                      <TouchableOpacity
                        style={styles.selectContainer}
                        onPress={showModal}
                      >
                        <Text style={temperament ? styles.selectedText : styles.selectText}>{temperament ? temperament : 'Select a temperament'}</Text>
                      </TouchableOpacity>
                    }
                    onSelected={onSelected}
                    items={temperamentsJSON}
                    sortingLanguage={'tr'}
                    showToTopButton={true}
                    selected={temperament}
                    showAlphabeticalIndex={true}
                    autoGenerateAlphabeticalIndex={true}
                    searchPlaceholderText={'Search a temperament'}
                    requireSelection={false}
                    autoSort={false}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => { Keyboard.dismiss(); filter(['deleteTemperamentFilter']) }}
                  >
                    <Text style={styles.buttonText}>Delete filter</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
              {finalResultRedux.length ?
                <FlatList
                  data={finalResultRedux}
                  renderItem={renderItem}
                  onScroll={Keyboard.dismiss}
                  style={styles.flatlistSection}
                  keyExtractor={item => `${item.id}`} />
                :
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                  <Text style={styles.error}>{error}</Text>
                </TouchableWithoutFeedback>
              }
            </View>
            :
            <View style={styles.containerLoadingImage}>
              <Image source={require('../assets/loadingGif.gif')} style={{ resizeMode: 'contain', width: 150, height: 150 }} />
            </View>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  containerError: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: '5%'
  },
  containerLoadingImage: {
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#2962ff',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
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
  containerHome: {
    flex: 1,
    alignItems: 'center',
    width: '100%'
  },
  title: {
    marginTop: 16,
    fontWeight: 'bold',
    fontSize: 20
  },
  filterSection: {
    marginTop: 16,
    width: '100%',
    paddingHorizontal: '5%'
  },
  flatlistSection: {
    flex: 1,
    marginTop: 16,
    width: '100%',
    paddingHorizontal: '5%'
  },
  error: {
    flex: 1,
    marginTop: 16,
    width: '100%',
    paddingHorizontal: '5%',
    textAlign: 'center'
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
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  selectText: {
    color: '#A3A3A3'
  },
  selectedText: {
    color: '#000'
  }
})