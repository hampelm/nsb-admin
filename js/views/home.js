/*jslint nomen: true */
/*globals define: true */

define([
  'jquery',
  'lib/lodash',
  'backbone',
  'settings',

  // Router
  'routers/index',

  // Models
  'models/surveys',

  // Views
  'views/surveys'

],

function($, _, Backbone, settings, IndexRouter, Surveys, SurveyViews) {
  'use strict'; 

  var HomeView = Backbone.View.extend({
  
    el: $("#container"),
    
    initialize: function(options) {
      _.bindAll(this, 'render', 'appendSurvey');

      this.surveys = new Surveys.Collection();
      this.surveys.bind('reset', this.render);
    },

    update: function() {
      this.surveys.fetch();
    },
    
    render: function() {  
      console.log("Rendering HomeView"); 
      
      var self = this;
      var context = {};
      this.$el.html(_.template($('#home').html(), context));  

      this.surveys.each(function(survey) {
        self.appendSurvey(survey);
      });
    },

    appendSurvey: function(survey) {
      var surveyListItemView = new SurveyViews.ListItemView({
        model: survey
      });
      $('.survey-list', this.el).append(surveyListItemView.render().el);
    }
    
  });

  return HomeView;

}); // End HomeView
