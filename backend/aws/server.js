/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/firebase.ts":
/*!*************************!*\
  !*** ./src/firebase.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.db = exports.auth = exports.dbapp = void 0;\nconst app_1 = __webpack_require__(/*! firebase/app */ \"firebase/app\");\nconst database_1 = __webpack_require__(/*! firebase/database */ \"firebase/database\");\nconst auth_1 = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\nconst firebaseConfig = {\n    apiKey: \"AIzaSyDY1Pbm1UNL7KYXdfQZi80KEsAQ0dV8sfk\",\n    authDomain: \"indigo-turtle-blog.firebaseapp.com\",\n    projectId: \"indigo-turtle-blog\",\n    storageBucket: \"indigo-turtle-blog.appspot.com\",\n    messagingSenderId: \"264022206754\",\n    appId: \"1:264022206754:web:d0d4a61b299c7025d5dd7b\",\n    measurementId: \"G-75JTVYVM4Q\",\n    databaseURL: \"https://indigo-turtle-blog-default-rtdb.firebaseio.com\"\n};\nexports.dbapp = (0, app_1.initializeApp)(firebaseConfig);\n//export const analytics = getAnalytics(dbapp);\nexports.auth = (0, auth_1.getAuth)(exports.dbapp);\nexports.db = (0, database_1.getDatabase)(exports.dbapp);\n// Initialize Realtime Database and get a reference to the service\n//const database = getDatabase(dbapp);\n\n\n//# sourceURL=webpack://backend/./src/firebase.ts?");

/***/ }),

/***/ "./src/models/post.ts":
/*!****************************!*\
  !*** ./src/models/post.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.updatePostContent = exports.getAllPosts = exports.isUserAuthorized = exports.getPost = exports.deletePost = exports.createPost = void 0;\nconst database_1 = __webpack_require__(/*! firebase/database */ \"firebase/database\");\nconst firebase_1 = __webpack_require__(/*! ../firebase */ \"./src/firebase.ts\");\n//creating a post\nconst createPost = async (post) => {\n    const db = (0, database_1.getDatabase)(firebase_1.dbapp);\n    const postRef = (0, database_1.ref)(db, 'posts');\n    const newPostRef = (0, database_1.push)(postRef);\n    // Get the current datetime\n    const now = new Date();\n    const date = {\n        year: now.getFullYear().toString(),\n        month: (now.getMonth() + 1).toString().padStart(2, '0'),\n        day: now.getDate().toString().padStart(2, '0'),\n        hr: now.getHours().toString().padStart(2, '0'),\n        min: now.getMinutes().toString().padStart(2, '0'),\n        sec: now.getSeconds().toString().padStart(2, '0'),\n    };\n    const newPost = {\n        uid: newPostRef.key,\n        author: post.author,\n        title: post.title,\n        content: post.content,\n        date,\n        tags: post.tags,\n    };\n    await (0, database_1.update)(newPostRef, newPost);\n    //return newPost;\n};\nexports.createPost = createPost;\nconst deletePost = async (uid) => {\n    const db = (0, database_1.getDatabase)(firebase_1.dbapp);\n    //const postRef = ref(db, \"posts/\" + uid);\n    //const postRef = child(ref(db, 'posts'), uid);\n    console.log('uid is ', uid);\n    const postRef = (0, database_1.ref)(db, 'posts/' + encodeURIComponent(uid.trim()));\n    console.log(postRef.toString());\n    await (0, database_1.remove)(postRef);\n};\nexports.deletePost = deletePost;\nconst getPost = async (postId) => {\n    const db = (0, database_1.getDatabase)();\n    const postRef = (0, database_1.ref)(db, `posts/${postId}`);\n    try {\n        const snapshot = await (0, database_1.get)(postRef);\n        if (snapshot.exists()) {\n            const post = snapshot.val();\n            return { ...post, postId };\n        }\n        else {\n            return null;\n        }\n    }\n    catch (error) {\n        console.error(error);\n        return null;\n    }\n};\nexports.getPost = getPost;\nconst isUserAuthorized = (username, post) => {\n    return post.author === username;\n};\nexports.isUserAuthorized = isUserAuthorized;\nconst getAllPosts = (callback) => {\n    const db = (0, database_1.getDatabase)(firebase_1.dbapp);\n    const postRef = (0, database_1.ref)(db, 'posts');\n    const unsub = (0, database_1.onValue)(postRef, (snapshot) => {\n        const posts = snapshot.val();\n        callback(posts);\n    });\n    unsub();\n};\nexports.getAllPosts = getAllPosts;\nconst updatePostContent = async (uid, content, username) => {\n    const db = (0, database_1.getDatabase)(firebase_1.dbapp);\n    const postRef = (0, database_1.ref)(db, 'posts/' + encodeURIComponent(uid));\n    // Retrieve the post data from the database\n    const snapshot = await (0, database_1.get)(postRef);\n    // Check the author's name\n    if (snapshot.exists() && snapshot.val().author === username) {\n        // Update the post content\n        await (0, database_1.update)(postRef, {\n            content,\n        });\n    }\n    else {\n        return null;\n    }\n};\nexports.updatePostContent = updatePostContent;\n\n\n//# sourceURL=webpack://backend/./src/models/post.ts?");

/***/ }),

/***/ "./src/models/user.ts":
/*!****************************!*\
  !*** ./src/models/user.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.updatePassword = exports.getUserByUsername = exports.getUserByEmail = exports.getUserById = exports.createUser = void 0;\nconst database_1 = __webpack_require__(/*! firebase/database */ \"firebase/database\");\nconst bcrypt_1 = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst firebase_1 = __webpack_require__(/*! ../firebase */ \"./src/firebase.ts\");\n//creating a user\nconst createUser = async (user) => {\n    const db = (0, database_1.getDatabase)(firebase_1.dbapp);\n    //const userRef = ref(db, 'users/' + user.email.replace('.', ','));\n    const userRef = (0, database_1.ref)(db, 'users');\n    const hashedPassword = await (0, bcrypt_1.hash)(user.password, 10);\n    const newUserRef = (0, database_1.push)(userRef);\n    const newUser = {\n        uid: newUserRef.key,\n        username: user.username,\n        email: user.email,\n        password: hashedPassword,\n    };\n    await (0, database_1.update)(newUserRef, newUser);\n};\nexports.createUser = createUser;\n//Retrieve a user by their id\nconst getUserById = async (uid) => {\n    const db = (0, database_1.getDatabase)(firebase_1.dbapp);\n    console.log(uid);\n    //const userRef = ref(db, `users/${uid}`);\n    const userRef = (0, database_1.ref)(db, 'users/' + encodeURIComponent(uid));\n    const snapshot = await (0, database_1.get)(userRef);\n    const userData = snapshot.val();\n    if (userData) {\n        const user = { uid, ...userData };\n        return user;\n    }\n    return null;\n};\nexports.getUserById = getUserById;\n// Retrieve user by email\nconst getUserByEmail = async (email) => {\n    const db = (0, database_1.getDatabase)();\n    //const db = database;\n    const usersRef = (0, database_1.ref)(db, 'users');\n    const q = (0, database_1.query)(usersRef, (0, database_1.orderByChild)('email'), (0, database_1.equalTo)(email), (0, database_1.limitToFirst)(1));\n    const querySnapshot = await (0, database_1.get)(q);\n    const userObj = querySnapshot.val();\n    if (!userObj) {\n        return null;\n    }\n    const uid = Object.keys(userObj)[0];\n    const user = userObj[uid];\n    return { uid, ...user };\n};\nexports.getUserByEmail = getUserByEmail;\n// Retrieve a user by their username\nconst getUserByUsername = async (username) => {\n    const db = (0, database_1.getDatabase)(firebase_1.dbapp);\n    const usersRef = (0, database_1.ref)(db, 'users');\n    const queryConstraints = [(0, database_1.orderByChild)('username'), (0, database_1.equalTo)(username)];\n    const q = (0, database_1.query)(usersRef, ...queryConstraints);\n    const snapshot = await (0, database_1.get)(q);\n    //console.log('snapshot:', snapshot.val());\n    if (!snapshot.exists()) {\n        return null;\n    }\n    const userData = Object.values(snapshot.val())[0];\n    const user = {\n        uid: userData.uid,\n        username: userData.username,\n        email: userData.email,\n        password: userData.password,\n    };\n    return user;\n};\nexports.getUserByUsername = getUserByUsername;\nconst updatePassword = async (uid, activeUser, newPassword) => {\n    const db = (0, database_1.getDatabase)(firebase_1.dbapp);\n    const userRef = (0, database_1.ref)(db, 'users/' + encodeURIComponent(uid));\n    const snapshot = await (0, database_1.get)(userRef);\n    if (snapshot.exists() && snapshot.val().username === activeUser) {\n        const hashedPassword = await (0, bcrypt_1.hash)(newPassword, 10);\n        await (0, database_1.update)(userRef, {\n            password: hashedPassword,\n        });\n    }\n    else {\n        return null;\n    }\n};\nexports.updatePassword = updatePassword;\n\n\n//# sourceURL=webpack://backend/./src/models/user.ts?");

/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst express_session_1 = __importDefault(__webpack_require__(/*! express-session */ \"express-session\"));\nconst passport_1 = __importDefault(__webpack_require__(/*! passport */ \"passport\"));\nconst passport_local_1 = __importDefault(__webpack_require__(/*! passport-local */ \"passport-local\"));\nconst bcrypt_1 = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nconst cookie_parser_1 = __importDefault(__webpack_require__(/*! cookie-parser */ \"cookie-parser\"));\nconst user_1 = __webpack_require__(/*! ./models/user */ \"./src/models/user.ts\");\nconst post_1 = __webpack_require__(/*! ./models/post */ \"./src/models/post.ts\");\nconst app = (0, express_1.default)();\napp.use(express_1.default.json());\napp.use((0, cors_1.default)({ origin: 'http://localhost:3000', credentials: true }));\nconst sessionOptions = {\n    secret: 'BlogSecret',\n    resave: false,\n    saveUninitialized: false,\n};\nconst LocalStrategy = passport_local_1.default.Strategy;\napp.use((0, express_session_1.default)(sessionOptions));\napp.use((0, cookie_parser_1.default)());\n//Setting up Passport\napp.use(passport_1.default.initialize());\napp.use(passport_1.default.session());\npassport_1.default.use(new LocalStrategy(async (username, password, done) => {\n    const user = await (0, user_1.getUserByUsername)(username);\n    if (!user) {\n        return done(null, false, { message: 'Invalid username' });\n    }\n    try {\n        const matchRes = await (0, bcrypt_1.compare)(password, user.password);\n        if (matchRes) {\n            return done(null, user);\n        }\n        else {\n            return done(null, false, { message: 'Invalid password' });\n        }\n    }\n    catch (error) {\n        return done(error);\n    }\n}));\npassport_1.default.serializeUser((user, done) => {\n    done(null, user);\n});\npassport_1.default.deserializeUser(async (uid, done) => {\n    const user = await (0, user_1.getUserById)(uid);\n    if (user) {\n        return done(null, user);\n    }\n    return done(null, { message: 'User not found' });\n});\n//Routes\n// POST API endpoint to add a new user\napp.get('/', (req, res) => {\n    res.send('Welcome');\n});\napp.post('/register', async (req, res) => {\n    try {\n        const { username, email, password } = req?.body;\n        if (!username ||\n            !password ||\n            typeof username !== 'string' ||\n            typeof password !== 'string') {\n            res.send('Please enter correct value types');\n            return;\n        }\n        const user = await (0, user_1.getUserByUsername)(username);\n        if (user) {\n            res.status(409).json({ message: 'This username is already taken' });\n            return;\n        }\n        else {\n            // Create a new user object\n            const newUser = { username, email, password };\n            // Add the new user to the database\n            await (0, user_1.createUser)(newUser);\n            res.status(201).json({ message: 'User created successfully' });\n        }\n    }\n    catch (error) {\n        console.error(error);\n        res.status(500).json({ message: 'Failed to create user' });\n    }\n});\napp.post('/login', passport_1.default.authenticate('local'), (req, res) => {\n    res.send(req.user);\n});\napp.get('/user', (req, res) => {\n    if (req.isAuthenticated()) {\n        res.send(req.user);\n    }\n    else {\n        res.status(401).send('Unauthorized');\n    }\n});\napp.get('/logout', (req, res) => {\n    req.logout(() => {\n        res.send('success');\n    });\n});\napp.post('/createposts', async (req, res) => {\n    try {\n        const { author, title, content, tags } = req?.body;\n        // Create a new user object\n        const newPost = { author, title, content, tags };\n        // Add the new user to the database\n        await (0, post_1.createPost)(newPost);\n        res.status(201).json({ message: 'Post creation successful' });\n    }\n    catch (error) {\n        console.error(error);\n        res.status(500).json({ message: 'Post creation failed' });\n    }\n});\napp.delete('/posts/:postId', async (req, res) => {\n    const postId = req.params.postId;\n    try {\n        await (0, post_1.deletePost)(postId);\n        res.status(204).send();\n    }\n    catch (error) {\n        console.error(error);\n        res.status(500).json({ message: 'Failed to delete post' });\n    }\n});\napp.get('/posts', (req, res) => {\n    (0, post_1.getAllPosts)((posts) => {\n        res.send(posts);\n    });\n});\napp.patch('/posts/:postId', async (req, res) => {\n    const { postId } = req.params;\n    const { username, content } = req.body;\n    try {\n        await (0, post_1.updatePostContent)(postId, content, username);\n        res.status(200).json({ message: 'Post content updated successfully.' });\n    }\n    catch (error) {\n        console.error(error);\n        res\n            .status(500)\n            .json({ error: 'An error occurred while updating the post content.' });\n    }\n});\napp.patch('/user/updatePassword/:userId', async (req, res) => {\n    const { userId } = req.params;\n    const { activeUser, newPassword } = req.body;\n    try {\n        await (0, user_1.updatePassword)(userId, activeUser, newPassword);\n        res.status(200).json({ message: 'Password updated successfully' });\n    }\n    catch (error) {\n        console.error(error);\n        res\n            .status(500)\n            .json({ error: 'An error occurred while updating the user password' });\n    }\n});\napp.listen(4000, () => {\n    console.log('Server started successfully');\n});\n\n\n//# sourceURL=webpack://backend/./src/server.ts?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("express-session");

/***/ }),

/***/ "firebase/app":
/*!*******************************!*\
  !*** external "firebase/app" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("firebase/app");

/***/ }),

/***/ "firebase/auth":
/*!********************************!*\
  !*** external "firebase/auth" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("firebase/auth");

/***/ }),

/***/ "firebase/database":
/*!************************************!*\
  !*** external "firebase/database" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("firebase/database");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("passport");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("passport-local");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server.ts");
/******/ 	
/******/ })()
;