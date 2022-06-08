function updateMessage(Msg = "Test") {
  document.getElementById("msg").innerText = Msg;
}

async function writeData(data) {
  for (let name in data) {
    const value = data[name];
    const input = document.createElement("div");
    input.innerText = `${name}: ${value}`;
  }
}

async function writeClipboard() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const { email, password, text } = Object.fromEntries(
    urlSearchParams.entries()
  );
  let toCopy = "";
  if (email && password) {
    toCopy = [email, password].join(":");
  } else {
    toCopy = text || "";
  }

  navigator.permissions.query({ name: "clipboard-read" }).then((result) => {
    if (result.state === "granted" || result.state === "prompt") {
      navigator.clipboard
        .writeText(toCopy)
        .then(() => updateMessage(`Copied! ${toCopy}`))
        .catch((err) => {
          console.error("Failed to read clipboard contents: ", err);
          if (navigator.clipboard)
            updateMessage("Failed. Please Focus Tab And Reload.");
          else {
            updateMessage("Clipboard In Your Browser Not Allowed/Available");
          }
        });
    }
  });
}

if (window.location.search && window.location.search.includes("data")) {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const { data } = Object.fromEntries(urlSearchParams.entries());
  let real = atob(data);
  writeData(JSON.parse(real));
} else {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const q = Object.fromEntries(urlSearchParams.entries());
  if (q) writeClipboard();
}
