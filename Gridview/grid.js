class DataClass {
	constructor() { 
		this.data = [
			{
				'Name':'John',
				'Gender':'male',
				'ID':123456,
				'Skills':'React Js',
				'Project':'CTS Intern',
				'HCM':'Alex',
			},
			{
				'Name':'Priya',
				'Gender':'female',
				'ID':123456,
				'Skills':'React Js',
				'Project':'CTS Intern',
				'HCM':'Alex',
			},
		]
	}
	refresh(view){
		if (view=='card')
			this.cardView();
		else
			this.listView();
	}
	clickToEdit(index,view) {
		var id = 'Skills'+index;
		var action = '#action'+index
		var value = $('#'+id).text()
		$('#'+id).html(`<input type="text" id='editedskill${index}' value="${value}">`);
		$(action).text('Save')
		$(action).attr('onclick',`dataobj.clickToSave(${index},'${view}')`);
		$(action).attr('class','btn btn-success');
	}
	clickToSave(index,view) {
		var data = this.data[index];
		var id = 'Skills'+index;
		var action = '#action'+index
		var value = $('#editedskill'+index).val()
		data['Skills'] = value;
		$('#'+id).text(value);
		$(action).text('Edit')
		$(action).attr('onclick',`dataobj.clickToEdit(${index},'${view}')`);
		$(action).attr('class','btn btn-primary');
	}
	clickToDelete(index,view) {
		console.log(index+' deleted');
		delete this.data[index]
		this.refresh(view);
	}
	listrow(index){
		var data = this.data[index];
		var template = '';
		for (const [key,value] of Object.entries(data))
			if (key!='Gender')
				template += `<td id='${key+index}'>${value}</td>`;
		template+=`
		<td><button class="btn btn-primary" id="action${index}" onclick='dataobj.clickToEdit(${index},"list")'>Edit</button></td>
		<td><button class="btn btn-danger"  onclick='dataobj.clickToDelete(${index},"list")'><i class="fas fa-trash-alt fa-lg"></i></button></td>`;
		return template;
	}
	listView(){
		var data = this.data;
		var template = `
			<div class='table-responsive'>
			<table class='table table-striped'>
				<tr>
					<th>Name</th>
					<th>ID</th>
					<th>Skills</th>
					<th>Project</th>
					<th>HCM'</th>
					<th>Action</th>
					<th>Delete</th>
				</tr>
			`;
		for(var p in data)
			template += `<tr>${this.listrow(p)}</tr>`;
		$("#grid").html(template);
	}
	cardrow(index){
		var template = '';
		for (const [key, value] of Object.entries(this.data[index])){
			template += `<tr><th>${key}:</th><td id='${key+index}'>${value}</td></tr>`
		}
		return template
	}
	cardView(){
		var data = this.data;
		var template = "<div class='row'>";
		for(var p in data){
			template += `
				<div class='col-lg-4'>
					<div class="card shadow p-3 mb-5 bg-white rounded" style="width: 20rem;">
					  <img src="${data[p].Gender}-icon.png" class="card-img-top" style='width:200px; hight:200px;' alt="${data[p].Gender} image">
					  <div class='closebtn' onclick='dataobj.clickToDelete(${p},"card")'><i class="far fa-times-circle"></i></div>
					  <div class="card-body">
					    <table class='p-3 m-3'>${this.cardrow(p)}</table>
					    <div class='d-flex justify-content-center'>
						    <a href="#" class="btn btn-primary" id="action${p}" onclick='dataobj.clickToEdit(${p},"card")'>Edit</a>
						</div>
					  </div>
					</div>
				</div>
			`
		}
		template+='</div>';

		$("#grid").html(template);
	}
	toggle(){
	}
}
dataobj = new DataClass();
$(document).ready(function(){
	dataobj.cardView();
  $("#toggle").click(function(){
  	islist = $(this).data('list');
  	$(this).data('list',!(islist));
    if (islist){
    	$(this).html('<i class="fas fa-th-list fa-2x"></i>')
    	dataobj.cardView()
    }
    else{
    	$(this).html('<i class="fas fa-th-large fa-2x"></i>')
    	dataobj.listView()
    }
  });
});