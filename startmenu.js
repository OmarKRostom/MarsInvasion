this.startmenu = function(game) {
	this.startbg;
	this.startprompt;
}

this.startmenu.prototype = {
	create : function() {
		startbg = this.add.image(0,0,'titlescreen');
		startbg.inputEnabled = true;
		startbg.events.onInputDown.addOnce(this.startGame,this);
		startprompt = this.add.bitmapText(this.world.centerX,this.world.centerY,'eightbitwonder','Click to start!',24);

	},
	startGame : function() {
		this.state.start('mainState');
	}
}