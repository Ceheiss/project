INSERT INTO users (username, password_hash) 
VALUES 
('john_doe', 'hashed_password_123'),
('jane_smith', 'hashed_password_456'),
('martial_artist', 'hashed_password_789');


INSERT INTO notes (user_id, discipline, date, techniques, feel_rating, insights)
VALUES 
(1, 'bjj', '2024-12-01', 'armbar, triangle', 2, 'Focus on hip movement for triangle.'),
(1, 'boxing', '2024-12-02', 'jab, cross', 3, 'Good speed, need to work on footwork.'),
(2, 'muay_thai', '2024-12-03', 'teep, roundhouse kick', 1, 'Balance was off during kicks.'),
(2, 'bjj', '2024-12-04', 'kimura, guillotine', 2, 'Timing was much better this session.'),
(3, 'boxing', '2024-12-05', 'hook, uppercut', 3, 'Land more power in uppercut.'),
(3, 'bjj', '2024-12-06', 'mount escape, armbar', 4, 'Best session yet, everything clicked.');
