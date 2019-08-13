# Firebase-backed API for Lansing Codes

This repository consists of tooling to manage Firebase rules, indexes, etc. and
lambda functions deployed to Netlify to manage the data withing Firebase.

## Data access

The Lansing Codes data is publicly available! Here's the data mode:

![Lansing Codes Data Model](https://i.imgur.com/L2Xl8zt.jpg)

To access the data, you must use a
[Firebase client](https://firebase.google.com/docs/firestore/quickstart#set_up_your_development_environment) to connect to the Firebase
Firestore of the appropriate environment.

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

## Dependencies

The dependencies for this module will automatically install when the
`npm install` command runs in the project root.

## Environment variables

### `FIREBASE_PROJECT`

Set this environment variable to the Firebase project ID (_not_ the alias) that
will be used by both the Firebase tools to deploy rules and by the functions to
access data in the Firestore database.

This environment variable is required in all environments:

* Dev: `lansingcodes-dev`
* Staging: `lansing-codes-staging`
* Production: `lansing-codes`

### `FIREBASE_SERVICE_ACCOUNT`

The service account used to authenticate to Firebase. Instructions to generate
a service account are available in the
[Cloud Firestore Quick Start](https://firebase.google.com/docs/firestore/quickstart).

After creating the service account, the resulting JSON must be stringified
before setting the `FIREBASE_SERVICE_ACCOUNT` environment variable. Use this
JavaScript to stringify the service account JSON:

``` js
const serviceAccountJson = {
  // service account JSON
}
const firebaseServiceAccount = JSON.stringify(serviceAccountJson)
console.log(firebaseServiceAccount)
```

Copy and paste the output into the `FIREBASE_SERVICE_ACCOUNT` environment
variable. The value will start with a `{` and end with a `}`.

This value should be kept secret, so avoid saving this value to anywhere in
your terminal history, file system, or public git repositories.

If using a dotfile (e.g. `~/.profile`) to set this environment variable,
surround the value with apostrophes, like this:

``` sh
export FIREBASE_SERVICE_ACCOUNT='{/* service account JSON */}'
```

### `FIREBASE_TOKEN`

If set, CI environments will use this value to authenticate with Firebase.

Run the following set of commands in a development environment to login to the
appropriate Firebase account and generate a token:

``` sh
npx firebase logout
npx firebase login:ci
```

## Dev database setup

In order to use the tooling and functions in a development environment, first
create a personal Firebase project using the instructions below.

### Login to Firebase with your Google account

If you want to use a personal Firebase datastore, you will first need to login
to Firebase using your Google credentials.

``` sh
npx firebase login
```

This will open a browser tab asking you to login using a Google account. Enter
your Google credentials to complete the login.

### Create a Firebase project with a Firestore database

Go to [console.firebase.google.com](https://console.firebase.google.com), then
click _New Project_ and provide the following values:

* Project name: `lansingcodes-dev`
* Project ID: `lansingcodes-dev`
* Select default settings for everything else

Once the project is created, click on the project, then click on the _Database_
link in the navigation on the side of the page. Then press the button to create
a new Cloud Firestore database and provide the following values:

* Locked mode
* Select default settings for everything else

### Use the `lansingcodes-dev` Firebase project

To see a list of available Firebase projects and which project is currently
being used by the Firebase tools, run the following command:

``` sh
npx firebase list
```

After running the command, if the `lansingcodes-dev` project is not shown as
the current project, run the following command to select it:

``` sh
npx firebase use lansingcodes-dev
```

## Dev environment usage

### Deploy rules and indexes

At any time, you can push the Firestore rules and indexes to the currently
selected project by running:

``` sh
npx firebase deploy
```

There is also an `npm` script that can be used to deploy the files:

``` sh
npm run db:deploy
```

### Running a function

Functions are invoked by accessing specific URLs on the target server.

In development, use the following command to build and start a local server:

``` sh
npm run dev
```

Then, choose a base URL to prefix the function route:

* Dev: `http://localhost:9000`
* Staging: `https://lansingcodes-api-staging.netlify.com`

The following routes can be added to the base URL to invoke functions. Add the
route to the end of the base URL and paste the full URL in a browser to invoke
the function.

#### `/.netlify/functions/deploy-succeeded`

This function will automatically invoke the `load-events`, `load-group`, and
`load-sponsors` functions simultaneously.

It is automatically invoked when a deployment to Netlify successfully completes.
It can also be invoked manually.

#### `/.netlify/functions/load-events`

This function will gather all events for all known groups on Meetup and load
them into the database, overwriting if necessary.

It only loads Meetup events from groups in `data/groups.json`.

#### `/.netlify/functions/load-groups`

This function will put all of the data in `data/groups.json` into the database,
overwriting existing groups that match on the unique key.

Any groups in the database that are not in `data/groups.json` will be left
alone.

#### `/.netlify/functions/load-sponsors`

This function will put all of the data in `data/sponsors.json` into the
database, overwriting existing sponsors that match on the unique key.

Any sponsors in the database that are not in `data/sponsors.json` will be left
alone.
