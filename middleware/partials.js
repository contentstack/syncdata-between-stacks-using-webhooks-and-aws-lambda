/**
 * Module Dependencies
 */

const async = require('async');
const Contentstack = require('contentstack');
const configVars = require('../config');

// Contentstack SDK initialization

const Stack = Contentstack.Stack(
  configVars.apiKey,
  configVars.accessToken,
  configVars.env,
);
Stack.setHost('stag-cdn.contentstack.io')

module.exports = (req, res, next) => {
  // Async library provides a way to make parallel calls contentstack where your header & footer data is stored
  async.parallel(
    [
      (callback) => {
        // Get Header data from the below mentioned content-type i.e "header"

        const Query = Stack.ContentType(configVars.contentTypeUid.headerUid).Query();
        Query.toJSON()
          .find()
          .then((result) => {
            callback(null, result[0][0]);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      (callback) => {
        // Get Footer data from the below mentioned content-type i.e "footer"

        const Query = Stack.ContentType(configVars.contentTypeUid.footerUid).Query();
        Query.toJSON()
          .find()
          .then((result) => {
            callback(null, result[0][0]);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    ],
    (error, success) => {
      /**
       *  Results are stored in the below variable i.e for Header it's "header" & for Footer it's "footer" these two variables
       *  can be used directly into the header and footer html templates using res.locals method of express js
       */
      if (error) return next(error);
      res.locals.header = success[0];
      res.locals.footer = success[1];
      next();
    },
  );
};
