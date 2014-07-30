var _ = require( "lodash" );

function hasModule( moduleName ){
    var module;
    try { module = require.resolve( moduleName ); } catch( e ){}
    return ( module )? true: false;
}

module.exports = {
    task_menu: [
        {
            config: "selectedTask",
            message: "What would you like to do?", 
            type: "list",
            default: "server",
            choices: [
                { name: "ファイル監視とライブ・リロードの開始", value: "server" },
                "---",
                { name: "HTML", value: "MENU_HTML" },
                { name: "CSS", value: "MENU_CSS" },
                { name: "JavaScript", value: "MENU_JS" },
                "---",
                { name: "その他", value: "MENU_OTHER" },
                { name: "メニューの終了", value: "" }
            ]
        },
        {
            config: "selectedTask",
            message: "HTML", 
            type: "list",
            choices: _.flatten( [
                { name: "構文チェック", value: "htmllint" },
                hasModule( "grunt-meta-excel" )?
                    [
                        { name: "<title>，メタ情報の更新", value: "meta_excel" },
                        { name: "ナビゲーションの一括更新", value: "update_nav_excel" },
                        { name: "HTMLの生成", value: "meta_excel::generate" }
                    ]: [],
                "---",
                { name: "戻る", value: "task_menu" },
                { name: "メニューの終了", value: "" }
            ] ),
            when: function( answer ){
                return ( answer.selectedTask === "MENU_HTML" );
            }
        },
        {
            config: "selectedTask",
            message: "CSS", 
            type: "list",
            choices: [
                { name: "Sass/Compassのコンパイル", value: "css" },
                { name: "アイコン用Webfontの生成", value: "webfont" },
                { name: "スタイルガイドの生成", value: "cssdoc" },
                "---",
                { name: "戻る", value: "task_menu" },
                { name: "メニューの終了", value: "" }
            ],
            when: function( answer ){
                return ( answer.selectedTask === "MENU_CSS" );
            }
        },
        {
            config: "selectedTask",
            message: "JavaScript", 
            type: "list",
            choices: [
                { name: "ソースコードの結合・圧縮", value: "js" },
                { name: "テスト", value: "test" },
                { name: "JSDocの生成", value: "jsdoc" },
                "---",
                { name: "戻る", value: "task_menu" },
                { name: "メニューの終了", value: "" }
            ],
            when: function( answer ){
                return ( answer.selectedTask === "MENU_JS" );
            }
        },
        {
            config: "selectedTask",
            message: "その他", 
            type: "list",
            choices: [
                { name: "全体ビルド", value: "build" },
                { name: "スクリーンショットの一括出力", value: "screen_shot" },
                "---",
                { name: "戻る", value: "task_menu" },
                { name: "メニューの終了", value: "" }
            ],
            when: function( answer ){
                return ( answer.selectedTask === "MENU_OTHER" );
            }
        }
    ]
};