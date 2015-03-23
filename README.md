# Tabcorp coding problem

## Solution Outline

Calculator constructor (with augmented prototype) offers a higher level object oriented interface to solution and promotes good encapsulation (and hiding) of input stream data.

The higher level interface then calls into a lower level, purely functional core library.

## Installation

1. `npm install`
2. `node src/main.js`
3. enter data as specified

## Tests

`npm test` (requires jasmine)

## Potential improvements

1. better descriptions in test examples
2. output should return 0 rather than NaN when no bets for a product are given (this is due to division by zero in dividend())
3. more tests, especially around the calculator constructor
4. export only process() in core module (don't export helpers)
5. remove underscore, use Array.prototype functions for processing collection-like data
6. easy way to pipe sample data into application stdin
