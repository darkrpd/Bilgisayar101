
Tab_img_museum = new Array(22);
Tab_nom_museum = new Array("summary","pictures","doc","hardware","screenshot","emulator","links","3d","forum","connectors","advert","docs","videos","3d");
fini_museum=false;
	
function images()
	{	
	var i,j;

	for (i=0,j=0;i<28;i+=2,j++)
		{
		Tab_img_museum[i]=new Image(90,30);
		Tab_img_museum[i+1]=new Image(90,30);
		Tab_img_museum[i].src="/museum/graphs/"+Tab_nom_museum[j]+"_off.gif";
		Tab_img_museum[i+1].src="/museum/graphs/"+Tab_nom_museum[j]+"_on.gif";
		fini=true;
		chargement();
		}
	}

function sm_on(s,ok)
	{
	if	(!fini) return;
	if	(ok) c="on"; else c="off";
	eval("document.m"+s+".src=Tab_img_museum[(s-1)*2+ok].src");
	}

function open_info(t,n)
	{
    window.open('detail.asp?t='+t+'&i='+n,'open_info','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=550,height=480');  
  	}

function open_info2(t,n,x)
	{
    window.open('detail.asp?t='+t+'&i='+n,'open_info','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,width='+x+',height=500,top=50,left=50');  
  	}