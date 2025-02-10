
--
--
--
ALTER TABLE headword_reading ADD COLUMN hidden bool NOT NULL DEFAULT false;
ALTER TABLE headword_kanji   ADD COLUMN hidden bool NOT NULL DEFAULT false;
UPDATE headword_reading SET hidden = true WHERE (seq_no, idx) IN (SELECT * FROM headword_hidden);
UPDATE headword_kanji   SET hidden = true WHERE (seq_no, idx) IN (SELECT * FROM headword_hidden);
