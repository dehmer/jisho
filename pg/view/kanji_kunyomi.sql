
--
--
--
CREATE VIEW kanji_kunyomi AS
SELECT DISTINCT
       literal,
       regexp_split_to_table(replace(kunyomi, '-', ''), ', ') reading
FROM   kanji;
