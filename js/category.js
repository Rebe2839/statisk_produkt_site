fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((res) => res.json())
  .then(showCategories);

function showCategories(cats) {
  //looper og kalder showProduct
  cats.forEach(showCategory);
}

function showCategory(cat) {
  //fang template
  const template = document.querySelector("template").content;
  //lav en kopi
  const clone = template.cloneNode(true);
  //ændre indhold
  clone.querySelector("a").textContent = cat.category;
  clone.querySelector("a").href = `productlist.html?category=${cat.category}`;
  //appende
  document.querySelector(".categories ol").appendChild(clone);
}
