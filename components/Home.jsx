
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
import { close, search, options, github } from '../assets/icons';
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
  const [selectedTemperaments, setSelectedTemperaments] = useState('');
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
  function filter(data, currentTemperaments) {
    if (dogs.length < 9) return setError('Wait a moment please');
    let componentValue = data[1];
    let componentId = data[0];
    let finalResult = [];
    let query = searchTerm;
    let action = ''
    if (componentValue && (componentValue.toLowerCase() === componentId && !currentTemperaments.includes(componentValue))) action = 'add'
    if (componentValue && (componentValue.toLowerCase() === componentId && currentTemperaments.includes(componentValue) || `id${componentValue.toLowerCase()}` === componentId && currentTemperaments.includes(componentValue))) action = 'delete'
    if (!currentTemperaments) currentTemperaments = selectedTemperaments
    if (componentId === 'searchTerm') { setSearchTerm(componentValue); query = componentValue }
    if (componentId === 'deleteSearch') { setSearchTerm(''); query = '' }
    finalResult = dogs.filter((e) => e.name.toLowerCase().includes(query.toLowerCase()))
    if (!action && currentTemperaments.length) finalResult = finalResult.filter(e => e.temperament ? currentTemperaments.length === currentTemperaments.filter(temperament => e.temperament.includes(temperament)).length : false)
    if (action === 'add') finalResult = finalResult.filter(e => e.temperament ? currentTemperaments.length + 1 === [...currentTemperaments, componentValue].filter(temperament => e.temperament.includes(temperament)).length : false)
    if (action === 'delete' && currentTemperaments.length !== 1) finalResult = finalResult.filter(e => e.temperament ? currentTemperaments.length - 1 === currentTemperaments.filter(e => e !== componentValue).filter(temperament => e.temperament.includes(temperament)).length : false)



    // if (componentId === 'searchTerm') { setSearchTerm(componentValue); finalResult = base.filter((e) => e.name.toLowerCase().includes(componentValue.toLowerCase()))}} else { if (searchTerm) { finalResult = dogs.filter((e) => e.name.toLowerCase().includes(searchTerm.toLowerCase())) } else { finalResult = dogs } }
    // if (componentId === 'deleteSearch') { if (searchTerm) { finalResult = dogs; setSearchTerm(''); } else { return } }
    // if (currentTemperaments) console.log(currentTemperaments, componentValue, currentTemperaments.includes(componentValue), 'INCLUIDO')
    // if (componentValue && (componentValue.toLowerCase() === componentId && !currentTemperaments.includes(componentValue))) {
    //   finalResult = finalResult.filter(e => e.temperament ? currentTemperaments.length + 1 === [...currentTemperaments, componentValue].filter(temperament => e.temperament.includes(temperament)).length : false)
    // } else if (componentValue && (componentValue.toLowerCase() === componentId && currentTemperaments.includes(componentValue) || `id${componentValue.toLowerCase()}` === componentId && currentTemperaments.includes(componentValue))) {
    //   finalResult = finalResult.filter(e => e.temperament ? currentTemperaments.length - 1 === currentTemperaments.filter(e => e !== componentValue).filter(temperament => e.temperament.includes(temperament)).length : false)
    //   console.log('AHORA', finalResult)
    // }
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
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={[styles.searchContainer, selectedTemperaments.length ? styles.mb0 : styles.mb16]}>
                <View style={styles.searchContent}>
                  <View style={styles.test}>
                    <TextInput style={styles.searchInput} id="searchTerm" placeholder="Insert a dog breed" value={searchTerm} onChangeText={text => filter(['searchTerm', text])} />
                    <TouchableOpacity
                      style={styles.tinyLogoContainer}
                      onPress={() => { if (searchTerm) { Keyboard.dismiss(); filter(['deleteSearch', '']) } }}
                    >
                      <Image
                        style={styles.tinyLogo}
                        source={searchTerm ? close : search}
                      />
                    </TouchableOpacity>
                  </View>
                  <Image
                    style={styles.configIcon}
                    source={options}
                  />
                </View>
              </TouchableWithoutFeedback>

              {/* <div className={s.test}>
                      <Form.Control id="searchTerm" autoComplete="off" value={searchTerm} onChange={e => filter(e)} className={s.searchInput} placeholder='Search a dog breed' />
                      <IonIcon icon={searchTerm ? closeCircleOutline : searchOutline} className={s.iconDumb} id="deleteSearch" onClick={e => filter(e)}></IonIcon>
                    </div>
                    <IonIcon icon={optionsOutline} className={s.filterIcon} onClick={() => setShowFilterModal(true)}></IonIcon>
                  </div>
                  <div className={selectedTemperaments.length ? s.temperaments : s.invisible}>
                    {selectedTemperaments.map(e =>
                      <div key={e} className={s.temperamentContainer}>
                        <span className={s.temperament}>{e}</span>
                        <IonIcon icon={closeCircleOutline} className={s.iconDumb} onClick={event => { setSelectedTemperaments([...new Set(selectedTemperaments.filter(element => element !== e))]); filter({ target: { value: e, id: `id${e.toLowerCase()}` } }, selectedTemperaments); }}></IonIcon>
                      </div>
                    )} */}

              {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
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
              </TouchableWithoutFeedback> */}
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
  searchContainer: {
    // flex: 1,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // flexDirection: 'row',
    backgroundColor: '#1ce609',
    height: 60
  },
  mb0: {
    marginBottom: 0
  },
  mb16: {
    marginBottom: 16
  },
  searchContent: {
    // flex: 1,
    flexDirection: 'row',
    paddingHorizontal: '5%',
    alignItems: 'center',
    height: 60,
  },
  test: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 5,
    paddingVertical: 5,
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  tinyLogoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    height: 20,
    width: 20,
  },
  tinyLogo: {
    // verticalAlign: 'middle',
    position: 'absolute',
    height: 20,
    width: 20,
  },
  configIcon: {
    width: 30,
    marginLeft: 16,
    height: 30
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
