SELECT *, HEX(id) FROM evergreendb.users;

SELECT *, HEX(id) FROM evergreendb.proposals;

SELECT *, HEX(id), HEX(proposal_id), HEX(user_id) FROM evergreendb.offers;

INSERT INTO `evergreendb`.`offers` (`id`, `status`, `sga`, `profit`, `overhead`, `service`, `total`, `proposal_id`, `user_id`, `created_at`, `updated_at`) VALUES (UNHEX('E7EE7CCAD8EF11E68C3929A7CD0FE037'), '1', 'SGA', '10', '10', '10', '30', UNHEX('E6EE7CCAD8EF11E68C3929A7CD0FE037'), UNHEX('95C86E50D8E511E68C3929A7CD0FE037'), NOW(), NOW());

SELECT * FROM users JOIN proposals ON users.id = proposals.user_id;

SELECT * from users join offers on users.id = offers.user_id join proposals on proposals.id = offers.proposal_id;

select *, HEX(offer_id) from reports;

INSERT INTO `evergreendb`.`reports` (`id`, `status`, `input`, `output`, `shipping`, `note`, `created_at`, `updated_at`, `user_id`, `offer_id`) VALUES (UNHEX('E9EE3CCAD8EF11E68C3929A7CD0FE012'), '0', '40', '30', 'shipping', 'note', NOW(), NOW(), UNHEX('95C86E50D8E511E68C3929A7CD0FE037'), UNHEX('E7EE7CCAD8EF11E68C3929A7CD0FE037'));

select users.contact AS "user contact", reports.* from users join reports on users.id = reports.user_id;

SELECT HEX(offers.proposal_id) AS 'proposal_id', reports.* FROM proposals JOIN offers on proposals.id = offers.proposal_id JOIN reports ON offers.id = reports.offer_id ORDER BY reports.created_at ASC;