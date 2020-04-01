PennController.ResetPrefix(null); // Initiates PennController
//PennController.DebugOff()
// Start typing your code here
PennController.AddHost("https://raw.githubusercontent.com/awpzs/VerbalComm/master/images/")

Sequence( "consent", "identification", "instruction", "practice", "prac_end", "experiment", "questionnaire", "send", "final" )

newTrial( "consent" ,
    newHtml("consent_form", "consentform.html")
        .print()
    ,
    newText("<p><a href='https://expt.pcibex.net/ajax/download/demo/chunk_includes/information_ENG.html' target='_blank'>研究详情（in English）</a></p>")
        .settings.center()
        .print()
    ,
    newButton("同意并继续")
        .settings.center()
        .print()
        .wait()
)

newTrial( "identification" ,
    defaultText
        .print()
    ,
    newText("<p>开始实验前，请填写以下信息：</p>")
    ,
    newText("<p>您是否是大学生？</p>")
    ,
    newScale("uni", "Yes", "No")
        .settings.labelsPosition("right")
        .log("last")
        .print()
    ,
    newTextInput("university", "大学名称")
        .print()
    ,
    newText("<p>您是否被确诊过有阅读或视觉障碍？</p>")
    ,
    newScale("dyslexia", "Yes", "No")
        .settings.labelsPosition("right")
        .log("last")
        .print()
    ,
    newText("<p>您的母语是否为中文？</p>")
    ,
    newScale("native", "Yes", "No")
        .settings.labelsPosition("right")
        .log("last")
        .print()
    ,
    newText("<p>您在家时，父母是否只跟您讲中文？</p>")
    ,
    newScale("nativeParents", "Yes", "No")
        .settings.labelsPosition("right")
        .log("last")
        .print()
    ,
    newText("<p>请在下方填写您的年龄和姓名首字母缩写，然后点击“开始”进入实验介绍环节。</p>")
    ,
    newTextInput("inputAge", "年龄")
        .print()
    ,
    newTextInput("inputID", "姓名")
        .print()
    ,
    newButton("开始")
        .print()
        .wait()
    ,
    newVar("Age")
        .global()
        .set( getTextInput("inputAge") )
    ,
    newVar("ID")
        .global()
        .set( getTextInput("inputID") )
)
.log( "Age", getVar("Age"))
.log( "ID" , getVar("ID") )

newTrial( "instruction" ,
    newHtml("instruction_form", "instruction.html")
        .print()
    ,
    newButton("继续")
        .settings.center()
        .print()
        .wait()
)

Template(
    GetTable("pracdesign.csv")
            .setGroupColumn("List"), variable =>
    newTrial( "practice" ,
        newTimer(200)
            .start()
            .wait()
        ,
        newText("请仔细阅读图片下方的句子，并记住图片里的人物/物件的位置。")
            .settings.center()
            .print()
        ,
        newText("之后请点击句子，看下一张图片。")
            .settings.center()
            .print()
        ,
        newImage("one", variable.FirstDisplay)
            .size(768,480)
            .print()
        ,
        newText("sentence", variable.Context)
            .settings.center()
            .bold()
            .print()
        ,
        newSelector()
            .add( getText("sentence") )
            .wait()
        ,
        clear()
        ,
        newText("有人物/物件改变了位置。")
            .settings.center()
            .print()
        ,
        newText("请用一句话简洁明了地描述该人物/物件的新位置。例如：")
            .settings.center()
            .print()
        ,
        newText(variable.Hint)
            .italic()
            .settings.center()
            .print()
        ,
        newImage("two", variable.SecondDisplay)
            .size(768,480)
            .print()
        ,
        newTextInput("Response", "现在")
            .log()
        ,
        newButton("继续")
            .before( getTextInput("Response") )
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

newTrial( "prac_end" ,
    defaultText
        .print()
    ,
    newText("<p>实验介绍到此结束，接下来将正式开始实验。</p>")
    ,
    newText("<p>正式实验中将不会出现说明和例句。</p>")
    ,
    newButton("开始正式实验")
        .print()
        .wait()
)

Template(
    GetTable("fulldesign.csv")
            .setGroupColumn("List"), variable =>
    newTrial( "experiment" ,
        newTimer(200)
            .start()
            .wait()
        ,
        newImage("one", variable.FirstDisplay)
            .size(768,480)
            .print()
        ,
        newText("sentence", variable.Context)
            .settings.center()
            .bold()
            .print()
        ,
        newSelector()
            .add( getText("sentence") )
            .wait()
        ,
        clear()
        ,
        newImage("two", variable.SecondDisplay)
            .size(768,480)
            .print()
        ,
        newTextInput("Response", "现在")
            .log()
        ,
        newButton("继续")
            .before( getTextInput("Response") )
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

newTrial( "questionnaire" ,
    newText("<p>非常感谢！在实验结束前，请填写下方的小问卷。</p>")
        .print()
    ,
    newTextInput("feedback", "您个人认为本实验是关于什么的？")
        .settings.log()
        .settings.lines(0)
        .settings.size(400, 200)
        .print()
    ,
    newButton("继续")
        .settings.center()
        .print()
        .wait()
)

SendResults( "send" )

newTrial( "final" ,
    newText("<p>感谢您的参与！</p>")
        .print()
    ,
    newText("<p><a href='https://app.prolific.co/submissions/complete?cc=36EDE175' href='_blank'>点击此处结束实验</a></p>")
        .print()
    ,
    newButton("void")
        .wait()
)
