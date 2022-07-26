import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getRemoteConfig, getValue, fetchAndActivate } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-remote-config.js";


const firebaseConfig = {
    apiKey: "AIzaSyCVUAak06RHBz7KSh8V_om8q6eDQDdMOb0",
    authDomain: "test-api-2f3b7.firebaseapp.com",
    projectId: "test-api-2f3b7",
    storageBucket: "test-api-2f3b7.appspot.com",
    messagingSenderId: "706555356769",
    appId: "1:706555356769:web:47b47a698b231bec85ac20",
    measurementId: "G-EXDB9XZNET"
};

const classes = ["icon solid major fa-code", 'icon solid major fa-lock', 'icon solid major fa-cog', 'icon solid major fa-desktop', 'icon solid major fa-link', 'icon major fa-gem']
const classesLen = classes.length;
let index = 0

function getRandomClass() {
    if (index == classesLen) index = 0;
    let c = classes[index]
    index++
    return c
}

function createModule(mod = { name: "", description: "", working: true }) {
    return `
    <span class="${getRandomClass()}"></span>
    <h3>${mod.name}</h3>
    <p>${mod.description}<br><b>Status:</b> ${mod.working ? 'Working ✅' : 'Down ❌'}</p>
    `
}

async function init() {
    console.time('init')
    const app = await initializeApp(firebaseConfig);
    const remoteConfig = await getRemoteConfig(app)
    const isDone = await fetchAndActivate(remoteConfig)
    const val = JSON.parse(getValue(remoteConfig, 'modules_gens')._value)

    for (const module of val) {
        const e = document.createElement('section');
        e.innerHTML = createModule(module)
        document.getElementById('mods').appendChild(e);
    }

    const e = document.createElement('section');
    e.innerHTML = `
    <span class="icon solid major fa-code"></span>
    <h3>More...</h3>
    <p>Coming Soon!</p>`
    document.getElementById('mods').appendChild(e);

    console.timeEnd('init')

    document.getElementById('mod-loading').remove()
}

init()