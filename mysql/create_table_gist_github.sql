CREATE TABLE `github_gist` (
  `gist_id` VARCHAR(255) NOT NULL,
  `gist_url` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `author` VARCHAR(255),
  `author_id` INT unsigned,
  `stars` INT unsigned NOT NULL DEFAULT 0,
  `files` INT unsigned NOT NULL DEFAULT 0,
  `comments` INT unsigned NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`gist_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
