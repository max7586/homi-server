BEGIN;

TRUNCATE
  homi_reviews,
  homi_properties,
  homi_users
  RESTART IDENTITY CASCADE;

INSERT INTO homi_users (user_name, full_name, nickname, password)
VALUES
  ('dunder', 'Dunder Mifflin', null, '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne'),
  ('b.deboop', 'Bodeep Deboop', 'Bo', '$2a$12$VQ5HgWm34QQK2rJyLc0lmu59cy2jcZiV6U1.bE8rBBnC9VxDf/YQO'),
  ('c.bloggs', 'Charlie Bloggs', 'Charlie', '$2a$12$2fv9OPgM07xGnhDbyL6xsuAeQjAYpZx/3V2dnu0XNIR27gTeiK2gK'),
  ('s.smith', 'Sam Smith', 'Sam', '$2a$12$/4P5/ylaB7qur/McgrEKwuCy.3JZ6W.cRtqxiJsYCdhr89V4Z3rp.'),
  ('lexlor', 'Alex Taylor', 'Lex', '$2a$12$Hq9pfcWWvnzZ8x8HqJotveRHLD13ceS7DDbrs18LpK6rfj4iftNw.'),
  ('wippy', 'Ping Won In', 'Ping', '$2a$12$ntGOlTLG5nEXYgDVqk4bPejBoJP65HfH2JEMc1JBpXaVjXo5RsTUu');

INSERT INTO homi_properties (title, image, user_id, content)
VALUES
  ('452 main street, manchester, CT, 06040', 'https://loremflickr.com/750/300/house?random=1', 1, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore incididunt ut labore labore incididunt ut labore.
1560 Sq-Ft 6 Bedrooms 2 Garage 5 Bathroom. FOR SALE.'),
  ('152 main street, hardford, CT, 06020', 'https://loremflickr.com/750/300/house?random=2', 2, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore incididunt ut labore labore incididunt ut labore.
1560 Sq-Ft 6 Bedrooms 2 Garage 5 Bathroom.FOR SALE'),
  ('119 main street, stamford, CT, 06010', 'https://loremflickr.com/750/300/house?random=3', 3, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore incididunt ut labore labore incididunt ut labore.
1560 Sq-Ft 6 Bedrooms 2 Garage 5 Bathroom.FOR RENT'),
  ('972 main street, east-hardford, CT, 06010', 'https://loremflickr.com/750/300/house?random=4', 4, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore incididunt ut labore labore incididunt ut labore.
1560 Sq-Ft 6 Bedrooms 2 Garage 5 Bathroom.FOR SALE'),
  ('385 main street, vernon, CT, 06010', 'https://loremflickr.com/750/300/house?random=5', 5, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore incididunt ut labore labore incididunt ut labore.
1560 Sq-Ft 6 Bedrooms 2 Garage 5 Bathroom.FOR RENT'),
  ('283 main street, winsor, CT, 06010', 'https://loremflickr.com/750/300/house?random=6', 6, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore incididunt ut labore labore incididunt ut labore.
1560 Sq-Ft 6 Bedrooms 2 Garage 5 Bathroom.FOR SALE'),
  ('643 main street, south-winsor, CT, 06044', 'https://loremflickr.com/750/300/house?random=7', 1, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore incididunt ut labore labore incididunt ut labore.
1560 Sq-Ft 6 Bedrooms 2 Garage 5 Bathroom.FOR RENT'),
  ('789 main street, newington, CT, 06010', 'https://loremflickr.com/750/300/house?random=8', 2, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore incididunt ut labore labore incididunt ut labore.
1560 Sq-Ft 6 Bedrooms 2 Garage 5 Bathroom.FOR SALE'),
  ('549 main street, bloomfield, CT, 06010', 'https://loremflickr.com/750/300/house?random=9', 3, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore incididunt ut labore labore incididunt ut labore.
1560 Sq-Ft 6 Bedrooms 2 Garage 5 Bathroom.FOR RENT'),
  ( '149 main street, bolton, CT, 06010', 'https://loremflickr.com/750/300/house?random=10', 4, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore incididunt ut labore labore incididunt ut labore.
1560 Sq-Ft 6 Bedrooms 2 Garage 5 Bathroom.FOR SALE');

INSERT INTO homi_reviews (
  text,
  rating,
  property_id,
  user_id
) VALUES
  (
    'This property is amazing.',
    4,
    1,
    2
  ),
  (
    'Put a bird on it!',
    4,
    1,
    3
  ),
  (
    'All the other reviewers are obviously insane, but this property is actually pretty amazing.',
    5,
    1,
    4
  ),
  (
    'When life gives you lemons, trade them for this property.',
    4,
    1,
    5
  ),
  (
    'This cured my psoriasis, but left me unable to tell the difference between the taste of squash and the concept of increasing.',
    3,
    2,
    6
  ),
  (
    'I think I swallowed a bug.',
    1,
    2,
    1
  ),
  (
    'I have not used it or even seen it, and I do not actually know what it is. I do not know why I am writing this review, how I got here, or what my name is. Three stars!',
    3,
    2,
    3
  ),
  (
    'Ew.',
    1,
    4,
    6
  ),
  (
    'I heard about this one time at band camp.',
    3,
    4,
    4
  ),
  (
    'big time many goodness!!!',
    5,
    10,
    3
  ),
  (
    'Iste, architecto obcaecati tenetur quidem voluptatum ipsa quam!',
    2,
    10,
    5
  ),
  (
    'There are some better properties. There are also some worse properties.',
    3,
    7,
    1
  ),
  (
    'Great holiday present for extraterrestrials (only the kind with the lightbulb heads).',
    4,
    7,
    2
  ),
  (
    'It does not say this on the label, but this property can be used to summon rain on the spring equinox with the proper incantation.',
    3,
    7,
    3
  ),
  (
    'Do not believe the hype!',
    1,
    7,
    4
  ),
  (
    'I would rather have a shoulder rub.',
    3,
    9,
    6
  ),
  (
    'I heard this has lead in it! Run! RRUUUUUUNNNN!',
    1,
    6,
    5
  ),
  (
    'This would not fit inside the cabin of my horse-and-buggy, but it was a useful bribe after the string cheese incident.',
    4,
    6,
    1
  ),
  (
    'Slightly better than waking up deep in the forests of Madagascar and having no idea how you got there, but not THAT much better.',
    3,
    8,
    2
  ),
  (
    'Octopii give it eight tentacles up!',
    5,
    8,
    4
  );

COMMIT;
