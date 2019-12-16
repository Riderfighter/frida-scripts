const dumpSTEAM = () => {
    console.log('[*] Dumping Steam Guard');
    let classObject = ObjC.classes["SteamguardState"];
    let impl = classObject["- initWithDictionary:"].implementation;
    Interceptor.attach(impl, {
        onEnter: (a) => {
            console.log(new ObjC.Object(a[2])["- objectForKey:"]("shared_secret"));
        }
    })
};

if (ObjC.available) {
    dumpSTEAM()
}
