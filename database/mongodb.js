var dbM = require('mongodb').MongoClient;
var Q = require('q');

module.exports = {

  'connect' : function(){
    var defer = Q.defer();
    dbM.connect('mongodb://localhost:27017/',{useNewUrlParser: true }, function (err, client) {

      try {
        if (err) throw err

        var db = client.db('test');
        console.log("connecting with mongoDB");
        if(err){
          console.log("connection with mongodb failed...");
          console.log(err);
        }else{
          console.log("Connect succesful with mongoDB");
          defer.resolve({'connection':db});
        }
      } catch (e) {
        console.log("Error while connection with mongoDB",e);
      }

    });

    return defer.promise ;

    }

}
