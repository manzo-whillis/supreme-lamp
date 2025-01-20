import {test} from 'node:test';
import {equal, deepEqual} from 'node:assert/strict';
import {build} from '../app.js';

test('Should have correct default options', async t => {
	const app = await build();
	t.after(async () => {
		await app.close();
	});
	const res = await app.inject({
		method: 'GET',
		url: '/'
	});

	equal(res.statusCode, 200);
	equal(res.headers['content-type'], 'application/json; charset=utf-8');
	deepEqual(await res.json(), {hello: 'world'});
});

test('Should handle errors', async t => {
	const app = await build();
	t.after(async () => {
		await app.close();
	});
	const res = await app.inject({
		method: 'GET',
		url: '/error'
	});

	equal(res.statusCode, 501);
	equal(res.headers['content-type'], 'application/json; charset=utf-8');
	deepEqual(await res.json(), {'error':'I\'m sorry, there was an error processing your request.'});
});

test('Should handle errors', async t => {
	const app = await build();
	t.after(async () => {
		await app.close();
	});
	const res = await app.inject({
		method: 'GET',
		url: '/not-found'
	});

	equal(res.statusCode, 404);
	equal(res.headers['content-type'], 'application/json; charset=utf-8');
	deepEqual(await res.json(), {'error':'Not found'});
});

