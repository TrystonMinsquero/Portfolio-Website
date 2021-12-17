// state values
let i = 0;			// index for string
let a = 0;			// index for array
let isBackspacing = false;	// flag for backspace

let today = new Date();
const textArray = ['Tryston Minsquero', today.toDateString(), today.toLocaleTimeString()];

// timing values
const speedForward = 150;	// typing speed
const speedWait = 3000;		// wait between typing and backspacing
const speedBackspace = 100;	// backspace speed

const typeWriter = (id, arr) => {
	today = new Date();
	arr[1] = today.toDateString();				// index 1 reserved
	arr[2] = today.toLocaleTimeString();		// index 2 reserved
	let currentString = arr[a];
	let h1;
	const cursors = document.querySelectorAll(`#${id} .cursor`);
	
	for(const elem of cursors) {
		if(elem.tagName === 'H1') {
			h1 = elem;
			break;
		}
	}
	
	// handle error
	if(!h1) {
		console.error(`Didn't find any cursors in specified id: #${id}`);
		return;
	}

	// determine typing/backspacing state using flag
	if(!isBackspacing) {
		// if full string hasn't been typed out, continue typing
		if(i < currentString.length) {
			h1.innerHTML += currentString.charAt(i);
			i++;
			setTimeout(() => typeWriter(id, arr), speedForward);
		} else if (i == currentString.length) {		// switch to backspacing mode
			isBackspacing = true;
			setTimeout(() => typeWriter(id, arr), speedWait);
		}
	} else {		// backspacing
		if(h1.innerHTML.length > 0) {
			h1.innerHTML = h1.innerHTML.substring(0, h1.innerHTML.length - 1);
			setTimeout(() => typeWriter(id, arr), speedBackspace);
		} else {
			isBackspacing = false;
			i = 0;
			a = (a + 1) % arr.length;
			setTimeout(() => typeWriter(id, arr), 100);
		}
	}
}

// runs the loop
typeWriter('output', textArray);
