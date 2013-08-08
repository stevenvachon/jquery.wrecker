/**
 * jQuery Wrecker v0.2
 * Responsive Equal-Height Columns and Rows
 * http://www.svachon.com/blog/wrecker-responsive-equal-height-columns-and-rows
 *
 * Licensed under the MIT license.
 * Copyright 2013 Steven Vachon
 */
(function($)
{



$.Wrecker = function()
{
	// Variables
	var columnCount = 0;
	var element;
	var previousColumnCount = 0;
	var settings = {
		itemSelector      : "",
		maxColumns        : 1,
		responsiveColumns : [ /*{800:1}*/ ]	// Had to nest this way because not all browsers loop through objects in correct order
	};
	
	
	
	function init(options, $element)
	{
		element = $( $element );
		
		changeSettings(options);
		
		$(window).on("resize", handleResize);
		
		calculateGrid();
	}
	
	
	
	function calculateGrid()
	{
		var newColumnCount = settings.maxColumns;
		var windowWidth = $(window).innerWidth();
		
		for (var i=0, numResponsiveColumns=settings.responsiveColumns.length; i<numResponsiveColumns; i++)
		{
			var currentSize = settings.responsiveColumns[i];
			
			for (var j in currentSize)
			{
				if (j >= windowWidth)
				{
					newColumnCount = currentSize[j];
				}
			}
		}
		
		if (newColumnCount!=columnCount && newColumnCount>0)
		{
			previousColumnCount = columnCount;
			columnCount = newColumnCount;
			
			updateGrid();
		}
	}
	
	
	
	function changeSettings(options)
	{
		// IE6-8 do not support responsive CSS, so the columns should be set to default (max) size
		if (!$.support.leadingWhitespace)
		{
			options.responsiveColumns = [];
		}
		
		settings = $.extend(settings, options);
	}
	
	
	
	function destroy()
	{
		$(window).off("resize", handleResize);
		
		columnCount = 0;
		updateGrid();
		
		element.removeData("wrecker");
	}
	
	
	
	function handleResize(event)
	{
		calculateGrid();
	}
	
	
	
	function updateGrid()
	{
		// Remove any row containers
		element.children("div.wrecker-row").children().unwrap();
		
		var cells = element.children(settings.itemSelector);
		
		if (columnCount > 1)
		{
			var numCells = cells.length;
			
			var startIndex = 0;
			var count = 0;
			
			// Add row containers
			cells.each(function(i)
			{
				if (++count == 1)
				{
					startIndex = i;
				}
				
				if (count>=columnCount || i>=numCells-1)
				{
					cells.slice(startIndex,i+1).wrapAll('<div class="wrecker-row" style="display:table-row"/>');
					
					count = 0;						
				}
				
				// Since Wrecker styles are removed for single columns, they must be re-added
				if (previousColumnCount <= 1)
				{
					$(this).addClass("wrecker-cell").css({display:"table-cell", float:"none"});
				}
			});
			
			element.addClass("wrecker").css("display", "table");
		}
		else
		{
			// Remove Wrecker styles
			cells.removeClass("wrecker-cell").css({display:"", float:""});
			element.removeClass("wrecker").css("display", "");
		}
	}
	
	
	
	// Public Methods
	this.changeSettings = changeSettings;
	this.destroy = destroy;
	this.reload = updateGrid;
	
	
	
	// Initiate
	init.apply(this, arguments);
};



$.fn.wrecker = function(options)
{
	var optionsString = (typeof options === "string");
	var args = Array.prototype.slice.call(arguments, 1);
	
	this.each(function(i)
	{
		var $this = $(this);
		var instance = $this.data("wrecker");
		
		if (optionsString)
		{
			if (!instance)
			{
				console.error("Cannot call Wrecker methods prior to initialization; attempted to call method \""+ options +"\"");
				return;
			}
			
			if (!$.isFunction(instance[options]))
			{
				console.error("No such Wrecker method \""+ options +"\"");
				return;
			}
			
			instance[options].apply(instance, args);
		}
		else
		{
			options = options || {};
			
			if (!instance)
			{
				$this.data("wrecker", new $.Wrecker(options,this) );
			}
			else
			{
				instance.changeSettings(options);
			}
		}
	});
	
	return this;
}



})(jQuery);