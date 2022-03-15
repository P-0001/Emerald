const ele = document.getElementById('msg')

function updateMessage(Msg = "Test") {
    ele.innerText = Msg
}

async function writeClipboard() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const { email, password } = Object.fromEntries(urlSearchParams.entries());
    const toCopy = [email, password].join(':')

    navigator.permissions.query({ name: 'clipboard-read' }).then(result => {
        // If permission to read the clipboard is granted or if the user will
        // be prompted to allow it, we proceed.
        if (result.state === 'granted' || result.state === 'prompt') {
            navigator.clipboard.writeText(toCopy)
                .then(() => updateMessage('Copied!'))
                .catch(err => {
                    console.error('Failed to read clipboard contents: ', err);
                    if (navigator.clipboard)
                        updateMessage('Failed. Please Focus Tab And Reload.')
                    else {
                        updateMessage('Clipboard In Your Browser Not Allowed/Available')
                    }
                });
        }
    })

}

writeClipboard()