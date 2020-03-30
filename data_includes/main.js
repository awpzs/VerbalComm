PennController.ResetPrefix(null); // Initiates PennController

// Start typing your code here
PennController.AddHost("https://raw.githubusercontent.com/awpzs/VerbalComm/master/images/")

Sequence( "welcome", "practice" )

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

Template(
    GetTable("pracdesign.csv")
            .setGroupColumn("List"), variable =>
    newTrial( "practice" ,
        newTimer(200)
            .start()
            .wait()
        ,
        newImage("one", variable.FirstDisplay)
            .size(768,480)
            .print()
        ,
        newText(variable.Context)
            .settings.center()
            .print()
        ,
        newSelector()
            .add( getImage("one") )
            .wait()
        ,
        clear()
        ,
        newTimer(200)
            .start()
            .wait()
        ,
        newImage("two", variable.SecondDisplay)
            .size(768,480)
            .print()
        ,
        newTextInput("Response", "现在")
            .log()
            .settings.center()
            .print()
        ,
        newButton("继续")
            .settings.center()
            .print()
            .wait()
        ,
        newTimer(200)
            .start()
            .wait()
  )
  .log( "ID"     , getVar("ID")    )
  .log( "List"   , variable.List   )
  .log( "Item"   , variable.Item   )
  .log( "Context"   , variable.Context   )
  .log( "Box"   , variable.Box   )
  .log( "Gender"   , variable.Gender   )
)
