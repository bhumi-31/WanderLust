const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");

const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
    .get(wrapAsync(listingController.index)) //index route
    .post(isLoggedIn, upload.single('listing[image]'),  validateListing,wrapAsync(listingController.createListing)); // create route

//New ROUTE

router.get("/new", isLoggedIn, listingController.renderNewForm);





//EDIT ROUTE

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// SHOW + UPDATE + DELETE

router.route("/:id")
.get( wrapAsync(listingController.showListing)) // show route
.put( isLoggedIn, isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing)) //update route
.delete( isOwner, wrapAsync(listingController.destroyListing)); // delete route




module.exports = router;