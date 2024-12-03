class Cart {
    constructor() {
        this.items = [];
        this.cartItemsElement = document.querySelector('.cart-items');
        this.totalElement = document.querySelector('.total-detail');
        this.purchaseBtn = document.querySelector('.purchase-btn');
        this.cartContainer = document.querySelector('.cart-container');
        this.cartToggleBtn = document.querySelector('.cart-toggle-btn');
        this.cartItemCount = document.querySelector('.cart-item-count');
        this.cartCloseBtn = document.querySelector('.cart-close-btn');
        this.initializeCart();
        this.initializeEventListeners();
    }

    initializeCart() {
        // 로컬 스토리지에서 장바구니 데이터 불러오기
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
            this.updateCartDisplay();
        }
    }

    initializeEventListeners() {
        this.purchaseBtn.addEventListener('click', () => this.handlePurchase());
        this.cartToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();  // 이벤트 버블링 방지
            this.openCart();
        });
        this.cartCloseBtn.addEventListener('click', () => this.closeCart());
        
        // 외부 클릭 시 장바구니 닫기
        document.addEventListener('click', (e) => {
            if (!this.cartContainer.classList.contains('hidden') && 
                !this.cartContainer.contains(e.target) && 
                !this.cartToggleBtn.contains(e.target)) {
                this.closeCart();
            }
        });

        // 장바구니 내부 클릭 시 이벤트 전파 방지
        this.cartContainer.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    openCart() {
        this.cartContainer.classList.remove('hidden');
    }

    closeCart() {
        this.cartContainer.classList.add('hidden');
    }

    toggleCart() {
        this.cartContainer.classList.toggle('hidden');
    }

    addItem(item) {
        const existingItem = this.items.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...item, quantity: 1 });
        }
        this.updateCartDisplay();
        this.saveCart();
        this.openCart();  // 아이템 추가 시 장바구니 열기
    }

    removeItem(itemId) {
        const itemIndex = this.items.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            if (this.items[itemIndex].quantity > 1) {
                this.items[itemIndex].quantity -= 1;
            } else {
                this.items.splice(itemIndex, 1);
            }
            this.updateCartDisplay();
            this.saveCart();
        }
    }

    updateCartDisplay() {
        this.cartItemsElement.innerHTML = '';
        let total = 0;
        let itemCount = 0;

        this.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span class="item-name">${item.name}</span>
                <span class="item-quantity">x${item.quantity}</span>
                <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            this.cartItemsElement.appendChild(itemElement);
            total += item.price * item.quantity;
            itemCount += item.quantity;
        });

        this.totalElement.textContent = `$${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        this.cartItemCount.textContent = itemCount;
        this.purchaseBtn.disabled = total === 0;
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    clearCart() {
        this.items = [];
        this.updateCartDisplay();
        this.saveCart();
    }

    handlePurchase() {
        if (this.items.length === 0) {
            alert('장바구니가 비어있습니다.');
            return;
        }
        
        alert('구매해주셔서 감사합니다!');
        this.clearCart();
    }
}

// 장바구니 인스턴스 생성
const cart = new Cart();