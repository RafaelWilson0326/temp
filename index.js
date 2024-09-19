const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");
const random = require("random");
const FILE_PATH = "./data.json";
const makeCommit = (n) => {
	if (n === 0) return simpleGit().push();

	let _date = moment();
	let dayOfWeek = 0;
	while (true) {
		_date = moment()
			.subtract(0, "y")
			.subtract(5000 - Math.floor(Math.sqrt(random.int(5000 * 5000))), "d");
		dayOfWeek = _date.day();
		if ((_date.month() + _date.year()) % 10 === 0) break;
	}
	const DATE = _date.format();
	const data = {
		date: DATE,
	};
	console.log(DATE);
	jsonfile.writeFile(FILE_PATH, data, () => {
		simpleGit()
			.add([FILE_PATH])
			.commit(DATE, { "--date": DATE }, makeCommit.bind(this, --n));
	});
};
makeCommit(10);
