![Vombatus ursinus](https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Vombatus_ursinus_-Maria_Island_National_Park.jpg/320px-Vombatus_ursinus_-Maria_Island_National_Park.jpg)

# Field Work

Tag and release wombats using JavaScript. (Yes, it really is the language that can do everything...)


## Setup

* During the workshop we'll be using the [Cloud 9](https://c9.io) development environment.
  * It's well worth investing the time in setting up your own local testing environment, but this is a quick start that gets everyone on the same page easily.

1. To begin with, you'll need a [GitHub](https://github.com) account.
2. Once you've got one, go to [Cloud 9](https://c9.io) and login using GitHub.
3. On your account page (`https://c9.io/username`), click _Create a new workspace_.
4. Give the workspace a name (and description if you like).
5. In the *Clone from Git or Mercurial URL* box, type or copy/paste the following:

   ```
   https://github.com/nature-of-js/field-work
   ```

   (Despite the placeholder text, it's best to use the full URL, otherwise you may get errors about your SSH key.)
6. You can leave the template set to _Custom_. Go ahead and click _Create workspace_.
7. When your workspace window opens, you'll see a blue terminal window at the bottom. It's asking for your GitHub username and password, type those in.
8. You should now have the workshop source code cloned to your workspace. You'll see the files and folders on the left side of the window.
9. Install the latest version of Node.js. In the terminal window at the bottom of the screen, type:

   ```
   nvm install 4.2
   ```

10. Use `npm` to install the packages we need. A `package.json` is already provided, so we just need to use:

    ```
    ./install-global-dependencies
    npm install
    ```

    You'll see output. A *lot* of output. You can probably ignore it (if there's lots of red flashing by, maybe read those bits!)

11. We recommend opening a separate terminal window for the Mongo daemon. There's a `+` button at the top of the terminal that'll do that for you. In the new window, start the Mongo daemon:

    ```
    ./mongod
    ```

    (That `./` is important.)

12. Go back to your initial terminal window and run the tests:

    ```
    gulp test
    ```

13. If all went well, you should see a progress bar and some tests passing! Now you can run the server:

    ```
    gulp
    ```

14. The API endpoints will be available at _workspacename-username.c9.io/api/v1/endpoint-name_.

