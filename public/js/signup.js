const signupButtonClickHandle = async (e) => {
  e.preventDefault();

  const username = document.getElementById("signup__username").value;
  const email = document.getElementById("signup__email").value;
  const password = document.getElementById("signup__password").value;

  if (username && email && password) {
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      alert("SignUp Success");
      document.location.replace("/dashboard");
    } else {
      alert("You can not signup, have some server error.");
      console.log(res);
    }
  }
};

document
  .getElementById("signup__submit")
  .addEventListener("submit", signupButtonClickHandle);
