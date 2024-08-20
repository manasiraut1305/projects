const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Sentiment = require('sentiment');
const path = require('path');

// Initialize the app
const app = express();
const sentiment = new Sentiment();
const port = 3020;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/commentsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a schema and model for comments
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String,
    sentimentScore: Number,
    prod: String,  
});

const Comment = mongoose.model('Comment', commentSchema);

// Route to serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Handle comment submission with sentiment analysis
app.post('/submit-comment', async (req, res) => {
    try {
        const { name, comment, prod } = req.body;
        
        // Perform sentiment analysis
        const result = sentiment.analyze(comment);
        const sentimentScore = result.score;

        // Save sentiment score and product identifier
        const newComment = new Comment({ name, comment, sentimentScore, prod });
        await newComment.save();

        // Send dynamic response based on sentiment
        let responseMessage;
        let imagePath;

        if (sentimentScore > 0) {
            responseMessage = "Thank you so much!";
            imagePath = '/public/positive.png'; // Image for positive sentiment
        } else if (sentimentScore < 0) {
            responseMessage = "We will try to improve it.";
            imagePath = '/public/negative.png'; // Image for negative sentiment
        } else {
            responseMessage = "Thank you for your feedback!";
            imagePath = '/public/neutral.png'; // Image for neutral sentiment
        }

        res.json({ message: responseMessage, image: imagePath });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

/*const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Sentiment = require('sentiment');
const path = require('path');

// Initialize the app
const app = express();
const sentiment = new Sentiment();
const port = 3020;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/commentsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a schema and model for comments
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String,
    sentimentScore: Number,
    prod: String,  
});

const Comment = mongoose.model('Comment', commentSchema);

app.use(express.json());


app.use('/public', express.static(path.join(__dirname, 'public')));
// Route to HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Handle comment submission with sentiment analysis
app.post('/submit-comment', async (req, res) => {
    try {
        const { name, comment, prod } = req.body;
        
        // Perform sentiment analysis
        const result = sentiment.analyze(comment);
        const sentimentScore = result.score;

        // Save sentiment score and product identifier
        const newComment = new Comment({ name, comment, sentimentScore, prod });
        await newComment.save();

        // response on sentiment
        if (sentimentScore > 0) {
            res.json({ message: "Thank you so much!" });
        } else {
            res.json({ message: "We will try to improve it." });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});*/



/*const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3020;


mongoose.connect('mongodb://localhost:27017/shoeStore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a schema and model for comments
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String,
    prod: String,  
});

const Comment = mongoose.model('Comment', commentSchema);

// Middleware to parse JSON bodies
app.use(express.json());


app.use('/public', express.static(path.join(__dirname, 'public')));
//app.use('/views', express.static(path.join(__dirname, 'views')));

// Route to  HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// handle comment submission
app.post('/submit-comment', async (req, res) => {
    try {
        const { name, comment, prod } = req.body;
        const newComment = new Comment({ name, comment, prod });
        await newComment.save();
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});*/
