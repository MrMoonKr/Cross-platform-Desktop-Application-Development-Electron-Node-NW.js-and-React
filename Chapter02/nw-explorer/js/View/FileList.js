//const filesize = require( "filesize" );

const JEDEC = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

/**
 * Format a number (bytes) to a displayable file size.
 * Simplified version of https://github.com/avoidwork/filesize.js
 * @param {number} input 
 */
const filesize = (input) => {
	if (isNaN(input))
		return input;

	input = Number(input);
	const isNegative = input < 0;
	const result = [];

	// Flipping a negative number to determine the size.
	if (isNegative)
		input = -input;

	// Determining the exponent.
	let exponent = Math.floor(Math.log(input) / Math.log(1024));
	if (exponent < 0)
		exponent = 0;

	// Exceeding supported length, time to reduce & multiply.
	if (exponent > 8)
		exponent = 8;

	// Zero is now a special case because bytes divide by 1.
	if (input === 0) {
		result[0] = 0;
		result[1] = JEDEC[exponent];
	} else {
		const val = input / (Math.pow(2, exponent * 10));

		result[0] = Number(val.toFixed(exponent > 0 ? 2 : 0));

		if (result[0] === 1024 && exponent < 8) {
			result[0] = 1;
			exponent++;
		}

		result[1] = JEDEC[exponent];
	}

	// Decorating a 'diff'.
	if (isNegative)
		result[0] = -result[0];
	
	return result.join(" ");
};

/**
 * View class representing File List
 */
class FileListView {
  /**
   * Create FileListView
   * @param {HTMLElement} boundingEl
   * @param {DirService} dirService
   * @param {I18nService} i18nService
   */
  constructor( boundingEl, dirService, i18nService, fileService ){
    this.dir = dirService;
    this.el = boundingEl;
    this.i18n = i18nService;
    this.file = fileService;
    // Subscribe on DirService updates
    dirService.on( "update", () => this.update( dirService.getFileList() ) );
    // Subscribe on i18nService updates
    i18nService.on( "update", () => this.update( dirService.getFileList() ) );
  }
   /**
   * Helper to format datetime
   * @param {string} timeString
   * @param {string} locale
   * @returns {string}
   */
  static formatTime( timeString, locale ){
    const date = new Date( Date.parse( timeString ) ),
          options = {
            year: "numeric", month: "numeric", day: "numeric",
            hour: "numeric", minute: "numeric", second: "numeric",
            hour12: false
          };

    return date.toLocaleString( locale, options );
  }
  /**
   * Update file list
   * @param {FileEntity[]} collection
   */
  update( collection ) {
    this.el.innerHTML = `<li class="file-list__li file-list__head">
        <span class="file-list__li__name">${this.i18n.translate( "NAME", "Name" )}</span>
        <span class="file-list__li__size">${this.i18n.translate( "SIZE", "Size" )}</span>
        <span class="file-list__li__time">${this.i18n.translate( "MODIFIED", "Modified" )}</span>
      </li>`;
    collection.forEach(( fInfo ) => {
      this.el.insertAdjacentHTML( "beforeend", `<li class="file-list__li" data-file="${fInfo.fileName}">
        <span class="file-list__li__name">${fInfo.fileName}</span>
        <span class="file-list__li__size">${filesize(fInfo.stats.size)}</span>
        <span class="file-list__li__time">${FileListView.formatTime( fInfo.stats.mtime, this.i18n.locale )}</span>
      </li>` );
    });
    this.bindUi();
  }
  /**
   * Bind event listeners
   */
  bindUi(){
    Array.from( this.el.querySelectorAll( ".file-list__li" ) ).forEach(( el ) => {
      el.addEventListener( "click", ( e ) => {
        e.preventDefault();
        this.file.open( el.dataset.file );
      }, false );
    });
  }

}

exports.FileListView = FileListView;