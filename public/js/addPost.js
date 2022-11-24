const addNewPostHandle = async (e) => {
  e.preventDefault();

  const title = document.getElementById("addPost__Title").value;
  const content = document.getElementById("addPost__Content").value;

  const res = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    document.location.replace("/dashboard");
  } else {
    console.log(res);
  }
};

document
  .getElementById("addPost__submit")
  .addEventListener("submit", addNewPostHandle);
