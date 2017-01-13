INSERT INTO users (id,type,company,contact,email,password,created_at,updated_at) VALUES 
(UNHEX(REPLACE(UUID(), '-', '')),1, 'tkw molding gmbh ', 'Dummy', '0@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NOW(),NOW()),
(UNHEX(REPLACE(UUID(), '-', '')),1, 'none', 'Dummy', '1@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NOW(),NOW()),
(UNHEX(REPLACE(UUID(), '-', '')),1, 'hi-p poland', 'Dummy', '2@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NOW(),NOW()),
(UNHEX(REPLACE(UUID(), '-', '')),1, 'pai shing', 'Dummy', '3@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NOW(),NOW()),
(UNHEX(REPLACE(UUID(), '-', '')),1, 'good mark', 'Dummy', '4@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NOW(),NOW()),
(UNHEX(REPLACE(UUID(), '-', '')),1, 'hi-p(xm)', 'Dummy', '5@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NOW(),NOW()),
(UNHEX(REPLACE(UUID(), '-', '')),1, 'yineng', 'Dummy', '6@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NOW(),NOW()),
(UNHEX(REPLACE(UUID(), '-', '')),1, 'ka shui metal co.ltd.', 'Dummy', '7@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NOW(),NOW()),
(UNHEX(REPLACE(UUID(), '-', '')),1, 'flextronics sales & marketing (a-p) ltd.', 'Dummy', '8@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NOW(),NOW()),
(UNHEX(REPLACE(UUID(), '-', '')),1, 'best precision co', 'Dummy', '9@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NOW(),NOW()),
(UNHEX(REPLACE(UUID(), '-', '')),1, 'flex', 'Dummy', '10@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NOW(),NOW()),
(UNHEX(REPLACE(UUID(), '-', '')),1, 'dynacast(dongguan)ltd', 'Dummy', '11@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NOW(),NOW()),
(UNHEX(REPLACE(UUID(), '-', '')),1, 'ka shui metal co. ltd.', 'Dummy', '12@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NOW(),NOW()),
(UNHEX(REPLACE(UUID(), '-', '')),1, 'shenzhen changhong technology co., ltd.', 'Dummy', '13@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NOW(),NOW());


INSERT INTO offers (id, proposal_id, user_id, created_at, updated_at) VALUES 
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT id FROM proposals LIMIT 1), (SELECT id FROM users WHERE company = 'tkw molding gmbh '), NOW(), NOW()),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT id FROM proposals LIMIT 1), (SELECT id FROM users WHERE company = 'none'), NOW(), NOW()),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT id FROM proposals LIMIT 1), (SELECT id FROM users WHERE company = 'hi-p poland'), NOW(), NOW()),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT id FROM proposals LIMIT 1), (SELECT id FROM users WHERE company = 'pai shing'), NOW(), NOW()),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT id FROM proposals LIMIT 1), (SELECT id FROM users WHERE company = 'good mark'), NOW(), NOW()),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT id FROM proposals LIMIT 1), (SELECT id FROM users WHERE company = 'hi-p(xm)'), NOW(), NOW()),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT id FROM proposals LIMIT 1), (SELECT id FROM users WHERE company = 'yineng'), NOW(), NOW()),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT id FROM proposals LIMIT 1), (SELECT id FROM users WHERE company = 'ka shui metal co.ltd.'), NOW(), NOW()),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT id FROM proposals LIMIT 1), (SELECT id FROM users WHERE company = 'flextronics sales & marketing (a-p) ltd.'), NOW(), NOW()),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT id FROM proposals LIMIT 1), (SELECT id FROM users WHERE company = 'best precision co'), NOW(), NOW()),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT id FROM proposals LIMIT 1), (SELECT id FROM users WHERE company = 'flex'), NOW(), NOW()),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT id FROM proposals LIMIT 1), (SELECT id FROM users WHERE company = 'dynacast(dongguan)ltd'), NOW(), NOW()),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT id FROM proposals LIMIT 1), (SELECT id FROM users WHERE company = 'ka shui metal co. ltd.'), NOW(), NOW()),
(UNHEX(REPLACE(UUID(), '-', '')), (SELECT id FROM proposals LIMIT 1), (SELECT id FROM users WHERE company = 'shenzhen changhong technology co., ltd.'), NOW(), NOW());
