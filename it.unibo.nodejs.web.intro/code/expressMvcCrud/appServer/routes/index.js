var express     = require('express');
var router      = express.Router();
var utils       = require('../../utils');

var readFile     = utils.readeDataFromFile;			 
//REST API;
var ctrlGet     = require('../controllers/ctrlGetUsersRest');	
var ctrlAdd     = require('../controllers/ctrlAddUserRest');
var ctrlDel     = require('../controllers/ctrlDeleteUserRest');
var ctrlChng    = require('../controllers/ctrlChangeUserRest'); 
//HTML;
var ctrlOut     = require('../controllers/ctrlShowUsersRestApi');	 

router.get('/',           ctrlOut.showUsers   );
router.get('/add',        showAddForm         );
//router.post("/adduser",   ctrlAdd.addUser     );  //from FORM (legacy)

router.get(   "/api/user", ctrlGet.getUsers    );
router.post(  "/api/user", ctrlAdd.addUser     ); 
router.delete("/api/user", ctrlDel.deleteUser  ); 
router.put(   "/api/user", ctrlChng.changeUser );		 

module.exports = router;

function showAddForm(request,response){
	readFile('./public/addUser.html', function(data){ response.end(data); }); 
}