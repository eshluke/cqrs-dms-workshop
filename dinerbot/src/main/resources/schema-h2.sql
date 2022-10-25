create schema diner;

create table diner.orders
(order_id bigint PRIMARY KEY auto_increment,
 status varchar(20),
 kitchen_id bigint,
 delivery_id bigint,
 created_at timestamp default current_timestamp(),
 updated_at timestamp default current_timestamp()
);

create table diner.kitchen
(kitchen_id bigint PRIMARY KEY auto_increment,
 status varchar(20),
 created_at timestamp default current_timestamp(),
 updated_at timestamp default current_timestamp()
);

create table diner.delivery
(delivery_id bigint PRIMARY KEY auto_increment,
 status varchar(20),
 created_at timestamp default current_timestamp(),
 updated_at timestamp default current_timestamp()
);