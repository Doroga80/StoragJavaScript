const productsList = document.getElementById('productsList');
const reviewsList = document.getElementById('reviewsList');

// Получаем отзывы из LocalStorage при загрузке страницы
let savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];

// Функция для отображения всех продуктов
function renderProducts() {
    const products = savedReviews.reduce((acc, review) => {
        if (!acc.includes(review.productName)) {
            acc.push(review.productName);
        }
        return acc;
    }, []);

    productsList.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.textContent = product;
        productElement.addEventListener('click', () => showReviews(product));
        productsList.appendChild(productElement);
    });
}

// Функция для отображения отзывов по выбранному продукту
function showReviews(productName) {
    reviewsList.innerHTML = '';
    savedReviews.filter(review => review.productName === productName).forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = (`<h3>${review.productName}</h3><p>${review.reviewText}</p><button class="deleteBtn">Удалить</button>`);
        ;
        reviewElement.querySelector('.deleteBtn').addEventListener('click', () => deleteReview(review));
        reviewsList.appendChild(reviewElement);
    });
}

// Функция для удаления отзыва
function deleteReview(review) {
    savedReviews = savedReviews.filter(r => r !== review);
    localStorage.setItem('reviews', JSON.stringify(savedReviews));
    renderProducts();
    reviewsList.innerHTML = '';
}

// Отображаем список продуктов при загрузке страницы
renderProducts();

