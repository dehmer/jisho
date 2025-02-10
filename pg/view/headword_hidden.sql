
--
--
--
CREATE VIEW headword_hidden AS
  SELECT seq_no, idx
  FROM   headword_tag
  WHERE  key = 'inf'
  AND    value IN (
          'sk', -- search-only kana form
          'sK', -- search-only kanji form
          'rK', -- rarely-used kanji form
          'ok', -- out-dated or obsolete kana usage
          'oK', -- word containing out-dated kanji or kanji usage
          'ik', -- word containing irregular kana usage
          'iK'  -- word containing irregular kanji usage
        );
