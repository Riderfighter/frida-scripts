'use strict';

const dumpMAuth = () => {
    console.log('[*] Dumping Microsoft Authenticator');
    let classObject = ObjC.classes["UserAccount"];
    let impl = classObject["- initWithManagedObject:"].implementation;
    let alreadygotten = [];

    Interceptor.attach(impl, {
        onLeave: (r) => {
            let newobj = new ObjC.Object(r);
            let secretKey = newobj["- secretKey"]();
            let accountName = newobj["- accountName"]();
            let username = newobj["- username"]();
            let type = newobj["- accountType"]();
            let email;
            switch (type) {
                case 8:
                    email = "otpauth://totp/" + accountName + ":" + username + "?secret=" + secretKey + "&issuer=" + accountName + "&digits=8";
                    break;
                case 2:
                    email = "otpauth://totp/" + accountName + ":" + username + "?secret=" + secretKey + "&issuer=" + accountName + "&digits=6";
                    break;
            }
            if (alreadygotten.indexOf(email) === -1) {
                alreadygotten.push(email);
                console.log(email);
            }
        }
    });
};

if (ObjC.available) {
    dumpMAuth();
}