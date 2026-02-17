-- Jalankan file ini sekali untuk setup database
-- mysql -u root -p last_class_db < backend/db/schema.sql

CREATE DATABASE IF NOT EXISTS last_class_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE last_class_db;

CREATE TABLE IF NOT EXISTS messages (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(50)   NOT NULL,
  role        VARCHAR(50)   NOT NULL DEFAULT 'MENFES',
  initial     VARCHAR(5)    NOT NULL,
  color       VARCHAR(80)   NOT NULL,
  text        TEXT          NOT NULL,
  is_anon     TINYINT(1)    NOT NULL DEFAULT 0,
  ip_hash     VARCHAR(64)   NOT NULL COMMENT 'SHA-256 dari IP untuk keperluan moderasi',
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;