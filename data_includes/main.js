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
        newText("请仔细阅读图片下方的句子，并记住红框里的人物/物件的位置。")
            .settings.center()
            .print()
        ,
        newText("之后请点击句子上方的图片，看下一张图片。")
            .settings.center()
            .print()
        ,
        newImage("one", variable.FirstDisplay)
            .size(768,480)
            .print()
        ,
        newText(variable.Context)
            .settings.center()
            .bold()
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
        newText("红框里的人物/物件改变了位置。")
            .settings.center()
            .print()
        ,
        newText("请用一句话简洁明了地描述该人物/物件的新位置。例如：")
            .settings.center()
            .print()
        ,
        newText(variable.Hint1)
            .settings.center()
            .print()
        ,
        newText(variable.Hint2)
            .settings.center()
            .print()
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
