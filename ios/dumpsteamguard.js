const dumpSTEAM = () => {
    console.log('[*] Dumping Steam Guard : Enter Steam Guard Portion of App');
    let classObject = ObjC.classes["TwoFactorToken"];
    let impl = classObject["- initWithSteamguardInfo:"].implementation
    Interceptor.attach(impl, {
        onEnter: (a) => {
            console.log(new ObjC.Object(a[2])["- objectForKey:"]("shared_secret"));
        }
    })
};

if (ObjC.available) {
    dumpSTEAM()
}
