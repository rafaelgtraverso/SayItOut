import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const colors ={
 blue : 'rgba(0,0,255,1)',
  red : 'rgba(255,0,0,1)',
  green : 'rgba(69,160,0,1)',
  black : 'rgba(0,0,0,1)',
  white : '#rgba(255,255,255,1)',
  grey1 : '#ddd',
}


const s = StyleSheet.create({
  link: {
    color: colors.blue,
    textAlign:'right',
    fontSize:15
  },
  signup:{
    fontSize:18,
    color:colors.green
  },
  authForm:{
    minWidth: wp('50%'),
  },
  textForm:{
    alignSelf:'center',
    color:colors.green,
  },
  button:{
    paddingHorizontal:55,
    fontSize:24,
    color:colors.white,
    textTransform:'uppercase'
  },
  formLogo:{
    maxHeight:50,
  },
  container:{
    justifyContent:'center',
    padding:5
  },
  logo:{
    height:wp('15%'),
  },
  containerForm: {
    alignItems: 'center',
    flex:1,
    justifyContent:'center',
    marginHorizontal:30
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
   marginVertical:15,
   marginHorizontal:25
  },
  phraseInput: {
    padding:5,
    height:200,
  },
  phraseView:{
    padding:10,
    borderBottomWidth:1,
    flexDirection:'row',
    flex:1,
    justifyContent:'center'
  },
  phraseButtons: {
    flexWrap:"wrap",
    flexDirection:'row',
    alignSelf:'flex-end',
    margin:5,
  },
  buttons:{
    fontSize:50,
    color:colors.green,
    height:60,
  },
  cardsGridview: {
    alignItems: 'center',
  },
  phraseListView:{
    marginBottom:100,
  },
  image: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: colors.grey1,
    borderRadius: 10,
    backgroundColor: colors.white,
    margin: 5,
  },
  textFlatList: {
    textAlign: 'center',
    width: 110,
    textTransform: 'capitalize'
  },
  flatList: {
    alignItems: 'center',
    paddingBottom:450
  },
  cardContainer: {
    alignItems: 'center',
  },
  loading: {
    alignContent:'space-around',
    alignSelf:'center',
    padding:100,
  },
  header:{
    height:60,
    marginTop:10,
  },
  headerContent:{
    fontSize:30,
    textTransform: 'capitalize',
    color:colors.black,
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
