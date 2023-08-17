var express = require('express');
var router = express.Router();
const User= require("../models/userModel")
const Notes= require("../models/notes")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/list1',async function(req, res, next) {
try {
  const data= await Notes.find()
  res.render('list1',{data});
} catch (error) {
  console.log(error)
}
});
router.get('/list2', function(req, res, next) {
  res.render('list2');
});

router.get('/signup', function(req, res, next) {
  res.render("signup")
});
router.post('/signup',async function(req, res, next) {
 try {
  const data= new User(req.body);
  await data.save();
  res.redirect("/signin")
 } catch (error) {
  console.log(error)
 } 
});

router.get('/signin', function(req, res, next) {
    res.render("signin")
});
router.post('/signin',async function(req, res, next) {
  try {
    const {email,password}= req.body;
   const match= await User.findOne({email})
    if(match === null || match.password !== password){
       return res.send(`Invalid Credentials!!! <a href="/signin">SignIn</a>`)
      }
    res.redirect("/list1")
  } catch (error) {
    
  } 
});
router.post('/create1',async function(req, res, next) {
  try {
    const note=new Notes(req.body);
    await note.save()
    res.redirect("/list1")
  } catch (error) {
    console.log(error)
  }
});


router.get('/delete1/:id',async function(req, res, next) {
  try {
    await Notes.findByIdAndDelete(req.params.id);
    res.redirect("/list1")
  } catch (error) {
    
  }
});
router.get('/update/:id',async function(req, res, next) {
  const user= await Notes.findById(req.params.id)
  res.render("update",{user})
});
router.post('/update/:id',async function(req, res, next) {
  try {
    await Notes.findByIdAndUpdate(req.params.id,req.body);
    res.redirect("/list1")
  } catch (error) {
    console.log(error)
  }
});

router.get("/get-email",(req,res)=>{
  res.render("getemail")
})
router.post("/get-email",async(req,res)=>{
  try {
    const match= await User.findOne({email:req.body.email})
    if(match === null){
      return res.send(`User not found. <a href="/signin">signin</a>`);
    }
    res.redirect("/change-password/"+ match._id);
  } catch (error) {
    console.log(error)
  }
})

router.get("/change-password/:id", (req,res)=>{
  res.render("change-password",{id:req.params.id})
})
router.post("/change-password/:id",async (req,res)=>{
  try{
    await User.findByIdAndUpdate(req.params.id,req.body)
    res.redirect("/signin")
  }catch(error){
    res.send(error);
  }
})

router.get("/reset/:id",async (req,res)=>{
  res.render("reset",{id:req.params.id})
})
router.post("/reset/:id",async (req,res)=>{
 try {
  const{oldpassword,newpassword}= req.body;
  const user= await User.findById(req.params.id);

  if(oldpassword !== user.password){
    return res.send(`Incorrect password. <a href="/reset/${user._id}">Reset Again</a>`);
  }

  await User.findByIdAndUpdate(req.params.id,{password: newpassword});
  res.redirect("/profile")
 } catch (error) {
  res.send(error)
 }
})

module.exports = router;
