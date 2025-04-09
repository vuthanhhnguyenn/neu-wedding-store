// Login.js - JavaScript for the login and register page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabTarget = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and forms
            authTabs.forEach(tab => tab.classList.remove('active'));
            authForms.forEach(form => form.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding form
            tab.classList.add('active');
            document.getElementById(`${tabTarget}-form`).classList.add('active');
        });
    });
    
    // Toggle password visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordField = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle password visibility
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordField.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Login form validation and submission
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value.trim();
            
            if (validateEmail(email) && password.length >= 6) {
                // In a real app, you would send these credentials to the server
                showMessage('success', 'Đăng nhập thành công! Đang chuyển hướng...');
                
                // Simulate redirect after login
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showMessage('error', 'Email hoặc mật khẩu không hợp lệ. Vui lòng kiểm tra lại.');
            }
        });
    }
    
    // Register form validation and submission
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const phone = document.getElementById('register-phone').value.trim();
            const password = document.getElementById('register-password').value.trim();
            const confirmPassword = document.getElementById('register-confirm-password').value.trim();
            const termsChecked = document.getElementById('terms').checked;
            
            // Validate all fields
            if (name.length < 2) {
                showMessage('error', 'Vui lòng nhập họ tên hợp lệ');
                return;
            }
            
            if (!validateEmail(email)) {
                showMessage('error', 'Vui lòng nhập email hợp lệ');
                return;
            }
            
            if (!validatePhone(phone)) {
                showMessage('error', 'Vui lòng nhập số điện thoại hợp lệ');
                return;
            }
            
            if (password.length < 6) {
                showMessage('error', 'Mật khẩu phải có ít nhất 6 ký tự');
                return;
            }
            
            if (password !== confirmPassword) {
                showMessage('error', 'Mật khẩu xác nhận không khớp');
                return;
            }
            
            if (!termsChecked) {
                showMessage('error', 'Vui lòng đồng ý với điều khoản và chính sách bảo mật');
                return;
            }
            
            // If all validations pass
            showMessage('success', 'Đăng ký thành công! Đang chuyển hướng...');
            
            // Simulate redirect after registration
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }
    
    // Validate email format
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    // Validate phone format (Vietnamese phone numbers)
    function validatePhone(phone) {
        const re = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
        return re.test(phone);
    }
    
    // Show message
    function showMessage(type, text) {
        // Remove any existing message
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const message = document.createElement('div');
        message.className = `message ${type}-message`;
        message.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${text}</span>
        `;
        
        // Add message to the form
        const activeForm = document.querySelector('.auth-form.active');
        activeForm.insertBefore(message, activeForm.firstChild);
        
        // Remove message after a delay
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
    
    // Add styles for success and error messages
    const style = document.createElement('style');
    style.textContent = `
        .message {
            padding: 10px 15px;
            margin-bottom: 20px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .success-message {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .error-message {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
    `;
    document.head.appendChild(style);
}); 