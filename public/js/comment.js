const commentSubmitHandle = async (e) => {
  e.preventDefault();

  const comment_text = document.getElementById("comment__body").value;

  const post_id = parseInt(window.location.toString().split("/").slice(-1)[0]);

  if (comment_text && Number.isInteger(post_id)) {
    const res = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      document.location.reload();
      document.getElementById("comment__body").value = "";
    } else {
      alert("can not submit your comment");
      console.log(res);
    }
  }
};

document
  .getElementById("comment__submit")
  .addEventListener("submit", commentSubmitHandle);
