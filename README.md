static-site-scaffold [![Build Status](https://travis-ci.org/daikiueda/static-site-scaffold.svg?branch=master)](https://travis-ci.org/daikiueda/static-site-scaffold)
====================

静的サイト製作の土台。

```
├── assets
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

[:arrow_right: 詳しくははこちら](https://github.com/daikiueda/static-site-scaffold/wiki/HTML)

### CSS

* Sass/Compass（*.scss）のコンパイル
* アイコン用Webfontの生成
* スタイルガイドの生成

[:arrow_right: 詳しくはこちら](https://github.com/daikiueda/static-site-scaffold/wiki/CSS)

### JavaScript

* 名前空間の定義
* ソースコードの結合・圧縮
* テスト
  * カバレッジのレポート
* JSDocの生成

[:arrow_right: 詳しくはこちら](https://github.com/daikiueda/static-site-scaffold/wiki/JavaScript)

### Integration

* 全体ビルド
* ファイル監視とライブ・リロード
* タスク・メニュー

[:arrow_right: 詳しくはこちら](https://github.com/daikiueda/static-site-scaffold/wiki/Integration)


--------


## セットアップ

### 前提条件

* Git
* Ruby 2.x, Compass
* node.js 10.x~, grunt-cli, bower
  * node-gypの実行環境

[:arrow_right: 詳しくはこちら](https://github.com/daikiueda/static-site-scaffold/wiki/Setup)

### 環境構築

```Bash
$ git clone https://github.com/daikiueda/static-site-scaffold.git
$ cd static-site-scaffold/assets/
$ npm install
```

### Start : )

```Bash
$ grunt
```
