var img= document.getElementById('t4_tablepic')
var last1 = document.getElementById('t4_table1_1')
last1.style.color = 'red'
function changeImg(imgid,e){
    if (last1) {
        last1.style.color = 'black'
    }
    e.style.color = 'red'
    last1 = e
    img.src = '半月谈/i'+imgid+'.jpg'
} 