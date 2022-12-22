insert into brands ( brand_id,brand_name ,create_date) values
('1','Adidas','2020/12/10'),
('2','Nike','2020/12/10'),
('3','Zara','2020/12/10'),
('4','Viettien','2020/12/10');

insert into categories(category_id,category_name) values
('1','Áo'),
('2','Quần'),
('3','Váy'),
('4','Đầm');

insert into products (product_id,product_name , brand_id, description, created_date, price, product_image, product_stock, hidden) values
('001','Áo thun xanh mint','1','Hàng Việt Nam dành cho người Việt nam chất lượng cao','2022/10/22','300','/asset/img/ao-thun1.jpg','20',false),
('002','Quần jeans đen','1','danh cho nguoi gay','2022/10/22','350','/asset/img/quan-jean1.jpg','20',false),
('003','Váy JK xanh biển','2','Được may từ vải cotton chất lượng cao','2022/10/22','200','/asset/img/vay-jk1.jpg','20',false),
('004','Váy Sunflower','2','Váy sịn sò mặc vào là xinh nhé','2022/10/22','950','/asset/img/dam-hoa.jpg','20',false),
('005','Quần short xám','3','Nam nữ đều có thể mặc','2022/10/22','230','/asset/img/quan-short1.jpg','20',false),
('006','Áo blazer nâu','3','Mặc cùng quần âu và áo sơ mi là hết sảy','2022/10/22','500','/asset/img/ao-blazer1.jpg','20',false),
('007','Áo Vest xanh biển','4','Trông bạn sẽ hòa mình vào biển cả nếu mặc chiếc vest này','2022/10/22','1500','/asset/img/ao-vest1.jpg','20',false),
('008','Quần kaki xanh đen','4','Sự kết hợp tuyệt vời của màu xanh và màu đen khiến bạn ngon giai hơn','2019/10/22','600','/asset/img/quan-kaki1.jpg','20',false),
('009','Áo hoodie unisex','1','Áo khoác ấm áp dành cho cả nam và nữ','2019/10/22','350','/asset/img/ao-hoodie-unisex.jpg ','20',false),
('010','Áo tank top nam','1','Tôn lên vẻ đàn ông và cơ bắp của bạn','2019/11/21','500','/asset/img/ao-tank-top.jpg','20',false),
('011','Đầm dạ hội cao cấp','3','Những người phụ nữ trong bộ trang phục này sẽ trở nên quyễn rũ hơn','2020/1/1','1000','/asset/img/dam-da-hoi.jpg','20',false),
('012','Quần jogger nữ cực chất','2','Chất chơi người dơi với giá cả phải chăng','2020/1/1','300','/asset/img/quan-jogger-nu-cuc-chat.jpg','21',false),
('013','Chân váy xếp ly','4',' Váy thiết kế kiểu dáng thời trang, có kèm đai xinh','2020/1/1','350','/asset/img/chan-vay-xep-ly.jpg','20',false),
('014','Quần short nam đen','2','Quần short nam màu đen chất vải wdven cao cấp mới nhất ','2020/1/1','400','/asset/img/quan-short-nam-den.jpg','20',false);

insert into category_product (category_id,product_id ) values
('1','001'),
('2','002'),
('3','003'),
('4','004'),
('2','005'),
('1','006'),
('1','007'),
('2','008'),
('1','009'),
('1','010'),
('4','011'),
('2','012'),
('3','013'),
('2','014');