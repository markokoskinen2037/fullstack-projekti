// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const mongodb = require('mongodb');


module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on('task', {
    // deconstruct the individual properties
    deleteAllUsers() {
      console.log("Deleting all contents from test-database")

      var uri = "mongodb://testiuser:testisalasana1@ds155606.mlab.com:55606/fullstackprojekti_testi";

      mongodb.MongoClient.connect(uri, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;
        let db = client.db("fullstackprojekti_testi")

        db.collection("users", function (err, collection) {
          if (err) throw err;
          // delete the mongodb collection
          collection.remove({}, function (err, result) {
            // handle the error if any
            if (err) throw err;
            console.log("Collection is deleted!");
          });

        })
        console.log("Closing clients connection to db.")
        client.close()

      })

      return null
    },
    deleteAllCourses() {
      console.log("Deleting all contents from test-database")

      var uri = "mongodb://testiuser:testisalasana1@ds155606.mlab.com:55606/fullstackprojekti_testi";

      mongodb.MongoClient.connect(uri, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;
        let db = client.db("fullstackprojekti_testi")

        db.collection("courses", function (err, collection) {
          if (err) throw err;
          // delete the mongodb collection
          collection.remove({}, function (err, result) {
            // handle the error if any
            if (err) throw err;
            console.log("Collection is deleted!");
          });

        })
        console.log("Closing clients connection to db.")
        client.close()

      })

      return null
    }
  })

}

