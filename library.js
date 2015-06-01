(function(module) {
	"use strict";

	var Plugin = {};
	var Meta = module.parent.require('./meta');
	var Validator = require('validator');

	function renderDefaultSiteDescription(req, res, next) {
		res.locals.metaTags = [{
			name: "description",
			content: Validator.escape(Meta.config.description || '')
		}];
		next();
	}

	function renderHomepage(req, res, next) {
		res.render('homepage', {
			template: {
				name: 'homepage'
			}
		});
	}

	// this method doesn't work
	// and I don't know how to make it work
	// but it would be the preferred way

	Plugin.serveHomepage = function(params){
		renderHomepage(params.req, params.res, params.next);
	};

	// this actually does work, but is useless without the above stuff working
	Plugin.addListing = function(data, callback){
		data.routes.push({
			route: 'customHP',
			name: 'Custom Homepage'
		});
		callback(null, data);
	};

	// *sigh*

	Plugin.init = function(params, callback) {
		var app = params.router;

		app.get('/', renderDefaultSiteDescription, params.middleware.buildHeader, renderHomepage);
		app.get('/api/', function(req, res, next) {
			res.json({
				template: {
					name: 'homepage'
				}
			});
		});

		/* no longer necessary because of categories path
		app.get('/forum', params.middleware.buildHeader, params.controllers.home);
		app.get('/api/forum', params.controllers.home);
		*/

		callback();
	};

	Plugin.addNavigation = function(header, callback) {
		header.navigation.push(
			{
				route: '/categories',
				class: '',
				text: 'Forum',
				iconClass: 'fa-comments',
				title: 'Forum',
				textClass: 'visible-xs-inline'
			}
		);

		callback(null, header);
	};

	Plugin.defineWidgetAreas = function(areas, callback) {
		areas = areas.concat([
			{
				'name': 'Custom HP Header',
				'template': 'homepage.tpl',
				'location': 'hp-header'
			},
			{
				'name': 'Custom HP Footer',
				'template': 'homepage.tpl',
				'location': 'hp-footer'
			},
			{
				'name': 'Custom HP Sidebar',
				'template': 'homepage.tpl',
				'location': 'hp-sidebar'
			},
			{
				'name': 'Custom HP Content',
				'template': 'homepage.tpl',
				'location': 'hp-content'
			}
		]);

		callback(null, areas);
	};

	module.exports = Plugin;
}(module));
