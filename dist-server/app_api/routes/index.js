"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _projects = require("../controllers/projects");

var _Creators = require("../controllers/Creators");

var _Fund = require("../controllers/Fund");

var _creatorGetter = require("../../middleware/creatorGetter");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _stripe = _interopRequireDefault(require("stripe"));

var _passport2 = _interopRequireDefault(require("../../middleware/passport"));

var _upload = require("../../middleware/upload");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { authenticateJWT } from '../../middleware/authenticateJWT';
var router = _express["default"].Router();

(0, _stripe["default"])(process.env.STRIPE_SECRET_KEY); // const ctrlReviews = require('../controllers/reviews');
// projects
// require('../../middleware/passport')(passport);

(0, _passport2["default"])(_passport["default"]);

var jsonParser = _bodyParser["default"].json({
  limit: '50mb'
});

var urlParser = _bodyParser["default"].urlencoded({
  limit: '50mb',
  extended: true
});

router.route('/').get(function (req, res) {
  res.render('index', {
    title: 'Express'
  });
});
router.route('/projects').get(function (req, res) {
  (0, _projects.projectsList)(req, res);
}).post(_passport["default"].authenticate('jwt', {
  session: false
}), _creatorGetter.getCreator, _upload.upload.fields([{
  name: 'header_image',
  maxCount: 1
}, {
  name: 'thumbnail',
  maxCount: 1
}]), function (req, res) {
  // getCreator(req, res);
  // upload.any(); upload.single('header_image'),
  // upload.fields([{ name: 'header_image', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]);
  // upload.single('header_image');
  // console.log(req);
  (0, _projects.projectsCreate)(req, res);
});
router.route('/projects/:projectid').get(function (req, res) {
  (0, _projects.projectsReadOne)(req, res);
}).put(_passport["default"].authenticate('jwt', {
  session: false
}), _upload.upload.fields([{
  name: 'header_image',
  maxCount: 1
}, {
  name: 'thumbnail',
  maxCount: 1
}]), function (req, res) {
  // upload.fields([{ name: 'header_image', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]);
  (0, _projects.projectsUpdateOne)(req, res);
})["delete"](_passport["default"].authenticate('jwt', {
  session: false
}), function (req, res) {
  (0, _projects.projectsDeleteOne)(req, res);
}); // async function customerCreator(req, res) {
//     var customer = await stripe.customers.create(
//         {
//             name: req.body.card.name,
//             email: req.creator.creator_tag,
//             source: req.body.id
//         }
//     );
//     req.customer = customer;
//     console.log(customer);
//     return customer;
// }
// async function customerCharge(req, res) {
//     var charge = await stripe.charges.create({
//         amount: req.body.amount * 100,
//         currency: "mad",
//         customer: req.customer.id
//     });
//     req.charge = charge;
//     return charge;
// }

router.route('/projects/:projectid/fund').post(jsonParser, urlParser, _passport["default"].authenticate('jwt', {
  session: false
}), _creatorGetter.getCreator, function (req, res) {
  try {
    // console.log(req.body);
    // TODO get the creators profile
    // note nevermind already done that in getCreator middleware
    // var customer = await stripe.customers.create(
    //     {
    //         name: req.body.card.name,
    //         email: req.creator.creator_tag,
    //         source: req.body.id
    //     }
    // );
    // var charge = await stripe.charges.create({
    //     amount: req.body.amount * 100,
    //     currency: "mad",
    //     customer: customer.id
    // });
    // req.customer = customer;
    // req.charge = charge;
    // const customer = customerCreator(req, res);
    // console.log("asasd");
    // const charge = customerCharge(req, res);
    // ctrlFunds.fundsCreate(req, res);
    _stripe["default"].customers.create({
      name: req.body.card.name,
      email: req.creator.creator_tag,
      source: req.body.id
    }).then(function (customer) {
      console.log(req.customer);

      _stripe["default"].charges.create({
        amount: req.body.amount * 100,
        currency: "mad",
        customer: customer.id
      });

      req.customer = customer;
      console.log(customer);
    }).then(function () {
      (0, _Fund.fundsCreate)(req, res);
    })["catch"](function (err) {
      return console.log(err);
    }); // console.log(customer);

  } catch (err) {
    res.send(err);
  }
}); // TODO Add comments
// router
//     .route('/projects/:projectid/comments')
//     .get((req, res) => {
//     })

router.route('/creators').get(function (req, res) {
  (0, _Creators.creatorsList)(req, res);
}).post(jsonParser, urlParser, _passport["default"].authenticate('jwt', {
  session: false
}), _upload.upload.single('avatar'), function (req, res) {
  // getCreator(req, res);
  // console.log(req.file);
  (0, _Creators.creatorsCreate)(req, res);
}); // .put(passport.authenticate('jwt', { session: false }), (req, res) => {
//     getCreator(req, res);
//     ctrlCreators.creatorsUpdateOne(req, res);
// });

router.route('/creators/:creatorid').get(function (req, res) {
  (0, _Creators.creatorsReadOne)(req, res);
}); // .put(passport.authenticate('jwt', { session: false }), (req, res) => {
//     const { creatorid } = req.params;
//     getCreator(req, res);
//     // check if the creators requesting to update is the real owner of 
//     // the creator who is trying to change
//     if (req.creator._id != creatorid) {
//         res
//             .status(403)
//             .json(
//                 {
//                     "message": "Not you"
//                 }
//             );
//     }
//     ctrlCreators.creatorsUpdateOne(req, res);
// });

router.route('/profile').post(jsonParser, urlParser, _passport["default"].authenticate('jwt', {
  session: false
}), _creatorGetter.getCreator, function (req, res) {
  // getCreator(req, res);
  var creator = req.creator; // console.log(req.creator);

  res.json({
    creator: creator
  }); //todo check the creator is created else return null nad redirect to creator profile create
}).put(_passport["default"].authenticate('jwt', {
  session: false
}), _upload.upload.single('avatar'), function (req, res) {
  // const { creatorid } = req.params;
  (0, _creatorGetter.getCreator)(req, res); // check if the creators requesting to update is the real owner of 
  // the creator who is trying to change
  // if (req.creator._id != creatorid) {
  //     res
  //         .status(403)
  //         .json(
  //             {
  //                 "message": "Not you"
  //             }
  //         );
  // }

  (0, _Creators.creatorsUpdateOne)(req, res);
});
var _default = router; // module.exports = router;

exports["default"] = _default;