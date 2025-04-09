document.addEventListener('DOMContentLoaded', function() {
  // Search form handling
  const searchForms = document.querySelectorAll('.search-form');
  
  searchForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const searchInput = this.querySelector('input');
      const searchTerm = searchInput.value.trim();
      
      if (searchTerm) {
        // In a real application, you would redirect to search results page
        // For now, let's just log the search term
        console.log('Searching for:', searchTerm);
        
        // Clear the input
        searchInput.value = '';
        
        // Show a message that search functionality is coming soon
        alert('Chức năng tìm kiếm sẽ sớm được cập nhật!');
      }
    });
  });
  
  // Subscribe form handling
  const subscribeForms = document.querySelectorAll('.subscribe-form');
  
  subscribeForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (email) {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(email)) {
          // In a real application, you would send this to a server
          console.log('Subscribing email:', email);
          
          // Clear the input
          emailInput.value = '';
          
          // Show success message
          const successMessage = document.createElement('div');
          successMessage.classList.add('subscribe-success');
          successMessage.textContent = 'Cảm ơn bạn đã đăng ký! Chúng tôi sẽ sớm gửi thông tin đến bạn.';
          
          // Add success message after the form
          this.insertAdjacentElement('afterend', successMessage);
          
          // Remove the message after 5 seconds
          setTimeout(() => {
            successMessage.remove();
          }, 5000);
        } else {
          // Show error message for invalid email
          const errorMessage = document.createElement('div');
          errorMessage.classList.add('subscribe-error');
          errorMessage.textContent = 'Vui lòng nhập địa chỉ email hợp lệ.';
          
          // Add error message after the form
          this.insertAdjacentElement('afterend', errorMessage);
          
          // Remove the message after 3 seconds
          setTimeout(() => {
            errorMessage.remove();
          }, 3000);
        }
      }
    });
  });
  
  // Pagination handling
  const paginationLinks = document.querySelectorAll('.pagination a');
  
  paginationLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // In a real application, you would load the next page
      // For now, let's just log the page number
      console.log('Navigating to page:', this.textContent.trim());
      
      // Show a message that pagination is coming soon
      alert('Chức năng phân trang sẽ sớm được cập nhật!');
    });
  });
  
  // Blog post hover effects
  const blogPosts = document.querySelectorAll('.blog-post');
  
  blogPosts.forEach(post => {
    post.addEventListener('mouseenter', function() {
      this.classList.add('hover');
    });
    
    post.addEventListener('mouseleave', function() {
      this.classList.remove('hover');
    });
  });
  
  // Add styles for success and error messages
  const style = document.createElement('style');
  style.textContent = `
    .subscribe-success {
      background-color: #e6f7e6;
      color: #2e7d32;
      padding: 10px 15px;
      border-radius: 5px;
      margin-top: 10px;
      font-size: 14px;
      border-left: 3px solid #2e7d32;
    }
    
    .subscribe-error {
      background-color: #ffebee;
      color: #c62828;
      padding: 10px 15px;
      border-radius: 5px;
      margin-top: 10px;
      font-size: 14px;
      border-left: 3px solid #c62828;
    }
  `;
  document.head.appendChild(style);
}); 