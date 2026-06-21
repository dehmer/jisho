
--
--
--
CREATE VIEW kanji_jinmeiyo AS
SELECT *
FROM   kanji
WHERE  grade in (9, 10);
