document.addEventListener('DOMContentLoaded', () => {
    const descriptionTab = document.getElementById('description-tab');
    const reviewsTab = document.getElementById('reviews-tab');
    const descriptionContent = document.getElementById('description-content');
    const reviewsContent = document.getElementById('reviews-content');

    function showTab(tabId) {
        descriptionTab.classList.remove('active');
        reviewsTab.classList.remove('active');
        descriptionContent.classList.remove('active');
        reviewsContent.classList.remove('active');

        if (tabId === 'description') {
            descriptionTab.classList.add('active');
            descriptionContent.classList.add('active');
        } else if (tabId === 'reviews') {
            reviewsTab.classList.add('active');
            reviewsContent.classList.add('active');
        }
    }

    descriptionTab.addEventListener('click', () => {
        showTab('description');
    });

    reviewsTab.addEventListener('click', () => {
        showTab('reviews');
    });
});