import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const blue = 'rgba(0,0,255,1)';
const red = 'rgba(255,0,0,1)';
const green = 'rgba(69,160,0,1)';
const black = 'rgba(0,0,0,1)';
const white = '#rgba(255,255,255,1)';


const s = StyleSheet.create({
  link: {
    color: blue
  },
  textForm:{
    alignSelf:'center',
    fontSize:18
  },
  button:{
    paddingHorizontal:55,
    fontSize:24,
  },
  logo:{
    width:  wp('60%'),
    height: hp('15%'),
  },
  logosTitle:{
    width:  wp('80%'),
  },
  logosSubtitle:{
    width:  wp('80%'),
  },
  container:{
    flex:1 ,
  },
  logoContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'space-around',
  },
  containerForm: {
    flex:1,
  },
  containerInput:{
    flex:1,
    width: wp('80%'),
    alignSelf:'center',
    justifyContent: 'space-around',
  },
  error:{
    fontSize: 18,
    color: red,
    alignSelf:'center'
  },
  spacer: {
    margin: 10,
  },
  text: {
    fontSize: 48,
    color: green,
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
    borderBottomWidth:3,
    height:150,
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
    margin:5,
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
    textTransform: 'capitalize'
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
