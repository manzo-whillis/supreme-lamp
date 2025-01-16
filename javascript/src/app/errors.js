import createError from "@fastify/error";

const errors = {
	'KABOOM': createError(
		'KaboomError',
		'I\'m sorry, there was an error processing your request.',
		501,
		TypeError)
};

export {errors};