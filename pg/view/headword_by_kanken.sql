
--
--
--
CREATE VIEW headword_by_kanken AS
SELECT seq_no, headword.idx, reading_txt, kanji_txt,
       kanken_idx, rank, meanings_ger.idx AS no,
       meaning_txt
FROM   headword
JOIN   headword_common USING (seq_no)
JOIN   meanings_ger USING (seq_no)
ORDER  BY rank;
