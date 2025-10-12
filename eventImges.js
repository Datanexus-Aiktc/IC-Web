document.addEventListener('DOMContentLoaded', () => {
            const cards = document.querySelectorAll('.event-card');
            const overlay = document.querySelector('.overlay');
            let activeCard = null;

            cards.forEach(card => {
                const closeBtn = card.querySelector('.close-btn');
                const images = card.querySelectorAll('.slider-image');

                if (images.length > 0) {
                    images[0].classList.add('active');
                }
                
                card.addEventListener('click', (e) => {
                    if (card.classList.contains('expanded') || e.target.closest('.close-btn') || e.target.tagName === 'A') {
                        return; 
                    }
                    expandEvent(card);
                });
                
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    closeEvent(card);
                });
            });

            overlay.addEventListener('click', () => {
                if (activeCard) {
                    closeEvent(activeCard);
                }
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === "Escape" && activeCard) {
                    closeEvent(activeCard);
                }
            });

            function expandEvent(card) {
                if (activeCard) {
                    closeEvent(activeCard);
                }
                
                activeCard = card;
                card.classList.add('expanded');
                overlay.classList.add('active');
                
                if (card.querySelectorAll('.slider-image').length > 1) {
                    startSlider(card);
                }
            }

            function closeEvent(card) {
                if (!card) return;
                card.classList.remove('expanded');
                overlay.classList.remove('active');
                stopSlider(card);
                activeCard = null;
            }

            function startSlider(card) {
                const images = card.querySelectorAll('.slider-image');
                let currentIndex = 0;
                
                const intervalId = setInterval(() => {
                    images[currentIndex].classList.remove('active');
                    currentIndex = (currentIndex + 1) % images.length;
                    images[currentIndex].classList.add('active');
                }, 2000);
                
                card.dataset.sliderIntervalId = intervalId;
            }

            function stopSlider(card) {
                const intervalId = card.dataset.sliderIntervalId;
                if (intervalId) {
                    clearInterval(intervalId);
                    delete card.dataset.sliderIntervalId;
                    
                    const images = card.querySelectorAll('.slider-image');
                    if (images.length > 0) {
                        images.forEach((img, index) => {
                            img.classList.toggle('active', index === 0);
                        });
                    }
                }
            }
        });