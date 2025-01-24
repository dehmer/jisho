
--
--
--
CREATE VIEW headword_common AS
SELECT DISTINCT seq_no
FROM   headword_tag
WHERE  key = 'rank'
AND    value IN ('news1', 'ichi1');
