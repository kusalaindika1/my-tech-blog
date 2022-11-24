const editPostSubmitHandle = async (e) => {
  e.preventDefault();

  const title = document.getElementById("editPost__title").value;
  const content = document.getElementById("editPost__content").value;

  const id = parseInt(window.location.toString().split("/").slice(-1)[0]);

  const res = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      post_id: id,
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    document.location.replace("/dashboard/");
  } else {
    console.log(res);
  }
};

document
  .getElementById("editPost__submit")
  .addEventListener("submit", editPostSubmitHandle);
