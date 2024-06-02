# Test task implementation

## Table of contents

- [Intro](#intro)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [QA](#qa)


## Intro

This project is an implementation of test tasks. The implementation includes functionality for solving two tasks. The [QA](#qa) section also provides answers to the questions from the theoretical part.

## Prerequisites

Node.js at least version 18 LTS

## Usage

    npm install

To start working with inmemory SQLite3 database, it must be reset and initialized:

    npm run db:drop-init

The database is located in the directory *src/db/database.db*

The prepared database dump file can be loaded into the database using the following script:

    npm run import-dump

A custom format dump file can also be passed as plain text via the REST API. To do this, launch the application using the following script:

    npm run start:dev

and open the following link in browser: http://localhost:3000/api-docs/#/main/createEmployee.

To call the API in which the functionality of the second test case is implemented, please click on the following link: http://localhost:3000/api-docs/#/main/getRewards

## QA

**Q: How to change the code to support different file versions?**

A: To ensure work with different versions of files, the system must implement a data handler depending on the version, which will transfer the data processing control flow to the corresponding modules.

**Q: How the import system will change if data on exchange rates disappears from the file, and it will need to be received asynchronously (via API)?**

A: The import system will not change in any way, because the exchange rate data is optional, so this data can be received asynchronously. In this case, the system should return only those employee data for the calculation of which there is exchange rate data. For example, if it is required to receive data on employee donations in USD made in other currencies, but the system does not have information on exchange rates, such data should not take part in calculations and should be returned by the system before the information on exchange rates is received.

**Q: In the future the client may want to import files via the web interface, how can the system be modified to allow this?**

A: First, it is required to use common data formats such as JSON, XML, CSV. These formats allow you to transfer all the necessary information including the relationship between individual entities. Besides, there are many popular serialization/deserialization solutions for such formats.
Secondly, it is worth implementing the structure of transmitted data in the most flexible way possible to minimize the use of hardcoded and magic numbers. The data structure should force the client to transfer data in a strictly defined way, so that the client adapts to the rules of data transfer, rather than the data structure adapting each time to the client's requirements.
Therefore, it is worth strictly limiting data imports to the structure of the data being transferred and the format of that data.