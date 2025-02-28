

--
--
--
CREATE VIEW kanji_flashcard AS
WITH compound AS (
  SELECT seq_no, idx, literal,
         headword.reading_txt, headword.kanji_txt,
         ROW_NUMBER() OVER (PARTITION BY literal ORDER BY rank) ord_no
  FROM   kanji_bookmark
  JOIN   headword USING (seq_no, idx)
), selected_compound AS (
  SELECT seq_no, idx, literal,
         reading_txt, kanji_txt
  FROM   compound
  WHERE  ord_no <= 6
), meaning AS (
  SELECT seq_no,
         meaning_txt,
         ROW_NUMBER() OVER (PARTITION BY seq_no ORDER BY idx) AS ord_no
  FROM   meaning
  WHERE  language = 'ger'
), selected_meaning AS (
  SELECT seq_no, array_to_string(array_agg(meaning_txt), '; ') AS meaning_txt
  FROM   meaning
  WHERE  ord_no <= 3
  GROUP  BY seq_no
), compound_entry AS (
  SELECT literal, kanji_txt, reading_txt, meaning_txt,
         ROW_NUMBER() OVER (PARTITION BY literal) AS ord_no
  FROM   selected_compound
  JOIN   selected_meaning USING (seq_no)
  ORDER  BY literal
)
SELECT    kanji_info.*
          , ce1.kanji_txt AS compound_1, ce1.reading_txt AS compound1_reading, ce1.meaning_txt AS compound1_meaning
          , ce2.kanji_txt AS compound_2, ce2.reading_txt AS compound2_reading, ce2.meaning_txt AS compound2_meaning
          , ce3.kanji_txt AS compound_3, ce3.reading_txt AS compound3_reading, ce3.meaning_txt AS compound3_meaning
          , ce4.kanji_txt AS compound_4, ce4.reading_txt AS compound4_reading, ce4.meaning_txt AS compound4_meaning
          , ce5.kanji_txt AS compound_5, ce5.reading_txt AS compound5_reading, ce5.meaning_txt AS compound5_meaning
          , ce6.kanji_txt AS compound_6, ce6.reading_txt AS compound6_reading, ce6.meaning_txt AS compound6_meaning
FROM      kanji_info
JOIN      compound_entry ce1 USING (literal)
LEFT JOIN compound_entry ce2 ON ce2.literal = ce1.literal AND ce2.ord_no = 2
LEFT JOIN compound_entry ce3 ON ce3.literal = ce1.literal AND ce3.ord_no = 3
LEFT JOIN compound_entry ce4 ON ce4.literal = ce1.literal AND ce4.ord_no = 4
LEFT JOIN compound_entry ce5 ON ce5.literal = ce1.literal AND ce5.ord_no = 5
LEFT JOIN compound_entry ce6 ON ce6.literal = ce1.literal AND ce6.ord_no = 6
WHERE     ce1.ord_no = 1
ORDER     BY rank;
