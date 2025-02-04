
--
--
--
CREATE TABLE entity (
  key text NOT NULL,
  value text NOT NULL,
  description text NOT NULL
);

--
--
--
INSERT INTO entity VALUES
  ('pos', 'v1', '一段動詞'),
  ('pos', 'v1-s', '一段動詞 - ~くれる special class'),
  ('pos', 'v5aru', '五段動詞 - ~ある special class'),
  ('pos', 'v5b', '五段動詞 - ぶ ending'),
  ('pos', 'v5g', '五段動詞 - ぐ ending'),
  ('pos', 'v5k', '五段動詞 - く ending'),
  ('pos', 'v5k-s', '五段動詞 - いく/ゆく special class'),
  ('pos', 'v5m', '五段動詞 - む ending'),
  ('pos', 'v5n', '五段動詞 - ぬ ending'),
  ('pos', 'v5r', '五段動詞 - る ending'),
  ('pos', 'v5r-i', '五段動詞 - る ending (irregular verb)'),
  ('pos', 'v5s', '五段動詞 - す ending'),
  ('pos', 'v5t', '五段動詞 - つ ending'),
  ('pos', 'v5u', '五段動詞 - う ending'),
  ('pos', 'v5u-s', '五段動詞 - う ending (special class)'),
  ('pos', 'v5k', 'kuru verb - special class'),
  ('pos', 'v5k', 'kuru verb - special class'),
  ('pos', 'vn', 'irregular nu verb'),
  ('pos', 'vr', 'irregular ru verb, plain form ends with -ri'),
  ('pos', 'vs-s', 'suru verb - special class'),
  ('misc', 'uk', 'word usually written using kana alone'),
  ('inf', 'ateji', 'ateji (phonetic) reading'),
  ('inf', 'gikun', 'gikun (meaning as reading) or jukujikun (special kanji reading)'),
  ('inf', 'ik', 'word containing irregular kana usage'),
  ('inf', 'iK', 'word containing irregular kanji usage'),
  ('inf', 'io', 'irregular okurigana usage'),
  ('inf', 'oK', 'word containing out-dated kanji or kanji usage'),
  ('inf', 'ok', 'out-dated or obsolete kana usage'),
  ('inf', 'rK', 'rarely-used kanji form'),
  ('inf', 'sK', 'search-only kanji form'),
  ('inf', 'sk', 'search-only kana form')
;
