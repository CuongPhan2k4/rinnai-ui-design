# Rinnai High-Fidelity Website

Website giao diện high-fidelity cho đề tài thiết kế giao diện website giới thiệu và bán sản phẩm gia dụng thương hiệu Rinnai.

## Công nghệ sử dụng

- HTML5
- CSS3
- JavaScript
- Bootstrap CDN
- Responsive layout
- Netlify deploy

## Chức năng đã bổ sung

- Lọc sản phẩm theo danh mục.
- Chọn 2–3 sản phẩm trên `products.html` rồi bấm So sánh.
- `compare.html` hiển thị bảng so sánh động theo sản phẩm đã chọn.
- `dealers.html` có tìm kiếm đại lý mẫu, danh sách đại lý, iframe bản đồ Google Maps, nút gọi điện và chỉ đường.
- `contact.html` có validate form và thông báo ghi nhận mô phỏng.
- `warranty.html` có validate form yêu cầu bảo hành và thông báo ghi nhận mô phỏng.
- Các form có thêm thuộc tính Netlify Forms để có thể ghi nhận khi deploy trên Netlify.

## Cấu trúc thư mục

```text
rinnai_high_fidelity_website/
├── index.html
├── about.html
├── products.html
├── gas-stove.html
├── water-heater.html
├── kitchen-appliances.html
├── product-detail.html
├── compare.html
├── dealers.html
├── warranty.html
├── news.html
├── contact.html
├── assets/
│   ├── images/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── main.js
│       └── products-data.js
└── README.md
```

## Cách chạy

Mở file `index.html` bằng trình duyệt hoặc deploy lên Netlify.
