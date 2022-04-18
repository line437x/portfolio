`use strict`;
gsap.registerPlugin(ScrollTrigger);
let text = document.querySelector("h1");
text.innerHTML = spanWrapper(text.textContent);

window.addEventListener("DOMContentLoaded", start);

function start() {
	const headerTl = gsap.timeline();

	// Fade in letters in h1
	headerTl.from(".h1-wrapper span", { y: "200%", duration: 0.5, stagger: { amount: 0.5 }, delay: 0.5 }).from("nav a", { y: "-200%", stagger: { each: 0.2 } }, "-=0.3");

	const sections = document.querySelectorAll("section");
	console.log(sections);

	sections.forEach((section) => {
		gsap.from(`#${section.id} > *`, {
			y: "100%",
			opacity: 0,
			duration: 0.5,
			stagger: {
				amount: 1,
			},
			scrollTrigger: {
				trigger: section,
				start: "top center",
			},
		});
	});
}

function spanWrapper(text) {
	const textArr = text.split(" ");
	textArr.forEach((element, i, arr) => {
		arr[i] = `<span>${element}</span>`;
	});
	// console.log(textArr);
	return textArr.join(" ");
}

// ---------    Dark mode    ---------

let darkModeState = false;
const button = document.querySelector(".btn");
// MediaQueryList object
const useDark = window.matchMedia("(prefers-color-scheme: dark)");
// Toggles the "dark-mode" class
function toggleDarkMode(state) {
	document.documentElement.classList.toggle("dark-mode", state);
	darkModeState = state;
}
// Sets localStorage state
function setDarkModeLocalStorage(state) {
	localStorage.setItem("dark-mode", state);
}
// Initial setting
toggleDarkMode(localStorage.getItem("dark-mode") == "true");
// Listen for changes in the OS settings.
// Note: the arrow function shorthand works only in modern browsers,
// for older browsers define the function using the function keyword.
useDark.addListener((evt) => toggleDarkMode(evt.matches));
// Toggles the "dark-mode" class on click and sets localStorage state
button.addEventListener("click", () => {
	darkModeState = !darkModeState;
	toggleDarkMode(darkModeState);
	setDarkModeLocalStorage(darkModeState);
});
