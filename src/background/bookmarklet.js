function relative_mark_101(datab) {
	const data = JSON.parse(atob(datab));

	const newUrl = new URL(window.location.origin);
	newUrl.pathname = build_path(data);
	newUrl.hash = !!data.hash ? data.hash : window.location.hash;
	newUrl.search = build_query(data);

	window.location.assign(newUrl.toString());
}

function build_path({ path }) {
	if (!path) return window.location.pathname;

	const regex = /^(\/[^/]+\/)/;
	const match = window.location.pathname.match(regex);
	if (match) {
		return match[0] + path;
	}
	return window.location.pathname + (window.location.pathname.endsWith("/") ? "" : "/") + path;
}

function build_query({ query, query_mix, query_override }) {
	if (!query) return window.location.search;

	if (!query_mix) return query;

	const newQ = Object.fromEntries(new URLSearchParams(query).entries());
	const oldQ = Object.fromEntries(new URLSearchParams(window.location.search).entries());
	let resultQ;
	if (query_override) {
		resultQ = { ...oldQ, ...newQ };
	} else {
		resultQ = { ...newQ, ...oldQ };
	}
	return new URLSearchParams(resultQ).toString();
}
