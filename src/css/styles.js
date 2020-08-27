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
        flex:1,
        height:50

    },
    phraseInput:{
        height:200,
        // flex:2
    },
    cardsGridview:{
        borderWidth:1,
        padding:10,
        marginHorizontal:10
    }
});

export default s;