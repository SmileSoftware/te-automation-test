# te-automation-test

## Introduction

This repository contains a simplified version of one aspect of the TextExpander server. It runs as an Express Node application that exposes one endpoint for retrieving data. It is assumed that you have a UNIX-like environment capable of running Node.

Please read through the following instructions to understand what is expected and how to set up the system.

## Assignment

1. Produce a set of acceptance tests that validate this endpoint. It is up to you how you choose to create these tests, but it is expected that you document how your tests can be executed. The environment is configured to use the Jest testing framework (and a sample test is provided). 
1. Provide a writeup of the thinking behind what you chose to test and what avenues you would test if you had more time or other test tools.
1. Return a zip file of this repo with your edits and the writeup. The zip file should contain everything needed to run the tests you've created (or instructions on what additional configuration is needed).

**Notes**
- Most of the code is written in TypeScript, but using JavaScript is fine if you are more comfortable with that.
- Do not worry about unit testing any of the code, the focus here is on acceptance tests that exercise the endpoint itself.
- Limit yourself to 1-2 hours on this project. Use the writeup to address areas you weren't able to cover.

## The Endpoint

```
GET <http://localhost:3000/snippetGroup/[SnippetGroupID]/snippets>
```
In TextExpander, the product is arranged as a set of *snippets* that are organized into *snippet groups*. Individual *users* are members of particular snippet groups. The purpose of this endpoint is to return the data for the set of snippets belonging to a snippet group, provided the calling user (via the Authorization header) is a member of that snippet group. 

### Data
Running this server populates the database with a very small set of sample data (which can be found in `./data`). Within that data set, the following options should result in a successful call. 
- SnippetGroupID: `7988ca09-87dc-426e-9a9c-9524ce47fe13`
- Valid Authorization header: `eohuFKr_Y9DjWFyUUrZL3oDonMDMuboAKZqwgf13XLX` 
  - This corresponds to user `23dN9jRn2TRjqD5Zb` in the database.

### Code
The primary code of interest in the project is `app/routes/index.ts` which defines the endpoint and then calls through to `modules/snippets/snippetMethodsBase.ts`. 

## Setup

These instuctions will help you get setup your environment. 

1. Clone the repository to your system

1. Install nvm (Node Version Manager)
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
    ```
1. Install Node 8.15

    ```bash
    nvm install 8.15
    ```
1. Install npm packages

    ```bash
    npm install
    ```
1. Use the `npm` commands listed below to either run the server or run the Jest tests. Both of these commands will populate the database from the `./data` folder.

## Available npm commands

### start

- Starts an instance of MongoDB in memory
- Sets MONGO_URL environment variable
- Populates it with the data in ./data
- Starts the app by running the `startapp` command mentioned above.
- The Database will be deleted when the script ends, so any data written to it will be lost.

    ```bash
    npm run start
    ```

### test

- Starts an instance of MongoDB in memory
- Sets MONGO_URL environment variable
- Populates it with the data in ./data
- Runs jest tests using the database specified in MONGO_URL, which will be the instance running in memory.
- The Database will be deleted when the script ends, so any data written to it will be lost.

    ```bash
    npm run test
    ```
