const chaldeanMap = Object.freeze({
	'A': 1, 'I': 1, 'Q': 1, 'Y': 1,
	'B': 2, 'K': 2, 'R': 2,
	'C': 3, 'G': 3, 'L': 3, 'S': 3,
	'D': 4, 'M': 4, 'T': 4,
	'E': 5, 'H': 5, 'N': 5, 'X': 5,
	'U': 6, 'V': 6, 'W': 6,
	'O': 7,
	'F': 8, 'P': 8,
	'J': 0, 'Z': 0
});

const isValidLetter = letter =>
	typeof letter === 'string' &&
	letter.length === 1 &&
	/[A-Za-z]/.test(letter);

const normalizeLetter = letter => letter.toUpperCase();

const getLetterNumber = letter => {
	if (!isValidLetter(letter)) {
		throw new Error(`Invalid input: ${letter}`);
	}
	const normalizedLetter = normalizeLetter(letter);
	return chaldeanMap[normalizedLetter] || 0;
};

const sum = numbers =>
	numbers.reduce((acc, curr) => acc + curr, 0);

const filterZeros = numbers =>
	numbers.filter(n => n !== 0);

const toCharArray = str =>
	Array.from(str);

const splitDateDigits = (dateString) => dateString.replace(/\D/g, '').split('').map(Number);

const isValidDate = (dateString) => /^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(dateString);

const getWordValue = word => {

	if (typeof word !== 'string') {
		throw new Error('Input must be a string');
	}

	const letterValues = toCharArray(word)
		.map(getLetterNumber);

	const total = sum(filterZeros(letterValues));
	return {
		total,
		results: sum(filterZeros([...total.toString()].map(Number)))
	};
};

const getDateValue = dateString => {
	if (typeof dateString !== 'string' || !isValidDate(dateString)) {
		throw new Error('Date must be a string');
	}

	const total = sum(filterZeros(splitDateDigits(dateString)));
	return {
		total,
		results: sum(filterZeros([...total.toString()].map(Number)))
	};
};

export { getWordValue, getDateValue };