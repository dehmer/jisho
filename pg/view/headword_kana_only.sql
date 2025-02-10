
--
--
--
CREATE VIEW headword_kana_only AS
  SELECT DISTINCT seq_no, idx
  FROM   meaning_tag
  WHERE  key = 'misc'
  AND    value = 'uk';
