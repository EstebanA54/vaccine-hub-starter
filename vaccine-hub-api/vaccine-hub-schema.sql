create table users(
id          serial primary key,
password    Text not null,
email       text not null unique check (position('@' in email) > 1),
first_name   text not null,
last_name    text not null,
location    text not null,
date  timestamp not null default now()
);