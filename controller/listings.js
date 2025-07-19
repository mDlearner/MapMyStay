const Listing = require('../models/listings');


//render home page with listings
module.exports.home = async (req, res) => {
    const lists = await Listing.find({});
    res.render('home.ejs', { lists });
}

// Render new listing form
module.exports.renderNewForm = (req, res) => {
    res.render('new.ejs');
}

// Render edit form
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id);
    if (!list) {
        req.flash("error", "Listing not found");
        return res.redirect('/listings');
    }
    res.render('edit.ejs', { list });
}


module.exports.viewListing = async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id).populate({ path: 'reviews', populate: { path: 'owner' } }).populate('owner');
    if (!list) {
        req.flash("error", "Listing not found");
        return res.redirect('/listings');
    }
    res.render('show2.ejs', { list });
}


module.exports.newListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const listing = new Listing(req.body.listing);
    listing.owner = req.user._id;
    listing.image = { url, filename };
    await listing.save();
    if (!listing) {
        throw new ExpressError(400, 'Invalid Listing Data');
    }
    req.flash('success', 'Successfully created a new listing!');
    res.redirect('/listings');
}


module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== 'undefined') {
        let url = req.file.path;
        let filename = req.file.filename;
        list.image = { url, filename };
        await list.save();
    }

    if (!list) {
        req.flash("error", "Listing not found");
        return res.redirect('/listings');
    }
    req.flash('success', 'Successfully updated the listing!');
    res.redirect(`/listings/${id}`);
}


module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted the listing!');
    res.redirect('/listings');
}