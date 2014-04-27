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

class EventLocation(ndb.Model):
    streetAddress = ndb.StringProperty()
    city = ndb.StringProperty()
    state = ndb.StringProperty()
    latitude = ndb.FloatProperty()
    longitude = ndb.FloatProperty()

class Guest(ndb.Model):
    account = ndb.StructuredProperty(Account)
    email = ndb.StringProperty()
    nickname = ndb.StringProperty()
    canDrive = ndb.BooleanProperty()
    isDriving = ndb.BooleanProperty()
    availableSeats = ndb.IntegerProperty()
    totalSeats = ndb.IntegerProperty()
    milesPerGallon = ndb.FloatProperty()

    @classmethod
    def query_guest_instances_for_account(cls, queryAccount):
        return Guest.query(Guest.account == queryAccount)

class Carpool(ndb.Model):
    name = ndb.StringProperty()
    driver = ndb.StructuredProperty(Guest)
    passengers = ndb.StructuredProperty(Guest, repeated = True)
    
    departureTime = ndb.DateTimeProperty()
    departureLocation = ndb.StructuredProperty(EventLocation) 
    returnTime = ndb.DateTimeProperty()
    returnLocation = ndb.StructuredProperty(EventLocation)

    @classmethod
    def query_carpools_for_guest(cls, queryGuest):
        return Carpool.query(ndb.OR(Carpool.driver == queryGuest,
                                    Carpool.passengers.IN([queryGuest])))

    @classmethod
    def query_carpools_for_driver(cls, queryDriver):
        return Carpool.query(Carpool.driver == queryDriver)
    
    def seats_remaining():
        return (driver.availableSeats - passengers.count)

class Event(ndb.Model):
    name = ndb.StringProperty()
    urlsuffix = ndb.StringProperty()

    eventLocation = ndb.StructuredProperty(EventLocation)
    eventTime = ndb.DateTimeProperty()

    departureTime = ndb.DateTimeProperty()
    returnTime = ndb.DateTimeProperty()
    departureLocation = ndb.StructuredProperty(EventLocation)

    host = ndb.StructuredProperty(Guest)
    guests = ndb.StructuredProperty(Guest, repeated = True)
    carpools = ndb.LocalStructuredProperty(Carpool, repeated = True)

    def generate_url_suffix(event, eventName, hostName):
        suffix = []
        suffix.append("?eventName="+eventName)
        suffix.append("hostName="+hostName)
        # suffix.append("destination="+thiseventLocation)
        # suffix.append("date="+thisdepartureTime)
        return "&".join(suffix) 

    @classmethod
    def query_events_with_event_name(cls, queryHostName, queryEventName):
        return Event.query(ndb.AND(Event.host.nickname == queryHostName,
                                   Event.name == queryEventName))

    @classmethod
    def query_future_events_with_host(cls, queryAccount):
        return Event.query(ndb.AND(Event.host.account == queryAccount,
                                   Event.departureTime > datetime.now())).order(Event.departureTime)

    @classmethod
    def query_past_events_with_host(cls, queryAccount):
        return Event.query(ndb.AND(Event.host.account == queryAccount,
                                   Event.departureTime < datetime.now())).order(-Event.departureTime)

    @classmethod
    def query_future_events_with_guest(cls, queryAccount):
        return Event.query(ndb.AND(Event.guests.account == queryAccount,
                                   Event.departureTime > datetime.now())).order(Event.departureTime)

    @classmethod
    def query_past_events_with_guest(cls, queryAccount):
        return Event.query(ndb.AND(Event.guests.account == queryAccount,
                                   Event.departureTime < datetime.now())).order(-Event.departureTime)

    def build_carpools_for_event(event):
        allguests = event.guests

        carpools = []
        drivers = []
        nondrivers = []
        guestsToBePutInCars = []

        for guest in allguests:
            guestsToBePutInCars.append(guest)
            if guest.canDrive:
                drivers.append(guest)
            else:
                nondrivers.append(guest)

        while(guestsToBePutInCars):
            if guestsToBePutInCars:
                if not drivers:
                    break #not enough drivers

            driver = drivers[0]
            drivers.remove(driver)
            guestsToBePutInCars.remove(driver)
            seatsLeft = driver.availableSeats
            
            carpool = Carpool(name = driver.nickname, driver = driver, passengers = [])
            carpools.append(carpool)

            for i in range (0, seatsLeft):
                if nondrivers:
                    passenger = nondrivers[0]
                    nondrivers.remove(passenger)
                elif drivers:
                    passenger = drivers[0]
                    drivers.remove(passenger)
                else:
                    break

                guestsToBePutInCars.remove(passenger)
                carpool.passengers.append(passenger)
                logging.critical("Added "+passenger.nickname+" to the carpool of "+driver.nickname)

        return carpools
