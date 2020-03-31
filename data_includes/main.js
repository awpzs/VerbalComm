PennController.ResetPrefix(null); // Initiates PennController

// Start typing your code here
PennController.AddHost("https://raw.githubusercontent.com/awpzs/VerbalComm/master/images/")

Sequence( "consent", "identification", "practice", "prac_end", "experiment", "questionnaire", "send", "final" )

newTrial( "consent" ,
    defaultText
        .print()
    ,
    newText("<p>欢迎参加该实验！实验开始前，请您同意以下事项：</p>")
    ,
    newText("<p>本研究的结果将会被匿名化安全保存，只有本研究组的成员能看到研究结果。</p>")
    ,
    newText("<p>本研究的的结果可能会在学术期刊/书籍/会议上发表，但您的名字或者其他可以确认您身份的信息将不会在任何发表的材料中出现。</p>")
    ,
    newText("<p>您的参与完全基于自愿的原则，您可以在实验的任何过程中要求退出，并且您不会因为退出实验而受到处罚或损失。</p>")
    ,
    newText("<p>您已阅读并了解该研究的目的、过程、可能的危险以及潜在的获益（见下方链接）。您已经详细阅读了本被试同意书。</p>")
    ,
    newText("<p><a href='https://github.com/awpzs/VerbalComm' target='_blank'>研究详情</a></p>")
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
        .print()
        .wait()
)

SendResults( "send" )

newTrial( "final" ,
    newText("<p>感谢您的参与！</p>")
        .print()
    ,
    newText("<p><a href='https://www.stir.ac.uk/' href='_blank'>点击此处结束实验</a></p>")
        .print()
    ,
    newButton("void")
        .wait()
)
