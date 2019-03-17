var express = require('express');
var router = express.Router();

var UserController = require(__dirname +'/../app/Controllers/UserController.js')
/* GET users listing. */
router.get('/users',UserController.index);
router.post('/users',UserController.store);
router.post('/verify',UserController.verify);
// router.get('/users',function(req, res){
//   res.send({code : 200})
// });

module.exports = router;
