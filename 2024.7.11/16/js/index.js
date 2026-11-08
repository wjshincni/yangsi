const HEAD = document.getElementById('HEAD');
const Q1 = document.getElementById('Q1');
const data = document.getElementById('data');
const pieSpan = document.getElementById('piespan');

const screenScale = screen.width/screen.height;
if (screenScale <= 1){
    window.open('error.html');
}

function startThen(){
    HEAD.classList.add('hide');
    setTimeout(function(){
        HEAD.style.display = 'none';
        Q1.style.display = 'block';
        Q1.classList.remove('hide');
        Q1.classList.add('appear');
    },2000)
}


function continueThen1(){
    Q1.classList.add('hide');
    setTimeout(function(){
        Q1.style.display = 'none';
        data.style.display = 'block';
        data.classList.remove('hide');
        data.classList.add('appear');
        continueThen2();
    },2000)
}

function continueThen2(){
    var option;
    const pie = document.getElementById('pie');
    const chart = echarts.init(pie);
    setTimeout(function(){
        option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
            left: 'center'
            },
            series: [
                {
                name: '所占人数（万）数据由AI整理',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                padAngle: 5,
                itemStyle: {
                borderRadius: 10
                },
            label: {
                show: false,
                position: 'center'
                },
            emphasis: {
                    label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: 'bold'
                }
                },
            labelLine: {
                    show: false
                },
            data: [
            { value: 16800, name: '完全不知道中医药' },
            { value: 79800, name: '大概了解中医药' },
            { value: 43400, name: '优先以中医药治疗' },
            ]
                }
            ]
        };
        chart.setOption(option);
    })

    setTimeout(function(){
        pieSpan.innerHTML = '';
        pieSpan.innerHTML = "左图是<u>中国近年来</u>在<big><i>中医药</i>领域</big>投入的金额对比。中国看重的也<big><b>是</b></big>学生该学习的";
        option = {
            xAxis: {
                type: 'category',
                data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022','2023','2024','2025E']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [13893.3, 13753.8, 14975.4, 16232.4, 28254.4, 31338.6, 34857.6, 38883.1, 43186.5, 48071.7],
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                      color: 'rgba(180, 180, 180, 0.2)'
                    }
                }
            ]
        };
        chart.setOption(option);
    },5000)

    setTimeout(function(){
        pieSpan.innerHTML = '';
        pieSpan.innerHTML = "综上所述，游戏是我们学习中医药的最适途径";
        option = {
            xAxis: {
                show: false
            },
            yAxis: {
                show: false
            },
            title: {
                text: '中国的中草药普及率与中国的游戏普及率对比',
                subtext: '数据来源于AI整理',
                left: 'center'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                name: '单位：（亿）',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 6.74, name: '全中国玩过游戏的人数' },
                    { value: 1.197, name: '全中国深入学习过中草药的人数' },
                ],
                    emphasis: {
                        itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        chart.setOption(option);
        setTimeout(function(){
            window.open('yuanshen/index.html','_self');
        },5000)
    },10000);


}
