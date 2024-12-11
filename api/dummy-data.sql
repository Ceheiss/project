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


INSERT INTO notes (user_id, discipline, date, techniques, feel_rating, insights)
VALUES 
-- January 2024
(4, 'bjj', '2024-01-03 09:30:00', 'armbar, triangle', 3, 'Focus on keeping tight control during transitions.'),
(4, 'kickboxing', '2024-01-05 17:00:00', 'jab, cross', 2, 'Speed was decent; footwork needs improvement.'),
(4, 'bjj', '2024-01-10 10:45:00', 'mount escape', 4, 'Successfully escaped 5 out of 6 attempts.'),
(4, 'kickboxing', '2024-01-15 18:15:00', 'teep kick, roundhouse', 3, 'Land more consistent roundhouse kicks.'),
(4, 'bjj', '2024-01-22 08:50:00', 'kimura, armbar', 1, 'Struggled with gripping during kimura setup.'),
(4, 'kickboxing', '2024-01-28 16:20:00', 'hook, uppercut', 4, 'Strong hook today, uppercuts need more power.'),

-- February 2024
(4, 'bjj', '2024-02-01 09:15:00', 'rear-naked choke', 3, 'Need to secure hooks before choke.'),
(4, 'kickboxing', '2024-02-06 17:40:00', 'spinning back kick, jab', 2, 'Struggled with balance during back kicks.'),
(4, 'bjj', '2024-02-11 11:30:00', 'triangle, omoplata', 4, 'Good flow between transitions.'),
(4, 'kickboxing', '2024-02-18 18:30:00', 'combos: jab-cross, teep kick', 3, 'Focus on improving combo timing.'),
(4, 'bjj', '2024-02-25 10:10:00', 'leg lock entries', 0, 'Poor entries, need to rewatch instructional.'),
(4, 'kickboxing', '2024-02-28 15:50:00', 'footwork drills', 3, 'Stepping felt smooth; maintain rhythm.'),

-- March 2024
(4, 'bjj', '2024-03-02 09:00:00', 'guard retention', 4, 'Solid retention; focus on framing.'),
(4, 'kickboxing', '2024-03-05 16:45:00', 'roundhouse, spinning kick', 3, 'Strong spinning kicks today.'),
(4, 'bjj', '2024-03-10 10:00:00', 'arm drag, back take', 2, 'Drill needs more speed.'),
(4, 'kickboxing', '2024-03-14 17:30:00', 'combo: cross-uppercut', 1, 'Cross lacked power; focus on form.'),
(4, 'bjj', '2024-03-20 11:00:00', 'guard passing drills', 4, 'Dynamic movement, great results.'),

-- April to December 2024
(4, 'kickboxing', '2024-04-03 17:10:00', 'knee strike, teep', 3, 'Keep working on distance control.'),
(4, 'bjj', '2024-04-12 10:20:00', 'butterfly guard sweeps', 3, 'Struggled against heavier partners.'),
(4, 'kickboxing', '2024-04-25 18:00:00', 'combinations', 4, 'Great speed and accuracy during combos.'),

-- May 2024
(4, 'bjj', '2024-05-03 09:30:00', 'armbar, triangle', 3, 'Focus on keeping tight control during transitions.'),
(4, 'kickboxing', '2024-05-05 17:00:00', 'jab, cross', 2, 'Speed was decent; footwork needs improvement.'),
(4, 'bjj', '2024-05-10 10:45:00', 'mount escape', 4, 'Successfully escaped 5 out of 6 attempts.'),
(4, 'kickboxing', '2024-05-15 18:15:00', 'teep kick, roundhouse', 3, 'Land more consistent roundhouse kicks.'),
(4, 'bjj', '2024-05-22 08:50:00', 'kimura, armbar', 1, 'Struggled with gripping during kimura setup.'),
(4, 'kickboxing', '2024-05-28 16:20:00', 'hook, uppercut', 4, 'Strong hook today, uppercuts need more power.'),

-- June 2024
(4, 'bjj', '2024-06-01 09:15:00', 'rear-naked choke', 3, 'Need to secure hooks before choke.'),
(4, 'kickboxing', '2024-06-06 17:40:00', 'spinning back kick, jab', 2, 'Struggled with balance during back kicks.'),
(4, 'bjj', '2024-06-11 11:30:00', 'triangle, omoplata', 4, 'Good flow between transitions.'),
(4, 'kickboxing', '2024-06-18 18:30:00', 'combos: jab-cross, teep kick', 3, 'Focus on improving combo timing.'),
(4, 'bjj', '2024-06-25 10:10:00', 'leg lock entries', 0, 'Poor entries, need to rewatch instructional.'),
(4, 'kickboxing', '2024-06-28 15:50:00', 'footwork drills', 3, 'Stepping felt smooth; maintain rhythm.'),

-- July 2024
(4, 'bjj', '2024-07-02 09:00:00', 'guard retention', 4, 'Solid retention; focus on framing.'),
(4, 'kickboxing', '2024-07-05 16:45:00', 'roundhouse, spinning kick', 3, 'Strong spinning kicks today.'),
(4, 'bjj', '2024-07-10 10:00:00', 'arm drag, back take', 2, 'Drill needs more speed.'),
(4, 'kickboxing', '2024-07-14 17:30:00', 'combo: cross-uppercut', 1, 'Cross lacked power; focus on form.'),
(4, 'bjj', '2024-07-20 11:00:00', 'guard passing drills', 4, 'Dynamic movement, great results.'),

-- August 2024
(4, 'bjj', '2024-08-01 09:15:00', 'rear-naked choke', 3, 'Need to secure hooks before choke.'),
(4, 'kickboxing', '2024-08-06 17:40:00', 'spinning back kick, jab', 2, 'Struggled with balance during back kicks.'),
(4, 'bjj', '2024-08-11 11:30:00', 'triangle, omoplata', 4, 'Good flow between transitions.'),
(4, 'kickboxing', '2024-08-18 18:30:00', 'combos: jab-cross, teep kick', 3, 'Focus on improving combo timing.'),
(4, 'bjj', '2024-08-25 10:10:00', 'leg lock entries', 0, 'Poor entries, need to rewatch instructional.'),
(4, 'kickboxing', '2024-08-28 15:50:00', 'footwork drills', 3, 'Stepping felt smooth; maintain rhythm.'),

-- September 2024
(4, 'bjj', '2024-09-02 09:00:00', 'guard retention', 4, 'Solid retention; focus on framing.'),
(4, 'kickboxing', '2024-09-05 16:45:00', 'roundhouse, spinning kick', 3, 'Strong spinning kicks today.'),
(4, 'bjj', '2024-09-10 10:00:00', 'arm drag, back take', 2, 'Drill needs more speed.'),
(4, 'kickboxing', '2024-09-14 17:30:00', 'combo: cross-uppercut', 1, 'Cross lacked power; focus on form.'),
(4, 'bjj', '2024-09-20 11:00:00', 'guard passing drills', 4, 'Dynamic movement, great results.'),

-- October to December 2024
(4, 'kickboxing', '2024-10-03 17:10:00', 'knee strike, teep', 3, 'Keep working on distance control.'),
(4, 'bjj', '2024-10-12 10:20:00', 'butterfly guard sweeps', 3, 'Struggled against heavier partners.'),
(4, 'kickboxing', '2024-10-25 18:00:00', 'combinations', 4, 'Great speed and accuracy during combos.'),

-- November 2024
(4, 'bjj', '2024-11-03 09:30:00', 'armbar, triangle', 3, 'Focus on keeping tight control during transitions.'),
(4, 'kickboxing', '2024-11-05 17:00:00', 'jab, cross', 2, 'Speed was decent; footwork needs improvement.'),
(4, 'bjj', '2024-11-10 10:45:00', 'mount escape', 4, 'Successfully escaped 5 out of 6 attempts.'),
(4, 'kickboxing', '2024-11-15 18:15:00', 'teep kick, roundhouse', 3, 'Land more consistent roundhouse kicks.'),
(4, 'bjj', '2024-11-22 08:50:00', 'kimura, armbar', 1, 'Struggled with gripping during kimura setup.'),
(4, 'kickboxing', '2024-11-28 16:20:00', 'hook, uppercut', 4, 'Strong hook today, uppercuts need more power.'),

-- December 2024
(4, 'bjj', '2024-12-01 09:15:00', 'rear-naked choke', 3, 'Need to secure hooks before choke.'),
(4, 'kickboxing', '2024-12-06 17:40:00', 'spinning back kick, jab', 2, 'Struggled with balance during back kicks.'),
(4, 'bjj', '2024-12-11 11:30:00', 'triangle, omoplata', 4, 'Good flow between transitions.'),
(4, 'kickboxing', '2024-12-18 18:30:00', 'combos: jab-cross, teep kick', 3, 'Focus on improving combo timing.'),
(4, 'bjj', '2024-12-25 10:10:00', 'leg lock entries', 0, 'Poor entries, need to rewatch instructional.'),
(4, 'kickboxing', '2024-06-28 15:50:00', 'footwork drills', 3, 'Stepping felt smooth; maintain rhythm.');

