import {events} from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import * as validation from '../validation.js'; 

const exportedMethods = {
  async addEvent (
    event_name,
    description,
    releaseDate,
    releaseTime,
    registerExpireDate,
    registerEXpireTime,
    hostDate,
    hostTime,
    location,
    hostInfo,
    tags,
  ){

  },

  async removeEvent(id) {

  },

  async updateEventPatch(id, updatedEvent) {

  },

  // will return all app's events
  async getAllAppEvents() {

  },

  // will return all app's events which have all the tags
  async getAllAppEventsWithTags(tags) {

  },

  // will return all app's events which is past
  async getAllAppEventsPast(currentDate, currentTime) {

  },

  // will return all app's events which is current
  async getAllAppEventsCurrent(currentDate, currentTime) {

  },
  
  // will return all app's events which is past and have all the tags
  async getAllAppEventsPastWithTags(currentDate, currentTime) {

  },
  
  // will return all app's events which is current and have all the tags
  async getAllAppEventsCurrentWithTags(currentDate, currentTime) {

  },

  // will return all events which is sorted first by date then by time
  async getAllAppEventsAndSortByStartDate() {

  },

  async getAllUserHostEvents() {

  },

  async getAllUserParticipateEvents() {

  },

  async getEventById(id) {

  },

  async getEventsByTag() {

  }
};

export default exportedMethods;
