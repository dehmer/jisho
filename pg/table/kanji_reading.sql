
--
-- Redundant to kanji onyomi/kunyomi CSV readings,
-- but with additional kanken reading information.
--
CREATE TABLE kanji_reading (
  literal text,
  type text,
  reading text,
  kanken boolean DEFAULT false,
  class text DEFAULT '小' -- 中, 高
);