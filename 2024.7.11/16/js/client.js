
window.onload = function(){
    //const fullScreen = document.getElementsByTagName('body');随机变换背景色（后续）
//显示日期
    var timeNow = new Date,
        dayNight,
        toLogin = '暂未登录，点击<b>登录<b>';
    if (timeNow.getHours()<5){
        dayNight = '凌晨'
    }else
    if (timeNow.getHours()<8){
        dayNight = '早上'
    }else
    if (timeNow.getHours()<11){
        dayNight = '上午'
    }else
    if (timeNow.getHours()<13){
        dayNight = '中午'
    }else
    if (timeNow.getHours()<16){
        dayNight = '下午'
    }else
    if (timeNow.getHours()<22){
        dayNight = '晚上'
    }else{
        dayNight = '半夜'
    }
    document.getElementById('rightTop_Time_Login').innerHTML = dayNight + ' ， ' + timeNow.getFullYear() + '年 ' + (timeNow.getMonth()+1) + '月 ' + timeNow.getDate() + "日<br>" + toLogin;

//生成图表(上次的平均分)
    const pieAverageScore = echarts.init(document.getElementById('pieAverageScore'));
    const optionOfAverageScore = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '75%'],
          radius: '90%',
          min: 0,
          max: 1,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.3, 'gray'],
                [0.59, 'orangered'],
                [0.79, 'green'],
                [1, 'gold']
              ]
            }
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: 'auto',
              width: 2
            }
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: 'auto',
              width: 5
            }
          },
          axisLabel: {
            color: '#464646',
            fontSize: 20,
            distance: -60,
            rotate: 'tangential',
            formatter: function (value) {
              if (value === 0.875) {
                return 'Fantastic!';
              } else if (value === 0.625) {
                return '没挂';
              } else if (value === 0.375) {
                return '差点没挂';
              } else if (value === 0.125) {
                return '挂得很惨';
              }
              return '';
            }
          },
          title: {
            offsetCenter: [0, '-10%'],
            fontSize: 20
          },
          detail: {
            fontSize: 30,
            offsetCenter: [0, '-35%'],
            valueAnimation: true,
            formatter: function (value) {
              return Math.round(value * 100) + '';
            },
            color: 'inherit'
          },
          data: [
            {
              value: 0.8,
              name: ''
            }
          ]
        }
      ]
    };
    pieAverageScore.setOption(optionOfAverageScore);

//生成图表（上周的考试分数排行）
    const pieListScore = echarts.init(document.getElementById('pieListScore'));
    const optionOfListScore = {
        xAxis: {
          type: 'category',
          data: ['牢大', '未来', '过去', '奶龙', '匿名用户', 'AI小快', 'Echarts','用心恋她','旧青年','Javascript']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'bar',
            data: [
                {
                    value: 86,
                    itemStyle: {
                        color: 'green'
                    }
                },
                {
                    value: 56,
                    itemStyle: {
                        color: 'red'
                    }
                },
                {
                    value: 67,
                    itemStyle: {
                        color: 'blue'
                    }
                },
                {
                    value: 100,
                    itemStyle: {
                        color: 'rgb(255, 228, 73)'
                    }
                },
                {
                    value: 95,
                    itemStyle: {
                        color: 'green'
                    }
                },
                {
                    value: 10,
                    itemStyle: {
                        color: 'gray'
                    }
                },
                {
                    value: 45,
                    itemStyle: {
                        color: 'red'
                    }
                },
                {
                    value: 78,
                    itemStyle: {
                        color: 'blue'
                    }
                },
                {
                    value: 100,
                    itemStyle: {
                        color: 'rgb(255, 228, 73)'
                    }
                },
                {
                    value: 99,
                    itemStyle: {
                        color: 'green'
                    }
                },
            ]
          }
        ]
    };
    pieListScore.setOption(optionOfListScore);
    loop();
}
function loop(){
  //本月中草药
  const rightTop = document.getElementById('rightTop_Time_Login');
  const graylayer = document.getElementById('graylayer');
  const graylayerTip = document.getElementById('graylayerTip');
  const items = Array.from(document.getElementsByClassName('item'));
  const leftTopBY = document.getElementById('leftTopBY');
  const studyMore = document.getElementById('studyMore');
  const startExam = document.getElementById('startExam');

  items.forEach(item => {
    item.addEventListener('focus',()=>{
      graylayer.style.opacity = 0.6;
      graylayerTip.style.opacity = 0.9;
      leftTopBY.style.zIndex = 0;
      studyMore.style.zIndex = 0;
      startExam.style.zIndex = 0;
      rightTop.style.zIndex = 0;
    });
    item.addEventListener('blur',()=>{
      graylayer.style.opacity = 0;
      graylayerTip.style.opacity = 0;
      leftTopBY.style.zIndex = 999;
      studyMore.style.zIndex = 999;
      startExam.style.zIndex = 999;
      rightTop.style.zIndex = 999;
    });
  });
}