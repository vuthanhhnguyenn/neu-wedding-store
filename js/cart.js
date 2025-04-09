// Cart.js - JavaScript for the cart page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize quantities
    updateCartTotals();
    
    // Quantity buttons functionality
    const minusButtons = document.querySelectorAll('.minus-btn');
    const plusButtons = document.querySelectorAll('.plus-btn');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    
    // Handle minus button clicks
    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.nextElementSibling;
            let value = parseInt(input.value);
            if (value > 1) {
                value--;
                input.value = value;
                updateItemTotal(input);
                updateCartTotals();
            }
        });
    });
    
    // Handle plus button clicks
    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            let value = parseInt(input.value);
            const maxValue = parseInt(input.getAttribute('max'));
            if (value < maxValue) {
                value++;
                input.value = value;
                updateItemTotal(input);
                updateCartTotals();
            }
        });
    });
    
    // Handle manual quantity input
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            let value = parseInt(this.value);
            const min = parseInt(this.getAttribute('min'));
            const max = parseInt(this.getAttribute('max'));
            
            if (value < min) {
                this.value = min;
                value = min;
            } else if (value > max) {
                this.value = max;
                value = max;
            }
            
            updateItemTotal(this);
            updateCartTotals();
        });
    });
    
    // Update individual item total
    function updateItemTotal(input) {
        const row = input.closest('tr');
        const priceElement = row.querySelector('.price-col');
        const totalElement = row.querySelector('.total-col');
        
        // Extract price (remove currency symbol and convert to number)
        const priceText = priceElement.textContent;
        const price = parseFloat(priceText.replace('₫', '').replace(/\./g, '').replace(/,/g, '.'));
        
        // Calculate total
        const quantity = parseInt(input.value);
        const total = price * quantity;
        
        // Format the total with currency
        totalElement.textContent = formatCurrency(total);
    }
    
    // Update cart totals
    function updateCartTotals() {
        const itemTotals = document.querySelectorAll('.total-col');
        let subtotal = 0;
        
        itemTotals.forEach(item => {
            const totalText = item.textContent;
            const total = parseFloat(totalText.replace('₫', '').replace(/\./g, '').replace(/,/g, '.'));
            subtotal += total;
        });
        
        // Update the summary values
        const subtotalElement = document.querySelector('.summary-row:first-child .summary-value');
        const totalElement = document.querySelector('.summary-total');
        
        if (subtotalElement && totalElement) {
            subtotalElement.textContent = formatCurrency(subtotal);
            totalElement.textContent = formatCurrency(subtotal); // For now, total equals subtotal
        }
    }
    
    // Format currency with Vietnamese format
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { 
            minimumFractionDigits: 0
        }).format(amount) + '₫';
    }
    
    // Remove item functionality
    const removeButtons = document.querySelectorAll('.remove-btn');
    
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            
            // Add a fade-out animation
            row.style.transition = 'opacity 0.3s';
            row.style.opacity = '0';
            
            // Remove the row after animation completes
            setTimeout(() => {
                row.remove();
                updateCartTotals();
                
                // Check if cart is empty
                const remainingItems = document.querySelectorAll('.cart-table tbody tr');
                if (remainingItems.length === 0) {
                    showEmptyCart();
                }
            }, 300);
        });
    });
    
    // Show empty cart state
    function showEmptyCart() {
        const cartWithItems = document.querySelector('.cart-with-items');
        const emptyCart = document.querySelector('.empty-cart');
        
        if (cartWithItems && emptyCart) {
            cartWithItems.style.display = 'none';
            emptyCart.style.display = 'block';
        }
    }
    
    // Apply coupon functionality
    const couponForm = document.querySelector('.coupon-form');
    
    if (couponForm) {
        couponForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const couponInput = this.querySelector('.coupon-input');
            const couponCode = couponInput.value.trim();
            
            if (couponCode) {
                // In a real app, you would validate the coupon code with the server
                alert('Mã giảm giá đã được áp dụng!');
                couponInput.value = '';
            } else {
                alert('Vui lòng nhập mã giảm giá!');
            }
        });
    }
    
    // Update cart button functionality
    const updateCartBtn = document.querySelector('.update-cart .btn-primary');
    
    if (updateCartBtn) {
        updateCartBtn.addEventListener('click', function() {
            // In a real app, you would send the updated quantities to the server
            alert('Giỏ hàng đã được cập nhật!');
        });
    }
    
    // Continue shopping button functionality
    const continueShoppingBtn = document.querySelector('.update-cart .btn-outline');
    
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', function() {
            window.location.href = 'gallery.html';
        });
    }
    
    // Checkout button functionality
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            // In a real app, you would redirect to the checkout page
            alert('Đang chuyển đến trang thanh toán...');
            // window.location.href = 'checkout.html';
        });
    }
    
    // Product actions in the related products section
    const actionBtns = document.querySelectorAll('.product-actions .action-btn');
    
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('fa-heart')) {
                alert('Đã thêm vào danh sách yêu thích!');
            } else if (icon.classList.contains('fa-search')) {
                alert('Xem chi tiết sản phẩm');
            } else if (icon.classList.contains('fa-shopping-cart')) {
                alert('Đã thêm vào giỏ hàng!');
            }
        });
    });
    
    // Add to cart buttons in related products
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            
            alert(`Đã thêm "${productTitle}" vào giỏ hàng!`);
        });
    });
}); 