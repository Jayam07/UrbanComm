const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");

exports.isAuthenticated = catchAsyncErrors(async(req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({ message: "Plz Login to Continue"});
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.user = await User.findById(decoded.id);

    next();
});


exports.isSeller = catchAsyncErrors(async(req,res,next) => {
    const {seller_token} = req.cookies;
    if(!seller_token){
        return res.status(401).json({ message: "Please login to continue" });
    }

    const decoded = jwt.verify(seller_token, process.env.JWT_KEY);

    req.seller = await Shop.findById(decoded.id);

    next();
});


exports.isAdmin = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return res.json({ message: `${req.user.role} can not access this resources!` });
        };
        next();
    }
}