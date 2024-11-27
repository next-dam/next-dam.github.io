// 앨범 데이터를 정의합니다. 각 앨범은 이름, 설명, 가격, 이미지 경로를 포함합니다.
const albums = [
  { 
    name: "Album 1", // 앨범 이름
    description: "This is Album 1", // 앨범 설명
    price: 25, // 앨범 가격
    image: "assets/album1.jpg" // 앨범 이미지 경로
  },
  { 
    name: "Album 2", 
    description: "This is Album 2", 
    price: 35, 
    image: "assets/album2.jpg" 
  },
  { 
    name: "Album 3", 
    description: "This is Album 3", 
    price: 40, 
    image: "assets/album3.jpg" 
  }
];

// 현재 슬라이드의 인덱스를 저장합니다.
let currentIndex = 0; // 초기 슬라이드는 첫 번째로 설정
// 선택된 앨범들의 총 금액을 저장합니다.
let totalPrice = 0; // 총 금액 초기값
// 사용자가 선택한 앨범들의 목록을 저장합니다.
let selectedAlbums = []; // 선택된 앨범 초기값

// DOM 요소들을 변수로 저장합니다.
const albumTitle = document.querySelector(".album-title"); // 앨범 제목 요소
const albumImage = document.querySelector(".album-image"); // 앨범 이미지 요소
const albumDescription = document.querySelector(".description"); // 앨범 설명 요소
const albumPrice = document.querySelector(".price"); // 앨범 가격 요소
const indicators = document.querySelectorAll(".indicator"); // 슬라이드 인디케이터들
const totalDetail = document.querySelector(".total-detail"); // 총 금액 표시 요소
const cartItems = document.querySelector(".cart-items"); // 장바구니 아이템 요소

// 현재 슬라이드의 정보를 업데이트하는 함수입니다.
function updateSlide(index) {
  const album = albums[index]; // 현재 인덱스에 해당하는 앨범을 가져옵니다.
  albumTitle.textContent = album.name; // 앨범 제목을 업데이트합니다.
  albumImage.src = album.image; // 앨범 이미지를 업데이트합니다.
  albumDescription.textContent = album.description; // 앨범 설명을 업데이트합니다.
  albumPrice.textContent = `$${album.price.toFixed(2)}`; // 앨범 가격을 업데이트합니다.

  // 현재 슬라이드에 해당하는 인디케이터를 활성화합니다.
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === index); // 활성화 상태 업데이트
  });
}

// 앨범 호버 시 + 또는 - 버튼을 표시하고 클릭 이벤트를 처리하는 함수입니다.
function setupHoverButtons() {
  const albumCard = document.querySelector('.album-card');
  const addBtn = document.querySelector('.add-btn');
  const removeBtn = document.querySelector('.remove-btn');
  const hoverOverlay = document.querySelector('.hover-overlay');

  // 앨범에 마우스를 올렸을 때
  albumCard.addEventListener('mouseenter', () => {
    const album = albums[currentIndex];
    const isSelected = selectedAlbums.includes(album);
    
    // 선택 여부에 따라 적절한 버튼을 보여줍니다
    addBtn.style.display = isSelected ? 'none' : 'block';
    removeBtn.style.display = isSelected ? 'block' : 'none';
    hoverOverlay.style.opacity = '1';
  });

  // 앨범에서 마우스가 벗어났을 때
  albumCard.addEventListener('mouseleave', () => {
    hoverOverlay.style.opacity = '0';
  });

  // + 버튼 클릭 시
  addBtn.addEventListener('click', (e) => {
    e.stopPropagation();  // 이벤트 버블링 방지
    const album = albums[currentIndex];
    if (!selectedAlbums.includes(album)) {
      selectedAlbums.push(album);
      totalPrice += album.price;
      cart.addItem({
        id: album.name,
        name: album.name,
        price: album.price
      });
      updateTotalDisplay();
      addBtn.style.display = 'none';
      removeBtn.style.display = 'block';
      document.querySelector('.cart-container').classList.add('show'); // 장바구니 열기
    }
  });

  // - 버튼 클릭 시
  removeBtn.addEventListener('click', (e) => {
    e.stopPropagation();  // 이벤트 버블링 방지
    const album = albums[currentIndex];
    const index = selectedAlbums.indexOf(album);
    if (index > -1) {
      selectedAlbums.splice(index, 1);
      totalPrice -= album.price;
      cart.removeItem(album.name);
      updateTotalDisplay();
      removeBtn.style.display = 'none';
      addBtn.style.display = 'block';
    }
  });
}

// 장바구니에 앨범을 추가하는 함수입니다.
function addToCart(album) {
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');
  
  cartItem.innerHTML = `
    <img src="${album.image}" alt="${album.name}" class="cart-item-image">
    <div class="cart-item-info">
      <h3>${album.name}</h3>
      <p>$${album.price.toFixed(2)}</p>
    </div>
    <button class="remove-from-cart" data-album-name="${album.name}">×</button>
  `;
  
  // 삭제 버튼에 이벤트 리스너 추가
  const removeBtn = cartItem.querySelector('.remove-from-cart');
  removeBtn.addEventListener('click', () => {
    const albumToRemove = selectedAlbums.find(a => a.name === album.name);
    if (albumToRemove) {
      selectedAlbums = selectedAlbums.filter(a => a !== albumToRemove);
      totalPrice -= albumToRemove.price;
      cartItem.remove();
      updateTotalDisplay();
      updateCartVisibility();  // 장바구니 상태 업데이트
      
      // 현재 보이는 앨범이 삭제된 앨범이면 버튼 상태 업데이트
      if (albums[currentIndex].name === album.name) {
        const addBtn = document.querySelector('.add-btn');
        const removeBtn = document.querySelector('.remove-btn');
        addBtn.style.display = 'block';
        removeBtn.style.display = 'none';
      }
    }
  });
  
  cartItems.appendChild(cartItem);
  updateCartVisibility();  // 장바구니 상태 업데이트
}

// 장바구니 표시 상태를 관리하는 함수입니다.
function updateCartVisibility() {
  const cartContainer = document.querySelector('.cart-container');
  if (selectedAlbums.length > 0) {
    cartContainer.classList.add('show');
  } else {
    cartContainer.classList.remove('show');
  }
}

// 총액 표시를 업데이트하는 함수입니다.
function updateTotalDisplay() {
  if (selectedAlbums.length === 0) {
    totalDetail.textContent = '0';
  } else {
    const priceList = selectedAlbums.map(album => album.price);
    totalDetail.textContent = priceList.join(' + ') + ` = ${totalPrice}`;
  }
}

// 이전 슬라이드로 이동하는 버튼의 클릭 이벤트 리스너입니다.
document.getElementById("prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + albums.length) % albums.length; // 이전 슬라이드로 순환 이동
  updateSlide(currentIndex); // 슬라이드 업데이트
});

// 다음 슬라이드로 이동하는 버튼의 클릭 이벤트 리스너입니다.
document.getElementById("next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % albums.length; // 다음 슬라이드로 순환 이동
  updateSlide(currentIndex); // 슬라이드 업데이트
});

// 슬라이드 인디케이터 클릭 시 실행되는 이벤트 리스너입니다.
indicators.forEach((indicator) => {
  indicator.addEventListener("click", () => {
    currentIndex = parseInt(indicator.dataset.index, 10); // 클릭된 인디케이터의 인덱스를 가져옵니다.
    updateSlide(currentIndex); // 슬라이드 업데이트
  });
});

// 페이지 로드 시 초기 슬라이드를 설정하고 호버 기능을 초기화합니다.
updateSlide(currentIndex);
setupHoverButtons();
updateTotalDisplay();
updateCartVisibility();  // 초기 장바구니 상태 설정