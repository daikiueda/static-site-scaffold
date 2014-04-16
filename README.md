static-site-scaffold
====================

静的サイト制作の土台。

```
├── assets
│   ├── configurations
│   ├── css
│   ├── js
│   ├── metadata
│   ├── tasks
│   └── test
└── htdocs
    ├── Templates
    └── __modules
```


## HTML

### DreamWeaverテンプレート

* `analytics.dwt`  
  Google Analyticsの計測タグなど、ページデザインに関わらない要素を一元管理します。

  * `base.dwt`  
    ヘッダーやフッター、グローバルナビゲーションなど、サイトデザインの共通要素を一元管理します。

    * `contents_page.dwt`  
      ナーカルナビゲーションなど、コンテンツページに共通する要素を一元管理します。

### 構文チェック

HTML5対応の構文チェックサービス「[validator.nu](http://validator.nu/)」と同等のチェックを、
htdocs以下のすべてのhtmlファイルを対象に実行します。

```Bash
$ grunt htmllint
```
> https://www.npmjs.org/package/grunt-html ( https://validator.github.io/ )

### &lt;title&gt;, description, keyword, OGPの一括更新

サイトマップ（Excelファイル）の内容にあわせて、htmlファイル中の情報を更新します。

```Bash
$ grunt meta_excel

# special function!
# サイトマップに示されたパスにhtmlファイルが存在しない場合、ファイルを生成します。
$ grunt meta_excel::generate
```
> https://www.npmjs.org/package/grunt-meta-excel


## CSS

### Sass/Compass（*.scss）のコンパイル

```Bash
$ grunt css
```
> https://www.npmjs.org/package/grunt-contrib-compass


## JavsScript

### ソースコードの結合・圧縮

```Bash
$ grunt js
```
> https://www.npmjs.org/package/grunt-contrib-uglify

### 名前空間の定義

`assets/js/common/siteScript/$.namespace.js`は名前空間の定義を標準化します。

名前空間を要する機能を実装する場合に、以下のように記述できます。  
※前述の$.namespace.jsの内容が先に実行されるようにファイルを構成する必要があります。

```JavaScript
$.namespace( "siteScript.utils" );

( function( siteScript ){
    "use strict";

    siteScript.utils.testFunction = function(){
        console.log( "this is test." );
    };

    $( function(){
        siteScript.utils.testFunction();
    } );
} )( $.namespace.getRoot() );
```

名前空間の内容をグローバルスコープに展開する必要がある場合は、
$.namespace.js（の処理をふくむjsファイル）を読み込む&lt;script&gt;要素に、
`data-namespace`属性として任意の変数名を記述してください。

```HTML
<script src="common/js/common.js" data-namespace="sampleSite"></script>
```

### JSDocの生成

```Bash
$ grunt jsdoc
```
> https://github.com/krampstudio/grunt-jsdoc ( http://usejsdoc.org )


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

> https://github.com/gruntjs/grunt-contrib-watch  
https://github.com/gruntjs/grunt-contrib-connect

### なんだかんだで、これのコマンド↓だけ覚えておけば大丈夫 : )

タスクをメニューから選べます。

```Bash
$ grunt
```
> https://github.com/dylang/grunt-prompt

__Enjoy!!__

--------


## セットアップ

### 前提条件

* gitプロトコルでの通信に対応していること。  
  通信ポートがふさがれている場合は、以下のようなgitの設定ファイル「```.gitconfig```」を  
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
からのー
```Bash
$ grunt
```
