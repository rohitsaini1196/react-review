import React from 'react'
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';

export default function Reviewer() {

    const [starValue, setStarValue] = React.useState(4);
    const [textReview, setTextReview] = React.useState("");
    const [startTime, setStartTime] = React.useState(0);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [letterCorrected, setLetterCorrected]= React.useState(0);
    const [timesKeyPressed, setTimesKeyPressed]= React.useState(0);
    


    function submitReview(e) {
        e.preventDefault();
        var endT = new Date();
        const timeTaken = (endT.getTime() - startTime) / 1000;
        console.log(textAnalysis(textReview, timeTaken));
        console.log(timeTaken);

        setIsSubmitted(true)


        if(starValue !==null && starValue !== -1 ){
            console.log(starValue);
        } else{
            alert("Please give it some stars");
        }
    }

    const textAnalysis = (text, timeTaken)=>{
        var totalNoOfSpaces = textReview.split(" ").length -1;
        var totalNoOfSentences = textReview.split(".").length;

        var minTime = text.length * 0.30;
        console.log("mintime  = "+minTime);
        console.log("time Taken = "+ timeTaken);
        var probabilty =  timeTaken/minTime;
        var remark = "looks legit";

        var result = {
           totalKeyPressed: timesKeyPressed,
           letters : text.length,
           spaces: totalNoOfSpaces,
           sentence : totalNoOfSentences,
           timeTaken : timeTaken,
           probabilty: probabilty,
           remark : remark,
           letterCorrected: letterCorrected
        }

        return result;
    }

    const handleTextChange = (event) => {
        var textt = event.target.value;
        if(startTime === 0){
            var startT = new Date();
            setStartTime(startT.getTime())
        }

        if(textReview.length > textt.length){
                setLetterCorrected(letterCorrected + 1);
        }
        setTextReview(event.target.value);
        setTimesKeyPressed(timesKeyPressed + 1);
    }

    return (
        <div>
            
            {!isSubmitted ? (
                <div>
                <form noValidate autoComplete="off" onSubmit={submitReview}>
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating
                    name="simple-controlled"
                    value={starValue}
                    onChange={(event, newValue) => {
                        setStarValue(newValue);
                    }}
                    />
                </Box>
    
                <OutlinedInput 
                    id="standard-basic" 
                    name="review-text"
                    value={textReview}
                    onChange={handleTextChange}
                    labelWidth={0}
                    placeholder="Wrirte your review here..."
                    rowsMax={20}
                    multiline={true}
                    style={{
                        borderWidth: 1,
                        borderRadius: 50,
                    }}

                    />
                <br></br>
                <br></br>
    
                
                <Button variant="contained" type="submit" color="primary"> Submit</Button>
    
                </form>
                </div>
            ) : (
                <p>Thanks for Sharing your value review. We take our feedback system very seriously.</p>
            )}
        </div>
    )
}


// console.log(textReview);
       // console.log(textReview.length);
       //var totalNoOfSpaces = textReview.split(" ");
     //  var totalNoOfSentances = textReview.split(".");
     //  console.log("total spaces : ? "+totalNoOfSpaces.length);
     //  console.log("total sentaces: ? "+totalNoOfSentances.length);