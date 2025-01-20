import S from 'fluent-json-schema';
import errors from 'http-errors';
import fastifyFormBody from '@fastify/formbody';
import { getWordValue, getDateValue } from '../utils/calculate.js';

export default async function (app, opts) {
	app.register(fastifyFormBody);
	app.post('/calculate', {
		schema: {
			body: S.object()
				.prop('name', S.string().required())
				.prop('middle-name', S.string())
				.prop('last-name', S.string().required())
				.prop('birth-date', S.string().format('date').required())
				.prop('city', S.string())
		}
	}, async (req, res) => {
		req.log.error(req.body);
		return {
			a: getWordValue(req.body['name']),
			b: getWordValue(req.body['middle-name']),
			c: getWordValue(req.body['last-name']),
			d: getWordValue(req.body['city']),
			e: getDateValue(req.body['birth-date'])
		}
	})
};