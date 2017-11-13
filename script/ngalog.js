import fs from 'fs-extra';
import _ from 'lodash';
import handleInput from './handleInput';

export default () => {
	const Input      = process.argv.splice(2);
	let newChangelog = handleInput(Input);
	newChangelog     = _.compact(newChangelog.split('|'));
	let ngaChangelog = '[tr]';
	newChangelog.forEach(item => ngaChangelog += `[td]${item}[/td]`);
	ngaChangelog += '[/tr]';
	console.log('');
	console.log(ngaChangelog);
	console.log('');
}