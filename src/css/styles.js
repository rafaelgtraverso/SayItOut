import {StyleSheet} from 'react-native';

const s = StyleSheet.create({
  text: {
    fontSize: 48,
    color: 'green',
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
    height: 150,
    borderBottomColor: 'black',
    marginBottom: 10,
  },
  phraseInput: {
    flex: 0.95,
    borderBottomWidth: 2,
    flexDirection: 'row',
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
    borderColor: 'black',
    backgroundColor: 'white',
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
});

export default s;
