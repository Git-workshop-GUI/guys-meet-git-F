$(function(){

	var _stage = $("#interview");

	var bg01 = $("#entry_top .bg_img");
	var bg02 = $("#entry_bottom .bg_img");

	var _eblock = $("#interview .wrap > div");
	var currentNum;
	var viewID = false;
	var hum_id = [
		"yamazaki",
		"yamada",
		"kinoshiro",
		"koyasu",
		"murakami"
	]
	/*
	var _enginnerBox = function(){

			"<div class='p_box'>"
				"<p class='p_pic'><img src=" + 'img/yamazaki.jpg' + "alt=" + 'CTO 山崎 大輔' + "title=" + 'CTO 山崎 大輔' + "></p>"
				"<div class='p_text'>"
					"<h3 class='p_name'><span>" + CTO + "</span>" 山崎 大輔 "</h3>"
				"</div>"
				"<div class='arrow_right'></div>"
			"</div>"
	}
	クラス名.fn.メソッド名 = function(){
	}
	*/
	/*---------------------------*/
	/*event*/
	/*---------------------------*/

	/* 背景画像伸縮 */
	$(window).on("resize",function(){
		bgPosSetting($(bg01));
		bgPosSetting($(bg02));
	});

	/* リスト時のクリックイベント */
	function onClickPerson(target){

		$(target).on("click", function(){
			offClickPerson(target);
			currentNum =$(this).index();
			viewDetail();
		});
	}

	function offClickPerson(target){
		$(target).off("click");
	}

	/* 詳細時のクリックイベント */
	function onMiniList(target){
		$(target).on("click", function(){
			offMiniList(target);
			currentNum =$(this).index();
			readData(hum_id[currentNum], $(".detail"));
		});
	}
	function offMiniList(target){
		$(target).off("click");
	}
	function onCloseBtn(target){
		$(target).on("click", function(){
			offCloseBtn(target);
			offMiniList(target);
			viewList();
		});
	}
	function offCloseBtn(target){
		$(target).off("click");
	}


	/*---------------------------*/
	/*data*/
	/*---------------------------*/

	/* 山崎氏 */
	var yamazaki_history = [
		["1998年","Yahooにて広告システムのテクニカルリードをとり、インターネット広告業界　の初期を支える"],
		["2006年","株式会社スケールアウト設立 代表取締役に就任。月間1200億アクセスを超えるオンライン広告システム「ScaleoutAdPlatform」の開発に従事"],
		["2013年","mediba社の買収により同社CTOに就任"],
	]
	var _yamazaki = {
		"post":"CTO",
		"name":"山崎 大輔",
		"img_path":"img/yamazaki.jpg",
		"history":yamazaki_history,
		"comment":"私達はauポータル、auスマートパスなどKDDIグループのインターネットビジネスを支えるべく、日々チャレンジしています。スマホ時代に突入し、既存ビジネスをインターネットが飲み込んでいくそんな時代の当事者になってみませんか？"
	}

	/* 山田氏 */
	var yamada_history = [
		["0000年","Yahooにて、カレンダー、フォト、動画投稿サービスの開発に従事"],
		["2007年","mediba入社。フィーチャーフォンADNW、スマートフォンADNWの立ち上げ、au属性を利用したターゲティング広告の商品化、RTB導入、業務改善など広告システム開発全般に関わる"],
		["2013年","メディア事業本部に異動。auスマートパスを中心としたmedibaが受け持つ全auサービスの開発/運営を牽引"],
	]
	var _yamada = {
		"post":"システムエンジニア（部長）",
		"name":"山田 浩和",
		"img_path":"img/yamada.jpg",
		"history":yamada_history,
		"comment":"1000万会員を抱えるauスマートパスなどやりがいのあるサービスは多数あります。新しい技術も積極的に取り入れていますので、チャレンジ出来る領域はたくさんあります。medibaの新しい技術文化を一緒に作って行きましょう。"
	}

	/* 木代氏 */
	var kinoshiro_history = [
		["2005年","Yahoo!Japanソーシャルネット事業部にてオンラインストレージサービス、写真共有サービス(Flickr等)など、日本人には未だ早すぎたSNSサービスの開発を従事。その後、SocialPhotoPlatform開発、Yahoo!ボックスのサービス立ち上げ、StoragePlatformシステムディレクションなどマルチでサービス開発を牽引"],
		["2010年","SNSに飽き、モバイル広告に興味を持ちmedibaへ入社。広告システム部にてモバイル広告配信システム全般の開発を担当。外注メインだった開発体制から内製化を推進"],
		["2013年","メディア事業本部に異動。auスマートパスのサービス全般の開発担当を経て、現在はプラットフォーム開発チームを牽引・内製化を爆進中！"],
	]
	var _kinoshiro = {
		"post":"システムエンジニア（副部長）",
		"name":"木代 尊",
		"img_path":"img/kinoshiro.jpg",
		"history":kinoshiro_history,
		"comment":"広告からメディアに来た1年半前、内製エンジニアは10人に満たない絶望的な状況でした。それが僅かな期間で今では何倍にも組織が拡大しエンジニアスキルも少しずつ向上しています。auサービスの急速な拡大によって、これからもmedibaの開発体制はどんどん大規模になっていくと思います。ただし、規模は大きくなっても、スピードは落とせません。その為には、サービス開発を支えるプラットフォーム、開発基盤の拡充が重要と考えています。今後ますます増大するインフラチームの役割、それを担うための仲間が必要です！Web業界はもちろんのこと、他業界からも色々な経験者の方に来て頂きたいと思っています。変化に恐れず新しい事をどんどんやってみたいエンジニア！一緒にmedibaを盛り上げていきましょう！"
	}

	/* 子安氏 */
	var koyasu_history = [
		["2007年","(レストランのウェイター、不動産の飛び込み営業、インターネットプロバイダのテレオペレータを経て) エンジニアに。検索・レコメンドエンジンを手がけるベンチャー他数社に主力エンジニアとして勤務"],
		["2013年","medibaに入社。経験を活かしプロジェクトチームを改革しつつ、社内外の勉強会を開催するなどして学ぶ雰囲気を盛り上げている。得意技は燕返し"]
	]
	var _koyasu = {
		"post":"システムエンジニア（GL）",
		"name":"子安 輝",
		"img_path":"img/koyasu.jpg",
		"history":koyasu_history,
		"comment":"入社以来、新しいポリシー・手法・ツールなど良いものはどんどん取り入れていますが、まだまだ充分とは言えません。一緒に個人/チームの開発技術を更に伸ばしていってくれる仲間が必要です。medibaで、面白くて皆のためになる仕事をしませんか?"
	}

	/* 村上氏 */
	var murakami_history = [
		["2011年","業務系のシステム開発会社を経て株式会社サイバーエージェント入社。スマートフォン向けコミュニティサービスの新規立ち上げに従事。HTML/CSS/JavaScriptといったフロントエンド全般を担当し、サービスのレスポンスやUX向上に取り組み、技術革新を行う"],
		["2014年","medibaに入社。auスマートパスサービスのフロントエンドを担当。他のフロントエンド担当を牽引していきながら、フロント側の仕組み・構造を創造的破壊を企てている"]
	]
	var _murakami = {
		"post":"フロントエンドエンジニア",
		"name":"村上 沙織",
		"img_path":"img/murakami.jpg",
		"history":murakami_history,
		"comment":"medibaでは、現在のスキルにとらわれず、様々な領域にチャレンジできる環境があります。いろんなことにチャレンジしたい、新しい技術を試したいなど、そんな気持ちの方、是非一緒にmedibaを盛り上げていきませんか？"
	}

	var _data = {
		"yamazaki": _yamazaki,
		"yamada": _yamada,
		"kinoshiro": _kinoshiro,
		"koyasu": _koyasu,
		"murakami": _murakami
	}

	/*---------------------------*/
	/*function*/
	/*---------------------------*/

	/* 画面に合わせて画像伸縮 */
	function bgPosSetting(target){
		var m_top = $(target).height() / -2;
		var m_left = $(target).width() / -2;
		$(target).css({"marginTop":m_top+ "px"});
		$(target).css({"marginLeft":m_left+ "px"});
	}

	/* 配列から情報取得 */
	function readData(e_name, target){
		var d = _data[e_name];
		var d_h = d["history"];

		/*-- html組み立てる --*/
		var h_name = "<h3 class='p_name'><span>" + d["post"] + "</span>" + d["name"] + "</h3>"; // 名前
		var h_list = "<h4 class='p_subtitle'>略歴</h4><dl class='p_history_list'>";　// 略歴
		for (var i = 0; i < d_h.length; i++) {
			h_list += "<dt>" + d_h[i][0] + "</dt>";
			h_list += "<dd>" + d_h[i][1] + "</dd>";
		};
		h_list += "</dl>";
		var h_comment = "<h4 class='p_subtitle'>応募者へひとこと</h4><p class='p_comment_text'>" + d["comment"] + "</p>"; //　コメント

		/*------------------*/
		if(viewID){
			$(t_pic).animate({opacity:"0"},{complete:function(){
					$(t_pic).find("img").attr("src", d["img_path"]);
				$(t_pic).animate({opacity:"1"});
			}})
		}else{
			viewID = true;
		}

		$(target).animate({opacity:"0"},{complete:function(){
			deleteData(target);
			$(target).append(h_name + h_list + h_comment);
			$(target).animate({opacity:"1"},{complete:function () {
				setMiniList(p_box);
			}})
		}})
	}

	function deleteData(target){
		$(target)[0].innerHTML = "";
	}

	/* リスト　->　詳細 */

	var t_box;
	var p_box;
	var t_text;
	var t_name;
	var t_pic;

	function viewDetail(){
		//みんな消す
		for (var i = 0; i < _eblock.length; i++) {
			if(i != currentNum){
				target = _eblock[i];
				$(target).transition({ scale: 0.8, opacity: 0 }, 500, 'easeOutCubic');
			}
		};

		t_box = _eblock[currentNum];
		p_box = $(t_box).find(".p_box");
		t_text = $(t_box).find(".p_text");
		t_name = $(t_box).find(".p_name");
		t_pic = $(t_box).find(".p_pic");

		//名前消える
		$(t_text).animate({
			"opacity":0
		}, 150);
		$(t_box).find(".arrow_right").animate({
			"opacity":0
		}, 150);

		//枠大きくなる
		$(t_box).delay(200).animate({
			"position":"relative",
			"top": "0px",
			"left": "0px",
			"width": "960px",
			"height": "auto",
			"paddingBottom": "180px",
		});
		$(p_box).delay(200).animate({
			"width": "100%",
			"height": "600px",
			"borderRadius":"0",
			"borderWidth": "0",
			"paddingBottom": "80px"
		});
		$(t_pic).delay(200).animate({
			"width": "286px",
			"height": "462px",
			"marginTop": "40px",
			"marginLeft": "40px",
			"borderRadius":"0"
		}, {complete:function(){
			$(this).css({"float": "left"});

			//内容表示する
			$(t_text).addClass("detail");

			readData(hum_id[currentNum], $(".detail"));

		}});

		$(t_box).find(".p_pic").find("img").delay(200).animate({
			"width":"286px"
		});
	}

	var m_navi_instance = $(".hide nav").clone();
	var c_btn_instance = $(".hide .close_btn").clone();
	var t_list;
	var _t_btns;
	var c_btn;

	function setMiniList(target_box){

		$(target_box).append(m_navi_instance);
		$(target_box).append(c_btn_instance);
		t_list = $(target_box).find("nav");
		_t_btns = $(t_list).find("li");
		c_btn = $(target_box).find(".close_btn");

		var count = 0;

		for (var i = 0; i < _t_btns.length; i++) {
			var target = _t_btns[i];

			if(i !== currentNum){

				//console.log("---------------------");
				var one_margin = $(t_list).width() / (_t_btns.length);
				var half_margin = one_margin / 2;
				var l_pos = one_margin*count + half_margin + ($(target).width()/2);
				//console.log("---------------------");

				$(target).css({
					"display":"block",
					"left": l_pos + "px"
				});

				count++;
			}else{
				$(target).css({display:"none"});
			}
		};

		onMiniList($(_t_btns));
		onCloseBtn($(c_btn));
		$(t_list).css({"opacity":1});
		$(c_btn).css({"opacity":1,"display":"block"});

	}


	/* 詳細 -> リスト　*/
	function viewList(){

		//いろいろ消える準備
		$(t_list).animate({"opacity":0},{complete:function() {
			console.log($(this));
			$(this).remove();
		}});
		$(c_btn).animate({"opacity":0},{complete:function() {
			$(this).remove();
		}});
		$(t_text).animate({"opacity":0},{complete:function() {
			$(this).removeClass("detail");
			$(this).find(".p_subtitle").remove();
			$(this).find(".p_history_list").remove();
			$(this).find(".p_comment_text").remove();
		}});

		//枠小さくなる
		$(t_box).delay(200).animate({
			"position":"absolute",
			"top": "0px",
			"left": "120px",
			"width": "auto",
			"height": "auto",
			"paddingBottom": "0px",
		});
		$(p_box).delay(200).animate({
			"width": "300px",
			"height": "300px",
			"borderRadius":"10px",
			"borderWidth": "2px",
			"paddingBottom": "0"
		});
		$(t_pic).delay(200).animate({
			"width": "200px",
			"height": "200px",
			"marginTop": "20px",
			"borderRadius":"100px"
		}, {complete:function(){
			$(this).css({"float": "none","marginLeft": "auto"});
			$(t_text).animate({
				"opacity":1
			}, 150);
			$(t_box).find(".arrow_right").animate({
				"opacity":1
			}, 150);
		}});

		$(t_box).find(".p_pic").find("img").delay(200).animate({
			"width":"200px"
		});
	}


	bgPosSetting($(bg01));
	bgPosSetting($(bg02));

	onClickPerson($(_eblock));



});
