import axios from 'axios';

function getGiphy(cb) {
	const myUrl = '/giphy?keyword=party';

	return axios.get(myUrl)
		.then(function(data) {
			cb(parseGiphy(data));
		});
};

function parseGiphy(data) {
	return {
		source: data['data']['URL']
	};
}

export { getGiphy };
