import React, {useState, useContext, useEffect} from 'react';
import {Context as PhraseContext} from '../context/PhraseContext';
import {View, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import s from '../css/styles';
import Card from '../components/Card';
import * as RNLocalize from 'react-native-localize';
import { getCards } from '../api/local/sqlite';

const CardsGrid = () => {
  const phoneLanguage = RNLocalize.getLocales()[0].languageCode;
  const screenWidth = Dimensions.get('window').width;
  const [column, setColumn] = useState(
    parseInt(screenWidth / (s.image.width + 10), 10),
  );
  const {showPhrase} = useContext(PhraseContext);

  const onLayout = (event) => {
    setColumn(
      parseInt(event.nativeEvent.layout.width / (s.image.width + 10), 10),
    );
  };

  const [dataSql,setDataSql]=useState([]);
  useEffect(()=>{
    const cb = cards => setDataSql(cards);
    getCards({cb});
  },[]);
  return (
    <View style={{alignItems: 'center'}} onLayout={onLayout}>
      <FlatList
        data={dataSql}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => showPhrase(item,phoneLanguage)}>
            <Card item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item,index) => item.name+index.toString()}
        numColumns={column}
        key={column}
      />
    </View>
  );
};

export default CardsGrid;
