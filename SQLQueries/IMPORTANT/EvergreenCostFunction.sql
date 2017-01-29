CREATE DEFINER=`root`@`localhost` FUNCTION `EvergreenCost`(p_id VARCHAR(50),u_id VARCHAR(50)) RETURNS decimal(10,2)
BEGIN
	DECLARE evergreencost decimal(10,2);

	-- Get Total Material cost
	SET @MaterialCost = (SELECT SUM(COSTperKG*weight)
	FROM materials m JOIN material_averages ma ON m.material = ma.material
	WHERE proposal_id = UNHEX(p_id) AND user_id = UNHEX(u_id));

	-- Get Yield Loss Per Part
	SET @YieldLossPerPart =
	(SELECT SUM((1-la.average_yield/100)*@MaterialCost)FROM 
	labors l JOIN labor_averages la ON l.labor = la.labor
	WHERE proposal_id = UNHEX(p_id) AND user_id = UNHEX(u_id));
	 
	 
	-- Get Material Cost Per Part 
	SET @MaterialCostPerPart =
	(SELECT SUM(la.average_rate/3600*la.average_cycle_time) FROM 
	labors l JOIN labor_averages la ON l.labor = la.labor
	WHERE proposal_id = UNHEX(p_id) AND user_id = UNHEX(u_id));

	 
	SET evergreencost = (select quantity*(@MaterialCostPerPart + @YieldLossPerPart) from proposals WHERE id = UNHEX(p_id));
RETURN evergreencost;
END