CREATE DATABASE IF NOT EXISTS UK07;

USE UK07;

CREATE TABLE submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    message VARCHAR(255) NOT NULL unique,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM submissions;

DELETE FROM submissions
where id = '87';
DROP TABLE submissions;

INSERT INTO submissions (name, message) VALUES
('Albert Einstein', 'Imagination is more important than knowledge.'),
('Mark Twain', 'The secret of getting ahead is getting started.'),
('Oscar Wilde', 'Be yourself; everyone else is already taken.'),
('Maya Angelou', 'If you’re always trying to be normal, you will never know how amazing you can be.'),
('Steve Jobs', 'Stay hungry. Stay foolish.'),
('Winston Churchill', 'Success is not final, failure is not fatal: it is the courage to continue that counts.'),
('Eleanor Roosevelt', 'The future belongs to those who believe in the beauty of their dreams.'),
('Confucius', 'It does not matter how slowly you go as long as you do not stop.'),
('Dalai Lama', 'Happiness is not something ready made. It comes from your own actions.'),
('Luca Probst', 'Water is wet.'),
('Dr. Seuss', 'Don’t cry because it’s over, smile because it happened.');

ALTER TABLE submissions
ADD COLUMN likes INT DEFAULT 0,
ADD COLUMN dislikes INT DEFAULT 0;

UPDATE submissions
SET dislikes = 1871435
WHERE id = 86;

