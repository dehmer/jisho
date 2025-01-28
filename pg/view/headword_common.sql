
--
--
--
CREATE VIEW headword_common AS
SELECT DISTINCT seq_no, idx
FROM   headword_tag
WHERE  key = 'rank'
AND    value IN (
           'ichi1'
--         , 'ichi2'
--         , 'news1'
--         , 'news2'
--         , 'spec1'
--         , 'spec2'
       );
