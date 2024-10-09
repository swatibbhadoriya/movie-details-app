const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { movie: null, error: null });
});

app.post('/movie', async (req, res) => {
    const movieName = req.body.movieName;
    const apiKey = 'b4ccdf7f';

    try {
        const response = await axios.get(`http://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`);
        const movie = response.data;

        if (movie.Response === 'True') {
            res.render('index', { movie, error: null });
        } else {
            res.render('index', { movie: null, error: movie.Error });
        }
    } catch (error) {
        res.render('index', { movie: null, error: 'An error occurred while fetching movie details.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
