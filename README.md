# README

## DBの設計

## userテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|mail|string|null: false, unique: true|

### Association
- has_many: groups, through: :group_users
- has_many: group_users
- has_many: massages

## messageテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|references|foreign_key: true|
|user_id|references|foreign_key: true|

### Association
- belongs_to: user
- belongs_to: group

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|

### Association
- has_many: users, through: :group_users
- has_many: group_users
- has_many: messages

## group_usersテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|references|foreign_key: true, null: false|
|user_id|references|foreign_key: true, null: false|

###  Association
- belongs_to: group
- belongs_to: user


This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

