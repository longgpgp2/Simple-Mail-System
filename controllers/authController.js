const { db } = require('../dbsetup');
const { decryptText, encryptText } = require('../middlewares/cryptoMiddleware');
const { registerUser } = require('../utils/account-utils');

const key = "mypassword123456";

exports.signinGet = (req, res) => {
    res.render('signin', { errorMessage: null });
};

exports.signinPost = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).render('signin', { errorMessage: 'Please provide all fields' });
    }
    try {
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            const fetchedPassword = existingUser[0].password;
            const validatePassword = decryptText(fetchedPassword, key);
            if (validatePassword !== password) {
                return res.render('signin', { errorMessage: 'Wrong password!.' });
            }
            let user = {
                // id: existingUser[0].id,
                fullname: existingUser[0].fullname,
                email: existingUser[0].email
            };
            res.cookie("user", user);
            return res.redirect('/');
        }
        res.redirect('/signin');
    } catch (err) {
        res.render('404')
    }
};

exports.logout = (req, res) => {
    res.clearCookie("user");
    res.redirect('/signin');
};

exports.signupGet = (req, res) => {
    res.render('signup', { errorMessage: null });
};

exports.signupPost = async (req, res) => {
    const user = req.body;
    user.password = encryptText(user.password, key);
    try {
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [user.email]);
        if (existingUser.length > 0) {
            return res.render('signup', { errorMessage: 'Email already exists. Please use a different email.' });
        }
        await registerUser(user, res);
        res.redirect('/');
    } catch (err) {
        res.render('404')
    }
};