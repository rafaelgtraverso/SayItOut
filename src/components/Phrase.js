import React,{ useContext } from 'react';
import { Input, Button, Icon } from 'react-native-elements';
import { View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import s from '../css/styles';
import { Context as PhraseContext } from '../context/PhraseContext';
import Card from '../components/Card';
import { Data } from '../assets/cardsPng/index';



const Phrase = () => {
    const {state, deleteLastEntry } = useContext(PhraseContext)
    return (
        <View style={s.phraseInputView} >
            <View style={s.phraseInput}>
                { state.phrase.length!= 0 
                ? (
                    state.phrase.map(element => {
                        let cardData= Data.find(d => d.name === element);
                        return <Card item={cardData} />
                    })
                ) : null }
            </View>
            <View style={s.deleteEntry}>
                <TouchableOpacity onPress={deleteLastEntry}>
                    <Icon
                        name='delete'
                        type='feather'
                        size={50}
                        color='black'
                    />
                </TouchableOpacity>
            </View>
        </View>


        // <View style={s.phraseInput}>
            // <Input 
            //     inputContainerStyle={s.phraseInput}
            //     rightIcon={
            //         <TouchableOpacity onPress={deleteLastEntry}>
            //             <Icon
            //                 name='arrow-left'
            //                 size={40}
            //                 color='gray'
            //             />
            //         </TouchableOpacity>
            //     }
            //     editable={null}
            //     // value={state.phrase.join(' ')}
            // >
            //     {state.phrase.forEach((element) => {
            //         let item=Data.find(card => card.name===element);
            //          <Card item={item} />
                    
            //     })}
            // </Input>
        // </View>
    )
};

export default Phrase;