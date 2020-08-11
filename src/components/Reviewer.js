import React from 'react'
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Typography } from '@material-ui/core';

export default function Reviewer(props) {

    const [starValue, setStarValue] = React.useState(4);
    const [textReview, setTextReview] = React.useState("");
    const [startTime, setStartTime] = React.useState(0);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [letterCorrected, setLetterCorrected]= React.useState(0);
    const [timesKeyPressed, setTimesKeyPressed]= React.useState(0);
    const [pastedTimes, setPastedTimes] = React.useState(0);
    const [fieldData, setFieldData] = React.useState([]);

    React.useEffect(()=>{
        
        var fieldDataObject = props.fieldData;
       // console.log(fieldDataObject);

        fieldDataObject = fieldDataObject.map((str, i)=>({
            name: str, id: i, stars : -1, text: ""
        }));
        setFieldData(fieldDataObject)
       // console.log(fieldDataObject);
    }, [props.fieldData])
    

    function submitReview(e) {
        e.preventDefault();
        var endT = new Date();
        const timeTaken = (endT.getTime() - startTime) / 1000;
        setIsSubmitted(true)
        if(starValue !==null && starValue !== -1 ){
        } else{
            alert("Please give it some stars");
        }
        var res = {
            text : textReview,
            stars: starValue,
            analysis : textAnalysis(textReview, timeTaken)
        }
        console.log(fieldData);
        console.log(res);
        return res;
    }

    const clearStar = ()=>{
        setStarValue(-1)
    }

    const textAnalysis = (text, timeTaken)=>{
        const re = /[.!?]/;
        var totalNoOfSpaces = textReview.split(" ").length -1;
        var totalNoOfSentences = textReview.split(re).length -1;
        var minTime = text.length * 0.30;
        var probabilty =  calculateProbability(timeTaken, minTime);
        var remark = decideRemarks(probabilty);
        var result = {
           totalKeyPressed: timesKeyPressed,
           letters : text.length,
           spaces: totalNoOfSpaces,
           sentence : totalNoOfSentences,
           timeTaken : timeTaken,
           probabilty: probabilty,
           remark : remark,
           letterCorrected: letterCorrected,
           pastedTimes: pastedTimes
        }
        return result;
    }

    const calculateProbability = (timeTaken, timeCalculated) =>{
        if(timeTaken > timeCalculated){
            return 0.99;
        } else{
            return timeTaken/timeCalculated;
        }
    }

    const decideRemarks = (prob)=>{
        if(prob <= 0.1){
            return "Clear copy paste";
        } else if ( (0.1 < prob)&& (prob <= 0.4)){
            return "Copy paste";
        } else if ( (0.4 < prob) && (prob <= 0.65)){
            return "Slow copy paster or very fast typer";
        } else if ( (0.65 < prob) && (prob <= 1)){
            return "Legit review";
        }
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

        if (textt.length -textReview.length > 1 ) {
            setPastedTimes(pastedTimes + 1)
        }
        setTextReview(event.target.value);
        setTimesKeyPressed(timesKeyPressed + 1);
    }

    const handleFieldStarChange = (newValue, i) =>{
        let newerFieldData = [...fieldData];
        newerFieldData[i].stars = newValue;
        setFieldData(newerFieldData)
    }

    const handleFieldTextChange =(text, i)=>{
        let newerFieldData = [...fieldData];
        newerFieldData[i].text = text;
        setFieldData(newerFieldData)
    }

    const makeFieldUI = ()=>{
        return fieldData.map((field, i) =>(
            <div key={i}>

                <div style={{display:'flex', margin: '10px 0px'}}>
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography>{field.name}</Typography>

                    <Rating
                    name={"simple-controlled" + i}
                    value={fieldData[i].stars}
                    onChange={(event, newValue) => {
                        handleFieldStarChange(newValue, i)
                    }}
                    />
                 </Box>
    
                <OutlinedInput 
                    id="standard-basic" 
                    name="review-text"
                    value={fieldData[i].text}
                    onChange={(event)=>{handleFieldTextChange(event.target.value, i)}}
                    labelWidth={0}
                    placeholder="Wrirte your review here..."
                    rowsMax={20}
                    rows={2}
                    multiline={false}
                    fullWidth={false}
                    style={{
                        borderWidth: 1,
                        borderRadius: 10,
                    }}
                    />
                </div>
            </div>
        ))
    }

    return (
        <div>
            
            {!isSubmitted ? (
                <div style={{
                    width: '50%',
                   

                }}>
                <form noValidate autoComplete="off" onSubmit={submitReview}>
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating
                    name="simple-controlled"
                    value={starValue}
                    onChange={(event, newValue) => {
                        setStarValue(newValue);
                    }}
                    />
                    <br></br>

                    <Button size="small" variant="contained" style={{textTransform: 'none'}} onClick={clearStar}>Clear</Button>
                </Box>
    
                <OutlinedInput 
                    id="standard-basic" 
                    name="review-text"
                    value={textReview}
                    onChange={handleTextChange}
                    labelWidth={0}
                    placeholder="Wrirte your review here..."
                    rowsMax={20}
                    rows={3}
                    multiline={true}
                    fullWidth
                    style={{
                        borderWidth: 1,
                        borderRadius: 10,
                    }}
                    />
                <br></br>
                <br></br>
                {makeFieldUI()}
    
                
                <Button variant="contained" type="submit" color="primary" style={{borderRadius: 50, textTransform: 'none'}}> Submit</Button>
    
                </form>
                </div>
            ) : (
                <p>Thanks for Sharing your value review. We take our feedback system very seriously.</p>
            )}
        </div>
    )
}
