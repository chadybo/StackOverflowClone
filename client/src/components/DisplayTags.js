
export default function DisplayTags(props){
    var count=0;
    // console.log("PRINT THESE PLS")
    // console.log(props.questions)
    // console.log(props.tags)
    // console.log(props.questions[0])
    // console.log(props.questions[1])

    function searchforTags(tag)
    {
        var questionsDisplay = []
        for(var i = 0; i < props.questions.length; i++){
            //var question=props.questions[i];
            // console.log('YO BRUH IM HERE MY MAN');
            for(var x=0; x<props.questions[i].tags.length; x++)
            { 
            //   console.log("PRINTING THIS ID MY MAN")
            //   console.log(tag._id)
            //   console.log(" ")
            //   console.log("PRINTING THE ID FROM THE QUESTIONS ARRAY YEA")
            //   console.log(props.questions[i].tags[x]._id)

              if(props.questions[i].tags[x]._id===tag._id)
              {
                // console.log("IM IN THIS IF STATEMENT RIGHT NOW")
                count=count+1;
                questionsDisplay.push(props.questions[i])
                // console.log(count);
              }
            }
          }
        //   console.log("QUESTIONS DISPLAY ARRAY")
        //   console.log(questionsDisplay)
          props.openSearchResultsTagsPageFunc(questionsDisplay)
    }
    function countQuestions(tag)
    {
        var numOfQWithTag = 0;
      for(var i = 0; i < props.questions.length; i++){
        for(var j = 0; j < props.questions[i].tags.length; j++){
          if(tag._id === props.questions[i].tags[j]._id){
            numOfQWithTag= numOfQWithTag + 1;
            // console.log(numOfQWithTag)
          }
        }
      }
      return numOfQWithTag
    }
    function plural(num){
        if(num>1)
        {
            return "questions"
        }
        return "question"
    }
    return(
        <>
            {props.tags.map((tag) => (
                <div key = {tag._id} className = "tagDiv" onClick={() => searchforTags(tag)}>
                    <div id="tagNameDiv">
                        {tag.name}
                        <div id="tagNumDiv">{countQuestions(tag)} {plural(countQuestions(tag))}</div>
                    </div>
                </div>
            ))}
        </>
    );
}