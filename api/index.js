const PORT = 4000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()



const app = express()
app.use(cors())

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
 });

app.get('/recipes', async (req, res) => {

    const options = {
        method: 'GET',
        url: 'https://api.spoonacular.com/recipes/complexSearch',
        params: {
            includeIngredients: req.query.ingredients, 
            number: 6, 
            sort: 'max-used-ingredients', 
            addRecipeInformation: true, 
            fillIngredients: true,
            offset: req.query.offset,
            cuisine: req.query.cuisine,
            diet: req.query.diets,
            intolerances: req.query.intolerances,
            type: req.query.type,

        },
        headers: {
            'x-api-key': process.env.SPOONACULAR_API_KEY,
        }
    }

    try {
        const response = await axios.request(options);
        res.status(200).json(response.data);

    } catch(error) {
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

})





app.listen(4000, () => console.log(`Server is running on port ${PORT}`))


