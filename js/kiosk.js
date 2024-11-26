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
  
  // 구매 또는 취소 버튼 클릭 시 실행되는 함수입니다.
  function togglePurchase() {
    const album = albums[currentIndex]; // 현재 슬라이드의 앨범 정보를 가져옵니다.
    const isSelected = selectedAlbums.includes(album); // 해당 앨범이 선택되었는지 확인합니다.
  
    if (isSelected) {
      // 이미 선택된 상태라면 선택 취소합니다.
      selectedAlbums = selectedAlbums.filter(a => a !== album); // 선택 목록에서 제거
      totalPrice -= album.price; // 총 금액에서 해당 앨범 가격을 차감
    } else {
      // 선택되지 않은 상태라면 선택합니다.
      selectedAlbums.push(album); // 선택 목록에 추가
      totalPrice += album.price; // 총 금액에 해당 앨범 가격을 추가
    }
  
    // 총 금액 상세 정보를 업데이트합니다.
    totalDetail.textContent = selectedAlbums
      .map(a => a.price) // 선택된 앨범들의 가격 배열 생성
      .join(" + ") + ` = ${totalPrice}`; // 가격 합산 후 표시
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
  
  // 페이지 로드 시 초기 슬라이드를 설정합니다.
  updateSlide(currentIndex); // 첫 번째 슬라이드로 초기화