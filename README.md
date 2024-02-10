
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/bartekBanach/recipe-generator">
    <img src="https://imgur.com/NTPXP5x.png" alt="Logo" width="80" height="80">
  </a>
<h3 align="center">Recipe Generator</h3
  <p align="center">
    Recipe generator app created with React
    <br />
    <a href="https://recipe-generator-k5uu.onrender.com">View Demo</a>
  </p>
</div>



## About 

Simple app that enables users to search for meal recipes based on inputted ingredients. Users can also filter recipes by cuisines, diets, allergens and types. The application is built in React and utilizes the Spoonacular food API to fetch recipe data.




## Technologies

* [![React][React.js]][React-url]
* [![Express][Express]][Express-url]
* [![Vite][Vite]][Vite-url]
* [![TypeScript][TypeScript]][TypeScript-url]


## Installation and usage

### Prerequisites


Clone down this repository. You will need `node` and `npm` installed globally on your machine.  


### Server-side usage (PORT: 4000)

1. Get a free API Key at [https://spoonacular.com/food-api](https://spoonacular.com/food-api)
2. Install NPM packages
   ```sh
   cd api
   npm install
   ```
3. Create .env file in client folder with your spoonacular API key 
   ```sh
   SPOONACULAR_API_KEY = 'ENTER YOUR API';
   ```
4.  Run proxy server 
	 ```sh
	 npm run dev
	   ```

### Client-side usage (PORT: 3000)
1. In client folder create .env file with proxy server url 
   ```sh
   VITE_PROXY_URL = 'http://localhost:4000';
   ```
 2. Install NPM packages
	```sh
	cd client
	npm install
	```
2. Run development server 
	```sh
	npm run dev
	 ```





[Vite]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Express]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/

[TypeScript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/

