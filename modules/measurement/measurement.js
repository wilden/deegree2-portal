//$HeadURL: svn+ssh://developername@svn.wald.intevation.org/deegree/apps/igeoportal-standard/trunk/modules/timeselect/timeselect.js $
/*----------------------------------------------------------------------------
 This file is part of deegree, http://deegree.org/
 Copyright (C) 2001-2009 by:
 - Department of Geography, University of Bonn -
 and
 - lat/lon GmbH -

 This library is free software; you can redistribute it and/or modify it under
 the terms of the GNU Lesser General Public License as published by the Free
 Software Foundation; either version 2.1 of the License, or (at your option)
 any later version.
 This library is distributed in the hope that it will be useful, but WITHOUT
 ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 details.
 You should have received a copy of the GNU Lesser General Public License
 along with this library; if not, write to the Free Software Foundation, Inc.,
 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA

 Contact information:

 lat/lon GmbH
 Aennchenstr. 19, 53177 Bonn
 Germany
 http://lat-lon.de/

 Department of Geography, University of Bonn
 Prof. Dr. Klaus Greve
 Postfach 1147, 53001 Bonn
 Germany
 http://www.geographie.uni-bonn.de/deegree/

 e-mail: info@deegree.org
 ----------------------------------------------------------------------------*/
function Measurement() {

	// variable declaration
	this.targetDoc;
	this.parentElement;
	this.digits = 0;

	// method declaration
	this.paint = paint;
	this.repaint = repaint;
	this.kill = kill;
	this.startMeasureLength = startMeasureLength;
	this.startMeasureArea = startMeasureArea;
	this.handleMeasurements = handleMeasurements;
	this.toggleControl = toggleControl;
	this.type = -1;

	// method implementation
	function paint(targetDoc, parentElement) {
		this.targetDoc = targetDoc;
		this.parentElement = parentElement;		
	}

	function repaint() {
		// nothing to do
	}
	
	function startMeasureLength() {
		this.kill();
		getElement('tbLength', this.targetDoc).style.visibility = 'visible';
		this.toggleControl( 0 );
		this.type = 0;
	}
	
	function startMeasureArea() {
		this.kill();
		getElement('tbLength', this.targetDoc).style.visibility = 'visible';
		getElement('tbArea', this.targetDoc).style.visibility = 'visible';
		this.toggleControl( 1 );
		this.type = 1;
	}

	function handleMeasurements(event) {
		var ada = new WKTAdapter();
		var geometry = ada.geometryFromText( event.geometry +"" );
		var units = event.units;
		var order = event.order;
		var measure = event.measure;		
		getElement('inpLength', controller.vMeasurement.targetDoc).value = geometry.length();
		if ( controller.vMeasurement.type == 1 ) {
			getElement('inpArea', controller.vMeasurement.targetDoc).value = geometry.area();
		}
	}

	function toggleControl(index) {		
		var measureControls = controller.vOLMap.getMap().getControlsByClass( 'OpenLayers.Control.Measure' );
		for (key in measureControls) {
			var control = measureControls[key];
			if ( index == key ) {				
				control.activate();
			} else {
				control.deactivate();
			}
		}		
	}

	/**
	 * removes and hides all elements except toolbar
	 * 
	 */
	function kill() {			
		var measureControls = controller.vOLMap.getMap().getControlsByClass( 'OpenLayers.Control.Measure' );
		if (measureControls != null) {			
			for ( var key in measureControls) {
				control = measureControls[key];
				control.deactivate();				
			}
		}
		if ( getElement('inpLength', this.targetDoc) ) {
			getElement('inpLength', this.targetDoc).value = '';
		}
		if ( getElement('tbLength', this.targetDoc) ) {
			getElement('tbLength', this.targetDoc).style.visibility = 'hidden';
		}
		if ( getElement('inpArea', this.targetDoc) ) {
			getElement('inpArea', this.targetDoc).value = '';
		}
		if ( getElement('tbArea', this.targetDoc) ) {
			getElement('tbArea', this.targetDoc).style.visibility = 'hidden';
		}
		this.type = -1;
	}

}