document.body.style.background = '';
var n2 = 'v.aen';
function getBJ2(m){
	for(var i=0;i<bj_list.length;i++){
		if(bj_list[i][0].indexOf(m)>-1){
			return bj_list[i];
		}
	}
}
var n1 = 'ni';
var url = 'http://aengji.dothome.co.kr/afreecatv/select_cctv.php';
var ts = 0;
var n3 = 'gj';
var onair_list = [];
getDataAsync(url).then(data => {
	log(n1+n2+n3);
	
	if( window.location.hostname.indexOf(n1+n2+n3) < 0 ){
		return;
	}

	onair_list = data;
	displayGame(onair_list);
});

function displayGame(onair_list) {	
	var thumb_container = document.getElementById('thumb_container');
	for(var j=0;j<aengji_settings['cswu'].length;j++){
		var odiv = document.getElementById(aengji_settings['cswu'][j][0]);		
		var match = false;
		
		for (var i = 0; i < onair_list.length; i++) {
			if(onair_list[i][0]==aengji_settings['cswu'][j][0]){
				match = true;
				break;
			}
		}
		
		if(match){
			
			odiv.nextSibling.nextSibling.remove();
						
			var img = ce(thumb_container, 'img');
			img.className = 'tier-thumb';
			img.src = 'https:' + onair_list[i][2];			
			img.setAttribute('id', onair_list[i][1]);
			
			odiv.setAttribute('user_id', onair_list[i][0]);
			odiv.setAttribute('broad_no', onair_list[i][1]);
			
			odiv.addEventListener("click", function(){
				window.open('https://play.afreecatv.com/' + event.target.getAttribute('user_id') + '/' + event.target.getAttribute('broad_no'), '_blank');
			});
			
			odiv.addEventListener("mouseover", function(){
				var t = document.getElementById(event.target.getAttribute('broad_no'));
				if(t){
					t.style.display = 'block';
				}
			});
			odiv.addEventListener("mouseout", function(){
				var t = document.getElementById(event.target.getAttribute('broad_no'));
				if(t){
					t.style.display = 'none';
				}
			});
		}else{			
			odiv.setAttribute('user_id', aengji_settings['cswu'][j][0]);
			odiv.addEventListener("click", function(){
				window.open('https://bj.afreecatv.com/' + event.target.getAttribute('user_id'), '_blank');
			});
		}
		
	}	
}


	function getBJ(m){
		var bj;
		if(m && m!==''){
			for(var i=0;i<bj_list.length;i++){
				if(bj_list[i][0] == m){
					bj = bj_list[i];
					break;
				}
			}
			if(!bj){
				bj = getBJ2(m);
			}
		}
		return bj;
	}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] > b[0]) ? -1 : 1;
    }
}

async function getDataAsync(url = '') {
	var response = await fetch(url);
	var data = await response.json();
	return data;
}

function getData(url = '') {
	return fetch(url)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		return data;
	})
	.catch(function (error) {
		console.log(error);
	});
}

function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
}
