import React from 'react';
import { View, FlatList, Image } from 'react-native';
import s from '../css/styles';
import { Text, Card} from 'react-native-elements';
import { Data } from '../assets/cardsPng/index';
import zip from '../assets/cardsPng/zip.png';


const CardsGrid = () => {
    // const renderImage = ({ item }) => {
    //     const sourcePath = `../assets${item.id}`;
    //     // console.log(sourcePath);
    //     return (
    //         <Card>
    //             <Image style={s.image} source={require('../assets/cardsPng/zip.png')} />
    //         </Card>
            
    //     );
    // };
    console.log(Data)
    return (
        // <View style={s.cardsGridView} >
            // <Card style={{width:100}}>
            //     <Image 
            //         source={{uri:'../assets/cardsPng/zip.png'}}
            //         style={s.image}
            //     />
            // </Card>
             <FlatList
                data={Data}
                renderItem={({item}) => (
                    // <Image
                    //     style={s.image}
                    //     source={item.url}
                    // />
                    <Text>{item}</Text>
                )}
                keyExtractor={item =>Math.random()}
            /> 
        // </View>
    )
};

export default CardsGrid;