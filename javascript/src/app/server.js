import closeWithGrace from 'close-with-grace';
import {build} from './app.js';

const opts = {
	logger: true
};

if (process.stdout.isTTY) {
	opts.logger = {transport: {target: 'pino-pretty'}};
}

const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';

const app = await build(opts);
await app.listen({port, host});

await closeWithGrace(async ({signal, err}) => {
	if (err) {
		app.log.error({err}, 'server closing with error');
	} else {
		app.log.info(`${signal} received, server closing`);
	}

	await app.close();
});