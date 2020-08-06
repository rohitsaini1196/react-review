import React from 'react'
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function Reviewer() {

    const [starValue, setStarValue] = React.useState(-1);
    const [textReview, setTextReview] = React.useState("");
    const [startTime, setStartTime] = React.useState(0);
    


    function submitReview() {
        var endT = new Date();
        const timeTaken = (endT.getTime() - startTime) / 1000;
        textAnalysis(textReview)
        console.log(timeTaken);
        if(starValue !==null && starValue !== -1 ){
            console.log(starValue);
        } else{
            alert("Please give it some stars");
        }
    }

    const textAnalysis = (text)=>{
        var totalNoOfSpaces = textReview.split(" ").length -1;
       var totalNoOfSentances = textReview.split(".").length;

       console.log(totalNoOfSpaces);
       console.log(totalNoOfSentances);
    }

    const handleTextChange = (event) => {
        if(startTime === 0){
            var startT = new Date();
          //  console.log("Time set success");
            setStartTime(startT.getTime())
        }
        setTextReview(event.target.value);
    }

    return (
        <div>
            
            <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating
                name="simple-controlled"
                value={starValue}
                onChange={(event, newValue) => {
                    setStarValue(newValue);
                }}
                />
            </Box>

            <TextField 
                id="standard-basic" 
                label="Write Review"
                multiline
                rowsMax={4}
                value={textReview}
                onChange={handleTextChange}
                />
            <br></br>
            <br></br>

            
            <Button variant="contained" color="primary" onClick={submitReview}> Submit</Button>
            </div>
        </div>
    )
}


// console.log(textReview);
       // console.log(textReview.length);
       //var totalNoOfSpaces = textReview.split(" ");
     //  var totalNoOfSentances = textReview.split(".");
     //  console.log("total spaces : ? "+totalNoOfSpaces.length);
     //  console.log("total sentaces: ? "+totalNoOfSentances.length);