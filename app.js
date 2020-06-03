const express = require('express');
const app = express();

const path = require('path');
const dotenv = require('dotenv');
const methodOverride = require('method-override')
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const employeeRoutes = require('./routes/employees');

dotenv.config({ path: './config.env' });

// connection to mongodb database
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(methodOverride('_method'));
app.use(session({
    secret: "mySecret",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

// setting messages globally
app.use((req, res, next) => {
    res.locals.success_msg = req.flash(('success_msg'));
    res.locals.error_msg = req.flash(('error_msg'));
    next();
});

app.use(employeeRoutes);


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is started at port ${port}`);
})