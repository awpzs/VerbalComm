PennController.ResetPrefix(null); // Initiates PennController
//PennController.DebugOff()
// Start typing your code here
PennController.AddHost("https://raw.githubusercontent.com/awpzs/VerbalComm/master/images/")

Sequence( "information", "identification", "instruction", "prac_1", "prac_2", "prac_end", "experiment", "questionnaire", "send", "final" )

newTrial( "information" ,
    newHtml("information_CHN", "information_CHN.html")
        .print()
//    ,
//    newTextInput("inputName", "名字")
//        .settings.center()
//        .log()
//        .print()
    ,
    newButton("我同意")
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
    newScale("uni", "是", "否")
        .settings.labelsPosition("right")
        .log("last")
        .print()
    ,
    newTextInput("university", "大学名称")
        .print()
    ,
    newText("<p>您是否被确诊过有阅读或视觉障碍？</p>")
    ,
    newScale("dyslexia", "是", "否")
        .settings.labelsPosition("right")
        .log("last")
        .print()
    ,
    newText("<p>您的母语是否为中文？</p>")
    ,
    newScale("native", "是", "否")
        .settings.labelsPosition("right")
        .log("last")
        .print()
    ,
    newText("<p>您在家时，父母是否只跟您讲中文？</p>")
    ,
    newScale("nativeParents", "是", "否")
        .settings.labelsPosition("right")
        .log("last")
        .print()
    ,
    newText("<p>请在下方填写您的年龄、性别和Prolific ID，然后点击“开始”进入实验介绍环节。</p>")
    ,
    newTextInput("inputAge", "年龄")
        .print()
    ,
    newTextInput("inputSex", "性别")
        .print()    
    ,
    newTextInput("inputID", "Prolific ID")
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
    newVar("Sex")
        .global()
        .set( getTextInput("inputSex") )
    ,
    newVar("ID")
        .global()
        .set( getTextInput("inputID") )
)
.log( "Age", getVar("Age"))
.log( "Sex", getVar("Sex"))
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

newTrial( "prac_1" ,
    newTimer(200)
        .start()
        .wait()
    ,
    newText("图片下面的句子描述了人物/物件的位置。请仔细阅读句子，然后点击句子继续。")
        .settings.center()
        .print()
    ,
    newImage("one", "P3_1.jpg")
        .size(768,480)
        .print()
    ,
    newText("sentence", "香肠上方的男人在三号位。")
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
    newText("请以“现在”开头，用一句话描述人物/物体的位置变化。例如：")
        .settings.center()
        .print()
    ,
    newText("现在在四号位。/现在他在四号位。/现在男人在四号位。")
        .italic()
        .settings.center()
        .print()
    ,
    newImage("two", "P3_2.jpg")
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

newTrial( "prac_2" ,
    newTimer(200)
        .start()
        .wait()
    ,
    newText("图片里有不止一个红框，这意味着其中一个红框里的人物/物件的位置会发生改变。")
        .settings.center()
        .print()
    ,
    newText("请在阅读完句子后，点击句子继续。")
        .settings.center()
        .print()
    ,
    newImage("one", "P1_1.jpg")
        .size(768,480)
        .print()
    ,
    newText("sentence", "行李箱旁边的溜冰鞋在一号位。")
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
    newText("请用一句话简洁明了地描述该人物/物件的新位置。例如：")
        .settings.center()
        .print()
    ,
    newText("现在在五号位。/现在它在五号位。/现在溜冰鞋在五号位。")
        .italic()
        .settings.center()
        .print()
    ,
    newImage("two", "P1_2.jpg")
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
//    ,
//    newText("<p>请在下方输入您的E-Mail，以领取Amazon voucher code</p>")
//        .print()
//    ,
//    newTextInput("email", "E-Mail")
//        .settings.log()
//        .settings.lines(0)
//        .print()
    ,
    newButton("继续")
        .settings.center()
        .print()
        .wait()
)
.log( "ID"     , getVar("ID")    )

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
