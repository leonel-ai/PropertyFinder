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
     TouchableHighlight,
     ListView,     // displays rows of data wn scrolling container
     Text
 } from 'react-native';

 var PropertyView = require('./PropertyView'); // allows use of PropertyView class

// styling

var styles = StyleSheet.create({
    thumb: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    textContainer: {
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#656565'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    }
});

 // components

 class SearchResults extends Component {

    constructor (props) {
        super(props);
        var dataSource = new ListView.DataSource( // supply data to ListView
            {rowHasChanged: (r1, r2) => r1.lister_url !== r2.lister_url}); // compare IDs of pair of rows
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.listings)
        };
    }

    renderRow(rowData, sectionID, rowID) { // func supplies UI for each row
       var price = rowData.price_formatted.split(' ')[0];
       
        return(
            <TouchableHighlight onPress={() => this.rowPressed(rowData.lister_url)}
                underlayColor='#dddddd'>
            <View>
                <View style={styles.rowContainer}>
                    <Image style={styles.thumb} source={{uri: rowData.img_url}} />
                    <View style={styles.textContainer}>
                        <Text style={styles.price}>{rowData.title}</Text>
                        <Text style={styles.title}
                            numberOfLines={1}>{rowData.title}</Text>
                    </View>
                </View>
            <View style={styles.separator}/>
            </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}/> 
        );
    }

    rowPressed(listerURL) {
        var property = this.props.listings.filter(prop => prop.lister_url === listerURL)[0];

        this.props.navigator.push({
            title: "Property",
            component: PropertyView,
            passProps: {property: property}
        });
    }
 }

 module.exports = SearchResults;