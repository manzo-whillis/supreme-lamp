import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import fastify from 'fastify';
import autoload from '@fastify/autoload'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function build(opts) {
	const app = fastify(opts);

	app.register(autoload, {
		dir: join(__dirname, 'routes')
	});

	app.setErrorHandler(async (err, request, reply) => {
		request.log.error({err});
		reply.code(err.statusCode || 500);
		return {error: err.message};
	});

	app.setNotFoundHandler(async (request, reply) => {
		reply.code(404);
		return {error: 'Not found'};
	});

	return app;
};