import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import {data} from '../model/data';
import Card from '../components/Card';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CardListScreen = ({navigation}) => {

    const renderItem = ({item}) => {
        return (
            <Card 
                itemData={item}
                onPress={()=> navigation.navigate('CardItemDetails', {itemData: item})}
            />
        );
    };

    return (
      <View style={styles.container1}>
        <FlatList 
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
      </View>
    );
};

export default CardListScreen;

const styles = StyleSheet.create({
  container1: {
    flex: 1, 
    width: '90%',
    alignSelf: 'center'
  },
});
