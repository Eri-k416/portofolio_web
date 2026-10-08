const wrapper = document.getElementById('portfolioWrapper');
const pieces = Array.from(document.querySelectorAll('.portofolio-piece'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

// Function to smoothly scroll to and activate an item by index
function scrollToPiece(index) {
    if (index < 0) index = 0;
    if (index >= pieces.length) index = pieces.length - 1;

    currentIndex = index;
    const target = pieces[currentIndex];

    // Scroll centered into view
    target.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
    });

    updateActiveCard();
}

// Highlights only the current piece
function updateActiveCard() {
    pieces.forEach((piece, idx) => {
        if (idx === currentIndex) {
        piece.classList.add('active');
        } else {
        piece.classList.remove('active');
        }
    });
}

// Next & Prev button clicks
nextBtn.addEventListener('click', () => {
    scrollToPiece(currentIndex + 1);
});

prevBtn.addEventListener('click', () => {
    scrollToPiece(currentIndex - 1);
});

pieces.forEach((piece, idx) => {
    piece.addEventListener('click', () => {
        scrollToPiece(idx);
    });
});

let isScrolling;
wrapper.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        const wrapperCenter = wrapper.getBoundingClientRect().left + wrapper.offsetWidth / 2;

        let closestIdx = 0;
        let minDistance = Infinity;

        pieces.forEach((piece, idx) => {
        const pieceCenter = piece.getBoundingClientRect().left + piece.offsetWidth / 2;
        const distance = Math.abs(wrapperCenter - pieceCenter);
        if (distance < minDistance) {
            minDistance = distance;
            closestIdx = idx;
        }
        });

        currentIndex = closestIdx;
        updateActiveCard();
    }, 60);
});