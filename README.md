# Firebase-backed API for Lansing Codes

This repository consists of tooling to manage Firebase rules, indexes, etc. and
lambda functions deployed to Netlify to manage the data withing Firebase.

## Dependencies

The dependencies for this module will automatically install when the
`npm install` command runs in the project root.

## Environment variables

### `FIREBASE_PROJECT`

If set, this Firebase project ID (or alias from `.firebaserc`) will be used to
select the current project to use with the Firebase tools automatically after
edependencies are installed. This happens in the `postinstall` script.

This environment variable is primarily used in CI environments in combination
with `$FIREBASE_TOKEN` to associate a CI environment with its corresponding
Firebase project.

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
npm run deploy
```

### Running a function

There are NPM scripts for running each function from the terminal. Each script
is prefixed with `f:`. For example, to run the `deploy-succeeded` function,
use the following command:

``` sh
npm run f:deploy-succeeded
```
