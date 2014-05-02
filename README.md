static-site-scaffold [![Build Status](https://travis-ci.org/daikiueda/static-site-scaffold.svg?branch=master)](https://travis-ci.org/daikiueda/static-site-scaffold)
====================

静的サイト製作の土台。

```
├── assets
│   ├── conf
│   ├── css
│   ├── doc
│   ├── font-svg
│   ├── js
│   ├── tasks
│   └── test
└── htdocs
    ├── Templates
    └── __modules
```

## feature

### HTML

* DreamWeaverテンプレート
* 構文チェック
* &lt;title&gt;, description, keyword, OGPの一括更新（オプション）
* ナビゲーションの一括更新（オプション）

[詳細はこちら](https://github.com/daikiueda/static-site-scaffold/wiki/HTML)

### CSS

* Sass/Compass（*.scss）のコンパイル
* アイコン用Webfontの生成
* スタイルガイドの生成

[詳細はこちら](https://github.com/daikiueda/static-site-scaffold/wiki/CSS)

### JavaScript

* 名前空間の定義
* ソースコードの結合・圧縮
* テスト
  * カバレッジのレポート
* JSDocの生成

[詳細はこちら](https://github.com/daikiueda/static-site-scaffold/wiki/JavaScript)


## Totally easy coding!

### Sass/CompassのコンパイルやJavaScriptの圧縮を、ひととおり実行する。

```Bash
$ grunt build
```

### scssやjsが更新されるつど、自動的にコンパイルして、ブラウザをリロード！

```Bash
$ grunt server
```

終了は、```Ctrl + c```。

> https://www.npmjs.org/package/grunt-contrib-watch  
https://www.npmjs.org/package/grunt-contrib-connect

### なんだかんだで、このコマンド↓だけ覚えておけば大丈夫 : )

タスクをメニューから選べます。

```Bash
$ grunt
```
> https://www.npmjs.org/package/grunt-prompt

__Enjoy!!__

--------


## セットアップ

### 前提条件

* gitプロトコルでの通信に対応していること。  
  ポートがふさがれている場合は、以下のようなgitの設定ファイル「```.gitconfig```」を  
  ユーザーホームディレクトリに設置することで、対応可能です。
  ```
  [url "https://"]
    insteadOf = git://
  ```

* __[node.js](http://nodejs.org/)__  
  ※Macユーザーの方には[nodebrew](https://github.com/hokaccha/nodebrew)オススメです。
  * __grunt-cli__ ```$ (sudo) npm install grunt-cli -g```
  * __bower__ ```$ (sudo) npm install bower -g```

* __Compass__ ```$ (sudo) gem install compass```

#### Windowsの場合、さらに以下が必要です。

* [Git](http://git-scm.com/downloads)  
  ※インストール時のオプションで、[コマンドラインからの実行を有効にする](http://bower.io/#a-note-for-windows-users)必要があります。
* [Ruby v1.9.3](http://rubyinstaller.org/downloads/)
* [Python v2.7.x](http://www.python.jp/download/)
* [Microsoft Visual Studio Express 2013](http://www.microsoft.com/ja-jp/download/details.aspx?id=40787) （または同等のコンパイル環境）

### 環境構築

```Bash
$ git clone https://github.com/daikiueda/static-site-scaffold.git
$ cd static-site-scaffold/assets/
$ npm install
```
からの
```Bash
$ grunt
```

#### オプション

* サイトマップ（Excelファイル）連携の機能を利用する場合は、  
  grunt-meta-excelモジュールをインストールする。
  
  ```Bash
  $ npm install grunt-meta-excel
  ```
