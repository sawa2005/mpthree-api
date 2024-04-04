# mpthree (API)

Node.js & Express API which handles information related to uploaded MP3 files.

## Description

This API was created as part of a final project in the university course Web Development with Javascript and is based on Node.js. The API uses Node.js and Express while storing data in a MongoDB database with Mongoose for schema creation. The uploaded MP3 files (and cover images related to them) aren't uploaded directly to the database but are instead uploaded to Amazon S3. The upload and gathering of information from the files is done with multer and multerS3 as a storage engine to make AWS S3 work with it.

## Getting Started

### Dependencies

* Node.js [https://nodejs.org/en]
* npm [https://www.npmjs.com/]
* MongoDB Database [https://www.mongodb.com/]

### Installing

* Clone this repository by running the following command in a terminal:
```
git clone https://github.com/sawa2005/mpthree-api.git
```
* Install Node.js (npm is included).
* Install all the npm packages needed using the following command:
```
npm i
```
* Create a MongoDB database and enter the connection string in an environment variable.

### Executing program

* To run the app in localhost simply use:
```
npm start
```

## Authors

Samuel Ward | @slw_one
