Notes = new Meteor.Collection("notes");

if (Meteor.is_client) {
	
	Template.stickies.createNotes = function()
	{
		//log('stickies');
		var notes = Notes.find({}, {sort:{created: -1, type:'notes'}}).fetch();
		notes.unshift({type: 'insert', text: 'add your note here', author: {name: 'admin'}, created: new Date()})
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
			var empty_note = {type: 'note', text: '', author: {name: $('#author-info input[name="username"]').val()}, created: new Date()}
			log('you pressed, add note to server', empty_note, e, $('#author-info input[name="username"]').val());
			
			if($('#author-info input[name="username"]').val() !== '')
			{
				Notes.insert(empty_note);
			}
			else
			{
				// author info inputs glow red
				$('#author-info input').addClass('glowRed');
			}
		},
		'keyup div.sticky form textarea': function(e) {
			//log('sticky form textarea', $(e.currentTarget).parent().attr('id').replace('sticky-', ''), $(e.currentTarget).val());
			Notes.update($(e.currentTarget).parent().attr('id').replace('sticky-', ''), {$set: {text: $(e.currentTarget).val()}});
		},
		'click div.close-x': function(e) {
			//log('close this note', $(e.currentTarget).siblings('form').attr('id').replace('sticky-', ''))
			Notes.remove($(e.currentTarget).siblings('form').attr('id').replace('sticky-', ''));
		}
	};
	
	Template.authorInfo.events = {
		'click label': function(e) {
			//log('label clicked', $(e.currentTarget), e);
			$(e.currentTarget).hide().siblings('input').focus();
		},
		'focusin input': function(e) {
			if($(e.currentTarget).siblings('label').is(':visible'))
			{
				$(e.currentTarget).siblings('label').hide();
			}
		},
		'focusout input': function(e) {
			//log('input focus out');
			if($(e.currentTarget).val() !== '')
			{
				$('#author-info input').removeClass('glowRed');
			}
			else
			{
				$(e.currentTarget).siblings('label').show();
			}
		}
	}
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // code to run on server at startup
	if(Notes.find().count() < 1)
	{
		Notes.insert({type: 'note', text: 'Hi! leave me a note.', author: {name: 'Axel'}, created: new Date()});
	}
  });
}