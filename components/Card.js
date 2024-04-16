import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import StarRating from './StarRating';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Card = ({itemData, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.categoryBtn}
      onPress={onPress}>
        <Text style={styles.categoryBtnTxt}>{itemData.name}</Text>
    </TouchableOpacity>
    
  );
};
export default Card;

const styles = StyleSheet.create({
  categoryBtn: {
    alignSelf: 'center',
    backgroundColor: '#AED6F1' /* '#FF6347' */,
    borderRadius: 40,
    marginBottom: 10,
    width: '90%',
    height: 60,
    marginTop: 10,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    color: '#1F618D',
    fontWeight: 'bold',
    paddingHorizontal: 20,
    textAlign: 'center',
    paddingVertical: 15,
    fontSize: 18,
  },
});
