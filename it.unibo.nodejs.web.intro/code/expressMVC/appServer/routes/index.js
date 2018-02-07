var express       = require('express');
var router        = express.Router();
var ctrlListItems = require('../controllers/listitems');
var ctrlAddItem   = require('../controllers/additem');

router.get('/',          ctrlListItems.showItems);
router.get( '/newItem',  ctrlAddItem.showAddItemPage);
router.post("/newitem",  ctrlAddItem.addAnItem);

module.exports = router;
