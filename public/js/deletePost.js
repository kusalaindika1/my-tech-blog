const deletePostHandle = async (e) => {
  e.preventDefault();

  const id = parseInt(window.location.toString().split("/").slice(-1)[0]);

  const res = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      post_id: id,
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
  .getElementById("editPost__deletePostButton")
  .addEventListener("click", deletePostHandle);
