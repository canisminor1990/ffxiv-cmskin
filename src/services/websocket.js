const QueryString = (function () {
	// This function is anonymous, is executed immediately and
	// the return value is assigned to QueryString!
	const query_string = {};
	const query        = window.location.search.substring(1);
	const vars         = query.split('&');
	for (let i = 0; i < vars.length; i++) {
		const pair = vars[i].split('=');
		// If first entry with this name
		if (typeof query_string[pair[0]] === 'undefined') {
			query_string[pair[0]] = decodeURIComponent(pair[1]);
			// If second entry with this name
		} else if (typeof query_string[pair[0]] === 'string') {
			const arr             = [query_string[pair[0]], decodeURIComponent(pair[1])];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
		} else {
			query_string[pair[0]].push(decodeURIComponent(pair[1]));
		}
	}
	return query_string;
})();

// webs
let host_port             = QueryString['HOST_PORT'];
let need_to_get_host_port = false;
let need_to_set_wsuri     = typeof wsUri === 'undefined';

if (need_to_set_wsuri) {
	window.wsUri          = 'ws://@HOST_PORT@/MiniParse';
	need_to_get_host_port = typeof host_port === 'undefined';
} else {
	need_to_get_host_port =
		typeof host_port === 'undefined' ? wsUri.indexOf('HOST_PORT') === -1 : true;
}

if (need_to_get_host_port) {
	// ws://localhost:10501/
	host_port =
		window.location.host != '' ? 'ws://' + window.location.host + '/' : 'ws://localhost:10501/';
}

// wsUri check
if (wsUri.indexOf('@HOST_PORT') !== -1) {
	while (host_port.endsWith('/')) {
		host_port = host_port.substring(0, host_port.length - 1);
	}

	if (wsUri.indexOf('//') == 0) wsUri = wsUri.substring(2);

	if (wsUri.indexOf('ws://') == 0 || wsUri.indexOf('wss://') == 0) {
		wsUri =
			host_port.indexOf('ws://') == 0 || host_port.indexOf('wss://')
				? wsUri
				.replace(/ws:\/\/@HOST_PORT@/im, host_port)
				.replace(/wss:\/\/@HOST_PORT@/im, host_port)
				: wsUri.replace(/@HOST_PORT@/im, host_port);
	} else {
		wsUri =
			host_port.indexOf('ws://') == 0 || host_port.indexOf('wss://') == 0
				? wsUri.replace(/@HOST_PORT@/im, host_port)
				: 'ws://' + wsUri.replace(/@HOST_PORT@/im, host_port);
	}
}

class wsInterface {
	constructor(uri, path = 'MiniParse') {
		// url check
		const querySet = this.getQuerySet();
		if (typeof querySet['HOST_PORT'] !== 'undefined') uri = querySet['HOST_PORT'] + path;
		this.uri      = uri;
		this.id       = null;
		this.activate = false;

		const This = this;
		document.addEventListener('onBroadcastMessage', evt => This.onBroadcastMessage(evt));
		document.addEventListener('onRecvMessage', evt => This.onRecvMessage(evt));
		window.addEventListener('message', e => {
			if (e.data.type === 'onBroadcastMessage') This.onBroadcastMessage(e.data);
			if (e.data.type === 'onRecvMessage') This.onRecvMessage(e.data);
		});
	}

	connect() {
		if (typeof this.websocket !== 'undefined' && this.websocket != null) this.close();
		this.activate            = true;
		const This               = this;
		this.websocket           = new WebSocket(this.uri);
		this.websocket.onopen    = evt => This.onopen(evt);
		this.websocket.onmessage = evt => This.onmessage(evt);
		this.websocket.onclose   = evt => This.onclose(evt);
		this.websocket.onerror   = evt => This.onerror(evt);
	}

	close() {
		this.activate = false;
		if (this.websocket != null && typeof this.websocket !== 'undefined') this.websocket.close();
	}

	onopen(evt) {
		// get id from useragent
		if (this.id != null && typeof this.id !== 'undefined') {
			this.set_id(this.id);
		} else {
			if (typeof overlayWindowId !== 'undefined') {
				this.set_id(overlayWindowId);
			} else {
				const r  = new RegExp(
					'[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}'
				);
				const id = r.exec(navigator.userAgent);
				if (id != null && id.length == 1) this.set_id(id[0]);
			}
		}
	}

	onclose(evt) {
		this.websocket = null;
		if (this.activate) {
			const This = this;
			setTimeout(() => This.connect(), 5000);
		}
	}

	onmessage(evt) {
		if (evt.data == '.') {
			// ping pong
			this.websocket.send('.');
		} else {
			try {
				const obj = JSON.parse(evt.data);
				let type  = obj['type'];
				if (type == 'broadcast') {
					let from = obj['from'];
					let type = obj['msgtype'];
					let msg  = obj['msg'];
					document.dispatchEvent(new CustomEvent('onBroadcastMessage', {detail: obj}));
				}
				if (type == 'send') {
					let from = obj['from'];
					let type = obj['msgtype'];
					let msg  = obj['msg'];
					document.dispatchEvent(new CustomEvent('onRecvMessage', {detail: obj}));
				}
				if (type == 'set_id') {
					// document.dispatchEvent(new CustomEvent('onIdChanged', { detail: obj }));
				}
			} catch (e) {}
		}
	}

	onerror(evt) {
		this.websocket.close();
		console.log(evt);
	}

	getQuerySet() {
		const querySet = {};
		// get query
		const query    = window.location.search.substring(1);
		const vars     = query.split('&');
		for (let i = 0; i < vars.length; i++) {
			try {
				const pair                             = vars[i].split('=');
				querieSet[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
			} catch (e) {}
		}
		return querySet;
	}

	broadcast(type, msg) {
		if (typeof overlayWindowId !== 'undefined' && this.id != overlayWindowId)
			this.set_id(overlayWindowId);
		const obj      = {};
		obj['type']    = 'broadcast';
		obj['msgtype'] = type;
		obj['msg']     = msg;
		this.websocket.send(JSON.stringify(obj));
	}

	send(to, type, msg) {
		if (typeof overlayWindowId !== 'undefined' && this.id != overlayWindowId)
			this.set_id(overlayWindowId);
		const obj      = {};
		obj['type']    = 'send';
		obj['to']      = to;
		obj['msgtype'] = type;
		obj['msg']     = msg;
		this.websocket.send(JSON.stringify(obj));
	}

	overlayAPI(type, msg) {
		const obj = {};
		if (typeof overlayWindowId !== 'undefined' && this.id != overlayWindowId)
			this.set_id(overlayWindowId);
		obj['type']    = 'overlayAPI';
		obj['to']      = overlayWindowId;
		obj['msgtype'] = type;
		obj['msg']     = msg;
		this.websocket.send(JSON.stringify(obj));
	}

	set_id(id) {
		const obj   = {};
		obj['type'] = 'set_id';
		obj['id']   = id;
		this.id     = overlayWindowId;
		this.websocket.send(JSON.stringify(obj));
	}

	onRecvMessage(e) {}

	onBroadcastMessage(e) {}
}

class wsImpl extends wsInterface {
	constructor(uri, path = 'MiniParse') {
		super(uri, path);
	}

	onRecvMessage(e) {}

	onBroadcastMessage(e) {
		if (e.detail.msgtype === 'CombatData')
			document.dispatchEvent(new CustomEvent('onOverlayDataUpdate', {detail: e.detail.msg}));
	}
}

export { wsImpl };
