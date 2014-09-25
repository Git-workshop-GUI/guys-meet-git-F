$(function(){

	var _stage = $("#interview");
	var showcase = $("#interview .wrap");

	var bg01 = $("#entry_top .bg_img");
	var bg02 = $("#entry_bottom .bg_img");

	var _eblock = [];
	var currentNum;
	var viewID = false;

	var hum_id = [
		"yamazaki",
		"yamada",
		"kinoshiro",
		"koyasu",
		"murakami"
	]
	var hum_pos = [
		[10,120],
		[10,540],
		[340,0],
		[340, 330],
		[340, 660]
	]

	var _enginnerBox = function(humanID){
		var text = "<div class='p_box'><p class='p_pic'><img src='" + _d.img(humanID) + "' alt=" + _d.post(humanID) + _d.name(humanID) + "title=" + _d.post(humanID) + _d.name(humanID) + "></p>"+"<div class='p_text'>" + "<h3 class='p_name'><span>" + _d.post(humanID) + "</span>" + _d.name(humanID) + "</h3>" + "</div>" + "<img src='img/icon_arrow.png' class='arrow_right' width='14' height='22'>" + "</div>";
		var obj = $(text);
		return obj;
	}

	var e_appear = function(target,pos){
		$(target).css({
			"top": pos[0],
			"left": pos[1],
			opacity: 0 /*,
			WebkitTransform: 'scale(0.9)',
			MozTransform: 'scale(0.9)',
			OTransform: 'scale(0.9)',
			msTransform: 'scale(0.9)' 
			*/
		});
		var o = $(target).appendTo($(showcase));
		_eblock.push(o);

		$(o).delay(500).transition({ /*scale: 1,*/ opacity: 1 }, 500, 'easeOutCubic');
		$(o).on({"click":function(){
			offClickPerson($(o));
			stopTimer();
			currentNum =$(this).index();
			viewDetail();
		},"mouseenter":function(){
			setTimer(listHover,$(this).index())
		},"mouseleave":function(){
			stopTimer();
		}});
	}

	var e_hide = function(target){
		$(target).transition({ scale: 0.8, opacity: 0 }, 250, 'easeInCubic', function() {
			$(this).remove();
		});
	}

	var t_box;
	var p_box;
	var t_text;
	var t_name;
	var t_pic;

	var zoomIn = function(){
		t_box = _eblock[currentNum];
		p_box = $(t_box).find(".p_box");
		t_text = $(t_box).find(".p_text");
		t_name = $(t_box).find(".p_name");
		t_pic = $(t_box).find(".p_pic");

		//名前消える
		$(t_text).animate({
			"opacity":0
		}, 200);

		$(t_box).find(".arrow_right").animate({
			"opacity":0
		}, 200);

		var d_time = 600;
		var m_time = 400;

		$(t_box).css({"cursor":"default","position":"relative"});

		$(t_box).delay(d_time).animate({
			"top": "0px",
			"left": "0px",
			"width": "960px",
			"paddingBottom": "180px",
			"borderRadius":"0"
		},{complete:function(){
			$(this).css({"borderBottom":"0px"});
		}}, m_time, "easeOutQuad");

		$(t_pic).delay(d_time).animate({
			"width": "286px",
			"height": "462px",
			"marginTop": "40px",
			"marginLeft": "40px",
			"borderRadius":"0"
		},{complete:function(){
			$(this).css({"float": "left"});

			$(t_text).addClass("detail");
			e_change(t_box, currentNum);

		}}, m_time, "easeOutQuad");

		$(t_box).find(".p_pic").find("img").delay(d_time).animate({
			"width":"286px"
		}, m_time, "easeOutQuad");

	}

	var e_change = function(target,humanID){

		/*-- html組み立てる --*/
		var h_name = "<h3 class='p_name'><span>" + _d.post(humanID) + "</span>" + _d.name(humanID) + "</h3>"; // 名前
		var h_list = "<h4 class='p_subtitle'>略歴</h4><dl class='p_history_list'>";　// 略歴

		_hdata = _d.history(humanID);
		for (var i = 0; i < _d.h_amount(humanID); i++) {
			h_list += "<dt>" + _hdata["year"][i] + "</dt>";
			h_list += "<dd>" + _hdata["topic"][i] + "</dd>";
		};
		h_list += "</dl>";

		var h_comment = "<h4 class='p_subtitle'>応募者の皆さんへメッセージ</h4><p class='p_comment_text'>" + _d.comment(humanID) + "</p>"; //　コメント


		if(viewID){
			$(t_pic).animate({opacity:"0"},{complete:function(){
				$(t_pic).find("img").attr("src", _d.img(humanID));
				$(t_pic).animate({opacity:"1"});
			}})
		}

		var change_target = $(target).find(".p_text");

		if(viewID) resetUI();

		$(change_target).animate({opacity:"0"},{complete:function(){

			e_dataDelete(change_target);
			$(change_target).append(h_name + h_list + h_comment);

			var _element = $(change_target).children();
			$(_element).css({opacity:"0"});
			$(change_target).css({opacity:"1"});
			
			for (var i = 0; i < _element.length; i++) {
				var s = $(_element)[i];
				$(s).css({opacity:"0"});
				$(s).delay(i*150).animate({opacity:"1"}, i* 250);
			};
			if(!viewID) setUI(target);
		}})
	}

	var e_dataDelete = function(target){
		$(target)[0].innerHTML = "";
	}


	/*---------------------------*/


	/*event*/


	/*---------------------------*/

	/* 背景画像伸縮 */
	$(window).on("resize",function(){
		bgPosSetting($(bg01));
		bgPosSetting($(bg02));
	});

	/* hover */
	$("a.entry_btn").on({
		'mouseenter':function(){
			$(this).css({
				"backgroundColor":"#25afa4",
				"borderColor":"#227871"
			})
		},
		"mouseleave":function(){
			$(this).css({
				"backgroundColor":"#0da69a",
				"borderColor":"#0a6962",
				"color":"#fff"
			})
		},
		"mousedown":function(){
			$(this).css({
				"marginTop":"2px",
				"borderWidth":"2px",
				"color":"#f3f3f3",
				"backgroundColor":"#0c9e93",
				"borderColor":"#0a645d"
			})
		},
		"mouseup":function(){
			$(this).css({
				"backgroundColor":"#25afa4",
				"borderColor":"#227871",
				"marginTop":"0px",
				"borderWidth":"3px",
				"color":"#fff"
			})
		}
	});


	/* リスト時のクリックイベント */

	var timer;
	var target_h;

	var setTimer = function(callback, h_ID){
		target_h = h_ID;
		callback();
		timer = setInterval( callback, 1000);
	}
	var stopTimer = function(){
		clearInterval(timer);
	}
	var listHover = function(){
		var _btns = $("#interview .arrow_right");
		var target = _btns[target_h];
		$(target).animate({"right": "10px" }, {complete:function(){
			$(target).animate({"right": "17px"}, 500, "easeOutQuint")
		}}, 500, "easeOutQuint");
	}
	var minlistHover = function(){
		var _btns = $(t_box).find(".arrow_top");
		var target = _btns[target_h];

		$(target).animate({"top": "5px" }, {complete:function(){
			$(target).animate({"top": "0px"}, 300, "easeOutQuint")
		}}, 300, "easeOutQuint");
	}


	function onClickPerson(target){
		$(target).on({"click": function(){
			offClickPerson(target);
			currentNum =$(this).index();
			viewDetail();
			},"mouseenter":function(){
			},"mouseleave":function(){
			}
		});
	}
	function offClickPerson(target){
		$(target).off("click mouseenter mouseleave");
	}
	/* 詳細時のクリックイベント */
	function onMiniList(target){
		$(target).on({"click":function(){
			offMiniList(target);
			stopTimer();
			var i_head = $("#interview").offset();
			$('html,body').animate({ scrollTop: i_head.top }, 500, 'easeOutCubic');
			currentNum = $(this).index();
			e_change(t_box, currentNum);
		},"mouseenter":function(){
			setTimer(minlistHover,$(this).index())
		},"mouseleave":function(){
			stopTimer();
		}});
	}
	function offMiniList(target){
		$(target).off("click mouseenter mouseleave");
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

	var _memberData = function(){

		/* 山崎氏 -------------------------- */
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

		/* 山田氏 -------------------------- */
		var yamada_history = [
			["2003年","Yahoo入社。カレンダー、フォト、動画投稿サービスの開発に従事"],
			["2007年","mediba入社。フィーチャーフォンADNW、スマートフォンADNWの立ち上げ、au属性を利用したターゲティング広告の商品化、RTB導入、業務改善など広告システム開発全般に関わる"],
			["2013年","メディア事業本部に異動。4月メディアシステム開発部副部長、10月には部長へ就任。auスマートパスを中心としたmedibaが受け持つ全auサービスの開発/運営を牽引"],
		]
		var _yamada = {
			"post":"システムエンジニア（部長）",
			"name":"山田 浩和",
			"img_path":"img/yamada.jpg",
			"history":yamada_history,
			"comment":"1000万会員を抱えるauスマートパスなどやりがいのあるサービスは多数あります。新しい技術も積極的に取り入れていますので、チャレンジ出来る領域はたくさんあります。medibaの新しい技術文化を一緒に作って行きましょう。"
		}

		/* 木代氏 -------------------------- */
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

		/* 子安氏 -------------------------- */
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

		/* 村上氏 -------------------------- */
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

		_data = {
			"yamazaki": _yamazaki,
			"yamada": _yamada,
			"kinoshiro": _kinoshiro,
			"koyasu": _koyasu,
			"murakami": _murakami
		}
	}

	_memberData.prototype.post = function(humanID){
		var target = hum_id[humanID];
		var _post = _data[target].post;

		return _post;
	}
	_memberData.prototype.name = function(humanID){
		var target = hum_id[humanID];
		var _name = _data[target].name;

		return _name;
	}
	_memberData.prototype.img = function(humanID){
		var target = hum_id[humanID];
		var _img = _data[target].img_path;

		return _img;
	}
	_memberData.prototype.history = function(humanID){
		var target = hum_id[humanID];
		var _year = []
		var _topic = []

		for (var i = 0; i < _data[target]["history"].length ; i++) {
			_year.push(_data[target]["history"][i][0]);
			_topic.push(_data[target]["history"][i][1]);
		};

		var _history = {
			"year": _year,
			"topic": _topic
		}

		return _history;
	}
	_memberData.prototype.h_amount = function(humanID){
		var target = hum_id[humanID];

		return _data[target]["history"].length;
	}
	_memberData.prototype.comment = function(humanID){
		var target = hum_id[humanID];
		var _comment = _data[target].comment;

		return _comment;
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

	/* リスト　->　詳細 */

	function viewDetail(){

		for (var i = 0; i < _eblock.length; i++) {
			var target = _eblock[i];
			offClickPerson(target);

			if(i != currentNum){
				e_hide($(target));
			}else{
				zoomIn();
			}
		};

	}

	/* 詳細 -> リスト　*/
	function viewList(){
		
		$(t_box).transition({ scale: 0.8, opacity: 0 }, 500, 'easeOutCubic', function() {
			$(this).remove();

			initSetting();
		});

	}

	var m_navi_instance = $(".hide nav").clone();
	var c_btn_instance = $(".hide .close_btn").clone();
	var n;
	var c;
	var _t_btns;
	var c_btn;

	function setUI(target_box){
		n = $(m_navi_instance).appendTo($(target_box));
		c = $(c_btn_instance).appendTo($(target_box));

		_t_btns = $(n).find("li");

		var count = 0;

		for (var i = 0; i < _t_btns.length; i++) {

			var target = _t_btns[i];
			onMiniList($(_t_btns)[i]);

			if(i !== currentNum){

				var one_margin = $(n).width() / (_t_btns.length);
				var half_margin = one_margin / 2;
				var l_pos = one_margin*count + half_margin + ($(target).width()/2);

				$(target).css({
					"display":"block",
					"opacity":"1",
					"top":"10px",
					"left": l_pos + "px"
				});

				count++;
			}else{
				$(target).css({display:"none","opacity":0, "top":"20px"});
			}
		};

		$(n).animate({"opacity":1});
		$(c).css({"display":"block","opacity":"0"});
		$(c).animate({"opacity":1},{complete:function(){
			onCloseBtn($(c));
			viewID = true;
		}});

	}

	function resetUI(){
		
		var count = 0;

		for (var i = 0; i < _t_btns.length; i++) {

			var target = _t_btns[i];
			offMiniList($(_t_btns)[i]);

			if(i !== currentNum){

				var one_margin = $(n).width() / (_t_btns.length);
				var half_margin = one_margin / 2;
				var l_pos = one_margin*count + half_margin + ($(target).width()/2);

				$(target).css({"display":"block"});
				$(target).animate({"left": l_pos + "px"}).animate({"opacity":1,"top": "10px"});
				onMiniList($(_t_btns)[i]);

				count++;

			}else{
				$(target).animate({display:"none","opacity":0, "top": "20px"},{complete:function(){
					$(this).css({"display":"none"});
				}});
			}
		};

	}


	bgPosSetting($(bg01));
	bgPosSetting($(bg02));

	//onClickPerson($(_eblock));

	var _d = new _memberData();

	var initSetting = function() {
		_eblock = [];
		currentNum = "";
		viewID = false;
		for (var i = 0; i < hum_id.length; i++) {
			var box = new _enginnerBox(i);
			e_appear(box,hum_pos[i]);
		};

	}

	initSetting();

});
