import React, {useState, useEffect} from 'react';
import {View, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import s from '../css/styles';
import Card from '../components/Card';
import * as RNLocalize from 'react-native-localize';
import { getCards } from '../api/local/sqlite';
import { showPhrase } from '../actions/phrases';
import {connect} from 'react-redux';
import { handleVoice } from '../helpers/tts/handleVoices';

const CardsGrid = (props) => {
  const phoneLanguage = RNLocalize.getLocales()[0].languageCode;
  const screenWidth = Dimensions.get('window').width;
  const [column, setColumn] = useState(
    parseInt(screenWidth / (s.image.width + 10), 10),
  );

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
    <View onLayout={onLayout} style={s.cardsGridview}>
      <FlatList
        data={dataSql}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => props.show_phrase(item)}>
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


const mapStateToProps = (state) => {
  return {
   phrases:state.phraseReducer
 }
};

const mapDispatchToProps = (dispatch) => {
  return{
    show_phrase:  (item, phoneLanguage) => {
      dispatch(showPhrase(item));
      if(phoneLanguage=='it'){
        handleVoice(item.name_it);
      }else {
          handleVoice(item.name)
      }
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(CardsGrid);
