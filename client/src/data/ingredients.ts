import { ingrediantsRaw } from './ingrediantsRaw.ts'



let array = ingrediantsRaw.split('\n');
let ingredients = array.map((ingredient, id) => {
    let name = ingredient.substring(0, ingredient.indexOf(';'));
    let api_id = ingredient.substring(ingredient.indexOf(';')+1);
    return {id, name, api_id};
})

console.log(ingredients)


export default ingredients;




