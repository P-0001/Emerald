function copyToClipboard(text) {
    return navigator.clipboard.writeText(text)
        .then(() => true)
        .catch(() => false);
}

function msg(msg) {
    return Toastify({
        text: msg,
        duration: 1500,
        className: "info",
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

function decode() {
    const key = "db71ea9d94e1eccc3113113eabe76895010eeb103759e856da7b0d5f398e2de2";

    const query = new URLSearchParams(window.location.search).get('q');

    if (!query) {
        return;
    }

    const str = decodeAES256ECB(query, key);

    const json = JSON.parse(str);

    console.log(json);

    return json;
}

const AccountObject = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
}

function showAccount(data = AccountObject) {
    for (const [key, value] of Object.entries(data)) {
        let val = value || "";

        const element = document.getElementById(key);

        if (element) {
            element.value = val;
            element.style.display = "block";
            element.addEventListener("click", function () {
                console.log(key + " click");
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
            console.log(key + " not found");
        }
    }
}

function init() {
    const account = decode();
    if (!account) return;
    showAccount(account)
}

window.addEventListener("DOMContentLoaded", init);