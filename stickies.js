Notes = new Meteor.Collection("notes");

if (Meteor.is_client) {
	
	Template.stickies.createNotes = function()
	{
		//log('stickies');
		var notes = Notes.find({}, {sort:{created: -1, type:'notes'}}).fetch();
		notes.unshift({type: 'insert', text: 'add your note here', author: {firstname: 'Axel',lastname: 'Esquite'}, created: new Date()})
		//log('notes', notes);
		return notes;
	};
	
	Template.sticky.isNote = function(type)
	{
		//log('note', type, type === 'note');
		return type === "note";
	};
	
	Template.stickies.events = {
		'click div.insert': function (e) {
			var empty_note = {type: 'note', text: '', author: {firstname: 'Some',lastname: 'Stranger'}, created: new Date()}
			//log('you pressed, add note to server', empty_note, e);
			Notes.insert(empty_note);
		},
		'keyup div.sticky form textarea': function(e) {
			//log('sticky form textarea', $(e.currentTarget).parent().attr('id').replace('sticky-', ''), $(e.currentTarget).val());
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