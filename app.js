/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START gae_node_request_example]
const express = require('express');

const app = express();

//---
let mean = 0;
let max = 0;
let min = 100000;
let med = 0;
let arr = [];
let median = 0;
let beforemedian = 0;
let aftermedian = 0;
//let heart_rate = req.query.heartRate;

app.get('/addData', (req, res) => {
  let heart_rate = parseFloat(req.query.heartRate);
  arr.push(heart_rate); // add data to array
  let total = 0;
  if (heart_rate > max){  //determine if maximum
    max = heart_rate;
  }
  if (heart_rate < min){  //dtermine if minimum
    min = heart_rate;
  }
  for (let i = 0; i<arr.length; i++){ //calculate sum
    total += arr[i];
  }
  mean = total / arr.length;  //calculate mean
  arr.sort; // sort the array
  if (arr.length % 2 == 1){ //if length is odd pick median
    median = arr[((arr.length - 1) / 2) + 1];
  }
  else {  //if not odd then compute median by taking the average of 2 values
    beforemedian = arr[arr.length / 2];
    aftermedian = arr[(arr.length / 2) + 1];
    median = (beforemedian + aftermedian) / 2;
  }
    res
    .status(200)
    .send("Data added - count = " + arr.length) //print the count of data
    .end();
});

app.get('/statistics', (req, res) => {
  res
    .status(200)
    //.send('max: '.concat(max, '\nmin: '.concat(min, '\nmean: '.concat(mean))))
    .send('Max: '.concat(max, '\nMin: ', min, '\nMean: ', mean, '\nMedian: ', median))  //print data 
    //.send('\nmin: '.concat(min))
    //.send('\nmean: '.concat(mean))
    .end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;
