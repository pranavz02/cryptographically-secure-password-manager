const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

// sign_in_btn.addEventListener("click", () => {
//   container.classList.remove("sign-up-mode");
// });




const form = document.getElementById("reg-form");
form.addEventListener('signup', async (Event) => {
    Event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const result = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username, email, password
        })
    }).then((req, res) => res.json())

    console.log(result);
});
