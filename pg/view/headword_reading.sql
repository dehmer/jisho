
--
--
--
CREATE VIEW headword_reading AS
SELECT seq_no, idx, headword_txt AS reading_txt, restriction
FROM   headword WHERE type = 'reading';
