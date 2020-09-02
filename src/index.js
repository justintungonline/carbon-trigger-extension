import axios from 'axios';

// form fields
const form = document.querySelector('.form-data');
const region = document.querySelector('.region-name');
const apiKey = document.querySelector('.api-key');

// results
const errors = document.querySelector('.errors');
const loading = document.querySelector('.loading');
const results = document.querySelector('.result-container');
const usage = document.querySelector('.carbon-usage');
const fossilfuel = document.querySelector('.fossil-fuel');
const myregion = document.querySelector('.my-region');
const clearBtn = document.querySelector('.clear-btn');

const calculateColor = async (value) => {
	let co2Scale = [0, 150, 600, 750, 800];
	let colors = ['#2AA364', '#F5EB4D', '#9E4229', '#381D02', '#381D02'];

	let closestNum = co2Scale.sort((a, b) => {
		return Math.abs(a - value) - Math.abs(b - value);
	})[0];

	let num = (element) => element > closestNum;
	let scaleIndex = co2Scale.findIndex(num);

	let closestColor = colors[scaleIndex];
	//🌱 7. update icon🌱
};

const displayCarbonUsage = async (apiKey, region) => {
	try {
		await axios
			.get('https://api.co2signal.com/v1/latest', {
				params: {
					countryCode: region,
				},
				headers: {
					//please get your own token from CO2Signal https://www.co2signal.com/
					'auth-token': apiKey,
				},
			})
			.then((response) => {
				//🌱6. calculate color of icon, based on carbon intensity🌱

				loading.style.display = 'none';
				form.style.display = 'none';
				myregion.textContent = region;
				//🌱4. display usage and carbon source🌱
				results.style.display = 'block';
			});
	} catch (error) {
		console.log(error);
		loading.style.display = 'none';
		results.style.display = 'none';
		errors.textContent = 'Sorry, we have no data for the region you have requested.';
	}
};

// set up api key and region
const setUpUser = async (apiKey, regionName) => {
	//🌱 2. manage local storage🌱
	loading.style.display = 'block';
	errors.textContent = '';
	clearBtn.style.display = 'block';
	//🌱 3. make initial call🌱
};

// handle form submission
const handleSubmit = async (e) => {
	e.preventDefault();
	setUpUser(apiKey.value, region.value);
};

//initial checks
const init = async () => {
	//🌱 1. if anything is in localStorage, pick it up🌱

	//🌱 5. set icon to be generic green🌱

	if (storedApiKey === null || storedRegion === null) {
		//if we don't have the keys, show the form
		form.style.display = 'block';
		results.style.display = 'none';
		loading.style.display = 'none';
		clearBtn.style.display = 'none';
		errors.textContent = '';
	} else {
		//if we have saved keys/regions in localStorage, show results when they load
		results.style.display = 'none';
		form.style.display = 'none';
		displayCarbonUsage(storedApiKey, storedRegion);
		clearBtn.style.display = 'block';
	}
};

const reset = async (e) => {
	e.preventDefault();
	//clear local storage for region only
	localStorage.removeItem('regionName');
	init();
};

form.addEventListener('submit', (e) => handleSubmit(e));
clearBtn.addEventListener('click', (e) => reset(e));

//start app
init();
