var express = require('express');
var router = express.Router();
const User= require("../models/userModel")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/list1',async function(req, res, next) {
try {
  const data= await User.find()
  res.render('list1',{data});
} catch (error) {
  console.log(error)
}
});
router.get('/list2', function(req, res, next) {
  res.render('list2');
});
router.get('/create1', function(req, res, next) {
  res.render("create1")
});
router.post('/create1',async function(req, res, next) {
  try {
    const note=new User(req.body);
    await note.save()
    res.redirect("/list1")
  } catch (error) {
    console.log(error)
  }
});


router.get('/delete1/:id',async function(req, res, next) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/list1")
  } catch (error) {
    
  }
});
router.get('/update/:id',async function(req, res, next) {
  const user=await User.findById(req.params.id)
  res.render("update",{user})
});
router.post('/update/:id',async function(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.params.id,req.body);
    res.redirect("/list1")
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
