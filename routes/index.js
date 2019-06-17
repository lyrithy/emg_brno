const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
// Load User model
const RequestEM = require('../models/RequestEM');
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/adminpanel', (req, res) =>{
  RequestEM.find({}, function(err,docs){
    res.render('adminpanel',{issues:docs});
  })
  
  
  
  
   //res.render('adminpanel')
});


// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>{
    console.log(req.user.name + req.user.email);
    res.render('dashboard', {
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        _id: req.user._id
      })
});

// Dashboard
router.post('/dashboard', ensureAuthenticated, (req, res) =>{
    

    const { name, email, phone,latitude,longitude, summary, btnReport } = req.body;
    let errors = [];
  
    if ((btnReport == "emgSuggestion" || btnReport == "emgReport") && summary == '') {
      errors.push({ msg: 'Please provide summary of the problem or suggestion' });
    }
  
    if (!name || name == '') {
      errors.push({ msg: 'Please provide your name' });
    }
    
    
  
    if (errors.length > 0) {
        res.render('dashboard', {
            errors,
            name: req.user.name,
            email: req.user.email,
            phone: req.user.phone,
            _id: req.user._id
          });
    } else {
        RequestEM.findOne({ email: email, summary:summary }).then(user => {
        if (user.category == "emgSuggestion" || user.category == "emgReport") {
          errors.push({ msg: 'Issue already exists' });
          res.render('dashboard', {
            errors,
            name: req.user.name,
            email: req.user.email,
            phone: req.user.phone,
            _id: req.user._id
          });
        } else {
            console.log("running dashboard....");
          const newRequestEM = new RequestEM({
            name:name,
            email:email,
            phone:phone,
            summary:summary,
            category:btnReport,
            geo_location: {
                lat:req.body.latitude,
                lng:req.body.longitude
            }
          });
  
          newRequestEM
          .save()
          .then(user => {
            req.flash(
              'success_msg',
              'Your issue has been submitted, we will contact you immediately'
            );
            res.render('frmconfirm');
          })
          .catch(err => console.log(err));
        }
      });
    }


   
});

module.exports = router;
