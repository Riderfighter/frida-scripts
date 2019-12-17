const hex_to_b32 = (hex) => {
	let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
	let bytes = [];

	for (let i = 0; i < hex.length; i += 2) {
		bytes.push(parseInt(hex.substr(i, 2), 16));
	}

	let bits = 0;
	let value = 0;
	let output = '';

	for (let i = 0; i < bytes.length; i++) {
		value = (value << 8) | bytes[i];
		bits += 8;

		while (bits >= 5) {
			output += alphabet[(value >>> (bits - 5)) & 31];
			bits -= 5;
		}
	}

	if (bits > 0) {
		output += alphabet[(value << (5 - bits)) & 31];
	}
	return output;
}

if (ObjC.available) {
	let authyToken = ObjC.chooseSync(ObjC.classes["Token"]);
	for (let i = 0; i < authyToken.length; i++) {
		let token = authyToken[i];
		if (token.$className === "AuthyToken") {
			send(`otpauth://totp/${token["- name"]()}:${token["- name"]()}?secret=${hex_to_b32(token["- tokenData"]()["- cachedSecretKey"]().toString())}&issuer=${token["- name"]()}&digits=7`);
		}
		if (token.$className === "GoogleAuthToken") {
			send(`otpauth://totp/${token["- accountName"]()}:${token["- originalName"]()}?secret=${token["- cachedSecretKey"]()}&issuer=${token["- originalIssuer"]()}&digits=${token["- digits"]()}`)
		}
	}
}
