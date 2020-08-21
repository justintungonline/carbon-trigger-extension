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

//if anything is in localStorage, pick it up
const storedApiKey = localStorage.getItem('apiKey');
const storedRegion = localStorage.getItem('regionName');

const displayCarbonUsage = async (apiKey, region) => {
	try {
		const response = await axios.get('https://api.co2signal.com/v1/latest', {
			params: {
				countryCode: region,
			},
			headers: {
				//please get your own token from CO2Signal https://www.co2signal.com/
				'auth-token': apiKey,
			},
		});
		console.log(response);

		let co2Scale = [0, 150, 600, 750, 800];
		let colors = ['#2AA364', '#F5EB4D', '#9E4229', '#381D02', '#381D02'];
		let CO2 = Math.floor(response.data.data.carbonIntensity);

		let closestNum = co2Scale.sort((a, b) => {
			return Math.abs(a - CO2) - Math.abs(b - CO2);
		})[0];

		let scaleIndex = co2Scale.findIndex((co2Scale) => co2Scale === closestNum);

		let closestColor = colors[scaleIndex];

		chrome.runtime.sendMessage({ action: 'updateIcon', value: { number: closestNum, color: closestColor } });

		loading.style.display = 'none';
		form.style.display = 'none';
		myregion.textContent = region;
		usage.textContent =
			Math.round(response.data.data.carbonIntensity) + ' grams (grams C02 emitted per kilowatt hour)';
		fossilfuel.textContent =
			response.data.data.fossilFuelPercentage.toFixed(2) +
			'% (percentage of fossil fuels used to generate electricity)';
		results.style.display = 'block';
	} catch (error) {
		console.log(error);
		loading.style.display = 'none';
		results.style.display = 'none';
		errors.textContent = 'Sorry, we have no data for the region you have requested.';
	}
};

// set up api key and region
const setUpUser = async (apiKey, regionName) => {
	localStorage.setItem('apiKey', apiKey);
	localStorage.setItem('regionName', regionName);
	loading.style.display = 'block';
	errors.textContent = '';
	//make initial call
	displayCarbonUsage(apiKey, regionName);
};

// declare a function to handle form submission
const handleSubmit = async (e) => {
	e.preventDefault();
	setUpUser(apiKey.value, region.value);
};

//initial check to see if repeat visitor
if (storedApiKey === null && storedRegion === null) {
	//if we don't have the keys, show the form
	form.style.display = 'visible';
	results.style.display = 'none';
	loading.style.display = 'none';
	errors.textContent = '';
} else {
	//if we have saved keys/regions in localStorage, show results when they load
	results.style.display = 'none';
	form.style.display = 'none';
	displayCarbonUsage(storedApiKey, storedRegion);
}

form.addEventListener('submit', (e) => handleSubmit(e));
