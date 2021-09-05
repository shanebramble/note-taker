const express = require('express');
const noteRoutes = require('./routes/noteRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const app = express();
const PORT = process.env.PORT || 3001;
// The following code to serve images, CSS files, and JavaScript files in a directory named public:
app.use(express.static('public'));
// Middleware for post request.
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


// Use apiRoutes
app.use('/api', noteRoutes);
app.use('/', htmlRoutes);


// Listen to any incomming requests from an established PORT.
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});