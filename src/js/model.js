export const state = {
	items: [],
	edit: null,
	checked: false,
	sorted: false,
};

export class TODO {
	checked = false;
	constructor(title, description, weekday, time, priority) {
		this.title = title;
		this.weekday = weekday;
		this.time = time;
		this.priority = priority;
		this.description = description;
	}
}
export const toggleCheckAll = function () {
	state.checked = !state.checked;

	state.items.map((item) => (item.checked = state.checked));

	updateDB();
};

export const toggleCheck = function (id) {
	const item = state.items.find((item) => item.title === id);
	item.checked = !item.checked;
	updateDB();
};

export const getCheckedItems = function () {
	return state.items.filter((item) => item.checked);
};

export const createTODO = function (item) {
	const objItem = Object.fromEntries(item);
	objItem.__proto__ = TODO.prototype;
	return objItem;
};

export const editItem = function (
	item,
	{ title, weekday, time, priority, description }
) {
	item.title = title.toLowerCase();
	item.weekday = weekday.toLowerCase();
	item.time = time.toLowerCase();
	item.priority = priority.toLowerCase();
	item.description = description;
};

export const appendItem = function (item) {
	state.items.push(item);
	updateDB();
};

export const removeItem = function (id) {
	const index = state.items.findIndex((item) => item.title === id);
	if (index == -1) return;

	state.items.splice(index, 1);
	updateDB();
};

export const timeout = function (sec) {
	return new Promise(function (resolve) {
		setTimeout(() => {
			resolve();
		}, sec * 1000);
	});
};

export const searchItem = function (query) {
	return state.items.filter((item) => {
		if (
			item.title.toLowerCase().includes(query.toLowerCase()) ||
			item.description.toLowerCase().includes(query.toLowerCase())
		) {
			return item;
		}
	});
};

const updateDB = function () {
	localStorage.setItem("items", JSON.stringify(state.items));
};

const getDB = function () {
	const data = JSON.parse(localStorage.getItem("items"));
	data?.map((item) => {
		item.__proto__ = TODO.prototype;
		return item;
	});
	return data;
};

export const sortItems = function () {
	return [...state.items]
		.sort((itemA, itemB) => itemA.priority - itemB.priority)
		.sort((itemA, itemB) => +itemB.checked - itemA.checked);
};

const formatTime = function (time) {
	return Intl.DateTimeFormat("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		weekday: "short",
	})
		.format(time)
		.split(" ");
};

const createDefaultItem = function () {
	const date = formatTime(new Date());
	return new TODO(
		"Welcome to your to-do list",
		"this is a default item, you can delete it and start your journey , you can delete it and start your journey",
		date[0],
		date[1],
		0
	);
};

const clearData = function () {
	localStorage.removeItem("items");
	state.items = [];
};

const init = function () {
	// clearData();
	state.items = (getDB()?.length && getDB()) || [createDefaultItem()];
	state.items.find((item) => !item.checked)
		? (state.checked = false)
		: (state.checked = true);
};

init();
