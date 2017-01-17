INSERT INTO users (id, type,company,contact,email,password,created_at,updated_at) 
VALUES (UNHEX(REPLACE(UUID(), '-', '')),1, 'Dummy', 'Dummy', 'dummy@dummy.com','$2a$10$kq9/Z90q2fX8rDN0vKfTNuEVpGoJYVJ/SUHLyFn4avW5g7v3D4zE6',NOW(),NOW());


INSERT INTO proposals (id, info, created_at, updated_at, user_id) 
VALUES (UNHEX(REPLACE(UUID(), '-', '')), 'dummy', NOW(), NOW(), (select id from users LIMIT 1));


INSERT INTO offers (id, proposal_id, user_id, created_at, updated_at)
VALUES (UNHEX(REPLACE(UUID(), '-', '')), (select id from proposals), (select id from users LIMIT 1), NOW(), NOW());