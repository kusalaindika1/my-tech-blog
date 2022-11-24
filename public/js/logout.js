const logoutButtonHandle = async () => {
  console.log("logout button click");
  const res = await fetch("/api/users/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    document.location.replace("/");
  } else {
    console.log(res);
  }
};

document
  .getElementById("logout__button")
  .addEventListener("click", logoutButtonHandle);
