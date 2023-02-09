const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

fetch("https://kea-alt-del.dk/t7/api/products?category=" + category)
  .then((res) => res.json())
  .then(showProducts);

function showProducts(products) {
  //looper og kalder showProduct
  products.forEach(showProduct);
}

function showProduct(product) {
  document.querySelector("h2").textContent = product.category;
  //fang template
  const template = document.querySelector("#productTemplate").content;
  //lav en kopi
  const copy = template.cloneNode(true);
  //ændre indhold
  copy.querySelector(".product h4").textContent = product.productdisplayname;
  copy.querySelector(".product .brand").textContent = product.brandname;
  copy.querySelector(".product .type").textContent = product.articletype;
  copy.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  copy.querySelector(".product .price").textContent = product.price;
  copy.querySelector(".product .price_discount").textContent = product.price;

  let newPrice = product.price - (product.price * product.discount) / 100;
  newPrice = newPrice.toFixed(0);

  if (product.soldout) {
    //produktet er udsolgt
    copy.querySelector("article").classList.add("soldOut");
  }
  if (product.discount) {
    //produktet er sat ned
    copy.querySelector("article").classList.add("onSale");
    copy.querySelector(".procent").textContent = product.discount;
    copy.querySelector(".price").textContent = newPrice;
  }

  copy.querySelector(".read_more").setAttribute("href", `product.html?id=${product.id}`);

  //appende
  document.querySelector(".template").appendChild(copy);
}
