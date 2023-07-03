function formatPhoneNumber(
    q = "",
    format = "(###) ###-####",
) {
    const raw = typeof q === "string" ? q.replace(/[^0-9]/g, "") : q.toString();
    const formatted = format.split("");
    let index = 0;
    for (let i = 0; i < formatted.length; i++) {
        if (formatted[i] === "#") {
            formatted[i] = raw[index];
            index++;
        }
    }

    return formatted.join("");
}

function copyToClipboard(text) {
    return navigator.clipboard.writeText(text)
        .then(() => true)
        .catch(() => false);
}

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

function decodeAES256ECB(hexString, key) {
    const encryptedBytes = CryptoJS.enc.Hex.parse(hexString);

    const keyBytes = CryptoJS.enc.Hex.parse(key);

    const decrypted = CryptoJS.AES.decrypt({ ciphertext: encryptedBytes }, keyBytes, {
        mode: CryptoJS.mode.ECB,
    });

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    return decryptedText;
}

function decode(query = "") {
    const key = "db71ea9d94e1eccc3113113eabe76895010eeb103759e856da7b0d5f398e2de2";

    if (!query) {
        return;
    }

    const str = decodeAES256ECB(query, key);

    const json = JSON.parse(str);

    return json;
}

const AccountObject = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    type: "",
    date: 0
}

//cSpell: ignore tacobell
const modNames = new Map([
    ['fh', 'Firehouse Subs'],
    ['kk', 'Krispy Kreme'],
    ['proxies', 'Proxies'],
    ['tacobell', 'Taco Bell'],
    ['panera', 'Panera'],
    ['bj', 'Bjs'],
    ['iHop', 'iHop'],
    ['delTaco', 'Del Taco'],
    ['dq', 'Dairy Queen'],
    ['wendys', "Wendy's"],
    ['qdoba', 'Qdoba'],
    ['jj', "Jimmy John's"],
    ['dennys', "Denny's"],
    ['wp', "Wetzel's Pretzels"],
    ['mc', "Mcdonald's"],
    ['bo', 'Bojangles'],
    ['chilis', "Chili's"],
    ['popeyes', 'Popeyes'],
    ['wb', 'Whataburger'],
    ['sns', "Steak 'n Shake"]
]);

const toPascal = (t) => t[0].toUpperCase() + t.slice(1).toLowerCase();

function showAccount(data = AccountObject) {
    //
    for (const [key, value] of Object.entries(data)) {
        let val = value || "";

        if (key === 'phone') {
            val = formatPhoneNumber(val, '(###) ###-####')
        } else if (key === 'date') {
            val = new Date(Number(val)).toLocaleString();
        } else if (key === 'type') {
            val = modNames.get(val) || val;
            document.getElementById('heading').innerText = `Your ${val} Account`
        }

        const element = document.getElementById(key);

        if (element) {
            element.value = `${toPascal(key)}: ${val}`;
            element.style.display = "block";
            element.addEventListener("click", function () {
                // console.log(key + " click");
                copyToClipboard(val)
                    .then((v) => {
                        if (v) {
                            msg(`Copied ${key} to clipboard`);
                        } else {
                            msg(`Failed to copy ${key} to clipboard`);
                        }
                    })
                    .catch(() => msg(`Failed to copy ${key} to clipboard`));
            });
        } else {
            // console.log(key + " not found");
        }
    }
}

function init() {
    const qs = new URLSearchParams(window.location.search)
    
    if (qs.has('discord')) {
        document.getElementById('heading').innerText = "Discord Bot Added"
        return;
    } else if (qs.has('q')) {
        console.time("decode")
        const account = decode(qs.get('q'));
        if (!account) return;
        showAccount(account)
        console.timeEnd("decode")
    } else {
        console.log('why are you here?')
    }
}

window.addEventListener("DOMContentLoaded", init);