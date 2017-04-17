/**
 * Sample React Native App - Hello, World
 * https://github.com/facebook/react-native
 * @flow
 */

 'use strict'; // enable strict mode to improve error-handling

 import React, { Component } from 'react'
 import {
     StyleSheet,
     Image,
     View,
     Text,
 } from 'react-native'

 // styling

 var styles = StyleSheet.create({
     container: {
         marginTop: 65
     },
     heading: {
         backgroundColor: '#F8F8F8',
     },
     separator: {
         height: 1,
         backgroundColor: '#DDDDDD'
     },
     image: {
         width: 320,
         height: 300
     },
     price: {
         fontSize: 25,
         fontWeight: 'bold',
         margin: 5,
         color: '#48BBEC'
     },
     title: {
         fontSize: 20,
         margin: 5,
         color: '#656565',
     },
     description: {
         fontSize: 18,
         margin: 5,
         color: '#656565',
     }
 });

 // components

 class PropertyView extends Component {

     render() {
         var property = this.props.property;
         var stats = property.bedroom_number + ' bed ' + property.property_type;
         if (property.bathroom_number) {
             stats += ', ' + property.bathroom_number + ' ' + (property.bathroom_number > 1
                ? 'bathrooms' : 'bathroom'); 
         } // manipulates data to make it more presentable regardless of API quality

         var price = property.price_formatted.split(' ')[0];

         return (
            <View style={styles.container}>
                 <Image style={styles.image}
                    source={{uri: property.img_url}} />
            <View style={styles.heading}>
                <Text style={styles.price}>{price}</Text>
                <Text style={styles.title}>{property.title}</Text>
                <View style={styles.separator}/>
            </View>
                <Text style={styles.description}>{stats}</Text>
                <Text style={styles.description}>{property.summary}</Text>
            </View>
         );
    }
}

module.exports = PropertyView;