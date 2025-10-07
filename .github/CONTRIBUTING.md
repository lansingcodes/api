# Lansing Codes Contributing Guide

Hi! We're really excited that you are interested in contributing to our tech
community tools. Before submitting your contribution, please make sure to read
through these guidelines.

- [Code of Conduct](https://www.lansing.codes/code-of-conduct/)
- [Issue Reporting Guidelines](#issue-reporting-guidelines)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Development Setup](#development-setup)
- [Development database setup](#development-database-setup)
- [Development database management](#development-database-management)
- [Customizing your environment](#customizing-your-environment)
- [Build scripts](#build-scripts)
- [Deployments](#deployments)

## Issue Reporting Guidelines

- If you would like to report a bug, use the
  [Bug report](https://github.com/lansingcodes/api/issues/new?labels=bug&template=bug_report.md)
  template and fill in all of the details to the best of your abilities.

- If you would like to request a new feature, use the
  [Feature request](https://github.com/lansingcodes/api/issues/new?labels=enhancement&template=feature_request.md)
  template. Provide as many details as possible, including visual mockups of the
  feature, descriptions of new user interactions, and an explanation of the
  benefits of the feature.

## Pull Request Guidelines

- The `main` branch is a snapshot of the latest in-flight release. All
  development should be done in dedicated branches.

- Checkout a development branch from the `main` branch. Similarly submit pull
  requests back to the `main` branch.

- Add your name (and optional email and website) to the `contributors` property
  in `package.json`. We want people to know you're helping out!

- If adding a new feature, first create an issue with the `enhancement` label.
  Provide convincing reason to add this feature, provide mockups, and ask for
  discussion about the feature from other contributors. Wait until at least one
  administrator has greenlighted the feature before working on it.

- If fixing a bug:
  - Add `(fixes #xxxx)` (where #xxxx is the issue id) to your PR title. For
    example, `support non-Meetup groups (fixes #12)`.
  - Provide a detailed description of the bug in the pull request.

- If your change depends on or is a dependency of changes in another project,
  such as [lansingcodes/www](https://github.com/lansingcodes/www)), please
  make a note of this dependency and reference the pull request id in the
  corresponding project(s).

- Assign one or more reviewers to the pull request. At least one reviewer must
  approve the changes before the PR can be merged.

## Development Setup

If you want to run this website and make changes to it on your computer, some
initial setup is recommended.

This section starts with the basics like git and even the recommended editor.
There may be useful information here even if you're already familiar with
using git, VS Code, and Node. If you want to jump ahead, though, please read how
to [customize your environment](#customizing-your-environment).

You'll run all of the commands provided in this guide in a terminal program
(Terminal, Git Bash, etc.).

### Required software

If you're comfortable with using git, a terminal, node (npm), and VS Code,
here's a quick list of the tools you'll need to run this project:

- [git](https://git-scm.com/downloads)
- [node and npm](https://nodejs.org/), although
  [nvm](https://github.com/nvm-sh/nvm) is recommended for non-Windows users
- [Visual Studio Code](https://code.visualstudio.com/) with these extensions:
  - Better TOML by bungcip
  - Bracket Pair Colorizer by CoenraadS
  - EditorConfig for VS Code by EditorConfig
  - ESLint by Dirk Baeumer
  - Firebase by toba
  - Jest by Orta
  - Node.js Extension Pack by Wade Anderson
  - npm by egamma
  - npm Intellisense by Christian Kohler
  - Path Autocomplete by Mihai Vilcu
  - Path Intellisense by Christian Kohler
  - Prettier by Esben Petersen
  - VSCode Essentials Snippets by Roberto Achar

### Getting the source code

If you want to start your own community website, click the _Fork_ button in the
top right of the [`lansingcodes/api`](https://github.com/lansingcodes/api) page
on GitHub. This will create your own copy of the code, allow you to get updates
from us, and make it easier to send us helpful improvements that you've made.

To get the code from GitHub, you will need to install
[`git`](https://git-scm.com/downloads) on your computer and then run `git clone`
to download the code from your computer.

If you are making changes to `lansingcodes/api`, the full command will look like
this:

``` sh
git clone https://github.com/lansingcodes/api.git
```

If you forked this repository, the command will be different. Go to the page
where your copy of the code exists on GitHub and then click the _Clone or
download_ button to get the URL of the repository. Then run the following
command, substituting `REPOSITORY_URL` with the URL shown when you clicked the
_Clone or download_ button on your repository:

``` sh
git clone REPOSITORY_URL
```

### Installing NodeJS

This website is built and runs with [NodeJS](https://nodejs.org/). If you are a
Windows user, download and install Node by following the link and select the
_LTS_ download.

If you use macOS or Linux, we recommend using
[`nvm`](https://github.com/nvm-sh/nvm) to install Node. Once `nvm` is installed,
you can installed, you can run the following command to install the correct Node
version:

``` sh
nvm install lts/dubnium
```

And then use that version of Node in your terminal by running:

``` sh
nvm use lts/dubnium
```

### Installing dependencies

Now that NodeJS is installed, we can use it's companion, `npm`, to install all
of the required packages to run this project.

In a terminal, change to this projects directory and run the following command
to install the dependencies:

``` sh
npm install
```

### Editing the code

If you want to look at the code and make changes to it, we highly recommend
using [Visual Studio Code](https://code.visualstudio.com/) (VS Code for short).
Follow the link to download and install the code editor.

After VS Code is installed, run it and click _Extensions_ from the gear icon
menu in the lower left of the editor. This will bring up a panel with a search
box.

Use the search box to find and install all of these extensions. They make the
experience of looking at and editing this project _super nice_.

- Better TOML by bungcip
- Bracket Pair Colorizer by CoenraadS
- EditorConfig for VS Code by EditorConfig
- ESLint by Dirk Baeumer
- Firebase by toba
- Jest by Orta
- Node.js Extension Pack by Wade Anderson
- npm by egamma
- npm Intellisense by Christian Kohler
- Path Autocomplete by Mihai Vilcu
- Path Intellisense by Christian Kohler
- Prettier by Esben Petersen
- VSCode Essentials Snippets by Roberto Achar

You should probably restart VS Code after installing all of these extensions.

### Running and coding

That's it for required software! You should now be able to run `npm run dev` in
a terminal to build and run a server where you can invoke the API functions.

If you're making changes to the code and want to send a pull request to the
`lansingcodes` organization on GitHub, the easiest way is to make all of your
changes in a feature branch.

To create a feature branch, use these commands, replacing `new-branch` with the
name of your feature:

``` sh
git fetch origin
git checkout -b new-branch origin/main
```

After you've made and tested your changes, these commands are helpful for
committing your changes to your branch. Again, substitute `new-branch` with the
name of your branch and `describe your changes` with an actual description of
your changes. If you send us commits with messages that aren't descriptive then
we won't accept them.

``` sh
git add -A
git commit -m 'describe your changes'
git push origin new-branch
```

The output from this command will give you a link to GitHub that will start a
pull request. Complete the form and submit your changes. Someone will get to it
as soon as we can.

If you want to use a different Firebase database on your computer or want to
do more advanced things with your project, you may find the following sections
helpful.

We hope you enjoy working with our code!

## Development database setup

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
npx firebase projects:list
```

After running the command, if the `lansingcodes-dev` project is not shown as
the current project, run the following command to select it:

``` sh
npx firebase use lansingcodes-dev
```

## Development database management

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
* Production: `https://lansingcodes-api.netlify.com`

The following routes can be added to the base URL to invoke functions. Add the
route to the end of the base URL and paste the full URL in a browser to invoke
the function.

#### `/.netlify/functions/deploy-succeeded`

This function will automatically invoke the `load-events`, `load-groups`, and
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

## Customizing your environment

This project relies on other services. Since the environment variables hold
sensitive data such as private keys, no default values are provided.

In order to use this API on your computer, you will need to configure your
environment to point at your own development database. Set the following
environment variables to run the API locally.

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

## Build scripts

`npm` is the tool used to initiate all of the build setup and steps for this
project. All scripts can be found in `package.json`.

To install dependencies, run:

``` sh
npm install
```

To build and run (with hot reload) the site on your computer at
http://localhost:9000, run:

``` sh
npm run dev
```

To build the project for an external web server, run the command below. The
built files can be found in `/dist` and served with any static web server.

``` sh
npm run build
```

To verify your code passes the project's linting rules, run the command below.
This command automatically runs before every `git commit` for the project as
well.

```
npm run lint
```

To run all unit tests for the project, run the command below. Jest is used for
all tests.

```
npm run test
```

If you need to select a Firebase database for running your server locally, such
as when you first checkout the project or you make changes to the
`FIREBASE_PROJECT` environment variable, run this command:

```
npm run db:select
```

If you wish to upload new security rules and indexes to your Firebase database,
run this command:

```
npm run db:deploy
```

## Deployments

After a pull request is reviewed and merged to the `main` branch, a Netlify
deployment will automatically build and publish the staging environment at
[lansingcodes-api-staging.netlify.com](https://lansingcodes-api-staging.netlify.com/).

Once the staging environment has been reviewed, the `main` branch can be
promoted to the `production` branch with the following command:

``` sh
git fetch origin && git push --force origin origin/main:production
```

This will trigger another build and deployment by Netlify. The site will be
published to [lansingcodes-api.netlify.com](https://lansingcodes-api.netlify.com/).

For both the staging and production sites, Netlify runs the command
`npm run deploy` to build the site and deploys the contents of the `/dist`
directory.

Staging is also configured to create previews for all pull requests, to make
testing easier before merging to the `main` branch. Click on the _Details_
link next to the site check labeled
"netlify/lansingcodes-api-staging/deploy-preview" to see a live preview of your
changes.

The primary  Michigan Technology Network account has administrator access to both Netlify
sites. Additional administrators can be added by invitation only.
