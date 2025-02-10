
--
--
--
ALTER TABLE headword_reading ADD COLUMN restricted bool NOT NULL DEFAULT false;
ALTER TABLE headword_kanji   ADD COLUMN restricted bool NOT NULL DEFAULT false;
UPDATE headword_reading SET restricted = true WHERE (seq_no, idx) IN (SELECT seq_no, reading_idx FROM restricted_kanji_reading);
UPDATE headword_kanji   SET restricted = true WHERE (seq_no, idx) IN (SELECT seq_no, kanji_idx FROM restricted_kanji_reading);
