# Task Manager

This a simple application to maintain tasks.

It uses a JavaScript frontend with React and a Java backend with Spring Boot.

In the frontend it uses React, Normalize CSS, Material UI framework library,
Materialize CSS, Bootstrap and Bootstrap Material Design.

In the backend it uses Spring Boot, MySQL database and Apache Commons helpers.

It also uses Ruby Foreman gem to run the client and server tasks in parallel.

For now Spring Boot is configured to discard persisted data when the application starts.

# Installation

## Development
- Clone the repository:
    - git clone https://github.com/Danilo-Araujo-Silva/supero-ti-challenge.git
- Run the MySQL migration, located at:
    - `supero-ti-challenge/server/java/spring_boot/spring_boot_01/src/main/resources/migrations/001 - Creating the database and the application database user.sql`
- Install client packages:
    - cd supero-ti-challenge/client/javascript/react/react_01
    - yarn install
- Start client and server:
    - cd ../../../../
    - Parallel using foreman:
        - foreman start
    - Manually
        - First terminal (client):
            - cd client/javascript/react/react_01
            - npm start
        - Second terminal (server):
            - cd server/java/spring_boot/spring_boot_01
            - ./gradlew bootRun
- Test the application:
    - http://localhost:10002

## Production
- Clone the repository:
    - git clone https://github.com/Danilo-Araujo-Silva/supero-ti-challenge.git
- Run the MySQL migration, located at:
    - `supero-ti-challenge/server/java/spring_boot/spring_boot_01/src/main/resources/migrations/001 - Creating the database and the application database user.sql`
- Install global npm package to serve the client (on production mode):
    - yarn global add serve
- Install client packages:
    - cd supero-ti-challenge/client/javascript/react/react_01
    - yarn install
- Build client application optimized for production:
    - yarn run build
- Start client and server
    - First terminal (client):
        - cd client/javascript/react/react_01
        - serve -p 10002 -s build
    - Second terminal (server):
        - cd server/java/spring_boot/spring_boot_01
        - ./gradlew bootRun
- Test the application:
    - http://localhost:10002

## Tips
If you don't have yarn, npm should do the job too.

### Installation Guides

#### Install Java 8
Follow the official instructions [here](https://www.java.com/en/download/help/download_options.xml).

If you can use in your OS WebUpd8 ppas do the following:

- sudo add-apt-repository ppa:webupd8team/java
- sudo apt-get update
- sudo apt-get install oracle-java8-installer

### Install MySQL
Follow the official instructions [here](https://dev.mysql.com/doc/refman/5.7/en/installing.html).

#### Install NodeJS
If you don't have NodeJS and NPM installed yet you can follow
[these instructions](https://nodejs.org/en/download/package-manager/) in the
official documentation.

#### Install Latest NPM
If you already have npm installed and you would like update it to the latest
version you can do it as follows:

- npm install npm@latest -g

#### Install Latest NodeJS
If you already have npm installed and you would like to update the NodeJS to the
latest version you can do it as follows:

- sudo npm cache clean -f
- sudo npm install -g n
- sudo n stable

Important! The option `-f` is used to force clean the npm cache. Take care about it.
Anyway, I usually do this when I would like to install the latest NodeJS.

#### Install Yarn
If you don't have yarn installed yet you can follow [these instructions](https://yarnpkg.com/lang/en/docs/install/) in the official documentation.

#### Install NPM Dependencies
These instructions is used to install the local npm dependencies. The dependencies
will be placed in the `node_modules` folder (already ignored by `.gititnore`).

- yarn install

#### Install Latest Ruby
If you don't have the latest ruby yet you can install it using rvm.
The official documentation is [here](https://rvm.io/).

- Add rvm keys:
  - gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
- Install rvm:
  - \curl -sSL https://get.rvm.io | bash
- Install the latest ruby:
  - rvm install ruby --latest

#### Update All Gems
If would like to update all your gems first you can do it as follows:

- gem update

#### Install Foreman
With the following you can install the foreman gem.

- gem install foreman

## Author
[Danilo Araújo Silva (silva.danilo.araujo@gmail.com)](https://goo.gl/XW7hi3).
