
--
--
--
CREATE VIEW meanings_ger AS
WITH meaning_groups AS (
  SELECT seq_no, idx, ARRAY_AGG(meaning_txt) AS xs
  FROM   meaning
  WHERE  LANGUAGE = 'ger'
  GROUP  BY seq_no, idx
  ORDER  BY seq_no, idx
)
SELECT seq_no,
       (row_number() OVER (PARTITION BY seq_no)) AS idx,
       array_to_string(xs, ', ') AS meaning_txt
FROM   meaning_groups;
