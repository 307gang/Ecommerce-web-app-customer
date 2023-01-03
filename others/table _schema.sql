create table users(
	uuid varchar(36),
    email varchar(100) unique not null,
    password varchar(100) not null,
    admin boolean not null,
    
    primary key (uuid)
);

create table customers(
    uuid varchar(36),
    full_name varchar(100),
    phone_number varchar(11),
    address varchar(1000),
    create_date date,
    user_avt varchar(200),
    banned boolean,

    primary key (uuid),
    foreign key (uuid) references users(uuid)
);

create table admins(
    uuid varchar(36),
    full_name varchar(100),
    phone_number varchar(11),
    primary key (uuid),
    foreign key (uuid) references users(uuid)
); 

create table brands(
    brand_id varchar(4),
    brand_name varchar(100),
    create_date date,

    primary key (brand_id)
);

create table products(
    product_id varchar(6),
    product_name varchar(100),
    brand_id varchar(4),
    description text,
    created_date date,
    price float,
    product_image varchar(200),
    product_stock int, 
    hidden boolean,

    primary key (product_id),
    foreign key(brand_id) references brands(brand_id)
);

create table product_image( -- bảng ảnh phụ sản phẩm
    product_id varchar(6),
    image_link varchar(200),

    primary key (product_id, image_link),
    foreign key (product_id) references products(product_id)
);

create table carts (
    customer_id varchar(36),
    product_id varchar(6),
    quantity int,

    primary key (customer_id, product_id);
    foreign key(customer_id) references customers(uuid)
    foreign key (product_id) references products(product_id)
);

create table orders(
	order_id varchar(4),
    order_name varchar(100),
    description text,
    customer_id varchar(6),
    status int,
    create_date date,

    primary key (order_id),
    foreign key(customer_id) references customers(uuid)
); 

create table categories(
    category_id varchar(4),
    category_name varchar(100),

    primary key (category_id)
);

create table category_product (
    category_id varchar(4),
    product_id varchar(6),

    primary key (category_id, product_id),
    foreign key (category_id) references categories(category_id),
    foreign key (product_id) references products(product_id)

);

create table order_product(
	order_id varchar(4),
    product_id varchar(4),
    product_quantity int,
    product_size varchar(2),

    primary key (order_id, product_id),
    foreign key (order_id) references orders(order_id),
    foreign key (product_id) references products(product_id)
);

create table comments (
    product_id varchar(6),
    customer_id varchar(36),
    comment text,
    create_date date,

    primary key (product_id, customer_id),
    foreign key (product_id) references products(product_id),
    foreign key (customer_id) references customers(uuid)
);
