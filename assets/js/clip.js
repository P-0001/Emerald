function updateMessage(Msg = "Test") {
    document.getElementById('msg').innerText = Msg
}

/*
const qs = new URLSearchParams({
    email: 'test@gmail.com',
    password: 'password123',
})
console.log(qs.toString())
*/





const urlSearchParams = new URLSearchParams(window.location.search);
const { email, password } = Object.fromEntries(urlSearchParams.entries());

async function writeClipboard() {
    const toCopy = [email, password].join(':')

    navigator.permissions.query({ name: 'clipboard-read' }).then(result => {
        // If permission to read the clipboard is granted or if the user will
        // be prompted to allow it, we proceed.
        if (result.state === 'granted' || result.state === 'prompt') {
            navigator.clipboard.writeText(toCopy)
                .then(() => updateMessage('Copied!'))
                .catch(err => {
                    console.error('Failed to read clipboard contents: ', err);
                });
        }
    })

}



writeClipboard()