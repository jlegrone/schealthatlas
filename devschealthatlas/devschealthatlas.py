import os
import urllib
import jinja2
import webapp2
import cgi
import model
import logging
from google.appengine.api import users

from google.appengine.ext import ndb
from google.appengine.ext import db

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

config = {}
config['webapp2_extras.sessions'] = dict(secret_key='')

class User(db.Model):
    id = db.StringProperty(required=True)
    created = db.DateTimeProperty(auto_now_add=True)
    updated = db.DateTimeProperty(auto_now=True)
    name = db.StringProperty(required=True)
    profile_url = db.StringProperty(required=True)
    access_token = db.StringProperty(required=True)

class CommonHandler(webapp2.RequestHandler):
    def setupUser(self):
        # self.user = users.get_current_user()
        self.user = False # setting this to false to disable the users module for now -- was causing 500 error on production
        self.templateValues = {}
        if self.user:
            self.templateValues['signedIn'] = True
            self.templateValues['loginUrl'] = users.create_logout_url('/')
           
            self.account = model.Account.query_account_for_user(self.user).get()
            if self.account:
                logging.critical('account exists for email ' + self.account.user.email())
            else:
                logging.critical('account doesnt exist - creating')
                self.account = model.Account(user = self.user)
                self.account.put()
        else:
            # loginURL = users.create_login_url('/account')
            self.templateValues['loginUrl'] = 'http://schealthatlas.org'

    def render(self,htmlFile):
        template = JINJA_ENVIRONMENT.get_template(htmlFile)
        self.response.out.write(template.render(self.templateValues))

class MainPage(CommonHandler):

    def get(self):
        self.setupUser();
        self.render('map.html')
        
class DataPage(CommonHandler):

    def get(self):
        self.setupUser();
        self.render('data.html')

class AccountPage(CommonHandler):

    def get(self):
        self.setupUser();
        if self.user:
            self.templateValues['UserName'] = self.user.nickname()
            self.templateValues['UserEmail'] = self.user.email()
            self.templateValues['UserAccount'] = self.account
            self.render('account.html')
        else:
            # loginURL = users.create_login_url('/account')
            # self.redirect(str(loginURL))
            self.redirect('/')

class LoginHandler(CommonHandler):

    def get(self):
        self.setupUser();
        loginURL = users.create_login_url('/account')
        self.redirect(str(loginURL))

application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/data', DataPage),
    ('/account', AccountPage),
    ('/_ah/login_required?continue=http://www.schealthatlas.org/account', LoginHandler)
], debug=True, config = config)