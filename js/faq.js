// FAQ.js - JavaScript for the FAQ page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Toggle FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
        });
    });
    
    // Filter FAQ items by category
    const categoryButtons = document.querySelectorAll('.category-btn');
    const allFaqItems = document.querySelectorAll('.faq-item');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            // Show all items if 'all' category is selected
            if (category === 'all') {
                allFaqItems.forEach(item => {
                    item.style.display = 'block';
                });
                return;
            }
            
            // Filter items by category
            allFaqItems.forEach(item => {
                if (item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // FAQ Search functionality
    const searchInput = document.getElementById('faq-search');
    const searchForm = document.querySelector('.faq-search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            searchFaqs();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            if (searchInput.value.length > 2) {
                searchFaqs();
            } else if (searchInput.value.length === 0) {
                // Reset search
                allFaqItems.forEach(item => {
                    item.style.display = 'block';
                });
                
                // Reset category buttons
                const allCategoryBtn = document.querySelector('.category-btn[data-category="all"]');
                if (allCategoryBtn) {
                    categoryButtons.forEach(btn => {
                        btn.classList.remove('active');
                    });
                    allCategoryBtn.classList.add('active');
                }
            }
        });
    }
    
    function searchFaqs() {
        const searchTerm = searchInput.value.toLowerCase();
        
        if (searchTerm.length < 3) return;
        
        allFaqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
                
                // Highlight matched text (optional)
                /*
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                item.querySelector('.faq-question h3').innerHTML = 
                    question.replace(regex, '<span class="highlight">$1</span>');
                item.querySelector('.faq-answer p').innerHTML = 
                    answer.replace(regex, '<span class="highlight">$1</span>');
                */
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 