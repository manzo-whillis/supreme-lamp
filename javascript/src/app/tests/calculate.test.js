import {test} from 'node:test';
import { getWordValue, getDateValue } from '../utils/calculate.js';

test('Should return error (type number)', t => {
	t.assert.throws(
		() => {
			getWordValue(2324);
		},
		{
			name: 'Error',
			message: 'Input must be a string'
		}
	);
});

test('Should return error (type array)', t => {
	t.assert.throws(
		() => {
			getWordValue([]);
		},
		{
			name: 'Error',
			message: 'Input must be a string'
		}
	);
});

test('Should return error (invalid character)', t => {
	t.assert.throws(
		() => {
			getWordValue('sadda@ads');
		},
		{
			name: 'Error',
			message: 'Invalid input: @'
		}
	);
});

test('Should return error (invalid character)', t => {
	t.assert.throws(
		() => {
			getWordValue('sa3d@da');
		},
		{
			name: 'Error',
			message: 'Invalid input: 3'
		}
	);
});

test('Should return error (invalid date string)', t => {
	t.assert.throws(
		() => {
			getDateValue('sfds');
		},
		{
			name: 'Error',
			message: 'Date must be a string'
		}
	);
});

test('Should return error (invalid character)', t => {
	t.assert.throws(
		() => {
			getDateValue(32432424);
		},
		{
			name: 'Error',
			message: 'Date must be a string'
		}
	);
});

test('Should return error (invalid character)', t => {
	t.assert.throws(
		() => {
			getDateValue('2005-45-24');
		},
		{
			name: 'Error',
			message: 'Date must be a string'
		}
	);
});

test('Should return correct value for name', t => {
	const actual = getWordValue('LIONARDO');
	t.assert.strictEqual(actual.total, 30);
	t.assert.strictEqual(actual.results, 3);
});

test('Should return correct value for name', t => {
	const actual = getDateValue('1452-04-15');
	t.assert.strictEqual(actual.total, 22);
	t.assert.strictEqual(actual.results, 4);
});