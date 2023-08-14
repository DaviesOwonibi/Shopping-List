import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
	getDatabase,
	ref,
	push,
	onValue,
	remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
	databaseURL:
		"https://confident-key-380512-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsInDB = ref(database, "shoppingList");

const input = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const shoppingList = document.getElementById("shopping-list");

onValue(itemsInDB, function (snapshot) {
	if (snapshot.exists()) {
		let itemsArray = Object.entries(snapshot.val());

		shoppingList.innerHTML = "";

		for (let i = 0; i < itemsArray.length; i++) {
			const currentItem = itemsArray[i];
			let currentItemId = currentItem[0];
			let currentItemValue = currentItem[1];

			add2List(shoppingList, currentItem);
		}
	} else {
		shoppingList.innerHTML = "No items yet..."
	}
});

addButton.addEventListener("click", function (event) {
	let inputValue = input.value;
	push(itemsInDB, inputValue);
	clear(input);
});

function clear(element) {
	element.value = "";
}

function add2List(element, item) {
	let itemId = item[0];
	let itemValue = item[1];
	let newElement = document.createElement("li");
	let childElement = document.createElement("p");

	childElement.textContent = itemValue; // Set the text content for the <p> element
	newElement.appendChild(childElement); // Append the <p> element as a child of the <li> element

	newElement.addEventListener("click", function () {
		let exactLoc = ref(database, `shoppingList/${itemId}`);
		remove(exactLoc);
	});

	shoppingList.appendChild(newElement);
}

