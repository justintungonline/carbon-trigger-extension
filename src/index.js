import axios from 'axios';
const errors = document.querySelector('.errors');
const loading = document.querySelector('.loading');
const usage = document.querySelector('.carbon-usage');
const fossilfuel = document.querySelector('.fossil-fuel');

const results = document.querySelector('.result-container');
results.style.display = 'none';
loading.style.display = 'none';
errors.textContent = '';
// grab the form
const form = document.querySelector('.form-data');
// grab the region name
const region = document.querySelector('.region-name');

// declare a method to search by country name
const searchForRegion = async (regionName) => {
	loading.style.display = 'block';
	errors.textContent = '';
	try {
		const response = await axios.get('https://api.co2signal.com/v1/latest', {
			params: {
				countryCode: regionName,
			},
			headers: {
				//use your own token please
				'auth-token': 'c099158761a3a563',
			},
		});
		console.log(response);
		loading.style.display = 'none';
		usage.textContent = response.data.data.carbonIntensity;
		fossilfuel.textContent = response.data.data.fossilFuelPercentage;
		results.style.display = 'block';
	} catch (error) {
		console.log(error);
		loading.style.display = 'none';
		results.style.display = 'none';
		errors.textContent = 'We have no data for the region you have requested.';
	}
};

// declare a function to handle form submission
const handleSubmit = async (e) => {
	e.preventDefault();
	searchForRegion(region.value);
	console.log(region.value);
};

form.addEventListener('submit', (e) => handleSubmit(e));
