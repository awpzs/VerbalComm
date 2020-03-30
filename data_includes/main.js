PennController.ResetPrefix(null); // Initiates PennController

// Start typing your code here

Sequence( "welcome" , "practice", "send" , "final" )

newTrial( "welcome" ,
    defaultText
        .print()
    ,
    newText("<p>Welcome!</p>")
    ,
    newText("<p>In this experiment, you will have to report which of two pictures matches a description.</p>")
    ,
    newText("<p>Press the <strong>F</strong> key for the picture on the left, or the <strong>J</strong> key for the picture on the right.</p>")
    ,
    newText("<p>Please enter your ID and then click the button below to start the experiment.</p>")
    ,
    newTextInput("inputID")
        .print()
    ,
    newButton("Start")
        .print()
        .wait()
    ,
    newVar("ID")
        .global()
        .set( getTextInput("inputID") )
)
.log( "ID" , getVar("ID") )

Template( GetTable( "pracdesign.csv" )
        .setGroupColumn( "List" )
    , variable =>
    newTrial( "practice" ,
        newTimer(500)
            .start()
            .wait()
    ,
    newImage("two", variable.SecondDisplay)
        .size(1280,800)
    ,
    newImage("one", variable.FirstDisplay)
        .size(1280,800)
    ,
    newCanvas(1280,800)
        .add(   0 , 0 , getImage("one") )
        .print()
    ,
    newText(variable.Description)
        .print()
    ,
    newSelector()
        .add( getImage("one") )
        .wait()
    ,
    newTimer(500)
        .start()
        .wait()
    ,
    newCanvas(1280,800)
        .add(   0 , 0 , getImage("two") )
        .print()
    ,
    newTextInput("Response", "Now")
        .log()
        .lines(1)
        .print()
    ,
    newButton("Continue")
        .print()
        .wait()
  )
  .log( "ID"     , getVar("ID")    )
  .log( "List"   , variable.List   )
  .log( "Item" , variable.Item )
  .log( "Box"  , variable.Box  )
  .log( "Gender" , variable.Gender)
)

SendResults( "send" )


newTrial( "final" ,
    newText("<p>Thank you for your participation!</p>")
        .print()
    ,
    newText("<p><a href='https://www.pcibex.net/' href='_blank'>Click here to validate your participation.</a></p>")
        .print()
    ,
    newButton("void")
        .wait()
)
