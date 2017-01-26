# Basic CMS plugin for NodeBB - custom homepage

Allows you to define a custom homepage for NodeBB. The default template comes with four widget areas (main, sidebar, header, footer).

## Screenshots

![homepage](http://i.imgur.com/GObRKQq.png)

## Instructions

### Install

Command line:

    npm install nodebb-plugin-custom-homepage

Or install via the Admin Control Panel and restart NodeBB.

### Activating

A new entry will be available under ACP -> General -> Home Page called "Custom Homepage". Set this and hit save.

### Adding a menu item to the homepage

Add a navigation icon to the homepage on the menu via ACP -> General -> Navigation. Under `route`, enter `/`. 
