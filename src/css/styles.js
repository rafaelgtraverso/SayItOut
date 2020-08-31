import { StyleSheet } from 'react-native';

const s = StyleSheet.create({
    text: {
        fontSize:48,
        color: 'green'
    },
    container: {
        marginTop: 50,
        marginBottom:200,
        padding:10,
        flex: 1,
        justifyContent: 'center'
    },
    isLoadingView: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    phraseInputView:{
        flexDirection:'row',
        flex:2,
        height:120

    },
    phraseInput:{
        height:120,
        // flex:1
    },
    cardsGridview:{
        borderWidth:1,
        padding:5,
        marginHorizontal:5,
        alignItems:'center',
        flex:1
    },
    image:{
        width:100,
        height:100,
        borderWidth:2,
        borderColor:'black',
        backgroundColor:'white',
        margin:5
    },
    textFlatList:{
        textAlign:'center',
        width:100,
    },
    flatList:{
        alignItems:'center',
        //flex:1,
        // flexDirection:'row'
    },
    cardContainer:{
        alignItems:'center'
    }
});

export default s;