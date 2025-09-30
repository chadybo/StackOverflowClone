import axios from "axios";
import { useState } from "react";
async function tagPostDB(txt,id,props) {
    var count = 0;
    console.log(txt)
    // console.log(txt.includes(' '))
    // console.log(hasSpaceBetweenWords)
    if(txt.length<=10){
      txt = txt.trim()
      const hasSpaceBetweenWords = /\s/.test(txt);
    if(hasSpaceBetweenWords===false){
    for(var x = 0; x<props.questions.length; x++)
    {
       for(var y = 0; y<props.questions[x].tags.length; y++)
       {
              if(props.questions[x].tags[y]._id === id)
              {
                  if(props.questions[x].email !== localStorage.getItem("loggedInEmail"))
                  {
                      count++;
                  }
              }
       }
    }
    if(count === 0)
    {
        const postTagToDB = async () => {
            const tagData = {
              name: txt,
              id:id
            };
        
            try {
              await axios.post('http://localhost:8000/posttagedit', tagData);
              console.log('Question edited successfully');
            } catch (error) {
              console.error('Error editing question: ', error);
            }
          };
          
          await postTagToDB(); 
          await props.tagsCallFunc()
          await props.questionCallFunc()
          props.opendisplayUserTagsFunc()

    }
    else
    {
        console.log("THERE IS ANOTHER USER USING THIS TAG")

    }
  }
  }
      
}

export default function DisplayTagsnew(props){
    var editing = props.tagBool
    var txt3;
    console.log(props)
  var bool = false;
  function tagDelete(tid)
  {
    var count = 0;
    console.log(count)
    console.log("THIS BE THE TID BABY")
    console.log(tid)
    for(var x = 0; x<props.questions.length; x++)
    {
       for(var y = 0; y<props.questions[x].tags.length; y++)
       {
              if(props.questions[x].tags[y]._id === tid)
              {
                  if(props.questions[x].email !== localStorage.getItem("loggedInEmail"))
                  {
                      count++;
                  }
              }
       }
    }

    if(count===0 || localStorage.getItem("isAdmin") === "true")
    {
      const handleDeleteTag = async (tagId) => {
        try {
  
          await axios.delete(`http://localhost:8000/deletetag/${tagId}`);
          console.log('Tag deleted successfully');
        } catch (error) {
          console.error('Error deleting tag:', error);
        }
      };
  
      handleDeleteTag(tid)
      props.tagsCallFunc()
      props.tagsCallFunc()
      props.opendisplayUserTagsFunc()
      props.opendisplayUserTagsFunc()
    }
    else
    {
      console.log("There is another user using this tag")
    }
    
  }

function tagCheck(tag)
{
    var count = 0;
    for(var x = 0; x<props.questions.length; x++)
    {
        for(var y = 0; y<props.questions[x].tags.length; y++)
        {
              if(tag._id === props.questions[x].tags[y]._id)
              {
                  if(props.questions[x].email !== localStorage.getItem("loggedInEmail"))
                  {
                      count++;
                  }
              }
        }
    }

    if(count>0 && localStorage.getItem("isAdmin") === "false")
    {
       return true
    }
    return false
}

  // function tagBool()
  //  {
  //   if(editing===false)
  //   {
  //       setEditing(true);
  //   }
  //   else
  //   {
  //       setEditing(false);
  //   }
  //    }

     const [name,setTagname] = useState(null);

    function getName(val){
      setTagname(val.target.value)
    }

    txt3 = name

    console.log(props.setBool)
    return (
        <>
          {props.tags.map((tag) => (
            <div key={tag._id} className="tagDiv">
              <div id="tagNameDivnew">
                {tag.name}
                <div id="tagNumDiv"></div>
                {/* <button id="deleteButtonDiv" onClick={() => tagDelete(tag._id)}>
                  Delete
                </button> */}
                {props.setBool ===false && (
                  <>
                    <button id="deleteButtonDiv" onClick={() => tagDelete(tag._id)}>
                    Delete
                    </button>
                    {tagCheck(tag)===true && (
                    <div id="errorTagDiv">*Another user is using this tag*</div>
                    )}
                  </>
                )}
                {props.setBool ===true && (
                  <>
                    <input onChange={getName}></input>
                    <button onClick={() => tagPostDB(txt3,tag._id,props,tag)}>Confirm</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </>
      );
}