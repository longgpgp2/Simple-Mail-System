const express = require('express')
const app = express()
const bodyParser = require('body-parser');
// const session = require('express-session');
const cookieParser = require('cookie-parser')
const { ensureAuthenticated, redirectIfAuthenticated } = require('./middlewares/authMiddleware');
const authController = require('./controllers/authController');
const emailController = require('./controllers/emailController');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

app.set('view engine', 'ejs')
app.use('/uploads', express.static('uploads'));
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
// app.use(session({
//     secret: 'mypassword123456',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }));


app.get('/signin', redirectIfAuthenticated, authController.signinGet);
app.post('/signin', redirectIfAuthenticated, authController.signinPost);
app.get('/logout', authController.logout);
app.get('/signup', redirectIfAuthenticated, authController.signupGet);
app.post('/signup', redirectIfAuthenticated, authController.signupPost);

app.get('/', ensureAuthenticated, (req, res) => res.redirect('inbox'));
app.get('/inbox', ensureAuthenticated, emailController.inboxGet);
app.get('/outbox', ensureAuthenticated, emailController.outboxGet);
app.post('/delete-emails', ensureAuthenticated, emailController.deleteEmails);
app.get('/email/:id', ensureAuthenticated, emailController.emailGet);

app.get('/sent-emails', ensureAuthenticated, emailController.sentEmailsGet);
app.get('/received-emails', ensureAuthenticated, emailController.receivedEmailsGet);

app.get('/compose', ensureAuthenticated, emailController.composeGet);
app.post('/compose', ensureAuthenticated, upload.single('file'), emailController.composePost);
app.use((req, res) => {
    res.status(404).render('404', { url: req.originalUrl });
});
app.listen(8000);

module.exports = { app };