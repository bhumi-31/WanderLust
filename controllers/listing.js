const Listing = require("../models/listing.js");
const mbxTilesets = require('@mapbox/mapbox-sdk/services/geocoding');


const mapToken = process.env.MAP_TOKEN;
console.log('Render Debug - MAP_TOKEN exists:', !!mapToken);
console.log('Render Debug - MAP_TOKEN first 10 chars:', mapToken ? mapToken.substring(0, 10) : 'undefined');
const geocodingClient = mbxTilesets({ accessToken: mapToken });

// module.exports.index = async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs", { allListings });
// };

module.exports.index = async (req, res) => {
    try {
        const searchQuery = req.query.q;
        const category = req.query.category;
        // console.log("Category filter:", category);

        // console.log("User searched for:", searchQuery);

        let filters = {};

        // let listings;
        if(searchQuery){
            filters.$or = [
                { title: { $regex: searchQuery, $options: "i" } },
                { location: { $regex: searchQuery, $options: "i" } }
            ];
        }

        if(category){
            filters.category = category;
        }

        const listings = await Listing.find(filters);

        res.render("listings/index.ejs", { listings, searchQuery , category});
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
    }
};


module.exports.renderNewForm = (req, res) => {

    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
    }
    // console.log(listing);
    console.log('Controller Debug - MAP_TOKEN:', process.env.MAP_TOKEN ? 'EXISTS' : 'UNDEFINED');
    console.log('Controller Debug - MAP_TOKEN first 10 chars:', process.env.MAP_TOKEN ? process.env.MAP_TOKEN.substring(0, 10) : 'UNDEFINED');
    res.render("listings/show.ejs", { listing , mapToken: process.env.MAP_TOKEN});
};

module.exports.createListing = async (req, res) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    })
    .send();

    let url = req.file.path;
    let filename = req.file.filename;
    console.log(req.body.listing);
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = response.body.features[0].geometry;

    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {

    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};