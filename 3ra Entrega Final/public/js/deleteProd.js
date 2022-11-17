function deleteProd(e) {
  let prodId = e.target.value;
  fetch("http://localhost:8080/cart/" + prodId, {
    method: "DELETE",
  }).then((res) => location.reload()); // or res.json()
}
