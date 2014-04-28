from google.appengine.ext import ndb
from google.appengine.api import users
from google.appengine.api import mail
from datetime import datetime
import logging
import operator

class Account(ndb.Model):
    user = ndb.UserProperty()

    @classmethod
    def query_account_for_user(cls, queryUser):
        return Account.query(Account.user == queryUser)