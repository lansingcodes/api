[![Netlify Status](https://api.netlify.com/api/v1/badges/b772609a-aedb-45c7-8298-f4623db20ecc/deploy-status)](https://app.netlify.com/sites/lansingcodes-api-staging/deploys)

# Firebase-backed API for Lansing Codes

This repository consists of tooling to manage Firebase rules, indexes, etc. and
lambda functions deployed to Netlify to manage the data collected in Firebase.

## Using the data

The Lansing Codes data is publicly available. Here's the data model:

![Lansing Codes Data Model](https://i.imgur.com/L2Xl8zt.jpg)

To access the data, you must use a
[Firebase client](https://firebase.google.com/docs/firestore/quickstart#set_up_your_development_environment)
to connect to the Firebase Firestore of the appropriate environment.

### Firebase config

To access the data, you must configure your Firebase client to connect to the
right data store. The following list of publicly available data stores are
available.

All configurations are shown in JavaScript.

#### Staging

``` js
const firebaseConfig = {
  apiKey: "AIzaSyBukJRUN9wfHFnZc_fjBRRHNsLSCTxqhGQ",
  authDomain: "lansing-codes-staging.firebaseapp.com",
  databaseURL: "https://lansing-codes-staging.firebaseio.com",
  projectId: "lansing-codes-staging",
  storageBucket: "lansing-codes-staging.appspot.com",
  messagingSenderId: "36794992743",
  appId: "1:36794992743:web:2350879a650f171e"
}
```

#### Production

``` js
var firebaseConfig = {
  apiKey: "AIzaSyCMw8mZ1D1GAYpeotAqVCaYAMtn3URVOok",
  authDomain: "lansing-codes.firebaseapp.com",
  databaseURL: "https://lansing-codes.firebaseio.com",
  projectId: "lansing-codes",
  storageBucket: "lansing-codes.appspot.com",
  messagingSenderId: "647280182517",
  appId: "1:647280182517:web:779f72d0b90c0dd4"
}
```

## Questions

For general support, direct your questions to the
[Lansing Codes Slack team](http://slack.lansing.codes). The issue list for this
project is exclusively for bug reports and feature requests.

## Stay in touch

- [Slack](http://slack.lansing.codes)
- [Twitter](https://twitter.com/lansingcodes)
- [Facebook](https://www.facebook.com/lansingcodes)
- [Website](https://www.lansing.codes)
- [Newsletter](http://bit.ly/lansing-codes-newsletter)

## Contribution

You are welcome and encouraged to make changes to this repository by submitting
pull requests or forking our code to support your city of coders!

Before you get ahead of yourself, though, please read our
[Contributing Guide](https://github.com/lansingcodes/api/blob/master/.github/CONTRIBUTING.md).

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2015-present, Humanity Codes LLC
