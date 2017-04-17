/**
 * Sample React Native App - Hello, World
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict'; // enables strict mode to improve error-handling

var React = require('react'); // loads react module and assigns to var
var ReactNative = require('react-native'); // loads react-native module and assigns to var
var SearchPage = require('./SearchPage'); // imports SearchPage module

// styling

var styles = ReactNative.StyleSheet.create({ // style declaration
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});

// components

class PropertyFinderApp extends React.Component { 
  render() {
    return (
      <ReactNative.NavigatorIOS // constructs nav controller
      style={styles.container} // applies style
      initialRoute={{ // sets initial route to HelloWorld component
        title: 'Property Finder',
        component: SearchPage,
      }}/>
    );
  }
}

ReactNative.AppRegistry.registerComponent('PropertyFinder', function() {return PropertyFinderApp});
// AppRegistry defines entry pt to app and provides root component
