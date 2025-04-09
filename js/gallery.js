document.addEventListener('DOMContentLoaded', function() {
  // Gallery filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  // Initialize Lightbox
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'albumLabel': "Ảnh %1 / %2",
    'fadeDuration': 300
  });
  
  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter gallery items
      galleryItems.forEach(item => {
        if (filterValue === 'all') {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 300);
        } else if (item.classList.contains(filterValue)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 300);
        } else {
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Load more button functionality
  const loadMoreBtn = document.getElementById('load-more');
  let currentItems = 6;
  
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      const elementList = [...document.querySelectorAll('.gallery-grid .gallery-item')];
      
      for (let i = currentItems; i < currentItems + 3; i++) {
        if (elementList[i]) {
          elementList[i].style.display = 'block';
          setTimeout(() => {
            elementList[i].style.opacity = '1';
          }, 300);
        }
      }
      
      currentItems += 3;
      
      // Hide load more button if all items are visible
      if (currentItems >= elementList.length) {
        loadMoreBtn.style.display = 'none';
      }
    });
  }
  
  // Initially hide items beyond the first 6
  const initialHide = [...document.querySelectorAll('.gallery-grid .gallery-item')];
  if (initialHide.length > 6) {
    for (let i = 6; i < initialHide.length; i++) {
      initialHide[i].style.display = 'none';
      initialHide[i].style.opacity = '0';
    }
  } else {
    // Hide load more button if there are 6 or fewer items
    if (loadMoreBtn) {
      loadMoreBtn.style.display = 'none';
    }
  }
  
  // Featured Collection Slider
  const featuredSlider = document.querySelector('.featured-slider');
  const featuredSlides = document.querySelectorAll('.featured-slide');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  let slideIndex = 0;
  
  if (featuredSlider && featuredSlides.length > 0) {
    // Initialize slider
    updateSlider();
    
    // Next button click
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        slideIndex++;
        if (slideIndex >= featuredSlides.length) {
          slideIndex = 0;
        }
        updateSlider();
      });
    }
    
    // Previous button click
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        slideIndex--;
        if (slideIndex < 0) {
          slideIndex = featuredSlides.length - 1;
        }
        updateSlider();
      });
    }
    
    // Auto slide
    let slideInterval = setInterval(autoSlide, 5000);
    
    // Pause on hover
    featuredSlider.addEventListener('mouseenter', function() {
      clearInterval(slideInterval);
    });
    
    featuredSlider.addEventListener('mouseleave', function() {
      slideInterval = setInterval(autoSlide, 5000);
    });
  }
  
  // Update slider function
  function updateSlider() {
    if (!featuredSlider) return;
    featuredSlider.style.transform = `translateX(-${slideIndex * 100}%)`;
  }
  
  // Auto slide function
  function autoSlide() {
    slideIndex++;
    if (slideIndex >= featuredSlides.length) {
      slideIndex = 0;
    }
    updateSlider();
  }
}); 