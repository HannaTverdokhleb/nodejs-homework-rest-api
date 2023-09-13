// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const User = require("../models/user");

// const JWT_TOKEN = process.env.JWT_SECRET;

// async function register(req, res, next) {
//     const { password, email, subscription } = req.body;

//     try {
//         const user = await User.findOne({ email }).exec()
//         if (user !== null) {
//             return res.status(409).send({message: "Email in use"})
//         }
//         const passwordHash = await bcrypt.hash(password, 10);
//         const doc = await User.create({ email, subscription, password: passwordHash })
        
//         res.status(201).send({user: {
//                 "email": doc.email,
//                 "subscription": doc.subscription
//             }
//         });
//     } catch(error) {
//         next(error)
//     }
// }

// async function login(req, res, next) {
//     const { password, email } = req.body;
//     try {
//         const user = await User.findOne({email}).exec();
//         if (user === null ) {
//             return res.status(401).send({message: "Email or password is wrong"});
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (isMatch === false) {
//             return res.status(401).send({message: "Email or password is wrong"});
//         }

//         const token = jwt.sign({
//             id: user._id,
//         }, 
//             JWT_TOKEN, 
//         {
//             expiresIn: 3600,
//         })

//         const doc = await User.findByIdAndUpdate(user._id, {token}).exec();

//         res.status(200).send({
//             "token": token,
//             "user": {
//               "email": email,
//               "subscription": doc.subscription
//             }
//         });
//     } catch(error) {
//         next(error)
//     }
// }

// async function logout(req, res, next) {
    
//     try {
//         await User.findByIdAndUpdate(req.user.id, {token: null}).exec()
//         res.status(204).end();
//     } catch(err) {
//         next(err)
//     }
    
//     res.end()
// }

// async function current(req, res, next) {
//     const authHeader = req.headers.authorization || '';
//     const [bearer, ownToken] = authHeader.split(" ", 2);
    
//     try {
//         const currentUser = await User.findOne({token: ownToken});
//         const {email, subscription} = currentUser;
//         res.status(200).send({
//             "email": email,
//             "subscription": subscription
//           });

//     } catch(err) {
//         next(err)
//     }
    
// }

// module.exports = { register, login, logout, current };