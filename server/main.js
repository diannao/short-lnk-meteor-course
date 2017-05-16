import {Meteor} from 'meteor/meteor';
import {WebApp} from 'meteor/webapp';

import '../imports/api/users';
import {Links} from '../imports/api/links';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
    WebApp.connectHandlers.use((req, res, next) => {
    //  console.log('this is from my custom middleware');
    //  console.log(req.url, req.method, req.headers, req.query);
      const _id = req.url.slice(1);
      const link = Links.findOne({_id});

      if(link) {
        res.statusCode = 302;
        res.setHeader('Location', link.url);
        res.end();
        Meteor.call('links.trackVisit', _id);
      } else {
        next();
      }

    //  res.setHeader('my-custom-header', 'Andrew was here');
      //res.write('<h1>This my middleware at work</h1>');
    //  res.end();
    });

    // WebApp.connectHandlers.use((req, res, next) => {
    //   console.log('this is from my custom middleware');
    //   console.log(req.url, req.method, req.headers, req.query);
    // //  res.statusCode = 404
    // //  res.setHeader('my-custom-header', 'Andrew was here');
    //   //res.write('<h1>This my middleware at work</h1>');
    // //  res.end();
    //   next();
    // });

});

// const petSchema = new SimpleSchema({
//   name: {
//     type: String,
//     min: 1,
//     max: 200,
//     optional: true
//   },
//   age: {
//     type: Number,
//     min: 0
//   },
//   contactNumber: {
//     type: String,
//     optional: true,
//     regEx: SimpleSchema.RegEx.Phone
//   }
// });
//
// petSchema.validate({
//   contactNumber: '919-919-1234',
//   age: 1
// });

// const employeeSchema = new SimpleSchema({
//   name: {
//     type: String,
//     min: 1,
//     max: 200
//   },
//   hourlyWage: {
//     type: Number,
//     min: 0
//   },
//   email: {
//     type: String,
//     regEx: SimpleSchema.RegEx.Email
//   }
// });
//
// employeeSchema.validate({
//   name: 'Fred',
//   hourlyWage: 1,
//   email: 'fred@example.com'
// })
