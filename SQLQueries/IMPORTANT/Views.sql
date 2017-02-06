
CREATE
	ALGORITHM=UNDEFINED
	DEFINER=`root`@`localhost`
	SQL SECURITY DEFINER VIEW `material_costs` AS
select
	`materials`.`proposal_id` AS `proposal_id`,
	sum(`materials`.`cost`) AS `material_cost`
from `materials`
group by `materials`.`proposal_id`,`materials`.`user_id`;



CREATE
	ALGORITHM=UNDEFINED
	DEFINER=`root`@`localhost`
	SQL SECURITY DEFINER
	VIEW `labor_costs` AS
select
	`l`.`proposal_id` AS `proposal_id`,
	sum(((`l`.`rate` / 3600) * `l`.`time`)) AS `UnitCost`,
	(case when (sum(((1 - (`l`.`yield` / 100)) * `m`.`material_cost`)) < 0)
	then 0 else sum(((1 - (`l`.`yield` / 100)) * `m`.`material_cost`)) end) AS `YieldLoss`
from (`labors` `l` join `material_costs` `m` on((`l`.`proposal_id` = `m`.`proposal_id`)))
group by `l`.`proposal_id`,`l`.`user_id`;
