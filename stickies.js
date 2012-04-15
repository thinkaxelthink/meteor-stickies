Notes = new Meteor.Collection("notes");

if (Meteor.is_client) {
	
	Template.stickies.createNotes = function()
	{
		//console.log('stickies');
		var notes = Notes.find({}, {sort:{created: -1, type:'notes'}}).fetch();
		notes.unshift({type: 'insert', text: 'add your note here', author: {firstname: 'Axel',lastname: 'Esquite'}, created: new Date()})
		//console.log('notes', notes);
		return notes;
	};
	
	Template.sticky.isNote = function(type)
	{
		//console.log('note', type, type === 'note');
		return type === "note";
	};
	
	Template.stickies.events = {
		'click div.insert': function (e) {
			var empty_note = {type: 'note', text: '...', author: {firstname: 'Some',lastname: 'Stranger'}, created: new Date()}
			console.log('you pressed, add note to server', empty_note, arguments);
			Notes.insert(empty_note);
		},
		'keyup div.sticky form textarea': function(e) {
			console.log('sticky form textarea', $(e.currentTarget).parent().attr('id').replace('sticky-', ''), $(e.currentTarget).val());
			Notes.update($(e.currentTarget).parent().attr('id').replace('sticky-', ''), {$set: {text: $(e.currentTarget).val()}});
		}
	};
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // code to run on server at startup
	if(Notes.find().count() < 1)
	{
		Notes.insert({type: 'note', text: 'This is a testy test', author: {firstname: 'Axel',lastname: 'Esquite'}, created: new Date()});
	}
  });
}