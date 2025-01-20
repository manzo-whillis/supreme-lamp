import {errors} from '../errors.js';
const {KABOOM} = errors;

export default async function (app, opts) {
	app.get('/', (request, reply) => {
		const viewData = {
			title: 'Numerologia'
		};

		return reply.view('pages/home.njk', viewData);
	});

	app.get('/error', (request, reply) => {
		throw new KABOOM();
	});
};