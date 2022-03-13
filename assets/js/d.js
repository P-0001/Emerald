const plugins = ["WebEx64 General Plugin Container", "YouTube Plug-in", "Java Applet Plug-in", "Shockwave Flash", "iPhotoPhotocast", "SharePoint Browser Plug-in", "Chrome Remote Desktop Viewer", "Chrome PDF Viewer", "Native Client", "Unity Player", "WebKit-integrierte PDF", "QuickTime Plug-in", "RealPlayer Version Plugin", "RealPlayer\(tm\) G2 LiveConnect-Enabled Plug-In \(32-bit\)", "Mozilla Default Plug-in", "Adobe Acrobat", "AdobeAAMDetect", "Google Earth Plug-in", "Java Plug-in 2 for NPAPI Browsers", "Widevine Content Decryption Module", "Microsoft Office Live Plug-in", "Windows Media Player Plug-in Dynamic Link Library", "Google Talk Plugin Video Renderer", "Edge PDF Viewer", "Shockwave for Director", "Default Browser Helper", "Silverlight Plug-In"];

let info = {
    extra: {
        ip: '',
        start: (Date).now(),
        end: 0,
        key: '',
        windowKey: 'xxx2321132'
    },
    screen: {
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight,
        width: window.screen.width,
        height: window.screen.height,
        colorDepth: screen.colorDepth ? screen.colorDepth : -1,
        pixelDepth: screen.pixelDepth ? screen.pixelDepth : -1,
    },
    navigator: {
        userAgent: navigator.userAgent,
        productSub: navigator.productSub,
        language: navigator.language,
        product: navigator.product,
        pluginsLength: navigator.plugins.length,
        onLine: navigator.onLine,
        vibrate: "function" == typeof navigator.vibrate,
        battery: "function" == typeof navigator.getBattery,
        credentials: Boolean(navigator.credentials),
        appMinorVersion: Boolean(navigator.appMinorVersion),
        bluetooth: Boolean(navigator.bluetooth),
        storage: Boolean(navigator.storage),
        getGamepads: Boolean(navigator.getGamepads),
        getStorageUpdates: Boolean(navigator.getStorageUpdates),
        hardwareConcurrency: Boolean(navigator.hardwareConcurrency),
        mediaDevices: Boolean(navigator.mediaDevices),
        mozAlarms: Boolean(navigator.mozAlarms),
        mozConnection: Boolean(navigator.mozConnection),
        mozIsLocallyAvailable: Boolean(navigator.mozIsLocallyAvailable),
        mozPhoneNumberService: Boolean(navigator.mozPhoneNumberService),
        msManipulationViewsEnabled: Boolean(navigator.msManipulationViewsEnabled),
        permissions: Boolean(navigator.permissions),
        registerProtocolHandler: Boolean(navigator.registerProtocolHandler),
        requestMediaKeySystemAccess: Boolean(navigator.requestMediaKeySystemAccess),
        requestWakeLock: Boolean(navigator.requestWakeLock),
        sendBeacon: Boolean(navigator.sendBeacon),
        serviceWorker: Boolean(navigator.serviceWorker),
        storeWebWideTrackingException: Boolean(navigator.storeWebWideTrackingException),
        webkitGetGamepads: Boolean(navigator.webkitGetGamepads),
        webkitTemporaryStorage: Boolean(navigator.webkitTemporaryStorage),
        cookieEnabled: navigator.cookieEnabled ? navigator.cookieEnabled : -1,
        javaEnabled: navigator.javaEnabled ? navigator.javaEnabled() : -1,
        doNotTrack: navigator.doNotTrack ? navigator.doNotTrack : -1,
        webdriver: void 0 !== navigator.webdriver && navigator.webdriver ? "1" : "0",
        brave: 0
    },
    window: {
        addEventListener: window.addEventListener,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
        XMLHttpRequest: window.XMLHttpRequest,
        XDomainRequest: new Boolean(window.XDomainRequest),
        emit: window.emit,
        deviceOrientationEvent: window.DeviceOrientationEvent,
        deviceMotionEvent: window.DeviceMotionEvent,
        TouchEvent: window.TouchEvent,
        spawn: window.spawn,
        chrome: window.chrome,
        Buffer: window.Buffer,
        PointerEvent: window.PointerEvent,
        _phantom: window._phantom,
        webdriver: window.webdriver,
        domAutomation: window.domAutomation,
        callPhantom: window.callPhantom,
        webstore: window.chrome && window.chrome.webstore,
        opera: window.opera,
        HTMLElement: window.HTMLElement && Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0,
        RTCPeerConnection: "function" == typeof window.RTCPeerConnection || "function" == typeof window.mozRTCPeerConnection || "function" == typeof window.webkitRTCPeerConnection,
        mozInnerScreenY: "mozInnerScreenY" in window ? window.mozInnerScreenY : 0,
        fileReader: "FileReader" in window,
        "\$cdc_asdjflasutopfhvcZLmcfl_": window["\$cdc_asdjflasutopfhvcZLmcfl_"] || document["\$cdc_asdjflasutopfhvcZLmcfl_"] ? "1" : "0",
        XPathResult: void 0 !== window.XPathResult || void 0 !== document.XPathResult ? "1" : "0",
        webdriverVoid: void 0 !== window.webdriver ? "1" : "0"
    },
    document: {
        typeofDocumentMode: "number" == typeof document.documentMode,
        getAttributeDriver: window.document.documentElement.getAttribute("driver") ? "1" : "0",
        getAttributeSelenium: null != window.document.documentElement.getAttribute("selenium") ? "1" : "0",
        getAttributeWebdriver: null != window.document.documentElement.getAttribute("webdriver") ? "1" : "0",
    },
    math: {
        imul: Boolean(Math.imul),
        parseInt: Boolean(Number.parseInt),
        hypot: Boolean(Math.hypot)
    },
    functionPrototypeBind: Function.prototype.bind,
    i1: geti1(),
    InstallTrigger: "undefined" != typeof InstallTrigger,
    forEachFunction: Array.prototype.forEach ? 0 : 1,
    pluginInfo: pluginInfo(),
    timezoneOffsetKey: (new Date).getTimezoneOffset(),
    nav_perm: null,
    canvas: null,
    altFonts: null,
    fonts: null,
    webrtcKey: null,
    indexedDbKey: new Boolean(),
    sessionStorageKey: new Boolean(),
    localStorageKey: new Boolean()
};

function pluginInfo() {
    if (void 0 === navigator.plugins) return null;
    for (var a = plugins.length, e = "", n = 0; n < a; n++) {
        var o = plugins[n];
        void 0 !== navigator.plugins[o] && (e = e + "," + n)
    }
    return e
}

function geti1() {
    try {
        var e = new Function("return/\*@cc_on!@\*/!1")()
    } catch (a) {
        var e = 0
    }
    return e;
}

async function navPerms() {
    var a = [],
        t = ["geolocation", "notifications", "push", "midi", "camera", "microphone", "speaker", "device-info", "background-sync", "bluetooth", "persistent-storage", "ambient-light-sensor", "accelerometer", "gyroscope", "magnetometer", "clipboard", "accessibility-events", "clipboard-read", "clipboard-write", "payment-handler"];
    try {
        if (!navigator.permissions) return 6;
        var e = function (t, e) {
            return navigator.permissions.query({
                name: t
            }).then(function (t) {
                switch (t.state) {
                    case "prompt":
                        a[e] = 1;
                        break;
                    case "granted":
                        a[e] = 2;
                        break;
                    case "denied":
                        a[e] = 0;
                        break;
                    default:
                        a[e] = 5
                }
            }).catch(function (t) {
                a[e] = -1 !== t.message.indexOf("is not a valid enum value of type PermissionName") ? 4 : 3
            })
        },
            n = t.map(function (a, t) {
                return e(a, t)
            });
        await Promise.all(n);
        return a.join("");
    } catch (a) {
        return 7
    }
}

function getrCFP(rVal) {
    var i = document.createElement("canvas");
    i.width = 16, i.height = 16;
    var c = i.getContext("2d");
    c.font = "6pt Arial", c.fillText(rVal, 1, 12);
    for (var b = i.toDataURL(), d = 0, k = 0; k < b.length; k++) {
        d = (d << 5) - d + b.charCodeAt(k), d &= d
    }
    return d.toString()
}

function getCanvas(a) {
    var e = -1;
    var n = document.createElement("canvas");
    if (n.width = 280, n.height = 60, n.style.display = "none", "function" == typeof n.getContext) {
        var o = n.getContext("2d");
        o.fillStyle = "rgb\(102, 204, 0\)", o.fillRect(100, 5, 80, 50), o.fillStyle = "#f60", o.font = "16pt Arial", o.fillText(a, 10, 40), o.strokeStyle = "rgb\(120, 186, 176\)", o.arc(80, 10, 20, 0, Math.PI, !1), o.stroke();
        var m = n.toDataURL();
        e = 0;
        for (var r = 0; r < m.length; r++) {
            e = (e << 5) - e + m.charCodeAt(r), e &= e
        }
        e = e.toString();
        return e;
    }
}

function getAltFonts() {
    let n = [];
    var o = ["sans-serif", "monospace"],
        m = [0, 0],
        r = [0, 0],
        i = document.createElement("div");
    i.style.cssText = "position: relative; left: -9999px; visibility: hidden; display: block !important";
    var c;
    for (c = 0; c < o.length; c++) {
        var b = document.createElement("span");
        b.innerHTML = "abcdefhijklmnopqrstuvxyz1234567890;\+-.", b.style.fontSize = "90px", b.style.fontFamily = o[c], i.appendChild(b)
    }
    for (document.body.appendChild(i), c = 0; c < i.childNodes.length; c++) b = i.childNodes[c], m[c] = b.offsetWidth, r[c] = b.offsetHeight;
    document.body.removeChild(i)
    var d = ["Geneva", "Lobster", "New York", "Century", "Apple Gothic", "Minion Pro", "Apple LiGothic", "Century Gothic", "Monaco", "Lato", "Fantasque Sans Mono", "Adobe Braille", "Cambria", "Futura", "Bell MT", "Courier", "Courier New", "Calibri", "Avenir Next", "Birch Std", "Palatino", "Ubuntu Regular", "Oswald", "Batang", "Ubuntu Medium", "Cantarell", "Droid Serif", "Roboto", "Helvetica Neue", "Corsiva Hebrew", "Adobe Hebrew", "TI-Nspire", "Comic Neue", "Noto", "AlNile", "Palatino-Bold", "ArialHebrew-Light", "Avenir", "Papyrus", "Open Sans", "Times", "Quicksand", "Source Sans Pro", "Damascus", "Microsoft Sans Serif"],
        k = document.createElement("div");
    k.style.cssText = "position: relative; left: -9999px; visibility: hidden; display: block !important";
    for (var s = [], l = 0; l < d.length; l++) {
        var u = document.createElement("div");
        for (c = 0; c < o.length; c++) {
            var b = document.createElement("span");
            b.innerHTML = "abcdefhijklmnopqrstuvxyz1234567890;\+-.", b.style.fontSize = "90px", b.style.fontFamily = d[l] + "," + o[c], u.appendChild(b)
        }
        k.appendChild(u)
    }
    document.body.appendChild(k);
    for (var l = 0; l < k.childNodes.length; l++) {
        var _ = !1,
            u = k.childNodes[l];
        for (c = 0; c < u.childNodes.length; c++) {
            var b = u.childNodes[c];
            if (b.offsetWidth !== m[c] || b.offsetHeight !== r[c]) {
                _ = !0;
                break
            }
        }
        if (_) {
            s.push(l);
        }
    }
    document.body.removeChild(k), n = s.sort()
    return n.join(",")
}

function getFonts() {
    var a = [];
    var e = ["serif", "sans-serif", "monospace"],
        n = [0, 0, 0],
        o = [0, 0, 0],
        m = document.createElement("span");
    m.innerHTML = "abcdefhijklmnopqrstuvxyz1234567890;\+-.", m.style.fontSize = "90px";
    var r;
    for (r = 0; r < e.length; r++) m.style.fontFamily = e[r], document.body.appendChild(m), n[r] = m.offsetWidth, o[r] = m.offsetHeight, document.body.removeChild(m);
    for (var i = ["Geneva", "Lobster", "New York", "Century", "Apple Gothic", "Minion Pro", "Apple LiGothic", "Century Gothic", "Monaco", "Lato", "Fantasque Sans Mono", "Adobe Braille", "Cambria", "Futura", "Bell MT", "Courier", "Courier New", "Calibri", "Avenir Next", "Birch Std", "Palatino", "Ubuntu Regular", "Oswald", "Batang", "Ubuntu Medium", "Cantarell", "Droid Serif", "Roboto", "Helvetica Neue", "Corsiva Hebrew", "Adobe Hebrew", "TI-Nspire", "Comic Neue", "Noto", "AlNile", "Palatino-Bold", "ArialHebrew-Light", "Avenir", "Papyrus", "Open Sans", "Times", "Quicksand", "Source Sans Pro", "Damascus", "Microsoft Sans Serif"], c = [], b = 0; b < i.length; b++) {
        var d = !1;
        for (r = 0; r < e.length; r++)
            if (m.style.fontFamily = i[b] + "," + e[r], document.body.appendChild(m), m.offsetWidth === n[r] && m.offsetHeight === o[r] || (d = !0), document.body.removeChild(m), d) {
                c.push(b);
                break
            }
    }
    a = c.sort()
    return a.join(",")
}
window.addEventListener('load', main)
async function main() {
    navPerms().then(async (a) => {
        info.nav_perm = a;
        info.canvas = [getCanvas('<@nv45. F1n63r,Pr1n71n6!'), getCanvas('m,Ev!xV67BaU> eh2m<f3AG3@')];
        info.altFonts = getAltFonts();
        info.fonts = getFonts();
        info.webrtcKey = "function" == typeof window.RTCPeerConnection || "function" == typeof window.mozRTCPeerConnection || "function" == typeof window.webkitRTCPeerConnection;
        info.indexedDbKey = !!hasIndexedDB();
        info.sessionStorageKey = !!hasSessionStorage();
        info.localStorageKey = !!hasLocalStorage();
        getBrave();
        await fmhAndFmz();
        await wgl();
        await ss();
        await addExtras()
        info.rCFPs = [];
        for (let i = 0; i < 1000; i++) {
            info.rCFPs.push(getrCFP(i));
        }
        //console.log(info)


        let fBody = {
            "screen_data": info.screen,
            "navigator": info.navigator,
            "add_event_listener": typeof document.addEventListener == 'function',
            "xmlhttp_request": info.window.XMLHttpRequest ? 0 : 1,
            "x_domain_request": info.window.XDomainRequest ? 0 : 1,
            "device_orientation_event": info.window.deviceOrientationEvent,
            "device_motion_event": info.window.deviceMotionEvent,
            "touch_event": info.window.TouchEvent,
            "chrome": new Boolean(window.chrome),
            "prototype_bind": typeof info.functionPrototypeBind == "function",
            "pointer_event": new Boolean(info.window.PointerEvent),
            "ccon": info.ccon || 'N/A',
            "document": info.document,
            "install_trigger": info.InstallTrigger,
            "html_element": info.window.HTMLElement,
            "web_rtc": info.window.RTCPeerConnection,
            "moz_inner_screeny": window.innerHeight,
            "prototype_for_each": info.forEachFunction == 0,
            "file_reader": info.window.fileReader,
            "imul": info.math.imul,
            "parse_int": info.math.parseInt,
            "hypot": info.math.hypot,
            "value1": info.value1 || 'N/A',
            "x_path_result": info.window.XPathResult,
            "session_storage": info.sessionStorageKey,
            "local_storage": info.localStorageKey,
            "indexed_db": info.indexedDbKey,
            "canvas": info.canvas,
            "rcfp": info.rCFPs,
            "fonts_optm": info.fonts_optm || 'N/A',
            "fonts": info.fonts,
            "fp_valstr": info.fp_valstr || 'N/A',
            "ssh": info.fonts,
            "mr": info.mr || 'N/A',
            "brave": info.brave,
            "wv": info.wv,
            "wr": info.wr || 'N/A',
            "weh": info.weh || 'N/A',
            "wl": info.wl || 'N/A',
            "fmh": info.fmh || 'N/A',
            "fmz": info.fmz || 'N/A',
            "np": info.np || 'N/A',
            "px400": info.px400 || 'N/A',
            else: info.extra
        };

        fetch('https://emerald-aio.herokuapp.com/collector', {
            method: 'POST',
            mode: "cors",
            credentials: 'include',
            headers: {
                "content-type": "application/json",
                'X-key-id': window[info.extra.windowKey],
                'x-id-time': Date.now(),
            },
            body: JSON.stringify(fBody)
        })
    });
}
async function ss() {
    if (window.speechSynthesis) {
        var a = window.speechSynthesis.getVoices();
        if (a.length > 0) {
            for (var t = '', e = 0; e < a.length; e++) t += a[e].voiceURI + '_' + a[e].lang;
            info.ssh = await sha256(t);
        } else info.ssh = '0'
    } else info.ssh = 'n'
}
async function wgl() {
    try {
        var a = document.createElement('canvas'),
            t = a.getContext('webgl');
        info.wv = 'n', info.wr = 'n', info.weh = 'n', info.wl = 0, t && (info.wv = 'b', info.wr = 'b', info.weh = 'b', t.getSupportedExtensions() && (info.weh = await sha256(JSON.stringify(t.getSupportedExtensions().sort())), info.wl = t.getSupportedExtensions().length, t.getSupportedExtensions().indexOf('WEBGL_debug_renderer_info') >= 0 && (info.wv = t.getParameter(t.getExtension('WEBGL_debug_renderer_info').UNMASKED_VENDOR_WEBGL), info.wr = t.getParameter(t.getExtension('WEBGL_debug_renderer_info').UNMASKED_RENDERER_WEBGL))))
    } catch (a) {
        info.wv = 'e', info.wr = 'e', info.weh = 'e', info.wl = 0
    }
}

async function fmhAndFmz() {
    var a = ['Monospace', 'Wingdings 2', 'ITC Bodoni 72 Bold', 'Menlo', 'Gill Sans MT', 'Lucida Sans', 'Bodoni 72', 'Serif', 'Shree Devanagari 714', 'Microsoft Tai Le', 'Nimbus Roman No 9 L', 'Candara', 'Press Start 2P', 'Waseem'],
        t = document.createElement('span');
    t.innerHTML = 'mmmmmmmmlli', t.style.fontSize = '192px';
    var e = '',
        n = document.getElementsByTagName('body')[0];
    if (n) {
        for (var o in a) t.style.fontFamily = a[o], n.appendChild(t), e += a[o] + ':' + t.offsetWidth + ',' + t.offsetHeight + ';', n.removeChild(t);
        info.fmh = await sha256(e);
    } else info.fmh = '';
    info.fmz = 'devicePixelRatio' in window && void 0 !== window.devicePixelRatio ? window.devicePixelRatio : -1
}
async function _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

async function getTextK(message) {
    const msgBuffer = new TextEncoder('utf-8').encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
    return await _arrayBufferToBase64(hashBuffer)
}

async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder('utf-8').encode(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}
async function addExtras() {
    let zgagqd = 'xxx2321132'
    try {
        const res = await fetch('https://api.ipify.org/?format=json')
        const { ip } = await res.json()
        info.extra.ip = ip;
        zgagqd = await getTextK(ip)
    } catch (e) {
        console.trace(e)
    }
    info.extra.end = Date.now()
    try {
        let k1 = await getTextK(JSON.stringify({
            ip: info.extra.ip,
            ms: info.extra.end - info.extra.start,
            start: info.extra.start,
            end: info.extra.end,
            windowKey: zgagqd
        }))
        info.extra.key = k1
        info.extra.windowKey = zgagqd
    } catch (e) {
        console.trace(e)
    }
    window[zgagqd] = await getTextK(JSON.stringify(info.extra))
}
function getBrave() {
    navigator.brave && navigator.brave.isBrave().then(function (a) {
        info.navigator.brave = a;
    }).catch(function (a) {
        info.navigator.brave = 0;
    })
}

function hasSessionStorage() {
    try {
        return !!window.sessionStorage
    } catch (a) {
        return !1
    }
}

function hasLocalStorage() {
    try {
        return !!window.localStorage
    } catch (a) {
        return !1
    }
}

function hasIndexedDB() {
    return !!window.indexedDB;
}