import React, {useState} from 'react'
import DisplayQuestions from './displayQuestions';
export function Header(props){

  // console.log("THIS IS SESSION TIME IN HEADER")
  // console.log(props.sessiontime)
  const [storeTxt, setStoreTxt] = useState('');

    function searchFunc (srchTxt){
      setStoreTxt(srchTxt);
      var checkBracket = srchTxt.search(/\[/);
      var emptyarr=[];
      var multitag=[];
      var finaltags=[];
      var questionstodisplay=[];
      var leftOverTxt = []
      var lastIndex = srchTxt.lastIndexOf("]");
      var lastIndex2 = srchTxt.lastIndexOf("[");
      console.log(lastIndex2)
      console.log(/^[A-Za-z]$/i.test(srchTxt.charAt(lastIndex+1)));
      console.log(/^[A-Za-z]$/i.test(srchTxt.charAt(lastIndex2-1)));
      var booltest = (/^[A-Za-z]$/i.test(srchTxt.charAt(0))) //means the first character was an alphabet
      if(/^[A-Za-z]$/i.test(srchTxt.charAt(0))) //if the first character is an alphabet
      {
        multitag=srchTxt.split("[") // would split like this javascript[react] => javascript, react]
      }
      else
      {
      multitag=srchTxt.split("]");  //would split like this [react]javascript => [react , javascript
      }
      console.log("THIS IS MULTITAG")
      console.log(multitag)
      for(var i=0; i<multitag.length;i++)
      { 
         if(!booltest) //if first character is not an alphabet
         {
         if(multitag[i].charAt(0)==="[")
         {
            var temp = multitag[i].substring(1);
            finaltags.push(temp);
         }
         else if(multitag[i].charAt(0)!=="[")
         {
          if(multitag[i].charAt(1)==="[")
          {
              temp = multitag[i].substring(2);
              finaltags.push(temp);
          }
          else
          {
              var temp2 = multitag[i];
              leftOverTxt.push(temp2)
          }
         }
        }
        else
        {
          console.log("CHAR AT -1")
          console.log(multitag[i].charAt(-1))
          console.log(multitag[i].charAt(multitag[i].length-1)==="]")
          if(multitag[i].charAt(multitag[i].length-1)==="]")
         {
            temp = multitag[i].substring(0,multitag[i].length-1);
            finaltags.push(temp);
         }
         else if(multitag[i].charAt(multitag[i].length)!=="]")
         {
         temp2 = multitag[i];
         leftOverTxt.push(temp2)
         }
        }
      }

      console.log("THESE ARE FINAL TAGS")
      console.log(finaltags)

      console.log("THESE ARE LEFTOVERS")
      //console.log(leftOverTxt[0].charAt(leftOverTxt[0].length-2))

      function lastLetterPosition(inputString) {
        for (var i = inputString.length - 1; i >= 0; i--) {
          if (/[a-zA-Z]/.test(inputString.charAt(i))) {
            return i;
          }
        }
       
        return -1;
      }

      for(var x = 0; x<leftOverTxt.length; x++)
      {
           console.log((leftOverTxt[x].charAt(leftOverTxt[x].length))===' ')
          if((leftOverTxt[x].charAt(leftOverTxt[x].length-1))===" ")
          {
                 console.log("CHECK HERE MY BROTHER")
                 var lastplace = lastLetterPosition(leftOverTxt[x])
                 var temp3 = leftOverTxt[x].substring(0,lastplace+1);
                 leftOverTxt.splice(x,1);
                 leftOverTxt.push(temp3);
                 
          }
      }

      for(var x = 0; x<leftOverTxt.length; x++)
      {
      if((leftOverTxt[x].charAt(0))===" ")
          {
              //var firstplace = firstLetterPosition(leftOverTxt[x])
              //console.log(firstplace)
              //var temp3 = leftOverTxt[x].substring(firstplace-1)
              //leftOverTxt.splice(x,1)
              //leftOverTxt.push(temp3)
              console.log("I HAVE BEEN TRIMMED")
              console.log(leftOverTxt)
              var tempstr = leftOverTxt[x].trim()
              leftOverTxt[x] = tempstr
              console.log(leftOverTxt)
          }
        }
      console.log("LOOK AT ME HERE BRO")
      console.log(leftOverTxt);
      //console.log(srchTxt)
      //console.log("TAGS ARRAY IN SEARCH HERE")
      //console.log(props.tags)
      if((/^[A-Za-z]$/i.test(srchTxt.charAt(lastIndex+1))) || (/^[A-Za-z]$/i.test(srchTxt.charAt(lastIndex2-1))))
        {
          console.log("IMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
          for(var x=0; x<finaltags.length;x++)
          {
            console.log("THIS IS TAGS ARRAY LENGTH")
            console.log(props.tags.length)
            console.log("THIS IS X")
            console.log(x)
            for(var i=0; i<props.tags.length; i++)
            {
              console.log("THIS IS I")
              console.log(i)
              //console.log("THIS IS FINAL TAGS LENGTH")
              //console.log(finaltags.length)
              console.log(props.tags[i].name)
              console.log("EQUALS")
              console.log(finaltags[x])

            if(props.tags[i].name === finaltags[x]) //[hi] => hi
            {
              emptyarr.push(props.tags[i]._id);
              break;
            }
          }
          }
          console.log("LOOK HERE FOR ARR WITH TAGS IDS TO SEARCH FOR")
          console.log(emptyarr);
          for(var i=0; i<props.questions.length;i++)
          {
            console.log("THIS IS QUESTIONS LENGTH ")
            console.log(props.questions.length)
            var numofTags=0;
            for(var x=0; x<props.questions[i].tags.length; x++ )
            {
              console.log("THIS IS TAG IDS LENGTH")
              //sconsole.log(props.questions[i].tagIds.length)
            for(var z=0; z<emptyarr.length; z++)
            {
                console.log("THIS IS EMPTY ARR")
                console.log(emptyarr)
                //console.log("LOOK HERE FOR prop.questions[i].tagIDS[x]")
               // console.log(props.question[i].tagIds[x])
                //console.log("LOOK HERE FOR EMPTYARR[z]")
                //console.log(emptyarr[z])

                if(props.questions[i].tags[x]._id===emptyarr[z])
                {
                    numofTags=numofTags+1;
                    console.log("LOOK HERE FOR NUM OF TAGS");
                    console.log(numofTags);
                    if(numofTags<2)
                    {
                      //displayedCounter = displayedCounter+1;
                      console.log("LINE 186")
                      questionstodisplay.push(props.questions[i]);
                    } 
                }
            }
          }
        }
        console.log("I WANT THIS LOOP TO WORK MY MAN")
          for(var i=0; i<leftOverTxt.length;i++)
          {
            for(var x=0; x<props.questions.length; x++){
            var searchPattern2= new RegExp(leftOverTxt[i],"i"); 
            console.log("LOOK HERE FOR THE SEARCHPATTERN2 REGEX EXPRESSION WHICH SOULD BE WORKING BRO")
            console.log(searchPattern2)
            if(props.questions[x].title.search(searchPattern2)!==-1 || props.questions[x].text.search(searchPattern2)!==-1)
            {
              console.log("I BE IN THE IF STATEMENT THATS NOT WORKING")
              console.log("LINE 203")
              questionstodisplay.push(props.questions[x]);
              console.log("TEST")
              console.log(questionstodisplay)            
            }
          }
          }
          console.log("QUESTIONS HERE")
          for(var n = 0; n<questionstodisplay.length; n++)
      {
          for(var m = 1; m<questionstodisplay.length; m++)
          {
              
              if(questionstodisplay[n]._id === questionstodisplay[m]._id && n!==m)
              { 
                console.log(questionstodisplay[n])
                console.log(questionstodisplay[m])
                console.log("IM IN HERE MY BROTHER")
                 questionstodisplay.splice(m,1);
              }
          }
      }

          console.log(questionstodisplay)
          props.openSearchResultsPageFunc(questionstodisplay)
        }
      else if(srchTxt!=="")
      {
      var searchPattern= new RegExp(srchTxt,"i");  
        var question = props.questions[i];
        var displayedCounter = 0;
        console.log(checkBracket)
        
        if(checkBracket!==-1)
        { 
            for(var i=0; i<props.tags.length; i++)
            {
              console.log("THIS IS props.questions.length")
              console.log(props.questions.length)
              for(var x=0; x<finaltags.length;x++)
              {
                console.log("THIS IS finaltags.length")
                console.log(finaltags.length)
                console.log(props.tags[i].name)
                console.log("EQUALS")
                console.log(finaltags[x])
              if(props.tags[i].name === finaltags[x])
              {
                emptyarr.push(props.tags[i]._id);
              }
            }
            }
            console.log("LOOK HERE FOR ARR WITH TAGS IDS TO SEARCH FOR")
            console.log(emptyarr);
            for(var i=0; i<props.questions.length;i++)
            {
              numofTags=0;
              for(var x=0; x<props.questions[i].tags.length; x++ )
              {
                console.log(props.questions[i].tags.length)
              for(var z=0; z<emptyarr.length; z++)
              {
                  //console.log("LOOK HERE FOR prop.questions[i].tagIDS[x]")
                 // console.log(props.question[i].tagIds[x])
                  //console.log("LOOK HERE FOR EMPTYARR[z]")
                  //console.log(emptyarr[z])

                  if(props.questions[i].tags[x]._id===emptyarr[z])
                  {
                      numofTags=numofTags+1;
                      console.log("LOOK HERE FOR NUM OF TAGS");
                      console.log(numofTags);
                      if(numofTags<2)
                      {
                        displayedCounter = displayedCounter+1;
                        console.log("LINE 274")
                        questionstodisplay.push(props.questions[i]);
                      } 
                  }
              }
            }
          }
          for(var i=0; i<leftOverTxt.length;i++)
          {
            if(leftOverTxt[i]!==''){
            for(var x=0; x<props.questions.length; x++){
            var searchPattern3= new RegExp(leftOverTxt[i],"i"); 
            if(props.questions[x].title.search(searchPattern3)!==-1 || props.questions[x].text.search(searchPattern3)!==-1)
            {
              console.log("LINE 287")
              questionstodisplay.push(props.questions[x]);
           }
          }
          } 
          }
        }
        else if(question.title.search(searchPattern)!==-1 || question.text.search(searchPattern)!==-1)
        {
          console.log("LINE 295")
          questionstodisplay.push(props.questions[i]);
        }

      for(var n = 0; n<questionstodisplay.length; n++)
      {
          for(var m = 1; m<questionstodisplay.length; m++)
          {
              console.log("HELLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLOOOOOOOOOOOOOOOOOOOO")
              if(questionstodisplay[n]._id === questionstodisplay[m]._id && n!==m)
              { 
                console.log("IM IN HERE MY BROTHER")
                 questionstodisplay.splice(m,1);
              }
          }
      }

      console.log("LOOK HERE FOR QUESTION TO DISPLAY")
      console.log(questionstodisplay);
      props.openSearchResultsPageFunc(questionstodisplay)
      DisplayQuestions(questionstodisplay)
    }
    }
        // return (
        //   <>
        //   <h1>            
        //     <div id="header"> 
                                           
        //         <div id="webSiteTitleDiv">                       
        //           Fake Stack OverFlow
        //         </div>

        //         <div id="searchBarDiv">
        //           <input type="text" placeholder="Search..." id="searchBar" onChange={srchTxt => {this.setState({storeTxt: srchTxt.target.value})}}
        //           onKeyPress={event => {
        //           if (event.key === 'Enter') {
        //             searchFunc(event.target.value)
        //           }
        //           }}
        //           />
        //         </div>     

        //     </div>
        //   </h1>
        //   </>
        // );
        return (
          <>
            <h1>
              <div id="header">
              
                <div id="webSiteTitleDiv">Fake Stack Overflow</div>
                <div id="searchBarDiv">
                  <input
                    type="text"
                    placeholder="Search..."
                    id="searchBar"
                    value={storeTxt}
                    onChange={(event) => setStoreTxt(event.target.value)}
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') {
                        searchFunc(event.target.value);
                      }
                    }}
                  />
                </div>
                <div id="logOutButtonDiv"><button id="logOutButton" onClick={props.removeSessionFunc}>Log Out</button></div>
              </div>
            </h1>
          </>
        );
  }