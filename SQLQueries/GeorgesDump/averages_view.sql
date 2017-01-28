CREATE VIEW `labor_averages` AS
    SELECT 
        `labors`.`labor` AS `labor`,
        AVG(`labors`.`rate`) AS `average_rate`,
        AVG(`labors`.`yield`) AS `average_yield`
    FROM
        `labors`
    GROUP BY `labors`.`labor`