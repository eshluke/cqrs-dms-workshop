create schema diner;

create table diner.orders_history
(orders_id bigint PRIMARY KEY,
 orders_status varchar(20),
 kitchen_id bigint,
 kitchen_status varchar(20),
 delivery_id bigint,
 delivery_status varchar(20)
);
