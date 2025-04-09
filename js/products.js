// Products JavaScript File

document.addEventListener('DOMContentLoaded', function() {
  // Product data
  const products = [
    {
      id: 1,
      name: "Váy Cưới Ren Princess",
      image: "https://picsum.photos/id/64/600/800",
      price: "25.000.000 ₫",
      priceValue: 25000000,
      category: "Váy Xòe",
      material: "Ren",
      style: "Cổ điển"
    },
    {
      id: 2,
      name: "Váy Cưới Đuôi Cá Elegance",
      image: "https://picsum.photos/id/65/600/800",
      price: "30.000.000 ₫",
      priceValue: 30000000,
      category: "Váy Đuôi Cá",
      material: "Satin",
      style: "Hiện đại"
    },
    {
      id: 3,
      name: "Váy Cưới Minimalist Pearl",
      image: "https://picsum.photos/id/76/600/800",
      price: "22.000.000 ₫",
      priceValue: 22000000,
      category: "Váy Tối Giản",
      material: "Lụa",
      style: "Tối giản"
    },
    {
      id: 4,
      name: "Váy Cưới Công Chúa Royal",
      image: "https://picsum.photos/id/223/600/800",
      price: "35.000.000 ₫",
      priceValue: 35000000,
      category: "Váy Xòe",
      material: "Organza",
      style: "Cổ điển"
    },
    {
      id: 5,
      name: "Váy Cưới Bohemian Dream",
      image: "https://picsum.photos/id/325/600/800",
      price: "28.000.000 ₫",
      priceValue: 28000000,
      category: "Váy Suông",
      material: "Voan",
      style: "Bohemian"
    },
    {
      id: 6,
      name: "Váy Cưới Vintage Lace",
      image: "https://picsum.photos/id/366/600/800",
      price: "32.000.000 ₫",
      priceValue: 32000000,
      category: "Váy Xòe",
      material: "Ren",
      style: "Vintage"
    },
    {
      id: 7,
      name: "Váy Cưới Modern Romance",
      image: "https://picsum.photos/id/367/600/800",
      price: "27.000.000 ₫",
      priceValue: 27000000,
      category: "Váy Đuôi Cá",
      material: "Satin",
      style: "Hiện đại"
    },
    {
      id: 8,
      name: "Váy Cưới Simple Elegance",
      image: "https://picsum.photos/id/368/600/800",
      price: "20.000.000 ₫",
      priceValue: 20000000,
      category: "Váy Tối Giản",
      material: "Lụa",
      style: "Tối giản"
    },
    {
      id: 9,
      name: "Váy Cưới Fairy Tale",
      image: "https://picsum.photos/id/369/600/800",
      price: "38.000.000 ₫",
      priceValue: 38000000,
      category: "Váy Xòe",
      material: "Organza",
      style: "Cổ điển"
    },
    {
      id: 10,
      name: "Váy Cưới Beach Beauty",
      image: "https://picsum.photos/id/370/600/800",
      price: "23.000.000 ₫",
      priceValue: 23000000,
      category: "Váy Suông",
      material: "Voan",
      style: "Bohemian"
    },
    {
      id: 11,
      name: "Váy Cưới Luxury Pearl",
      image: "https://picsum.photos/id/371/600/800",
      price: "40.000.000 ₫",
      priceValue: 40000000,
      category: "Váy Xòe",
      material: "Ren",
      style: "Cổ điển"
    },
    {
      id: 12,
      name: "Váy Cưới Mermaid Dream",
      image: "https://picsum.photos/id/372/600/800",
      price: "33.000.000 ₫",
      priceValue: 33000000,
      category: "Váy Đuôi Cá",
      material: "Satin",
      style: "Hiện đại"
    }
  ];

  // Get DOM elements
  const productsContainer = document.getElementById('products-container');
  const noProductsMessage = document.getElementById('no-products-message');
  const searchInput = document.getElementById('product-search');
  const categoryFilter = document.getElementById('category-filter');
  const priceFilter = document.getElementById('price-filter');

  // Set up event listeners
  searchInput.addEventListener('input', filterProducts);
  categoryFilter.addEventListener('change', filterProducts);
  priceFilter.addEventListener('change', filterProducts);

  // Initialize products display
  displayProducts(products);

  // Function to filter products
  function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const categoryValue = categoryFilter.value;
    const priceValue = priceFilter.value;

    const filteredProducts = products.filter(product => {
      // Search term filter
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm) || 
        product.category.toLowerCase().includes(searchTerm) ||
        product.material.toLowerCase().includes(searchTerm) ||
        product.style.toLowerCase().includes(searchTerm);
      
      // Category filter
      const matchesCategory = 
        categoryValue === 'all' || 
        product.category === categoryValue;
      
      // Price filter
      const matchesPrice = 
        priceValue === 'all' || 
        (priceValue === 'under25' && product.priceValue < 25000000) ||
        (priceValue === '25to30' && product.priceValue >= 25000000 && product.priceValue <= 30000000) ||
        (priceValue === 'over30' && product.priceValue > 30000000);
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    displayProducts(filteredProducts);
  }

  // Function to display products
  function displayProducts(productsToDisplay) {
    // Show no products message if no products match filters
    if (productsToDisplay.length === 0) {
      productsContainer.style.display = 'none';
      noProductsMessage.style.display = 'block';
      return;
    }
    
    // Hide no products message and show products
    productsContainer.style.display = 'grid';
    noProductsMessage.style.display = 'none';
    
    // Clear current products
    productsContainer.innerHTML = '';
    
    // Add products to container
    productsToDisplay.forEach(product => {
      const productElement = createProductElement(product);
      productsContainer.appendChild(productElement);
    });
  }

  // Function to create a product element
  function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.className = 'product-card';
    
    productElement.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-overlay"></div>
        <a href="product-detail.html?id=${product.id}" class="product-detail-btn">Xem Chi Tiết</a>
      </div>
      <div class="product-info">
        <div>
          <h3><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
          <p class="product-category">${product.category}</p>
        </div>
        <p class="product-price">${product.price}</p>
      </div>
    `;
    
    return productElement;
  }

  // Pagination (simplified)
  const paginationButtons = document.querySelectorAll('.pagination-btn');
  paginationButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      paginationButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      // In a real application, we would fetch different products based on the page
      // For this demo, we'll just show the first 8 products
      displayProducts(products.slice(0, 8));
    });
  });
}); 