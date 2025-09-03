
--
--
--
INSERT INTO kanji_reading SELECT literal, '音読み', reading FROM kanji_onyomi;
INSERT INTO kanji_reading SELECT literal, '訓読み', reading FROM kanji_kunyomi;
