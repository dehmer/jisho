
--
-- Merge Kanken with Kanji readings.
--
WITH cte AS (
  SELECT literal, reading,
         CASE
           WHEN class IS NULL THEN '小'
           ELSE class
         END AS class
  FROM   kanken_reading
)
UPDATE kanji_reading
SET    kanken = TRUE,
       class = cte.class
FROM   cte
WHERE  cte.literal = kanji_reading.literal
AND    cte.reading = kanji_reading.reading;

--
-- Drop temporary table.
--
DROP TABLE kanken_reading;
