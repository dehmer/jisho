sed '/xml:lang="rus"/d' data/JMdict | \
  sed '/xml:lang="spa"/d' | \
  sed '/xml:lang="dut"/d' | \
  sed '/xml:lang="fre"/d' | \
  sed '/xml:lang="slv"/d' | \
  sed '/xml:lang="swe"/d' | \
  sed '/xml:lang="hun"/d' > data/JMdict-ger
