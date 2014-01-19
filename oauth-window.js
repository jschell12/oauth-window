(function(undefined) {
	
  var OauthWindow = window.OauthWindow = function(authenticateUrl, interval, windowParams) {
    this.authenticateUrl = authenticateUrl;
    this.interval = interval || 1000;
    this.windowParams = windowParams || "location=0,status=0,width=800,height=600";
  }

  OauthWindow.prototype = {
    open : function() {
      var self = this;
      self.oauth_window = window.open(self.authenticateUrl, 'oauthWindow', self.windowParams);
      self.checkConnect = setInterval(function() {
      	if(self.oauth_window.location){
          if(self.oauth_window.location.host){
            self.oauth_window.close();
          }
        }
        if (!self.oauth_window || !self.oauth_window.closed) return;
        clearInterval(self.checkConnect);
        window.location.reload();
      }, self.interval);
    }
  };
  
  return OauthWindow;
})();
