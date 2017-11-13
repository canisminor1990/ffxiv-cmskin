import fs from 'fs-extra';
import handleInput from './handleInput';
export default () => {
	const Input = process.argv.splice(2);
	const newChangelog = handleInput(Input)

	let Readme = fs.readFileSync('./README.md', 'utf-8');
	Readme = Readme.split('## 更新说明')
	let Changelog = Readme[1].split('|---|---|---|')[1]
	Changelog = `
${Readme[0]}
## 更新说明

|日期|版本|改动|
|---|---|---|
${newChangelog + Changelog}
`
fs.writeFileSync('./README.md',Changelog)


	let Package = fs.readFileSync('./package.json', 'utf-8');
	Package = Package.split(`"changelog": [`)
	Package=`
${Package[0]}
	"changelog": [
"${newChangelog}",
${Package[1]}
	`

fs.writeFileSync('./package.json',Package)
}