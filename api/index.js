const PORT = 4000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()



const app = express()
app.use(cors())

app.get('/recipes', async (req, res) => {


    console.log(req.query.ingredients);
    console.log(req.query.offset);

    const options = {
        method: 'GET',
        //url: 'https://api.spoonacular.com/recipes/findByIngredients',
        //params: {ingredients: 'cheese,flour,broccoli,eggs', number: 25, ranking: 2, ignorePantry: true},
        url: 'https://api.spoonacular.com/recipes/complexSearch',
        params: {
            includeIngredients: req.query.ingredients, 
            type: 'main course', 
            number: 1, 
            sort: 'max-used-ingredients', 
            addRecipeInformation: true, 
            fillIngredients: true,
            offset: req.query.offset,
        },
        headers: {
            'x-api-key': process.env.SPOONACULAR_API_KEY,
        }
    }

    try {
        const response = await axios.request(options);
        //const sorted = response.data.results.sort((a,b) => a.missedIngredientCount - b.missedIngredientCount);
        const sorted = response.data.results;
        res.status(200).json(sorted);

    } catch(error) {
        console.log(error)
    }

})

app.get('/recipe/:id', async (req, res) => {

    const id = Number(req.params.id);
    //157111,157103
    console.log(id)

    const options = {
        method: 'GET',
        url: `https://api.spoonacular.com/recipes/${id}/information`,
        headers: {
            'x-api-key': process.env.SPOONACULAR_API_KEY,
        }
    }

    try {
        const response = await axios.request(options);

        res.status(200).json(response.data);
    } catch(error) {
        console.log(error)
    }

})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(4000, () => console.log(`Server is running on port ${PORT}`))


