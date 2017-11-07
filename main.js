var listOfItems=[];
startIt();
setTimeout(renderHTML,5000);

function startIt()

{

	let users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
	for(var i=0; i<users.length; i++)


	{

		let object=

		{
			display : "null",
			logo :"null",
			url : "null",
			status : "null"

		};
		listOfItems.push(object);
		fetchIt(users[i],"channels",i);
	}
};

function fetchIt(string,getFrom,i)
{
	let endpoint= `https://wind-bow.glitch.me/twitch-api/${getFrom}/${string}`;
	fetch(endpoint).then(value=> value.json()).then(data=>{getFrom=== 'channels'? getData(data,string,i):getMoreData(data,i)});
}
function getData(data,string,i)

{

	listOfItems[i].display=data.display_name;
	listOfItems[i].logo=data.logo;
	listOfItems[i].url=`https://go.twitch.tv/${string}`;
	fetchIt(string, "streams",i);
}

function getMoreData(data,i)
{
	let status;
	(data.stream==null) ? status= "Offline" : status = data.stream.channel.status;
	listOfItems[i].status=status;
}

function renderHTML()

{
	for(var i=0; i<listOfItems.length; i++)
	{
		let sectionToAdd=document.querySelector(".display-channels");
		let table=document.createElement("table");
		let tr=document.createElement("tr");
		let td1=document.createElement("td");
		let td2= document.createElement("td");
		let td3=document.createElement("td");
		let div= document.createElement("div");

		let logo=document.createElement("img");
		if(listOfItems[i].logo!=null)
		{
			logo.setAttribute("src",listOfItems[i].logo);

		}
		else
		{

				logo.setAttribute("src","black.jpg");
		}

		td1.appendChild(logo);
		td1.classList="image";

		let name=document.createTextNode(listOfItems[i].display);
		let link=document.createElement("a");
		link.setAttribute("href",listOfItems[i].url);
		link.setAttribute("target","_blank");
		link.appendChild(name);
		td2.appendChild(link);

		let status=document.createTextNode(listOfItems[i].status);
		td3.appendChild(status);


		table.appendChild(td1);
		table.appendChild(td2);
		table.appendChild(td3);
		div.appendChild(table);
		div.classList="newRow";
		sectionToAdd.appendChild(div);

	}

}