![Vombatus ursinus](https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Vombatus_ursinus_-Maria_Island_National_Park.jpg/320px-Vombatus_ursinus_-Maria_Island_National_Park.jpg)

# Wombat Tag

Herd wombat to a point where it can be tagged and released.


## Setup

* During the workshop we'll be using the [Cloud 9](https://c9.io) development environment.
  * It's well worth investing the time in setting up your own local testing environment, but this is a quick start that gets everyone on the same page easily.

1. To begin with, you'll need a [GitHub](https://github.com) account.
2. Once you've got one, go to [Cloud 9](https://c9.io) and login using GitHub.
3. On your account page (`https://c9.io/username`), click _Create a new workspace_.
4. Give the workspace a name (and description if you like).
5. Choose the _Node.js_ template. Click _Create Workspace_.
6. Install the latest version of Node.js. In the terminal window at the bottom of the screen, type:

   ```
   nvm install 4.0
   ```

7. Grab the workshop repository:

    ```
    git clone https://github.com/locksmithdon/js-api-workshop
    ```

8. Use `npm` to install the packages we need. A `package.json` is already provided, so we just need to use `npm install`:

    ```
    cd js-api-workshop/src
    npm install
    ```

9. Start the Mongo daemon (as a background task):

    ```
    ./mongod &
    ```

10. Run the tests:

    ```
    gulp test
    ```

11. Run the app:

    ```
    node dist/server.js
    ```

12. The API endpoints will be available at _workspacename-username.c9.io/api/v1/wombats_.

