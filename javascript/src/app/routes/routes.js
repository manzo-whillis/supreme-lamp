import {errors} from '../errors.js';
const {KABOOM} = errors;

export default async function (app, opts) {
	app.get('/', (request, reply) => {
		return {hello: 'world'};
	});

	app.get('/error', (request, reply) => {
		throw new KABOOM();
	});
};