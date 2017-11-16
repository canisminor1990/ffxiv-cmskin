import fs from 'fs-extra';
import cn from '../src/lang/cn';
import en from '../src/lang/en';

const exec        = require('child_process').exec;
const cnChangelog = cn.changelog[0];
const enChangelog = en.changelog[0];

export default () => {

	console.log(enChangelog.split('|')[3]);

	let cnReadme = fs.readFileSync('./README.md', 'utf-8');
	let enReadme = fs.readFileSync('./en_README.md', 'utf-8');

	cnReadme = cnReadme.split('## 更新说明');
	enReadme = enReadme.split('## Changelog');

	let newCnReadme = cnReadme[1].split('|---|---|---|')[1];
	let newEnReadme = enReadme[1].split('|---|---|---|')[1];

	newCnReadme = `
${cnReadme[0]}
## 更新说明

|日期|版本|改动|
|---|---|---|
${cnChangelog + newCnReadme}
`;

	newEnReadme = `
${enReadme[0]}
## Changelog

|Date|Version|Changelog|
|---|---|---|
${enChangelog + newEnReadme}
`;

	fs.writeFileSync('./README.md', newCnReadme);
	fs.writeFileSync('./en_README.md', newEnReadme);

	const commands = [
		'git add -A',
		`git commit -m "${enChangelog.split('|')[3]}"`
	].join(' ; ')

	exec(commands, (err, out) => {
		console.log(err);
		console.log(out);
	});
}