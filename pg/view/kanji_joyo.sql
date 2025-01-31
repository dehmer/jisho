
--
--
--
CREATE VIEW kanji_joyo AS
SELECT *
FROM   kanji
WHERE  grade in (1, 2, 3, 4, 5, 6, 8);
