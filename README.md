# npm-list-problems

## Introduction

`npm list` essentially outputs your dependency tree structure.

It also outputs any errors associated with your dependency tree like extraneous or missing dependencies.

Sometimes, it would be useful to programmatically retrieve this list of problems (for example, failing a build if any extraneous errors are found).

## Installation

`npm install npm-list-problems --save`

## API

### `getProblems(relativePath = null)`

* Takes an optional `relativePath` argument. If unspecified, the method will identify problems for the current directory
* Returns an array of problem objects

### `Problem` objects

* There are `6` types of errors that `npm list` returns (defined in [the `getLite` method in `npm`'s `ls.js`](https://github.com/npm/npm/blob/latest/lib/ls.js#L175-L269))
  1. Extraneous dependency
  1. Missing dependency
  1. Missing peer dependency
  1. Invalid dependency
  1. Dependency error

* Each of these error types will produce differently formatted `Problem` objects

#### Extraneous dependency

```javascript
{
  package: 'some package name',
  version: 'some package version',
  path: 'some path to package',
  type: 'EXTRANEOUS_DEPENDENCY',
}
```

#### Missing dependency

```javascript
{
  package: 'some package name',
  version: 'some package version',
  requiredBy: {
    package: 'some other package',
    version: 'some other package version',
  },
  type: 'MISSING_DEPENDENCY',
}
```

#### Missing peer dependency

```javascript
{
  package: 'some package name',
  version: 'some package version',
  requiredBy: {
    package: 'some other package',
    version: 'some other package version',
  },
  type: 'MISSING_PEER_DEPENDENCY',
}
```

#### Invalid dependency

```javascript
{
  package: 'some package name',
  version: 'some package version',
  path: 'some path to package',
  type: 'INVALID_DEPENDENCY',
}
```

#### Dependency error

```javascript
{
  path: 'some path to package',
  message: 'some error message'
  type: 'DEPENDENCY_ERROR',
}
```

## Usage

```javascript
import getProblems from 'npm-list-problems';

// defaults to current directory
getProblems().then(problems => console.log(problems));

// get dependency problems for relative path
getProblems('../some/relative/directory').then(problems => console.log(problems));

// both could output something like
// [
//   { package: 'object-assign',
//     version: '4.1.1',
//     requiredBy: { package: 'react-dom', version: '16.2.0' },
//     type: 'MISSING_DEPENDENCY' },
//   { package: 'prop-types',
//     version: '15.6.0',
//     requiredBy: { package: 'react-dom', version: '16.2.0' },
//     type: 'MISSING_DEPENDENCY' }
// ]
```
