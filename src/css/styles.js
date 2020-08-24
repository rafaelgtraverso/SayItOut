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
    }
});

export default s;