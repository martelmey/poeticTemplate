# poeticTemplate
/// Introduction

Lay down bars based on these inputs:

* No. of bars
* No. of measures per bar
* No. of feet per measure
* Type of foot

/// Example input

LayBars poem = new LayBars();

poem.setBarCount(4)

poem.setMeasuresPerBar(2)

poem.setFeetPerMeasure(5)

poem.setFootType("iamb")

poem.layBars();

/// Example output

Bar count: 4, Measures per bar: 2, Feet per measure: 5, Foot type:  */ 

{  ((  */  |  */  |  */  |  */  |  */  |  ))  ((  */  |  */  |  */  |  */  |  */  |  ))  }

{  ((  */  |  */  |  */  |  */  |  */  |  ))  ((  */  |  */  |  */  |  */  |  */  |  ))  }

{  ((  */  |  */  |  */  |  */  |  */  |  ))  ((  */  |  */  |  */  |  */  |  */  |  ))  }

{  ((  */  |  */  |  */  |  */  |  */  |  ))  ((  */  |  */  |  */  |  */  |  */  |  ))  }

/// List of included meters

* trochee = /x
* iamb = x/
* spondee = //
* dactyl = /xx
* anapest = x/x
* primus = /xxx
* secundus = x/xx
* tertius = xx/x
* quartus = xxx/
