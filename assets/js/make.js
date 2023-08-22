const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/i;
const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const appVersion = "1.0.6";
const USE_DEBUG = true;
const initSeconds = 5;

let nanoid = (t = 21) => crypto.getRandomValues(new Uint8Array(t)).reduce(((t, e) => t += (e &= 63) < 36 ? e.toString(36) : e < 62 ? (e - 26).toString(36).toUpperCase() : e > 62 ? "-" : "_"), "");
let modData = [{
    "mod": "",
    "name": "",
    "needsMail": false,
    "needsGmail": false,
    "active": false
}];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function msg(msg, type = "info") {
    return Toastify({
        text: msg,
        duration: 1500,
        className: type,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast()
}

async function poll(data) {
    let info = undefined;

    const body = JSON.stringify(data, null, 0)

    console.log(body)

    for (let i = 0; i < 4; i++) {

        const res = await request("make", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body,
        });

        if (res.done) {
            info = res
            msg("Account Created", "success")
            break;
        }

        await sleep(1000 * initSeconds)
    }

    if (!info) {
        msg("Failed To Make Account", "error")
        document.getElementById("makeBtn").disabled = false;
        return
    }


    return info
}

async function request(path, opts = {}) {
    const baseURL = (new URL(window.location.href).origin.includes("localhost") && USE_DEBUG) ? "http://localhost:4444/" : "https://food-api-d5hh.onrender.com/";
    if (!opts.headers) opts.headers = {};
    opts.headers["x-app-version"] = appVersion;
    const response = await fetch(baseURL + path, opts);
    const data = await response.json();
    return data;
}

function display(id, display) {
    document.getElementById(id).style.display = display;
    if (display === "none") {
        document.getElementById(id).value = "";
    }
}

function showModOptions(mod = modData[0]) {
    if (typeof mod !== 'object') return;

    if (!mod || !mod.active) {
        msg("This mod is not active", "error");
    }

    if (mod.needsMail) {
        display("mail", "block");
    } else {
        display("mail", "none");
    }

    if (mod.needsGmail) {
        display("gmail", "block");
    } else {
        display("gmail", "none");
    }

}


async function addMods() {
    const res = await request("mods");

    modData = res

    const modList = document.getElementById("type");

    for (let i = 0; i < modData.length; i++) {
        const mod = modData[i];

        const option = document.createElement("option");
        option.value = mod.mod;
        option.innerText = mod.name;

        if (!mod.active) {
            option.disabled = true;
            option.innerText = `${mod.name} N/A`
        }

        modList.appendChild(option);
    }

    modList.addEventListener("change", () => {
        showModOptions(modData.find(mod => mod.mod === modList.value));
    })
}

function cleanGmail(gmail) {
    return gmail.split('@gmail.com')[0].toLowerCase().replace(/[^a-z0-9]/g, "") + "@gmail.com"
}

function genBody() {
    const id = nanoid(12);
    const key = document.getElementById("licenseKey").value;
    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    let mail = "" + document.getElementById("mail").value;
    let gmail = (document.getElementById("gmail").value);
    const type = document.getElementById("type").value;
    const data = modData.find(mod => mod.mod === type)

    if (!data) {
        msg("Please Select A Module", "error")
        return [false, null]
    }

    if (!key || !uuidRegex.test(key)) {
        msg("Please Enter A License Valid Key", "error")
        return [false, null]
    }


    if (data.needsGmail) {
        gmail = cleanGmail(gmail)
        if (!gmail || !gmailRegex.test(gmail)) {
            msg("Please Enter Valid Gmail", "error")
            return [false, null]
        }
    } else {
        gmail = "";
    }


    if (data.needsMail) {
        let pass = false;

        if (mail.includes("@gmail.com")) {
            if (gmailRegex.test(mail)) {
                mail = cleanGmail(mail)
                pass = true;
            }
        } else {
            mail = mail.includes('@') ? mail.split('@')[1] : mail;
            if (domainRegex.test(mail)) {
                pass = true;
            }
        }


        if (!pass) {
            msg("Please Enter Gmail Or Catchall", "error")
            return [false, null]
        }
    }

    return [true, { id, type: data.mod, key, firstName, lastName, mail, gmail }]
}

document.getElementById("makeBtn").addEventListener("click", async () => {
    document.getElementById("makeBtn").disabled = true;

    const [valid, body] = genBody()

    if (!valid) {
        msg("Please Fill All Inputs", "error")
        document.getElementById("makeBtn").disabled = false;
        return
    }

    msg("Starting Account Creation Please Wait")

    const info = await poll(body)

    if (info.error) {
        msg(info.error, "error")
        document.getElementById("makeBtn").disabled = false;
    } else {
        msg("Account Created Redirecting", "success")
        setTimeout(() => {
            window.location.href = new URL(window.location.href).origin + "/data?q=" + info.data
        }, 3000)
    }

});


function init() {
    const ids = ['licenseKey', "firstname", "lastname", "mail", "gmail", "type"];

    ids.forEach(id => {
        document.getElementById(id).value = ""
    })

    const key = window.localStorage.getItem("key")

    if (key) {
        console.log(key)
        document.getElementById("licenseKey").value = key
    }

    document.getElementById("licenseKey").addEventListener("input", function () {
        const key = document.getElementById("licenseKey").value
        if (key && uuidRegex.test(key)) {
            window.localStorage.setItem("key", key)
        }
    })

    msg("Loading Account Types")

    addMods().then(() => {
        msg("Loaded Account Types", "success")
    })
}


document.addEventListener("DOMContentLoaded", init)