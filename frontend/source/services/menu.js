(function initializeMenu() { 
    const user = localStorage.getItem("user");
    if (user) {
        document.querySelector(".menu-logged-out").style.display = "none";
        document.querySelector(".menu-logged-in").style.display = "block";

        const {name, admin} = JSON.parse(user);

        if (admin) {
            document.getElementById("admin-controls").style.display = "flex";
            document.getElementById("shopping-cart").style.display = "none";
        } else {
            document.getElementById("shopping-cart").style.display = "flex";
            document.getElementById("admin-controls").style.display = "none";
        }

        document.getElementById("menu-logged-in-name").innerText = `Olá, ${name}`;
        document.getElementById("logout").addEventListener("click", () => {
            localStorage.setItem("user", "");
            window.cookieStore.delete("token");
        })
    }
    else {
        document.querySelector(".menu-logged-out").style.display = "block";
        document.querySelector(".menu-logged-in").style.display = "none";
        document.getElementById("shopping-cart").style.display = "flex";
        document.getElementById("admin-controls").style.display = "none";
    }
})()