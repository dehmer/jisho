
--
--
--
CREATE VIEW headword_bookmark AS
SELECT headword.*, tag_key, tag_value
FROM   bookmark
JOIN   headword
       ON seq_no = (REGEXP_SPLIT_TO_ARRAY(key, '[:/]'))[2]::int
       AND idx = (REGEXP_SPLIT_TO_ARRAY(key, '[:/]'))[3]::int
WHERE  position('headword' IN key) <> 0;
