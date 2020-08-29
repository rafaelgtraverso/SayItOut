import React from 'react';
import { View, FlatList } from 'react-native';
import s from '../css/styles';
import { Text, Card, Image} from 'react-native-elements';
import { Data }from '../assets/cardsPng/index';
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
    console.log(Data);
    return (
        // <View style={s.cardsGridView} >
            // <Card style={{width:100}}>
            //     <Image 
            //         source={require('../assets/cardsPng/zip.png')}
            //         style={s.image}
            //     />
            // </Card>
             <FlatList
                data={Data}
                renderItem={({item}) => (
                    <Image
                        style={s.image}
                        source={item.id}
                    />
                    // <Text>{item.id}</Text>
                )}
                keyExtractor={item =>item.id}
            /> 
        // </View>
    )
};

export default CardsGrid;