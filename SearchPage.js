/**
 * Sample React Native App - Hello, World
 * https://github.com/facebook/react-native
 * @flow
 */

 'use strict'; // enable strict mode to improve error-handling

import React, { Component } from 'react'
import { // destructuring assignment - extract multi obj prop, assign to var w/ 1 statement
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicator,
    Image
} from 'react-native'; // allows drop of React prefix

var SearchResults = require('./SearchResults'); // allows use of SearchResults class

// styling

var styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    searchInput: {
          height: 36,
          padding: 4,
          marginRight: 5,
          flex: 4,
          fontSize: 18,
          borderWidth: 1,
          borderColor: '#48BBEC',
          borderRadius: 8,
          color: '#48BBEC'
    },
    image: {
        width: 217,
        height: 138
    }
}); // using standard CSS properties

// components
 
function urlForQueryAndPage(key, value, pageNumber) {  // utility func
    var data = {
        country: 'uk',
        pretty: '1',
        encoding: 'json',
        listing_type: 'buy',
        action: 'search_listings',
        page: pageNumber
    };
    data[key] = value;

    var querystring = Object.keys(data) // create query string based on data param
        .map(key => key + '=' +
    encodeURIComponent(data[key]))  // transform data to req'd string format
        .join('&');                 //  name=value pairs separated by &

    return 'http://api.nestoria.co.uk/api?' + querystring;
};

class SearchPage extends Component {
    
    constructor(props) {
        super(props);
    this.state = {    // state var
        searchString: 'london', // set to inital value
        isLoading: false,    // keep track whether query in progress
        message: ''
        };
    }

    onSearchTextChanged(event) {   // event handler
        console.log('onSearchTextChanged');
        this.setState({ searchString: event.nativeEvent.text});
        console.log(this.state.searchString);
    }

    render() {
        var spinner = this.state.isLoading ?
            ( <ActivityIndicator    // adds activity indicator
                size='large'/> ) :  // ternary if-statement
            ( <View/> );            // adds empty view
       
        return (
            <View style={styles.container}>
                    <Text style={styles.description}>
                        Search for houses to buy!
                    </Text>
                    <Text style={styles.description}>
                        Search by place name, postcode or search near your location.
                    </Text>
               
                <View style={styles.flowRight}>
                    <TextInput
                        style={styles.searchInput}
                        value={this.state.searchString}  // set initial state
                        onChange={this.onSearchTextChanged.bind(this)}  // invoke event handler func
                        placeholder='Search via name or postcode'/>
                    <TouchableHighlight style={styles.button}
                        underlayColor='#99d9f4'
                        onPress={this.onSearchPressed.bind(this)}>
                            <Text style={styles.buttonText}>Go</Text>
                    </TouchableHighlight>
                </View>

                <View style={styles.flowRight}>
                    <TouchableHighlight style={styles.button} onPress={this.onLocationPressed.bind(this)}
                        underlayColor='#99d9f4'>
                            <Text style={styles.buttonText}>Location</Text>
                    </TouchableHighlight>
                </View>

                <Image source={require('./Resources/house.png')} style={styles.image}/>
                {spinner} 
                
                <Text style={styles.description}>{this.state.message}</Text>
            </View> 
        ); 
    }
    
        _executeQuery(query) {  // eventually runs query
            console.log(query); // logs msg to console
            this.setState({ isLoading: true});
            fetch(query)        // fetch func
                .then(response => response.json()) // returns promise, success path parses json
                .then(json => this._handleResponse(json.response)) // supplies json to method
                .catch(error =>
                    this.setState({
                        isLoading: false,
                        message: 'Something bad happened ' + error
                    }));
            }

        onSearchPressed() {  // config and init search query
            var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
            this._executeQuery(query);
        }

        _handleResponse(response) {
            this.setState({ isLoading: false, message: ''}); // clears isLoading
            if (response.application_response_code.substr(0,1) === '1') {
                this.props.navigator.push({ // ensures search results pushed onto nav stack, i.e. back button
                    title: 'Results',
                    component: SearchResults,
                    passProps: {listings: response.listings}
                }); // navigates to SearchResults component, passes listings from API request
            } else {
                this.setState({ message: 'Location not recognized; please try again.'});
            }
        }

        onLocationPressed() { 
            navigator.geolocation.getCurrentPosition( // retrieve current position
                location => { // if position obtained, send query to Nestoria
                    var search = location.coords.latitude + ',' + location.coords.longitude;
                    this.setState({searchString: search});
                    var query = urlForQueryAndPage('centre_point', search, 1);
                    this._executeQuery(query);
                },
                error => { 
                    this.setState({
                        message: 'There was a problem with obtaining your location: ' + error 
                    });
                });
        }
}

module.exports = SearchPage; // exports SearchPage class for use in other files