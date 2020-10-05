import {StyleSheet} from 'react-native';

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
    flexDirection: 'row',
    height: 170,
    borderBottomColor: white,
    marginBottom: 10,
  },
  phraseInput: {
    flex: 0.95,
    borderBottomWidth: 2,
    flexDirection: 'row',
  },
  phraseView:{
    padding:10,
    borderBottomWidth:1,
    flexDirection:'row', 
    flex:1,
    alignItems:'center'
  },
  cardsGridview: {
    borderWidth: 1,
    padding: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    flex: 0.8,

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
  phraseButtons: {
    flex: 0.05,
    alignContent:'center',
    borderBottomWidth: 2,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  loading: {
    alignContent:'space-around',
    alignSelf:'center',
    padding:100,
  }
});

export default s;
