import {StyleSheet} from 'react-native';
import { Directions } from 'react-native-gesture-handler';
import AuthForm from '../components/AuthForm';

const blue = '#0000FF';
const red = '#FF0000';
const green = '#008000';
const black = '#000000';
const white = '#FFFFFF'
const s = StyleSheet.create({
  link: {
    color: blue,
  },
  error: {
    fontSize: 16,
    color: red,
  },
  spacer: {
    margin: 10,
  },
  text: {
    fontSize: 48,
    color: green,
  },
  container: {
    marginTop: 50,
    marginBottom: 200,
    padding: 10,
    flex: 1,
    justifyContent: 'center',
  },
  isLoadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phraseInputView: {
    margin: 15,
  },
  phraseInput: {
    paddingBottom:5,
    borderBottomWidth: 3,
    height:150
  },
  phraseView:{
    padding:10,
    borderBottomWidth:1,
    flexDirection:'row', 
    flex:1,
    alignItems:'center'
  },
  phraseButtons: {
    flexWrap:"wrap",
    flexDirection:'row',
    alignSelf:'flex-end',
    margin: 5, 
  },
  cardsGridview: {
    alignItems: 'center',
  },
  phraseListView:{
    marginBottom:120,
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: black,
    backgroundColor: white,
    margin: 5,
  },
  textFlatList: {
    textAlign: 'center',
    width: 100,
  },
  flatList: {
    alignItems: 'center',
  },
  cardContainer: {
    alignItems: 'center',
  },
  loading: {
    alignContent:'space-around',
    alignSelf:'center',
    padding:100,
  }
});

export default s;
