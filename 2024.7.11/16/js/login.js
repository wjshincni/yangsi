const signInBtn = document.getElementById("gotoSignIn");
const signUpBtn = document.getElementById("gotoSignUp");
const loginForm = document.getElementById("logIn");
const regForm = document.getElementById("regIn");
const container = document.querySelector(".container");

signInBtn.addEventListener("click", () => {
	container.classList.remove("rightPanel");
});

signUpBtn.addEventListener("click", () => {
	container.classList.add("rightPanel");
});
