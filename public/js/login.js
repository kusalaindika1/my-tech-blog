const loginSubmitHandle = async (e) => {
  e.preventDefault();

  const username = document.getElementById("login__block_username").value;
  const password = document.getElementById("login__block_password").value;

  if (username && password) {
    const res = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      document.getElementById("login__block_username").value = "";
      document.getElementById("login__block_password").value = "";
      alert("You Are Loged in Successfully");
      document.location.replace("/dashboard");
    } else {
      alert("You Can Not Login");
      console.log(res);
    }
  }
};

document
  .getElementById("login__block_loginSubmit")
  .addEventListener("submit", loginSubmitHandle);
