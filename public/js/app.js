var counter = 0;

document.addEventListener("click", function() {
    counter++;
    document.getElementById("counter").innerText = counter;
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(function() {
                console.log("service worker registered");
            })
            .catch(function(err) {
                console.log("service worker not registered", err);
            });
    });
}