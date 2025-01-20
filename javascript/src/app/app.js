import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import fastify from 'fastify';
import autoload from '@fastify/autoload';
import view from '@fastify/view';
import helmet from '@fastify/helmet';
import staticPlugin from '@fastify/static';
import nunjucks from 'nunjucks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function build(opts) {
	const app = fastify(opts);

	app.register(staticPlugin, {
		root: join(__dirname, 'public')
	});

	app.register(autoload, {
		dir: join(__dirname, 'routes')
	});

	await app.register(view, {
		engine: {
			nunjucks: nunjucks
		},
		templates: join(__dirname, 'views'),
		options: {
			onConfigure: (env) => {
				// Add custom filters
				env.addFilter('formatDate', (str) => {
					return new Date(str).toLocaleDateString();
				});

				env.addGlobal('currentYear', new Date().getFullYear());

				// Configure nunjucks environment
				env.opts.autoescape = true;
				return env;
			}
		}
	});

	// Configure security for templates
	await app.register(helmet, {
		contentSecurityPolicy: {
			directives: {
				"script-src": ["'self'", "https://unpkg.com"],
				"style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
				"font-src": ["'self'", "https://fonts.gstatic.com"]
			}
		}
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