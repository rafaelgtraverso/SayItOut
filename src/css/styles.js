import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const imageSize = () =>{
  if (wp('15%') > hp('15%')) return hp('15%');
  return wp('15%');
}
export const colors ={
 blue : 'rgba(0,0,255,1)',
  red : 'rgba(255,0,0,1)',
  green : 'rgba(69,160,0,1)',
  lightGreen : 'rgba(69,160,0,1)',
  black : 'rgba(0,0,0,1)',
  white : '#rgba(255,255,255,1)',
  grey1 : '#ddd',
}


const s = StyleSheet.create({
  link: {
    color: colors.blue,
    textAlign:'right',
    fontSize:20,
  },
  signup:{
    fontSize:20,
    color:colors.green
  },
  recoveryTitle:{
    fontSize:30,
    color:colors.green

  },
  authForm:{
    minWidth: wp('60%'),
    maxWidth:wp('80%')
  },
  textForm:{
    alignSelf:'center',
    color:colors.green,
  },
  button:{
    fontSize:20,
    color:colors.white,
    textTransform:'capitalize'
  },
  formLogo:{
    maxHeight:hp('5%'),
    maxWidth:wp('80%'),
  },
  container:{
    justifyContent:'center',
    padding:5
  },
  logo:{
    maxHeight:hp('15%'),
    maxWidth:wp('15%'),
  },
  containerForm: {
    alignItems: 'center',
    flex:1,
    justifyContent:'center',
    margin:10,
  },
  containerInput:{
    flex:0.5,
    padding:50,
    justifyContent: 'space-between',
  },
  error:{
    fontSize: 18,
    color: colors.red,
    alignSelf:'center'
  },
  spacer: {
    margin: 10,
  },
  text: {
    fontSize: 40,
    color: colors.green,
  },
  isLoadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phraseInputView: {
    height:wp('35%'),
    padding:5,
    borderWidth:1,
    marginHorizontal:10,
  },
  phraseInput: {
    margin:5,
    padding:5,
    height:imageSize()*1.3,
  },
  phraseView:{
    padding:10,
    borderBottomWidth:1,
    flexDirection:'row',
    flex:1,
  },
  phraseButtons: {
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent:'flex-end',
  },
  buttons:{
    fontSize:40,
    color:colors.green,
  },
  cardsGridview: {
    alignItems: 'center',
  },
  phraseListView:{
    marginBottom:100,
  },
  image: {
    width: imageSize(),
    height: imageSize(),
    marginHorizontal: 5,
  },
  cardItem:{
    justifyContent:'center'
  },
  textFlatList: {
    textAlign: 'center',
    fontSize: imageSize()/5,
    textTransform: 'capitalize'
  },
  flatList: {
    alignItems: 'center',
    margin:5,
    padding:5
  },
  cardContainer: {
    alignItems: 'center',
  },
  loading: {
    alignContent:'space-around',
    alignSelf:'center',
    padding:100,
  },
  headerContent:{
    fontSize:hp('3%'),
    textTransform: 'capitalize',
    color:colors.black,
    alignItems:'center',
  },
 headerAndroid:{
  flex:1,
  alignItems:'center',
  backgroundColor:colors.white
 },
 headerLeft:{
  alignItems:'flex-start'
},
  inputIcon:{
    paddingLeft:15,
    color:colors.black,
  },
  phraseButtonsView:{
    justifyContent:'center',
  }
});

export default s;
