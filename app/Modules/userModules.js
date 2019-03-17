var mongodb = require(__dirname +'/../../database/mongodb.js');
var mongodbX = require('mongodb');
var Q = require('q');

module.exports = {
  'index' : function(){
    var defer = Q.defer();
    try {
      mongodb.connect().then(function(database){
        var dbObj = database.connection;
          var collection = dbObj.collection('userDetails');
          collection.find().toArray(function(err, docs) {
              if(err){
                console.log(err);
              }
              defer.resolve(docs);
            })
      });
    } catch (e) {
      console.log(e);
    }
    return defer.promise;
  },

  'verify' : function(data){
    var defer = Q.defer();
    try {
      if(typeof(data.email) == 'undefined'){
        defer.resolve({
          code : 400,
          message : "Please mention the email"
        });
      }
      if(typeof(data.password) == 'undefined'){
        defer.resolve({
          code : 400,
          message : "Please mention the password"
        });
      }
      mongodb.connect().then(function(database){
        var dbObj = database.connection;
          var collection = dbObj.collection('userDetails');
          console.log(data);
          console.log(data.email);
          console.log(data.password);
          console.log("connected with table userDetails");
          collection.find({ email : data.email , password : data.password  }).toArray(function(err, docs) {
              if(err){
                console.log(err);
              }
              if(docs.length == 0){
                  defer.resolve({
                    code : 401,
                    message : "user not found",
                  });
              }else{
                defer.resolve({
                  code : 200,
                  message : "user found",
                  data : docs
                });

              }
            })
      });
    } catch (e) {
      console.log(e);
    }
    return defer.promise;
  },

  'store' : function(data){
    var defer = Q.defer();

    if(typeof(data.firstName) == 'undefined'){
      defer.resolve({
        code : 400,
        message : "Please mention the first name"
      });
    }
    if(typeof(data.lastName) == 'undefined'){
      defer.resolve({
        code : 400,
        message : "Please mention the last name"
      });
    }
    if(typeof(data.email) == 'undefined'){
      defer.resolve({
        code : 400,
        message : "Please mention the email"
      });
    }
    if(typeof(data.password) == 'undefined'){
      defer.resolve({
        code : 400,
        message : "Please mention the password"
      });
    }
    if(typeof(data.companyId) == 'undefined'){
      defer.resolve({
        code : 400,
        message : "Please mention the companyId"
      });
    }

    var userDetails = {
                        first_name:data.firstName,
                        last_name:data.lastName,
                        email : data.email ,
                        password : data.password,
                        companyId : data.companyId
                      };

    mongodb.connect().then(function(database){
      var dbObj = database.connection ;
      //check weather the email id is used by someone else or not
      dbObj.collection("userDetails").find({email : data.email }).toArray(function(err, res) {
        if (err) throw err;
        console.log("user findONe");
        console.log(res);
        if(res.length > 0){
          defer.resolve({
            code : 400,
            message : 'Email id is already user, please used different email'
          });
        }else{
          //if not then only add it
          dbObj.collection("userDetails").insertOne(userDetails, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            defer.resolve({
              code : 200,
              message : 'User added succesful'
            });
          });
        }


      });


    });
    return defer.promise;
  },


  'delete' : function(data){
    var defer = Q.defer();
    console.log("store function");
    console.log(data);
    console.log("pass 29");
    console.log(data.id);
    console.log("this is 31");
    mongodb.connect().then(function(database){
      console.log("connected with mongodb");
      // console.log(database.connection);
      var dbObj = database.connection ;
      console.log("pass 29");
      console.log(data.id);
      dbObj.collection("students",{},function(err, student_data){
        student_data.deleteMany({_id: new mongodbX.ObjectID(data.id)}, function(err, results){
          console.log(results);
          defer.resolve(results);
       });
      });
    });
    return defer.promise;
  },


  'show' : function(data){
    var defer = Q.defer();
    console.log("store function");
    console.log(data);
    console.log("pass 29");
    console.log(data.id);
    console.log("this is 31");
    mongodb.connect().then(function(database){
      console.log("connected with mongodb");
      // console.log(database.connection);
      var dbObj = database.connection ;
      console.log("pass 29");
      console.log(data.id);
      dbObj.collection("students").findOne({_id : new mongodbX.ObjectID(data.id)},function(err , data){
          console.log(data);
          defer.resolve(data);
      });
      // dbObj.collection("students",{},function(err, student_data){
      //   student_data.find({_id: new mongodbX.ObjectID(data.id)}, function(err, results){
      //     console.log(results);
      //     defer.resolve(results);
      //  });
      // });
    });
    return defer.promise;
  },


  'update' : function(data){
    var defer = Q.defer();
    console.log("store function");
    console.log(data);
    console.log("pass 29");
    console.log(data.id);
    console.log("this is 31");
    mongodb.connect().then(function(database){
      console.log("connected with mongodb");
      // console.log(database.connection);
      var dbObj = database.connection ;
      console.log("pass 29");
      console.log(data.id);
      var myquery = { _id: new mongodbX.ObjectID(data.id)};
      var address_temp = {city : data.city , state : data.state};
      var newvalues = { first_name: data.first_name , last_name: data.last_name , address : address_temp };
      dbObj.collection("students").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        defer.resolve(res);
        console.log("1 document updated");
        dbObj.close();
      });
      // dbObj.collection("students",{},function(err, student_data){
      //   student_data.find({_id: new mongodbX.ObjectID(data.id)}, function(err, results){
      //     console.log(results);
      //     defer.resolve(results);
      //  });
      // });
    });
    return defer.promise;
  }
}
