static-site-scaffold [![Build Status](https://travis-ci.org/daikiueda/static-site-scaffold.svg?branch=master)](https://travis-ci.org/daikiueda/static-site-scaffold)
====================

静的サイト製作の土台。

```
├── assets
│   ├── css
│   ├── doc
│   ├── font-svg
│   ├── html
│   │   ├── Templates
│   │   ├── boilerplate
│   │   └── fragments
│   ├── js
│   └── test
├── htdocs
└── manager
    ├── grunt
    │   ├── settings
    │   └── tasks
    └── test
```

## feature

### HTML

* 共通テンプレートの一括更新
* &lt;title&gt;, description, keyword, OGPの一括更新（オプション）
* ナビゲーションの一括更新（オプション）
* 構文チェック

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
* スクリーンショットの一括出力
* タスク・メニュー

[:arrow_right: 詳しくはこちら](https://github.com/daikiueda/static-site-scaffold/wiki/Integration)

![「grunt」とタイプするだけ](https://raw.github.com/wiki/daikiueda/static-site-scaffold/images/task_menu_w728.gif)


--------


## セットアップ

### 前提条件

* Git
* Ruby 2.x, Compass
* Java 1.8-
* node.js 0.10.x~, grunt-cli, bower
  * node-gypの実行環境

[:arrow_right: 詳しくはこちら](https://github.com/daikiueda/static-site-scaffold/wiki/Setup)

### 環境構築

```Shell
$ git clone https://github.com/daikiueda/static-site-scaffold.git
$ cd static-site-scaffold/manage/
$ npm install
```

### Start : )

```Shell
$ npm start
```
or
```Shell
$ grunt
```
