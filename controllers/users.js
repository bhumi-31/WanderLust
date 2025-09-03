const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async(req, res) => {
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if(err){
                next(err);
            }
            req.flash("success", "welcome to WanderLust!");
            res.redirect("/listings");
        });
    }catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};


module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async(req, res) => {
    req.flash("success","Welcome back to WanderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

// module.exports.login = async(req, res) => {
//     console.log("AFTER LOGIN USER:", req.user);   // <-- debug ke liye
//     console.log("SESSION:", req.session);         // <-- debug ke liye
    
//     req.flash("success","Welcome back to WanderLust!");
//     let redirectUrl = res.locals.redirectUrl || "/listings";

//     // Kabhi kabhi render pr session turant save nahi hota
//     req.session.save(() => {
//         res.redirect(redirectUrl);
//     });
// }

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }

        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    });
};