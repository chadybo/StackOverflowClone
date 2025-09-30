import { useState } from 'react';
import DisplayTagsnew from './DisplayTagsnew';
export function DisplayUserTags(props)
{

  // var tagBool = false;
  // function setBool()
  // {
  //   if(tagBool===false)
  //   {
  //     tagBool = true;
  //     return tagBool;
  //   }
  //   else
  //   {
  //     tagBool = false;
  //     return tagBool;
  //   }
  // }

  const [tagBool, setTagBool] = useState(false);

  function handleSetBool() {
    setTagBool(!tagBool);
  }


  var tagsWeNeed = []
  var count = 0;
  if(localStorage.getItem("isAdmin")==="false")
  {
  for(var x = 0; x<props.tags.length; x++)
  {
      if(props.tags[x].email === localStorage.getItem("loggedInEmail"))
      {
          tagsWeNeed.push(props.tags[x])
          count++;
      }
  }
  }
  else
  {
    for(var x = 0; x<props.tags.length; x++)
    {
        if(props.tags[x].email === props.userRef)
        {
            tagsWeNeed.push(props.tags[x])
            count++;
        }
    }
  }


    return(
            <>
            <h2>                                                           
              <table id= "mainContent">
                <tr>
                  <td className="leftSideBar">
                  </td>
                  <td rowSpan="2" id="allQuestionsCell" className="questionTitle">
                    <div id="tagNumber"> {count} Tags</div>
                    <button id="editButtonDiv" onClick={handleSetBool}>
                        Edit Tags
                      </button>
                    <div id="tagTitlenew">User Tags</div>
                  </td>
                  <td rowSpan="2" id="askQuestionButtonCell" className="hideWhenAskingButtons">
                  </td>
                </tr>
                <tr>
                  <td id= "questionsLinkCell" className="leftSideBar">
                    <a href="#" id="questionsLink" style={{backgroundColor: "white"}} onClick={props.openMainPageFunc}>Questions</a>
                  </td>
                </tr>
                <tr>
                  <td className="leftSideBar">
                  </td>
                  <td  id= "numOfQuestionsCellPostQ">
                  </td>
                  <td id="sortingButtonsCell" className="hideWhenAskingButtons">
                  </td>
                </tr>
                <tr>
                  <td id= "tagsCell" className="leftSideBar">
                  <a href="#" id="tagsLink" style={{backgroundColor: "white"}} onClick={props.openTagsPageFunc}>Tags</a>
                  </td>
                  <td className="hideWhenAskingLine">
                  </td>
                  <td className="hideWhenAskingLine">
                  </td>
                </tr>
                <tr>
                <td className= "leftSideBarLastCell">
                <div id="userProfileLinkDiv">
                  {localStorage.getItem("isGuest") === "false" && (
                  <a href="#" id="userProfileLink" style={{backgroundColor: "lightgray"}}  onClick={props.openUserPageFunc} >User</a>
                  )}
                </div>
              </td>
                  <td id="mainBody" colSpan="2">
                    <DisplayTagsnew
                    openSearchResultsTagsPageFunc ={props.openSearchResultsTagsPageFunc}
                    openMainPageFunc ={props.openMainPageFunc}
                    tags={tagsWeNeed}
                    questions={props.questions}
                    tagsCallFunc = {props.tagsCallFunc}
                    opendisplayUserTagsFunc = {props.opendisplayUserTagsFunc}
                    setBool={tagBool}
                    />
                  </td>
                </tr>
              </table>
            </h2>
            </> 
    );
}
