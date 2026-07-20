
document.addEventListener('DOMContentLoaded', () => {
  // Responsive navigation
  const menuToggle = document.querySelector('.menu-toggle');
  const primaryNav = document.querySelector('.nav-links');

  if (menuToggle && primaryNav) {
    const closeMenu = () => {
      primaryNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'M\u1edf menu \u0111i\u1ec1u h\u01b0\u1edbng');
    };

    menuToggle.addEventListener('click', () => {
      const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
      primaryNav.classList.toggle('open', willOpen);
      menuToggle.setAttribute('aria-expanded', String(willOpen));
      menuToggle.setAttribute('aria-label', willOpen ? '\u0110\u00f3ng menu \u0111i\u1ec1u h\u01b0\u1edbng' : 'M\u1edf menu \u0111i\u1ec1u h\u01b0\u1edbng');
    });

    primaryNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.site-header')) closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1100) closeMenu();
    });
  }
  // Lọc sản phẩm
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.product-card[data-category]').forEach(c => {
        c.style.display = (f === 'Tất cả' || c.dataset.category === f) ? '' : 'none';
      });
    });
  });

  // Chọn 2-3 sản phẩm để so sánh
  const compareBoxes = document.querySelectorAll('.compare-checkbox');
  const compareCount = document.getElementById('compareCount');
  const compareMessage = document.getElementById('compareMessage');

  function selectedCompareIds() {
    return Array.from(document.querySelectorAll('.compare-checkbox:checked')).map(i => i.value);
  }

  function updateCompareCount() {
    const ids = selectedCompareIds();
    if (compareCount) compareCount.textContent = `Đã chọn ${ids.length} sản phẩm`;
    if (compareMessage) compareMessage.textContent = '';
    compareBoxes.forEach(box => {
      if (!box.checked && ids.length >= 3) box.disabled = true;
      else box.disabled = false;
    });
  }

  compareBoxes.forEach(box => {
    box.addEventListener('change', () => {
      const ids = selectedCompareIds();
      if (ids.length > 3) {
        box.checked = false;
        if (compareMessage) compareMessage.textContent = 'Chỉ được chọn tối đa 3 sản phẩm để so sánh.';
      }
      updateCompareCount();
    });
  });
  updateCompareCount();

  const goCompare = document.getElementById('goCompare');
  if (goCompare) {
    goCompare.addEventListener('click', () => {
      const ids = selectedCompareIds();
      if (ids.length < 2 || ids.length > 3) {
        compareMessage.textContent = 'Vui lòng chọn từ 2 đến 3 sản phẩm để so sánh.';
        return;
      }
      localStorage.setItem('compareProducts', JSON.stringify(ids));
      location.href = 'compare.html?ids=' + encodeURIComponent(ids.join(','));
    });
  }

  const clearCompare = document.getElementById('clearCompare');
  if (clearCompare) {
    clearCompare.addEventListener('click', () => {
      compareBoxes.forEach(b => b.checked = false);
      localStorage.removeItem('compareProducts');
      updateCompareCount();
    });
  }

  // Trang compare động
  const compareRoot = document.getElementById('compareRoot');
  if (compareRoot && window.RINNAI_PRODUCTS) {
    const params = new URLSearchParams(location.search);
    let ids = params.get('ids') ? params.get('ids').split(',') : [];
    if (!ids.length) {
      try { ids = JSON.parse(localStorage.getItem('compareProducts') || '[]'); } catch(e) { ids = []; }
    }
    if (ids.length < 2) ids = window.RINNAI_PRODUCTS.slice(0, 3).map(p => p.id);
    const selected = ids.map(id => window.RINNAI_PRODUCTS.find(p => p.id === id)).filter(Boolean).slice(0, 3);

    const row = (label, getValue) => `<tr><td>${label}</td>${selected.map(p => `<td>${getValue(p)}</td>`).join('')}</tr>`;
    compareRoot.innerHTML = `
      <table>
        <thead><tr><th>Tiêu chí</th>${selected.map(p => `<th>${p.name}<br><small>${p.code}</small></th>`).join('')}</tr></thead>
        <tbody>
          <tr><td>Hình ảnh</td>${selected.map(p => `<td><img src="assets/images/${p.img}" alt="${p.name}"></td>`).join('')}</tr>
          ${row('Danh mục', p => p.cat)}
          ${row('Giá', p => p.price)}
          ${row('Mô tả', p => p.desc)}
          ${row('Thông số chính', p => p.spec || 'Đang cập nhật')}
          ${row('Thao tác', p => `<a class="btn small" href="product-detail.html?id=${p.id}">Xem chi tiết</a>`)}
        </tbody>
      </table>`;
  }

  // Đại lý mẫu + tìm kiếm + bản đồ
  const dealers = [
    { city:'TP. Hồ Chí Minh', name:'Showroom Rinnai Phú Nhuận', address:'62-64 Lê Văn Sỹ, Phú Nhuận, TP. Hồ Chí Minh', phone:'028 3999 0001', hours:'08:00 - 17:00', map:'Rinnai Phu Nhuan Ho Chi Minh' },
    { city:'TP. Hồ Chí Minh', name:'Đại lý Rinnai Quận 1', address:'Quận 1, TP. Hồ Chí Minh', phone:'028 3999 0002', hours:'08:00 - 20:00', map:'Rinnai Quan 1 Ho Chi Minh' },
    { city:'Hà Nội', name:'Showroom Rinnai Hà Nội', address:'138 Tây Sơn, Đống Đa, Hà Nội', phone:'024 3999 0003', hours:'08:00 - 17:00', map:'Rinnai 138 Tay Son Ha Noi' },
    { city:'Bình Dương', name:'Trung tâm Rinnai Bình Dương', address:'KCN Đồng An, Bình Dương', phone:'0274 3999 0004', hours:'08:00 - 17:00', map:'Rinnai Binh Duong' }
  ];

  const dealerList = document.getElementById('dealerList');
  const dealerMap = document.getElementById('dealerMap');
  function renderDealers(items) {
    if (!dealerList) return;
    dealerList.innerHTML = items.map(d => `
      <article class="dealer-card">
        <h3>${d.name}</h3>
        <p><strong>Địa chỉ:</strong> ${d.address}</p>
        <p><strong>Hotline:</strong> ${d.phone}</p>
        <p><strong>Giờ mở cửa:</strong> ${d.hours}</p>
        <div class="dealer-actions">
          <a class="btn small" href="tel:${d.phone.replace(/\s/g,'')}">Gọi điện</a>
          <a class="btn small outline" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.map)}">Chỉ đường</a>
        </div>
      </article>
    `).join('');
  }
  renderDealers(dealers);

  const dealerForm = document.getElementById('dealerForm');
  if (dealerForm) {
    dealerForm.addEventListener('submit', e => {
      e.preventDefault();
      const city = document.getElementById('dealerCity').value;
      const keyword = document.getElementById('dealerKeyword').value.toLowerCase().trim();
      let result = dealers.filter(d => (!city || d.city === city) && (!keyword || d.address.toLowerCase().includes(keyword) || d.name.toLowerCase().includes(keyword)));
      if (!result.length) result = dealers;
      renderDealers(result);
      const msg = document.getElementById('dealerMessage');
      if (msg) msg.textContent = `Tìm thấy ${result.length} đại lý phù hợp.`;
      if (dealerMap && result[0]) dealerMap.src = `https://www.google.com/maps?q=${encodeURIComponent(result[0].map)}&output=embed`;
    });
  }

  // Validate + thông báo gửi form thành công mô phỏng
  document.querySelectorAll('.js-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const msg = form.querySelector('.form-message');
      if (!form.checkValidity()) {
        if (msg) msg.textContent = 'Vui lòng nhập đầy đủ và đúng thông tin bắt buộc.';
        form.reportValidity();
        return;
      }
      if (msg) msg.textContent = 'Thông tin đã được ghi nhận. Bộ phận hỗ trợ sẽ liên hệ lại.';
      form.reset();
    });
  });
});
