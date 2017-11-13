export default (Input) => {
	const Version = `v${Input[2]}`
	const Commit = Input[4].replace('�','')
	const date = new Date();
	const Time = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
	const newChangelog = `|${Time}|${Version}|${Commit}|`
	return newChangelog
}
