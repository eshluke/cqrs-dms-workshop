-- order received (start cooking)
insert into diner.kitchen (status) values ('PROCESSING');
insert into diner.orders (status, kitchen_id) values ('OPEN', 1);

-- cooking done
update diner.kitchen
set status = 'DONE',
    updated_at = current_timestamp()
where kitchen_id = 1;

-- delivery started
insert into diner.delivery (status) values ('IN_DELIVERY');
update diner.orders
set delivery_id = 1,
    updated_at = current_timestamp()
where order_id = 1;

-- delivery completed
update diner.delivery
set status = 'DELIVERED',
    updated_at = current_timestamp()
where delivery_id = 1;
update diner.orders
set status = 'CLOSED',
    updated_at = current_timestamp()
where order_id = 1;