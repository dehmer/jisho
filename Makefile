NAME = jisho
VERSION = $(shell cat .version)
SCRIPT = $(NAME)--$(VERSION).sql

$(SCRIPT): \
	pg/table/entity.sql \
	pg/table/kanji.sql \
	pg/view/kanji_joyo.sql \
	pg/view/kanji_yomi.sql \
	pg/table/kanji_tag.sql \
	pg/table/kanji_meaning.sql \
	pg/table/radical.sql \
	pg/table/radical_variant.sql \
	pg/table/sentence.sql \
	pg/table/translation.sql \
	pg/table/token.sql \
	pg/table/headword.sql \
	pg/table/headword_tag.sql \
	pg/table/meaning.sql \
	pg/table/meaning_tag.sql \
	pg/table/krad.sql \
	pg/table/deck.sql \
	pg/function/fn_kanji.sql \
	pg/data/kanji.sql \
	pg/data/kanji_tag.sql \
	pg/kanji/tag_joyjo.sql \
	pg/kanji/tag_jinmeiyo.sql \
	pg/view/headword_common.sql \
	pg/view/headword_kanji.sql \
	pg/view/headword_reading.sql \
	pg/data/jlpt_shirabe.sql \
	pg/data/kanji_meaning.sql \
	pg/data/radical.sql \
	pg/data/radical_variant.sql \
	pg/data/sentence.sql \
	pg/data/translation.sql \
	pg/data/token.sql \
	pg/data/headword.sql \
	pg/data/headword_tag.sql \
	pg/data/meaning.sql \
	pg/data/meaning_tag.sql \
	pg/data/krad.sql \
	pg/table/sentence_rank.sql \
	pg/data/deck.sql \
	pg/table/bookmark.sql \
	pg/view/headword_bookmark.sql \
	pg/view/kanji_bookmark.sql
	cat $^ > $@

pg/data/kanji.sql \
pg/data/kanji_tag.sql \
pg/data/kanji_meaning.sql \
pg/data/radical.sql \
pg/data/radical_variant.sql:
	bin/kanjidic2.js

pg/data/headword.sql \
pg/data/headword_tag.sql \
pg/data/meaning.sql \
pg/data/meaning_tag.sql:
	bin/JMdict.js

pg/data/jlpt_shirabe.sql:
	bin/jlpt_shirabe.js

pg/data/sentence.sql pg/data/translation.sql:
	bin/sentence.js

pg/data/token.sql:
	bin/mecab.js

pg/data/krad.sql:
	bin/krad.js

pg/data/deck.sql:
	bin/deck.js

.PHONY: clean
clean:
	rm -f pg/data/*.sql
	rm -f ${SCRIPT}
