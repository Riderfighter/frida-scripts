'use strict';

const dumpGAuth = () => {
    console.log('[*] Dumping Google Authenticator');
    let classObject = ObjC.classes["TOTPAuthURL"];
    let impl = classObject["- initWithName:secret:issuer:algorithm:digits:query:"].implementation;
    Interceptor.attach(impl, {
        onEnter: (a) => {
            this.secret = new ObjC.Object(a[2 + 1]);
            this.b32secret = ObjC.classes["OTPAuthURL"]["+ encodeBase32:"](this.secret);
        },

        onLeave: (r) => {
            let newobj = new ObjC.Object(r);
            console.log(newobj["- url"]() + "&secret=" + this.b32secret);
        }
    });
};

if (ObjC.available) {
    dumpGAuth();
}