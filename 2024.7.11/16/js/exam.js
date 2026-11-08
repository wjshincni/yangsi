// DOM
const question = document.getElementById('question');
const img = document.getElementById('img');
const content = document.getElementById('content');
const core = document.getElementById('core');
const answer = document.getElementById('answer');
const count = document.getElementById('count');
const upQ = document.getElementById('upQ');
const downQ = document.getElementById('downQ');
const done = document.getElementById('done');
const warn_ = document.getElementById('warn');
const choiceA = document.getElementById('choiceA');
const choiceB = document.getElementById('choiceB');
const choiceC = document.getElementById('choiceC');
const choiceD = document.getElementById('choiceD');
const yourName = document.getElementById('uName');

// 全局变量
let allQuestions = []; // 从内置数据加载的所有题目
let selectedQuestions = []; // 随机选出的20道题目
let currentQuestionIndex = 0; // 当前题目索引
let yourAns = []; // 用户答案数组
let rightAns = []; // 正确答案数组（根据随机选题动态生成）
let score = 0; // 用户得分
let examStartTime = null; // 考试开始时间
let examDuration = 0; // 考试用时（秒）

// 结束页
const END_QUESTION = {
    title: '你已经答完所有题目',
    image: 'theEnd.png',
    content: '请确认提交你的答案!',
    difficulty: 'Silly'
};

// 共104
const embeddedQuestions = [
    {
        "id": 1,
        "title": "选出正确的选项",
        "image": "1--1.png",
        "content": "“垃圾分类，从我做起”。<br>则废药品属于以下哪类垃圾<br>A . 可回收垃圾  B . 干垃圾<br>C . 湿垃圾  D . 有害垃圾",
        "difficulty": "Easy",
        "correctAnswer": "D"
    },
    {
        "id": 2,
        "title": "选出正确的选项",
        "image": "1--2.png",
        "content": "艾灸是中医学中的一种疗法<br>它主要利用什么物质进行熏灸?<br>A . 针灸     B . 艾叶<br>C . 针刺     D . 草药",
        "difficulty": "Easy",
        "correctAnswer": "B"
    },
    {
        "id": 3,
        "title": "选出正确的选项",
        "image": "1--3.png",
        "content": "艾灸主要通过什么方式对人体进行调理?<br>A . 经络按摩  B . 热力作用<br>C . 捏揉穴位  D . 草药熏蒸",
        "difficulty": "Easy",
        "correctAnswer": "B"
    },
    {
        "id": 4,
        "title": "选出正确的选项",
        "image": "1--4.png",
        "content": "艾草有哪些作用？<br>A . 驱虫<br>B . 入药<br>C . 制作香包<br>D . ABC",
        "difficulty": "Easy",
        "correctAnswer": "D"
    },
    {
        "id": 5,
        "title": "选出正确的选项",
        "image": "1--5.png",
        "content": "艾灸的禁忌症包括以下哪种情况?<br>A . 孕妇<br>B . 高血压患者<br>C . 头晕眼花<br>D . 食欲不振",
        "difficulty": "Easy",
        "correctAnswer": "A"
    },
    {
        "id": 6,
        "title": "选出正确的选项",
        "image": "1--6.png",
        "content": "艾灸常用于治疗以下哪种疾病?<br>A . 高血压<br>B . 糖尿病<br>C . 心脏病<br>D . 感冒",
        "difficulty": "Medium",
        "correctAnswer": "A"
    },
    {
        "id": 7,
        "title": "选出正确的选项",
        "image": "1--7.png",
        "content": "艾灸最适合的时间段是(  )<br>A . 早晨<br>B . 下午<br>C . 晚上<br>D . 随时",
        "difficulty": "Medium",
        "correctAnswer": "C"
    },
    {
        "id": 8,
        "title": "选出正确的选项",
        "image": "1--8.png",
        "content": "具有发表散寒，又能温肺化饮的药是()<br>A . 杏仁     B . 紫苏<br>C . 麻黄     D . 细辛",
        "difficulty": "Medium",
        "correctAnswer": "D"
    },
    {
        "id": 9,
        "title": "选出正确的选项",
        "image": "1--9.png",
        "content": "中药药性理论中的五味指：<br>苦、辛、咸、甘和(  )<br>A . 酸     B . 甜<br>C . 辣     D . 麻",
        "difficulty": "Medium",
        "correctAnswer": "A"
    },
    {
        "id": 10,
        "title": "选出正确的选项",
        "image": "1--10.png",
        "content": "我国现存最早的药学专著是<br>A . 《新修本草》<br>B . 《神农本草经》<br>C . 《经史证类备急本草》<br>D . 《本草纲目》",
        "difficulty": "Medium",
        "correctAnswer": "B"
    },
    {
        "id": 11,
        "title": "选出正确的选项",
        "image": "1--11.png",
        "content": "温熟病表现为壮热烦渴，汗出，<br>应首选(  )<br>A . 石青     B . 知母<br>C . 黄孝     D . 天花粉",
        "difficulty": "Medium",
        "correctAnswer": "A"
    },
    {
        "id": 12,
        "title": "选出正确的选项",
        "image": "1--12.png",
        "content": "治胃火牙痛应首选(  )<br>A . 生地<br>B . 玄参<br>C . 知母<br>D . 石膏",
        "difficulty": "Medium",
        "correctAnswer": "D"
    },
    {
        "id": 13,
        "title": "选出正确的选项",
        "image": "1--13.png",
        "content": "知母的作用是(  )<br>A . 清热泻火,除烦止渴<br>B . 清热泻火,燥湿解毒<br>C . 清热泻火,凉血解毒<br>D . 清热泻火,滋阴润燥",
        "difficulty": "Medium",
        "correctAnswer": "D"
    },
    {
        "id": 14,
        "title": "选出正确的选项",
        "image": "1--14.png",
        "content": "具有清热燥湿、泻火解毒、<br>止血、安胎功效的药物(  )<br>A . 黄莲     B . 栀子<br>C . 黄苓     D . 黄柏",
        "difficulty": "Medium",
        "correctAnswer": "C"
    },
    {
        "id": 15,
        "title": "选出正确的选项",
        "image": "1--15.png",
        "content": "清熟酒火,尤以清泻心胃之火<br>见长的药物是(  )<br>A . 黄莲     B . 栀子<br>C . 黄苓     D . 黄柏",
        "difficulty": "Medium",
        "correctAnswer": "A"
    },
    {
        "id": 16,
        "title": "选出正确的选项",
        "image": "1--16.png",
        "content": "图中的植物是什么？<br>A . 大叶艾蒿<br>B . 小叶艾蒿<br>C . 药用艾草<br>D . 益母草",
        "difficulty": "Hard",
        "correctAnswer": "C"
    },
    {
        "id": 17,
        "title": "选出正确的选项",
        "image": "1--17.png",
        "content": "具有\"呕家圣药\"之称的是(  )<br>A . 香薷<br>B . 紫苏<br>C . 桂枝<br>D . 生姜",
        "difficulty": "Hard",
        "correctAnswer": "D"
    },
    {
        "id": 18,
        "title": "选出正确的选项",
        "image": "1--18.png",
        "content": "具有\"疮家圣药\"之称的是(  )<br>A . 连翘<br>B . 紫苏<br>C . 桂枝<br>D . 生姜",
        "difficulty": "Hard",
        "correctAnswer": "A"
    },
    {
        "id": 19,
        "title": "选出正确的选项",
        "image": "1--19.png",
        "content": "芦根、天花粉的共同功效是( )<br>A . 清熟利温<br>B . 清熟生津<br>C . 清热止呕<br>D . 清热解毒",
        "difficulty": "Hard",
        "correctAnswer": "B"
    },
    {
        "id": 20,
        "title": "选出正确的选项",
        "image": "1--20.png",
        "content": "哪一项不是黄柏的功效?<br>A . 清热泻火<br>B . 清热燥湿<br>C . 泻火解毒<br>D . 止血安胎",
        "difficulty": "Hard",
        "correctAnswer": "D"
    },
    // 新增的84道题目（这里用占位符表示，实际应包含完整的题目数据）
    {
        "id": 21,
        "title": "选出正确的选项",
        "image": "1--21.png",
        "content": "被誉为\"百草之王\"，主要功效为大补元气、复脉固脱的中草药是？<br>A . 黄芪  B . 人参  C . 当归  D . 甘草",
        "difficulty": "Easy",
        "correctAnswer": "B"
    },
    {
        "id": 22,
        "title": "选出正确的选项",
        "image": "1--22.png",
        "content": "常用于治疗感冒发热、咽喉肿痛，味道偏苦的中草药是？<br>A . 枸杞  B . 陈皮  C . 金银花  D . 茯苓",
        "difficulty": "Medium",
        "correctAnswer": "C"
    },
    {
        "id": 23,
        "title": "选出正确的选项",
        "image": "1--23.png",
        "content": "具有\"补血活血、调经止痛\"功效，常用于女性月经不调的中草药是？<br>A . 生姜  B . 薄荷  C . 黄连  D . 当归",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 24,
        "title": "选出正确的选项",
        "image": "1--24.png",
        "content": "药食同源代表，既能调味又能温中散寒、解表发汗的中草药是？<br>A . 丹参  B . 生姜  C . 麦冬  D . 半夏",
        "difficulty": "Hard",
        "correctAnswer": "B"
      },
      {
        "id": 25,
        "title": "选出正确的选项",
        "image": "1--25.png",
        "content": "主要功效为清热解毒、凉血消肿，常用于治疗疮疡肿毒的中草药是？<br>A . 白术  B . 川芎  C . 蒲公英  D . 熟地",
        "difficulty": "Easy",
        "correctAnswer": "C"
      },
      {
        "id": 26,
        "title": "选出正确的选项",
        "image": "1--26.png",
        "content": "常用于滋阴补肾、明目，日常可泡水饮用的中草药是？<br>A . 黄芩  B . 枸杞  C . 防风  D . 白芷",
        "difficulty": "Medium",
        "correctAnswer": "B"
      },
      {
        "id": 27,
        "title": "选出正确的选项",
        "image": "1--27.png",
        "content": "具有\"健脾益气、燥湿利水\"功效，常用于脾胃虚弱、食欲不振的中草药是？<br>A . 连翘  B . 白术  C . 桔梗  D . 藿香",
        "difficulty": "Medium",
        "correctAnswer": "B"
      },
      {
        "id": 28,
        "title": "选出正确的选项",
        "image": "1--28.png",
        "content": "常用于清热解毒、泻火解毒，对牙龈肿痛有缓解作用的中草药是？<br>A . 黄连  B . 干姜  C . 沙参  D . 党参",
        "difficulty": "Hard",
        "correctAnswer": "A"
      },
      {
        "id": 29,
        "title": "选出正确的选项",
        "image": "1--29.png",
        "content": "被誉为\"国老\"，能调和诸药、补中益气的中草药是？<br>A . 甘草  B . 白芍  C . 赤芍  D . 生地",
        "difficulty": "Easy",
        "correctAnswer": "A"
      },
      {
        "id": 30,
        "title": "选出正确的选项",
        "image": "1--30.png",
        "content": "常用于疏散风热、清利头目，缓解风热感冒头痛的中草药是？<br>A . 紫苏  B . 荆芥  C . 防风  D . 薄荷",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 31,
        "title": "选出正确的选项",
        "image": "1--31.png",
        "content": "具有\"利水渗湿、健脾宁心\"功效，常用于水肿尿少、心悸失眠的中草药是？<br>A . 泽泻  B . 茯苓  C . 薏苡仁  D . 车前子",
        "difficulty": "Medium",
        "correctAnswer": "B"
      },
      {
        "id": 32,
        "title": "选出正确的选项",
        "image": "1--32.png",
        "content": "药食同源，能健脾止泻、利水渗湿，可煮粥食用的中草药是？<br>A . 芡实  B . 莲子  C . 山药  D . 薏苡仁",
        "difficulty": "Hard",
        "correctAnswer": "D"
      },
      {
        "id": 33,
        "title": "选出正确的选项",
        "image": "1--33.png",
        "content": "常用于清热解毒、疏散风热，治疗风热感冒、扁桃体炎的中草药是？<br>A . 金银花  B . 连翘  C . 菊花  D . 桑叶",
        "difficulty": "Easy",
        "correctAnswer": "B"
      },
      {
        "id": 34,
        "title": "选出正确的选项",
        "image": "1--34.png",
        "content": "具有\"活血化瘀、通经止痛\"功效，常用于瘀血阻滞所致疼痛的中草药是？<br>A . 川芎  B . 丹参  C . 红花  D . 桃仁",
        "difficulty": "Medium",
        "correctAnswer": "A"
      },
      {
        "id": 35,
        "title": "选出正确的选项",
        "image": "1--35.png",
        "content": "常用于润肺止咳、清心安神，缓解干咳少痰、失眠多梦的中草药是？<br>A . 麦冬  B . 百合  C . 川贝母  D . 浙贝母",
        "difficulty": "Medium",
        "correctAnswer": "B"
      },
      {
        "id": 36,
        "title": "选出正确的选项",
        "image": "1--36.png",
        "content": "药食同源，能益气养阴、补脾肺肾，可煲汤食用的中草药是？<br>A . 土豆  B . 芋头  C . 山药  D . 莲藕",
        "difficulty": "Hard",
        "correctAnswer": "C"
      },
      {
        "id": 37,
        "title": "选出正确的选项",
        "image": "1--37.png",
        "content": "具有\"清热解毒、凉血解毒\"功效，常用于血热出血的中草药是？<br>A . 熟地  B . 玄参  C . 丹皮  D . 生地",
        "difficulty": "Easy",
        "correctAnswer": "D"
      },
      {
        "id": 38,
        "title": "选出正确的选项",
        "image": "1--38.png",
        "content": "常用于补血养阴、填精益髓，治疗血虚萎黄、头晕耳鸣的中草药是？<br>A . 当归  B . 白芍  C . 阿胶  D . 熟地",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 39,
        "title": "选出正确的选项",
        "image": "1--39.png",
        "content": "具有\"平肝明目、清热解毒\"功效，常用于目赤肿痛、视物昏花的中草药是？<br>A . 桑叶  B . 决明子  C . 枸杞子  D . 菊花",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 40,
        "title": "选出正确的选项",
        "image": "1--40.png",
        "content": "常用于疏散风热、清肺润燥，治疗风热感冒、肺热咳嗽的中草药是？<br>A . 薄荷  B . 紫苏  C . 荆芥  D . 桑叶",
        "difficulty": "Hard",
        "correctAnswer": "D"
      },
      {
        "id": 41,
        "title": "选出正确的选项",
        "image": "1--41.png",
        "content": "具有\"温中健脾、燥湿化痰\"功效，常用于脾胃虚寒、呕吐泄泻的中草药是？<br>A . 高良姜  B . 生姜  C . 炮姜  D . 干姜",
        "difficulty": "Easy",
        "correctAnswer": "D"
      },
      {
        "id": 42,
        "title": "选出正确的选项",
        "image": "1--42.png",
        "content": "常用于清热解毒、凉血利咽，缓解咽喉肿痛、口舌生疮的中草药是？<br>A . 大青叶  B . 板蓝根  C . 青黛  D . 鱼腥草",
        "difficulty": "Medium",
        "correctAnswer": "B"
      },
      {
        "id": 43,
        "title": "选出正确的选项",
        "image": "1--43.png",
        "content": "具有\"祛风解表、胜湿止痛\"功效，常用于风寒感冒、头痛身痛的中草药是？<br>A . 荆芥  B . 紫苏  C . 白芷  D . 防风",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 44,
        "title": "选出正确的选项",
        "image": "1--44.png",
        "content": "药食同源，能补肾益精、养肝明目，可直接嚼服的中草药是？<br>A . 女贞子  B . 菟丝子  C . 沙苑子  D . 枸杞",
        "difficulty": "Hard",
        "correctAnswer": "D"
      },
      {
        "id": 45,
        "title": "选出正确的选项",
        "image": "1--45.png",
        "content": "常用于清热燥湿、泻火解毒，治疗湿热黄疸、高热神昏的中草药是？<br>A . 黄连  B . 黄芩  C . 黄柏  D . 龙胆草",
        "difficulty": "Easy",
        "correctAnswer": "B"
      },
      {
        "id": 46,
        "title": "选出正确的选项",
        "image": "1--46.png",
        "content": "具有\"活血行气、祛风止痛\"功效，常用于头痛、痛经的中草药是？<br>A . 丹参  B . 红花  C . 桃仁  D . 川芎",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 47,
        "title": "选出正确的选项",
        "image": "1--47.png",
        "content": "常用于健脾养胃、生津益肺，治疗脾胃虚弱、口干舌燥的中草药是？<br>A . 人参  B . 西洋参  C . 太子参  D . 党参",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 48,
        "title": "选出正确的选项",
        "image": "1--48.png",
        "content": "药食同源，能益肾固精、补脾止泻，可煮粥或煲汤的中草药是？<br>A . 莲子  B . 薏苡仁  C . 山药  D . 芡实",
        "difficulty": "Hard",
        "correctAnswer": "D"
      },
      {
        "id": 49,
        "title": "选出正确的选项",
        "image": "1--49.png",
        "content": "具有\"清热解毒、利水通淋\"功效，常用于尿频尿急、尿痛的中草药是？<br>A . 金钱草  B . 车前草  C . 海金沙  D . 石韦",
        "difficulty": "Easy",
        "correctAnswer": "B"
      },
      {
        "id": 50,
        "title": "选出正确的选项",
        "image": "1--50.png",
        "content": "常用于润肺化痰、散结消痈，治疗肺热咳嗽、乳痈肿痛的中草药是？<br>A . 浙贝母  B . 半夏  C . 天南星  D . 川贝母",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 51,
        "title": "选出正确的选项",
        "image": "1--51.png",
        "content": "具有\"补气升阳、固表止汗\"功效，常用于气虚乏力、表虚自汗的中草药是？<br>A . 党参  B . 白术  C . 山药  D . 黄芪",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 52,
        "title": "选出正确的选项",
        "image": "1--52.png",
        "content": "药食同源，能清热解毒、化痰止咳，可凉拌或煮汤的中草药是？<br>A . 蒲公英  B . 鱼腥草  C . 马齿苋  D . 苦菜",
        "difficulty": "Hard",
        "correctAnswer": "B"
      },
      {
        "id": 53,
        "title": "选出正确的选项",
        "image": "1--53.png",
        "content": "常用于清热解毒、凉血止血，治疗血热妄行所致出血的中草药是？<br>A . 板蓝根  B . 青黛  C . 紫草  D . 大青叶",
        "difficulty": "Easy",
        "correctAnswer": "D"
      },
      {
        "id": 54,
        "title": "选出正确的选项",
        "image": "1--54.png",
        "content": "具有\"祛风散寒、通窍止痛\"功效，常用于风寒感冒、鼻塞流涕的中草药是？<br>A . 细辛  B . 辛夷  C . 苍耳子  D . 白芷",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 55,
        "title": "选出正确的选项",
        "image": "1--55.png",
        "content": "常用于健脾化湿、和胃止泻，治疗脾虚湿盛、消化不良的中草药是？<br>A . 白术  B . 厚朴  C . 陈皮  D . 苍术",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 56,
        "title": "选出正确的选项",
        "image": "1--56.png",
        "content": "药食同源，能养血安神、补中益气，可煮粥或做汤的中草药是？<br>A . 桂圆  B . 莲子  C . 百合  D . 红枣",
        "difficulty": "Hard",
        "correctAnswer": "D"
      },
      {
        "id": 57,
        "title": "选出正确的选项",
        "image": "1--57.png",
        "content": "具有\"清热解毒、消肿散结\"功效，常用于痰热郁结所致肿块的中草药是？<br>A . 川贝母  B . 半夏  C . 天南星  D . 浙贝母",
        "difficulty": "Easy",
        "correctAnswer": "D"
      },
      {
        "id": 58,
        "title": "选出正确的选项",
        "image": "1--58.png",
        "content": "常用于清热泻火、生津止渴，治疗热病烦渴、肺热燥咳的中草药是？<br>A . 石膏  B . 芦根  C . 天花粉  D . 知母",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 59,
        "title": "选出正确的选项",
        "image": "1--59.png",
        "content": "具有\"活血化瘀、润肠通便\"功效，常用于瘀血阻滞、肠燥便秘的中草药是？<br>A . 红花  B . 丹参  C . 川芎  D . 桃仁",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 60,
        "title": "选出正确的选项",
        "image": "1--60.png",
        "content": "药食同源，能补肾温阳、固精缩尿，可煮粥或泡酒的中草药是？<br>A . 菟丝子  B . 韭菜子  C . 沙苑子  D . 枸杞子",
        "difficulty": "Hard",
        "correctAnswer": "B"
      },
      {
        "id": 61,
        "title": "选出正确的选项",
        "image": "1--61.png",
        "content": "常用于清热燥湿、杀虫止痒，治疗湿疹、阴痒的中草药是？<br>A . 黄柏  B . 黄连  C . 龙胆草  D . 苦参",
        "difficulty": "Easy",
        "correctAnswer": "D"
      },
      {
        "id": 62,
        "title": "选出正确的选项",
        "image": "1--62.png",
        "content": "具有\"凉血活血、解毒透疹\"功效，常用于麻疹不透、斑疹紫暗的中草药是？<br>A . 丹皮  B . 赤芍  C . 生地  D . 紫草",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 63,
        "title": "选出正确的选项",
        "image": "1--63.png",
        "content": "常用于祛风除湿、通络止痛，治疗风湿痹痛、肢体麻木的中草药是？<br>A . 羌活  B . 防风  C . 荆芥  D . 独活",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 64,
        "title": "选出正确的选项",
        "image": "1--64.png",
        "content": "药食同源，能清热生津、凉血止血，可生吃或凉拌的中草药是？<br>A . 山药  B . 荸荠  C . 百合  D . 莲藕",
        "difficulty": "Hard",
        "correctAnswer": "D"
      },
      {
        "id": 65,
        "title": "选出正确的选项",
        "image": "1--65.png",
        "content": "具有\"补中益气、养血安神\"功效，常用于心脾两虚、失眠多梦的中草药是？<br>A . 红枣  B . 莲子  C . 百合  D . 桂圆",
        "difficulty": "Easy",
        "correctAnswer": "D"
      },
      {
        "id": 66,
        "title": "选出正确的选项",
        "image": "1--66.png",
        "content": "常用于清热解毒、利咽消肿，治疗咽喉肿痛、声音嘶哑的中草药是？<br>A . 胖大海  B . 薄荷  C . 金银花  D . 桔梗",
        "difficulty": "Medium",
        "correctAnswer": "A"
      },
      {
        "id": 67,
        "title": "选出正确的选项",
        "image": "1--67.png",
        "content": "具有\"利水消肿、渗湿健脾\"功效，常用于水肿、痰饮、脾虚泄泻的中草药是？<br>A . 茯苓  B . 薏苡仁  C . 车前子  D . 泽泻",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 68,
        "title": "选出正确的选项",
        "image": "1--68.png",
        "content": "药食同源，能润肺止咳、生津止渴，可直接食用的中草药是？<br>A . 银耳  B . 杏仁  C . 梨  D . 百合",
        "difficulty": "Hard",
        "correctAnswer": "D"
      },
      {
        "id": 69,
        "title": "选出正确的选项",
        "image": "1--69.png",
        "content": "常用于清热泻火、明目退翳，治疗目赤肿痛、视物昏花的中草药是？<br>A . 菊花  B . 桑叶  C . 枸杞子  D . 决明子",
        "difficulty": "Easy",
        "correctAnswer": "D"
      },
      {
        "id": 70,
        "title": "选出正确的选项",
        "image": "1--70.png",
        "content": "具有\"活血化瘀、利尿消肿\"功效，常用于瘀血阻滞、水肿尿少的中草药是？<br>A . 桃仁  B . 丹参  C . 红花  D . 益母草",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 71,
        "title": "选出正确的选项",
        "image": "1--71.png",
        "content": "常用于温中散寒、理气止痛，治疗脾胃虚寒、脘腹冷痛的中草药是？<br>A . 干姜  B . 生姜  C . 炮姜  D . 高良姜",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 72,
        "title": "选出正确的选项",
        "image": "1--72.png",
        "content": "药食同源，能补肾益肺、止血化痰，可煲汤或研粉服用的中草药是？<br>A . 枸杞  B . 山药  C . 百合  D . 冬虫夏草",
        "difficulty": "Hard",
        "correctAnswer": "D"
      },
      {
        "id": 73,
        "title": "选出正确的选项",
        "image": "1--73.png",
        "content": "具有\"清热解毒、凉血利咽\"功效，常用于温病发热、咽喉肿痛的中草药是？<br>A . 大青叶  B . 鱼腥草  C . 青黛  D . 板蓝根",
        "difficulty": "Easy",
        "correctAnswer": "D"
      },
      {
        "id": 74,
        "title": "选出正确的选项",
        "image": "1--74.png",
        "content": "常用于祛风解表、透疹止痒，治疗麻疹不透、风疹瘙痒的中草药是？<br>A . 防风  B . 薄荷  C . 紫苏  D . 荆芥",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 75,
        "title": "选出正确的选项",
        "image": "1--75.png",
        "content": "具有\"健脾消食、化积导滞\"功效，常用于食积停滞、消化不良的中草药是？<br>A . 神曲  B . 麦芽  C . 鸡内金  D . 山楂",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 76,
        "title": "选出正确的选项",
        "image": "1--76.png",
        "content": "药食同源，能清热解毒、凉血消肿，可凉拌食用的中草药是？<br>A . 蒲公英  B . 鱼腥草  C . 苦菜  D . 马齿苋",
        "difficulty": "Hard",
        "correctAnswer": "D"
      },
      {
        "id": 77,
        "title": "选出正确的选项",
        "image": "1--77.png",
        "content": "常用于润肺养阴、益胃生津，治疗肺燥干咳、津伤口渴的中草药是？<br>A . 百合  B . 川贝母  C . 沙参  D . 麦冬",
        "difficulty": "Easy",
        "correctAnswer": "D"
      },
      {
        "id": 78,
        "title": "选出正确的选项",
        "image": "1--78.png",
        "content": "具有\"活血化瘀、行气止痛\"功效，常用于气滞血瘀所致疼痛的中草药是？<br>A . 川芎  B . 丹参  C . 红花  D . 延胡索",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 79,
        "title": "选出正确的选项",
        "image": "1--79.png",
        "content": "常用于清热燥湿、泻火解毒，治疗目赤肿痛、痈肿疮毒的中草药是？<br>A . 黄连  B . 黄芩  C . 龙胆草  D . 黄柏",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 80,
        "title": "选出正确的选项",
        "image": "1--80.png",
        "content": "药食同源，能益气养血、健脾暖胃，可煮粥或做馅的中草药是？<br>A . 桂圆  B . 山药  C . 红枣  D . 莲子",
        "difficulty": "Hard",
        "correctAnswer": "C"
      },
      {
        "id": 81,
        "title": "选出正确的选项",
        "image": "1--81.png",
        "content": "具有\"祛风除湿、散寒止痛\"功效，常用于风寒湿痹、关节疼痛的中草药是？<br>A . 独活  B . 防风  C . 白芷  D . 羌活",
        "difficulty": "Easy",
        "correctAnswer": "D"
      },
      {
        "id": 82,
        "title": "选出正确的选项",
        "image": "1--82.png",
        "content": "常用于清热解毒、利水消肿，治疗水肿、淋浊、带下的中草药是？<br>A . 车前草  B . 海金沙  C . 石韦  D . 金钱草",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 83,
        "title": "选出正确的选项",
        "image": "1--83.png",
        "content": "具有\"养血调经、敛阴止汗\"功效，常用于月经不调、自汗盗汗的中草药是？<br>A . 当归  B . 熟地  C . 阿胶  D . 白芍",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 84,
        "title": "选出正确的选项",
        "image": "1--84.png",
        "content": "药食同源，能补肾固精、养肝明目，可泡水饮用的中草药是？<br>A . 枸杞  B . 沙苑子  C . 女贞子  D . 菟丝子",
        "difficulty": "Hard",
        "correctAnswer": "A"
      },
      {
        "id": 85,
        "title": "选出正确的选项",
        "image": "1--85.png",
        "content": "常用于清热泻火、除烦止渴，治疗热病烦渴、肺热喘咳的中草药是？<br>A . 知母  B . 芦根  C . 天花粉  D . 石膏",
        "difficulty": "Easy",
        "correctAnswer": "D"
      },
      {
        "id": 86,
        "title": "选出正确的选项",
        "image": "1--86.png",
        "content": "具有\"活血化瘀、通经活络\"功效，常用于瘀血阻滞、肢体麻木的中草药是？<br>A . 桃仁  B . 丹参  C . 红花  D . 鸡血藤",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 87,
        "title": "选出正确的选项",
        "image": "1--87.png",
        "content": "常用于温中降逆、散寒止痛，治疗胃寒呕吐、脘腹冷痛的中草药是？<br>A . 高良姜  B . 干姜  C . 生姜  D . 丁香",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 88,
        "title": "选出正确的选项",
        "image": "1--88.png",
        "content": "药食同源，能清热解毒、化痰散结，可煮汤食用的中草药是？<br>A . 紫菜  B . 海藻  C . 昆布  D . 海带",
        "difficulty": "Hard",
        "correctAnswer": "C"
      },
      {
        "id": 89,
        "title": "选出正确的选项",
        "image": "1--89.png",
        "content": "具有\"润肺化痰、止咳平喘\"功效，常用于咳嗽气喘、痰多的中草药是？<br>A . 苏子  B . 百部  C . 紫菀  D . 杏仁",
        "difficulty": "Easy",
        "correctAnswer": "D"
      },
      {
        "id": 90,
        "title": "选出正确的选项",
        "image": "1--90.png",
        "content": "常用于清热凉血、活血化瘀，治疗血热妄行、瘀血阻滞的中草药是？<br>A . 生地  B . 赤芍  C . 紫草  D . 丹皮",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 91,
        "title": "选出正确的选项",
        "image": "1--91.png",
        "content": "具有\"健脾益气、养血安神\"功效，常用于脾虚乏力、心悸失眠的中草药是？<br>A . 党参  B . 人参  C . 西洋参  D . 太子参",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 92,
        "title": "选出正确的选项",
        "image": "1--92.png",
        "content": "药食同源，能清热生津、除烦止呕，可榨汁饮用的中草药是？<br>A . 天花粉  B . 知母  C . 石膏  D . 芦根",
        "difficulty": "Hard",
        "correctAnswer": "D"
      },
      {
        "id": 93,
        "title": "选出正确的选项",
        "image": "1--93.png",
        "content": "常用于祛风除湿、强筋健骨，治疗风湿痹痛、腰膝酸软的中草药是？<br>A . 牛膝  B . 续断  C . 桑寄生  D . 杜仲",
        "difficulty": "Easy",
        "correctAnswer": "D"
      },
      {
        "id": 94,
        "title": "选出正确的选项",
        "image": "1--94.png",
        "content": "具有\"清热解毒、凉血止血\"功效，常用于血热出血、痈肿疮毒的中草药是？<br>A . 大蓟  B . 地榆  C . 槐花  D . 小蓟",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 95,
        "title": "选出正确的选项",
        "image": "1--95.png",
        "content": "常用于消食化积、健脾开胃，治疗小儿疳积、食欲不振的中草药是？<br>A . 山楂  B . 神曲  C . 麦芽  D . 鸡内金",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 96,
        "title": "选出正确的选项",
        "image": "1--96.png",
        "content": "药食同源，能补肾温阳、益气养血，可煲汤或泡酒的中草药是？<br>A . 枸杞  B . 山药  C . 红枣  D . 鹿茸",
        "difficulty": "Hard",
        "correctAnswer": "D"
      },
      {
        "id": 97,
        "title": "选出正确的选项",
        "image": "1--97.png",
        "content": "具有\"清热燥湿、泻肝胆火\"功效，常用于肝胆湿热、目赤肿痛的中草药是？<br>A . 黄芩  B . 黄连  C . 黄柏  D . 龙胆草",
        "difficulty": "Easy",
        "correctAnswer": "D"
      },
      {
        "id": 98,
        "title": "选出正确的选项",
        "image": "1--98.png",
        "content": "常用于疏散风热、解毒透疹，治疗风热感冒、麻疹不透的中草药是？<br>A . 薄荷  B . 荆芥  C . 防风  D . 牛蒡子",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 99,
        "title": "选出正确的选项",
        "image": "1--99.png",
        "content": "具有\"利水渗湿、泄热通淋\"功效，常用于热淋涩痛、水肿胀满的中草药是？<br>A . 泽泻  B . 薏苡仁  C . 金钱草  D . 车前子",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 100,
        "title": "选出正确的选项",
        "image": "1--100.png",
        "content": "药食同源，能润肺止咳、润肠通便，可煮粥或生吃的中草药是？<br>A . 桃仁  B . 火麻仁  C . 郁李仁  D . 杏仁",
        "difficulty": "Hard",
        "correctAnswer": "D"
      },
      {
        "id": 101,
        "title": "选出正确的选项",
        "image": "1--101.png",
        "content": "具有\"活血化瘀、软坚散结\"功效，常用于瘀血肿块、癥瘕积聚的中草药是？<br>A . 莪术  B . 丹参  C . 红花  D . 三棱",
        "difficulty": "Easy",
        "correctAnswer": "D"
      },
      {
        "id": 102,
        "title": "选出正确的选项",
        "image": "1--102.png",
        "content": "常用于温中散寒、温肺化饮，治疗寒饮咳喘、脘腹冷痛的中草药是？<br>A . 白芷  B . 辛夷  C . 苍耳子  D . 细辛",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 103,
        "title": "选出正确的选项",
        "image": "1--103.png",
        "content": "具有\"益气养阴、生津止渴\"功效，常用于气阴两虚、口干舌燥的中草药是？<br>A . 人参  B . 党参  C . 太子参  D . 西洋参",
        "difficulty": "Medium",
        "correctAnswer": "D"
      },
      {
        "id": 104,
        "title": "选出正确的选项",
        "image": "1--104.png",
        "content": "药食同源，能清热解毒、明目退翳，可泡水饮用的中草药是？<br>A . 决明子  B . 桑叶  C . 枸杞  D . 菊花",
        "difficulty": "Hard",
        "correctAnswer": "D"
      }
];

// 设置颜色
function getDifficultyColor(difficulty) {
    switch(difficulty) {
        case 'Easy': return 'skyblue';
        case 'Medium': return 'gold';
        case 'Hard': return 'orangered';
        case 'Silly': return 'white';
        default: return 'gray';
    }
}

// 更新按钮状态
function updateNavButtons(index) {
    if (index === 0) {
        upQ.style.opacity = '0.3';
        upQ.disabled = true;
    } else {
        upQ.style.opacity = '1';
        upQ.disabled = false;
    }
    
    if (index >= selectedQuestions.length) {
        downQ.style.opacity = '0.3';
        downQ.disabled = true;
    } else {
        downQ.style.opacity = '1';
        downQ.disabled = false;
    }
}

// 显示题目
function showQuestion(index) {
    // 清除所有选项
    choiceA.checked = false;
    choiceB.checked = false;
    choiceC.checked = false;
    choiceD.checked = false;
    
    warn_.innerHTML = '';
    
    // 更新按钮状态
    updateNavButtons(index);
    
    // 如果是结束页
    if (index >= selectedQuestions.length) {
        showEndPage();
        return;
    }
    
    const questionData = selectedQuestions[index];
    
    // 更新题目
    count.innerHTML = `${index + 1}/${selectedQuestions.length}`;
    question.innerHTML = questionData.title;
    
    // 图片
    const imgUrl = `url(resources/q/${questionData.image})`;
    img.style.background = imgUrl + ' no-repeat center';
    img.style.backgroundSize = 'contain';
    
    content.innerHTML = questionData.content;
    core.innerHTML = questionData.difficulty;
    core.style.background = getDifficultyColor(questionData.difficulty);
    
    // 恢复选项
    if (yourAns[index] !== null) {
        switch(yourAns[index]) {
            case 'A': choiceA.checked = true; break;
            case 'B': choiceB.checked = true; break;
            case 'C': choiceC.checked = true; break;
            case 'D': choiceD.checked = true; break;
        }
    }
}

// 显示结束页
function showEndPage() {
    count.innerHTML = `${selectedQuestions.length}/${selectedQuestions.length}`;
    question.innerHTML = END_QUESTION.title;
    img.style.background = `url(resources/q/${END_QUESTION.image}) no-repeat center`;
    img.style.backgroundSize = 'contain';
    content.innerHTML = END_QUESTION.content;
    core.innerHTML = END_QUESTION.difficulty;
    core.style.background = getDifficultyColor(END_QUESTION.difficulty);
    
    // 隐藏选项区域
    answer.style.display = 'none';
}

// 保存答案
function saveCurrentAnswer() {
    let selectedAnswer = null;
    
    if (choiceA.checked) selectedAnswer = 'A';
    else if (choiceB.checked) selectedAnswer = 'B';
    else if (choiceC.checked) selectedAnswer = 'C';
    else if (choiceD.checked) selectedAnswer = 'D';
    
    if (selectedAnswer !== null) {
        yourAns[currentQuestionIndex] = selectedAnswer;
        return true;
    }
    return false;
}

// 计分
function calculateScore() {
    score = 0;
    for(let i = 0; i < selectedQuestions.length; i++) {
        if (yourAns[i] === rightAns[i]) {
            score += 5;
        }
    }
    return score;
}

// 计算正确率
function calculateAccuracy() {
    let correctCount = 0;
    for(let i = 0; i < selectedQuestions.length; i++) {
        if (yourAns[i] === rightAns[i]) {
            correctCount++;
        }
    }
    return Math.round((correctCount / selectedQuestions.length) * 100);
}

// 计算考试用时
function calculateDuration() {
    if (examStartTime) {
        examDuration = Math.round((Date.now() - examStartTime) / 1000);
    }
    return examDuration;
}

// 显示成绩
function showScore() {
    calculateScore();
    calculateDuration();
    const accuracy = calculateAccuracy();
    
    // 隐藏界面
    $('#question').hide('slow');
    $('#img').hide('slow');
    $('#content').hide('slow');
    $('#answer').hide('slow');
    $('#core').hide('slow');
    $('#count').hide('slow');
    $('#operate').hide('slow');
    $('#warn').hide('slow');
    
    setTimeout(function() {
        $('#conclude').show('slow');
    }, 1000);
    
    // 分数
    document.getElementById('uMark').innerHTML = score.toString();
    
    // 用时
    const minutes = Math.floor(examDuration / 60);
    const seconds = examDuration % 60;
    document.getElementById('examTime').innerHTML = `${minutes}分${seconds}秒`;
    
    // 正确率
    document.getElementById('accuracy').innerHTML = `${accuracy}%`;
    
    // 雷达图
    initRadarChart(score, examDuration, accuracy);
}

//echart
function initRadarChart(score, duration, accuracy) {
    const pie = echarts.init(document.getElementById('uPie'));
    
    const scoreNormalized = score; // 总分满100
    const timeNormalized = Math.max(0, 100 - Math.min(100, duration / 60 * 10)); // 时间越短分数越高
    const accuracyNormalized = accuracy; // 正确率
    
    const option = {
        legend: {
            data: ['此次考试情况']
        },
        radar: {
            shape: 'circle',
            indicator: [
                { name: '总分', max: 100 },
                { name: '时间效率', max: 100 },
                { name: '正确率', max: 100 },
                { name: '完成度', max: 100 },
                { name: '难度适应', max: 100 }
            ]
        },
        series: [
            {
                name: '考试分析',
                type: 'radar',
                data: [
                    {
                        value: [
                            scoreNormalized, 
                            timeNormalized, 
                            accuracyNormalized,
                            100, // 完成度（因为全部答完了）
                            calculateDifficultyAdaptation() // 难度适应
                        ],
                        name: '此次考试情况'
                    }
                ]
            }
        ]
    };
    
    pie.setOption(option);
    
    // 适配窗口大小变化
    window.addEventListener('resize', function() {
        pie.resize();
    });
}

// 计算难度适应度
function calculateDifficultyAdaptation() {
    let easyCorrect = 0, mediumCorrect = 0, hardCorrect = 0;
    let easyTotal = 0, mediumTotal = 0, hardTotal = 0;
    
    for(let i = 0; i < selectedQuestions.length; i++) {
        const question = selectedQuestions[i];
        const isCorrect = yourAns[i] === rightAns[i];
        
        switch(question.difficulty) {
            case 'Easy':
                easyTotal++;
                if (isCorrect) easyCorrect++;
                break;
            case 'Medium':
                mediumTotal++;
                if (isCorrect) mediumCorrect++;
                break;
            case 'Hard':
                hardTotal++;
                if (isCorrect) hardCorrect++;
                break;
        }
    }
    
    // 计算加权平均
    const easyRate = easyTotal > 0 ? (easyCorrect / easyTotal) * 100 : 0;
    const mediumRate = mediumTotal > 0 ? (mediumCorrect / mediumTotal) * 100 : 0;
    const hardRate = hardTotal > 0 ? (hardCorrect / hardTotal) * 100 : 0;
    
    return Math.round((easyRate * 0.2 + mediumRate * 0.3 + hardRate * 0.5));
}

// 上传分数
function sendMark() {
    if (yourName.value.trim() !== '') {
        const name = yourName.value;
        
        // 计算用时
        const duration = calculateDuration();
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        
        $.post('https://apis.tianapi.com/robot/index', //暂时用个人API代替
            {
                key: '868ffe977d3b445b541e7e28acb51e41',
                question: `Tech Festival:(上传分数) 姓名:${name} 分数:${score} 用时:${minutes}分${seconds}秒 正确率:${calculateAccuracy()}%`
            }
        ).done(function(response) {
            console.log('分数上传成功:', response);
            yourName.value = '上传成功！将在下一周排行前10分数！';
            yourName.disabled = true;
        }).fail(function(error) {
            console.error('分数上传失败:', error);
            yourName.value = '上传失败，请检查网络连接！';
            setTimeout(() => {
                yourName.value = name;
                yourName.disabled = false;
            }, 2000);
        });
    } else {
        yourName.placeholder = '请输入名字！';
        yourName.style.borderColor = 'red';
        setTimeout(() => {
            yourName.style.borderColor = '';
        }, 2000);
    }
}

// 随机选择20道
function selectRandomQuestions(questions, count) {
    if (questions.length <= count) {
        return [...questions]; // 如果题目不够，返回全部
    }
    
    // 洗牌算法
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.slice(0, count);
}

// 初始化题目和正确答案
function initializeQuestions(questions) {
    selectedQuestions = selectRandomQuestions(questions, 20);
    rightAns = selectedQuestions.map(q => q.correctAnswer);
    yourAns = new Array(20).fill(null);
}

// 加载题目
function loadQuestions() {
    try {
        console.log('开始加载题目数据...');
        
        allQuestions = embeddedQuestions;
        console.log(`成功加载 ${allQuestions.length} 道题目`);
        
        initializeQuestions(allQuestions);
        
        // 记录时间
        examStartTime = Date.now();
        
        // 显示
        showQuestion(currentQuestionIndex);
        
        setupEventListeners();
        
        return true;
    } catch (error) {
        console.error('加载题目失败:', error);
        warn_.innerHTML = '加载题目失败，请刷新页面重试';
        return false;
    }
}

// 操作台
function setupEventListeners() {
    // 下一题
    downQ.addEventListener('click', function() {
        if (currentQuestionIndex < selectedQuestions.length) {
            if (saveCurrentAnswer()) {
                currentQuestionIndex++;
                showQuestion(currentQuestionIndex);
            } else {
                warn_.innerHTML = '请先答题！';
                warn_.style.color = 'red';
                setTimeout(() => {
                    warn_.style.color = '';
                }, 2000);
            }
        } else {
            warn_.innerHTML = '题目已经到底了！';
        }
    });
    
    // 上一题
    upQ.addEventListener('click', function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
            if (yourAns[currentQuestionIndex] !== null) {
                warn_.innerHTML = `你之前选择了 ${yourAns[currentQuestionIndex]}`;
            }
        } else {
            warn_.innerHTML = '题目已经到头了！';
        }
    });
    
    // 提交
    done.addEventListener('click', function() {
        // 确保当前答案已保存
        if (currentQuestionIndex < selectedQuestions.length) {
            if (!saveCurrentAnswer()) {
                warn_.innerHTML = '请先完成当前题目！';
                warn_.style.color = 'red';
                setTimeout(() => {
                    warn_.style.color = '';
                }, 2000);
                return;
            }
        }
        
        // 检查都已回答
        const allAnswered = yourAns.every(answer => answer !== null);
        
        if (allAnswered) {
            // 确认
            if (confirm('确定要提交答案吗？提交后不可修改！')) {
                showScore();
            }
        } else {
            warn_.innerHTML = '请先完整答题！';
            warn_.style.color = 'red';
            
            // 跳转到第一个未答的题目
            for(let i = 0; i < selectedQuestions.length; i++) {
                if (yourAns[i] === null) {
                    currentQuestionIndex = i;
                    showQuestion(currentQuestionIndex);
                    break;
                }
            }
            
            setTimeout(() => {
                warn_.style.color = '';
            }, 2000);
        }
    });
    
    // 选项变化-保存
    [choiceA, choiceB, choiceC, choiceD].forEach(choice => {
        choice.addEventListener('change', function() {
            saveCurrentAnswer();
        });
    });
    
    // 上传分数
    const submitScoreBtn = document.getElementById('submitScore');
    if (submitScoreBtn) {
        submitScoreBtn.addEventListener('click', sendMark);
    }
    
    // 重开
    const restartBtn = document.getElementById('restart');
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            location.reload(); // 刷新页面
        });
    }
}

// 初始化
function initApp() {
    console.log('考试系统初始化...');
    
    // 隐藏战绩
    $('#conclude').hide();
    
    // 加载提示
    warn_.innerHTML = '正在加载题目...';
    
    // 加载题目
    loadQuestions();
    
    // 清除提示
    warn_.innerHTML = '';
    
    console.log('考试系统初始化完成，可以开始答题');
}

window.onload = function() {
    setTimeout(initApp, 100);
};