document.addEventListener('DOMContentLoaded', function() {
  // Contact form validation and submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation
      let isValid = true;
      const formData = {};
      
      // Get all required inputs
      const requiredFields = contactForm.querySelectorAll('[required]');
      
      // Check each required field
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          
          // Add error message if not already present
          if (!field.parentElement.querySelector('.error-message')) {
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = 'Trường này không được để trống';
            field.parentElement.appendChild(errorMessage);
          }
        } else {
          field.classList.remove('error');
          const errorMessage = field.parentElement.querySelector('.error-message');
          if (errorMessage) {
            errorMessage.remove();
          }
          
          // Store form data
          formData[field.name] = field.value.trim();
        }
      });
      
      // Validate email format if email field exists
      const emailField = contactForm.querySelector('[name="email"]');
      if (emailField && emailField.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value.trim())) {
          isValid = false;
          emailField.classList.add('error');
          
          // Add error message if not already present
          if (!emailField.parentElement.querySelector('.error-message')) {
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = 'Địa chỉ email không hợp lệ';
            emailField.parentElement.appendChild(errorMessage);
          }
        }
      }
      
      // Validate phone format if phone field exists
      const phoneField = contactForm.querySelector('[name="phone"]');
      if (phoneField && phoneField.value.trim()) {
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(phoneField.value.trim().replace(/\s+/g, ''))) {
          isValid = false;
          phoneField.classList.add('error');
          
          // Add error message if not already present
          if (!phoneField.parentElement.querySelector('.error-message')) {
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = 'Số điện thoại không hợp lệ';
            phoneField.parentElement.appendChild(errorMessage);
          }
        }
      }
      
      // If form is valid, submit the data
      if (isValid) {
        // In a real application, you would send this data to a server
        console.log('Form data:', formData);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.textContent = 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.';
        
        // Insert success message after form headline
        const formHeadline = contactForm.querySelector('h2, h3');
        if (formHeadline) {
          formHeadline.insertAdjacentElement('afterend', successMessage);
        } else {
          contactForm.prepend(successMessage);
        }
        
        // Clear form
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }
    });
  }
  
  // Adding styles for error and success messages
  const style = document.createElement('style');
  style.textContent = `
    .error-message {
      color: #d32f2f;
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }
    
    .success-message {
      color: #2e7d32;
      background-color: rgba(46, 125, 50, 0.1);
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
    }
    
    .error {
      border-color: #d32f2f !important;
    }
  `;
  document.head.appendChild(style);
}); 