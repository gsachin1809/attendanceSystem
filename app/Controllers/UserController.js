var userModule = require(__dirname +'/../Modules/userModules.js')

module.exports = {
  'index' : function(req, res){
    userModule.index().then(function(user_response){
      res.send({
        code : 200,
        data : user_response,
        message : "All the users"
      });
    },function(error){
      res.send({
        code : 200,
        data : error,
        message : "Something went wrong"
      });
    });
  },

  'store' : function(req, res){
    var data = req.body;
    console.log(data);
    userModule.store(data).then(function(userResponse){
      if(userResponse.code == 200){
        res.send({
          code : '200',
          data : userResponse,
          messsage : 'user added successful'
        });
      }else{
        res.send({
          code : userResponse.code,
          data : userResponse,
          messsage : userResponse.message
        });
      }

    },function(error){
      res.render('error');
    });
  },

  'verify' : function(req, res){
    var data = req.body;
    console.log(data);
    userModule.verify(data).then(function(userResponse){
      if(userResponse.code == 200){
        res.send({
          code : '200',
          data : userResponse,
          messsage : 'user added successful'
        });
      }else{
        res.send({
          code : userResponse.code,
          data : userResponse,
          messsage : userResponse.message
        });
      }

    },function(error){
      res.render('error');
    });
  },

  'delete' : function(req, res){
    var data = req.params;
    console.log(data);
    userModule.delete(data).then(function(user_response){
      res.redirect('/user');
      // res.render('index',{response_obj : user_response});
    },function(error){
      res.render('error');
    });

  },

  'show' : function(req, res){
    var data = req.params;
    console.log(data);
    userModule.show(data).then(function(user_response){
      console.log("get response");
      console.log(user_response);
      res.render('create',{user_data : user_response});
      // res.render('index',{response_obj : user_response});
    },function(error){
      res.render('error');
    });

  }
}
