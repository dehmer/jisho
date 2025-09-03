### Prerequisites
#### MeCab
Command line binaries for MeCab part-of-speech and morphological analyzer and `ipadic` dictionary. Note: `unidic` dictionary is currently not supported.
```
  $ sudo port install mecab-utf8 +ipadic
```

#### PostgREST
```sh
# Homebrew
> /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
> echo >> /Users/dehmer/.zprofile
> echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/dehmer/.zprofile
> eval "$(/opt/homebrew/bin/brew shellenv)"

# PostgREST
> brew install postgrest
```