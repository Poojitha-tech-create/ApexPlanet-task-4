const products = [
  { name: "Notebook", category: "books", price: 70, rating: 4.1 },
  { name: "Fiction Book", category: "books", price: 120, rating: 4.0 },
  { name: "Dress", category: "fashion", price: 999, rating: 4.3 },
  { name: "Sunglasses", category: "fashion", price: 550, rating: 4.6 },
  { name: "Wireless Earbuds", category: "electronics", price: 1700, rating: 4.2 },
  { name: "Smart Watch", category: "electronics", price: 1299, rating: 3.9 },
  { name: "Laptop", category: "electronics", price: 49999, rating: 4.5 }
];

const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const productList = document.getElementById("productList");

function renderProducts(items) {
  productList.innerHTML = "";
  items.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>Price: ₹${product.price}</p>
      <p>Rating: ⭐ ${product.rating}</p>
    `;
    productList.appendChild(card);
  });
}

function filterAndSort() {
  let filtered = [...products];

  const category = categoryFilter.value;
  const sort = sortFilter.value;

  if (category !== "All") {
    filtered = filtered.filter(p => p.category === category);
  }

  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  renderProducts(filtered);
}

// Initial render
filterAndSort();

categoryFilter.addEventListener("change", filterAndSort);
sortFilter.addEventListener("change", filterAndSort);
