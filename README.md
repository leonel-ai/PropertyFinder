# PropertyFinder
React Native app for searching UK property listings


## INSPIRATION
The desire for a hands-on learning experience with React and React-Native. Over the course of a weekend, 
I set out to complete a simple business app that would teach me the foundations of the framework as well as
the basics of iOS development.

## WHAT IT DOES
Basic level property search contained within the UK. The property listings are pulled from Nestoria API. 
Nestoria is a vertical search engine for property in the UK and Spain. The site offers an API to their 
database of geocoded properties.

## CHALLENGES FACED
At first, location button appeared as a thin line rather than a button below the text input fields. 
Resolved by adding < View style={styles.flowRight} > < /View > around the button.

Later, search queries were unable to initiate upon pressing the “Go” button. 
Found the minor capitalization discrepancy between a declared var “queryString” and later asking 
to return “querystring” within the utility function.

Nestoria API isn’t available over HTTPS. Added App Transport Security exception to Info.plist.

## KNOWLEDGE GAINED
DOM standards, JSX, Components, render(), destructuring assignments, module.exports, SVG and Flexbox, 
API requests, promises, JSON parsing, geolocation API

## BUILT WITH
Xcode, Visual Studio Code, brew, node.js


