import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    textTransform:'uppercase'
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
    margin:5,
    height:hp('28%'),
    padding:5,
  },
  phraseInput: {
    margin:5,
    padding:5,
    height:hp('21%'),
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
    alignItems:'center',
  },
  buttons:{
    fontSize:45,
    color:colors.green,
  },
  cardsGridview: {
    alignItems: 'center',
  },
  phraseListView:{
    marginBottom:100,
  },
  image: {
    width: wp('15%'),
    height: wp('15%'),
    borderWidth: 1,
    borderRadius:45,
    borderColor: colors.grey1,
    backgroundColor: colors.white,
    margin: 10,
    overflow:'hidden'
  },
  textFlatList: {
    textAlign: 'center',
    fontSize: wp('2%'),
    textTransform: 'capitalize'
  },
  flatList: {
    alignItems: 'center',
    paddingBottom:450,
    margin:5
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
