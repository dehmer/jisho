
--
--
--
CREATE VIEW kanji_info AS
SELECT    kanji.rank,
          kanji.literal,
          grade,
          'Level ' || level AS kanken,
          njecd_ref."value" AS njecd,
          rtk6_ref."value" AS rtk6,
          '0' || ucs_ref."value" AS ucs,
          onyomi, kunyomi,
          upper('⏵ ' || array_to_string(
            string_to_array(
              COALESCE(njecd_meaning.meaning_txt, kanji_meaning.value), ', '
            ), '  ⏵ '
          )) AS meaning
FROM      kanji
JOIN      kanken USING (literal)
JOIN      kanji_meaning USING (literal)
LEFT JOIN njecd_meaning USING (literal)
LEFT JOIN kanji_tag njecd_ref ON njecd_ref.literal = kanji.literal AND njecd_ref.key = 'reference:halpern_njecd'
LEFT JOIN kanji_tag rtk6_ref  ON rtk6_ref.literal  = kanji.literal AND rtk6_ref.key  = 'reference:heisig6'
LEFT JOIN kanji_tag ucs_ref   ON ucs_ref.literal   = kanji.literal AND ucs_ref.key   = 'codepoint:ucs'
WHERE     language = 'en';