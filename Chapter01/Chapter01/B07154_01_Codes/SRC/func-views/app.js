const { TitleBarActionsView } = require( "./js/View/TitleBarActions.js" );
new TitleBarActionsView( document.querySelector( "[data-bind=titlebar]" ) );

const { DirService } = require( "./js/Service/Dir.js" ),
      { DirListView } = require( "./js/View/DirList.js" ),
      { FileListView } = require( "./js/View/FileList.js" ),
      { TitleBarPathView } = require( "./js/View/TitleBarPath.js" ),
      dirService = new DirService();

new DirListView( document.querySelector( "[data-bind=dirList]" ), dirService );
new FileListView( document.querySelector( "[data-bind=fileList]" ), dirService );
new TitleBarPathView( document.querySelector( "[data-bind=path]" ), dirService );

dirService.notify();