import _ from 'lodash';
import { fakeData } from '../data';

let time = 0;

export default () => {

	setTimeout(function () {
		var event = new CustomEvent('onOverlayDataUpdate', {detail: fakeData});
		document.dispatchEvent(event);
	}, 500);

	setInterval(() => {
		const myDate   = new Date();
		const duration = myDate.getMinutes() + ':' + myDate.getSeconds();

		let allEncdps = 0, allEnchps = 0;

		const {Combatant, Encounter} = fakeData;

		_.forEach(Combatant, item => {
			item.encdps       = parseInt(item.encdps);
			item.enchps       = parseInt(item.enchps);
			item.damagetaken  = parseInt(item.damagetaken);
			const encdps      = parseInt(item.encdps + item.encdps * (Math.random() - 0.5) * 0.1).toFixed(2);
			const enchps      = parseInt(item.enchps + item.enchps * (Math.random() - 0.5) * 0.1).toFixed(2);
			const damagetaken = parseInt(item.damagetaken + item.damagetaken * Math.random() * 0.01).toFixed(2);

			item.encdps      = encdps;
			item.enchps      = enchps;
			item.damagetaken = damagetaken;
			allEncdps        = allEncdps + encdps;
			allEnchps        = allEnchps + enchps;
		});

		Encounter.duration = duration;
		Encounter.DURATION = (parseInt(Encounter.DURATION) + 1).toString();
		Encounter.encdps   = parseInt(allEncdps);
		Encounter.enchps   = parseInt(allEnchps);
		if (time == 10) {
			Encounter.title = '测试';
			time            = 0;
		} else {
			Encounter.title = 'Encounter';
		}

		const event = new CustomEvent('onOverlayDataUpdate', {detail: fakeData});
		document.dispatchEvent(event);
		time++;
	}, 1000);
}