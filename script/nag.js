import _ from 'lodash';

export default () => {
	const Input      = process.argv.splice(2);
	const newChangelog     = _.compact(Input[2].split('|'));
	let ngaChangelog = '[tr]';
	newChangelog.forEach(item => ngaChangelog += `[td]${item}[/td]`);
	ngaChangelog += '[/tr]';
	console.log('');
	console.log(ngaChangelog);
	console.log('');
}