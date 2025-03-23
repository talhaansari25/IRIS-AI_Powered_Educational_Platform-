import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AddchartIcon from '@mui/icons-material/Addchart';
import ReactMarkdown from 'react-markdown';  // Importing react-markdown

export default function VerticalLinearStepper() {
    const [steps, setStep] = useState([]);
    const [roadmap, setRoadmap] = useState('');  // State to hold the roadmap content

    const generateRoadmap = async () => {
        const userData = JSON.parse(localStorage.getItem("userData"));

        console.log(userData);

        const response = await fetch('http://localhost:8080/generateroadmap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        console.log("Generated Roadmap: ", data.roadmap);
        setRoadmap(data.roadmap);  // Store the generated roadmap in state
    };

    useEffect(() => {
        generateRoadmap();
    }, []);

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className="holder">
            <div className="myMap" style={{ color: "black" }}>
                <Box sx={{ maxWidth: 900, borderRadius: '30px', padding: '10px' }}>
                    {/* <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel
                                    optional={
                                        index === 5 ? (
                                            <Typography variant="caption">Last step</Typography>
                                        ) : null
                                    }
                                >
                                    <h3>
                                        {step.label}
                                    </h3>
                                </StepLabel>
                                <StepContent>
                                    <Typography sx={{ color: 'black' }}>{step.description}</Typography>
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                disabled={index === 5}
                                                color='primary'
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                            </Button>
                                            <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper> */}
                    
                    {activeStep === steps.length && (
                        <Paper square elevation={0} sx={{ p: 3 }}>
                            <div className="roadmapContainer">
                                <h2>Personalized Roadmap for {JSON.parse(localStorage.getItem("userData")).userName}</h2>
                                <br />
                <ReactMarkdown>
                    {roadmap}
                </ReactMarkdown>
            </div>
                            <Typography>All steps completed - You&apos;re All Done!</Typography>
                            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                Reset
                            </Button>
                        </Paper>
                    )}
                </Box>
            </div>

            <div className="showPoster">
                <AddchartIcon sx={{ fontSize: 160, color: 'white' }} />
                <p>
                    <span style={{ fontWeight: "bold", fontSize: 40 }}> RoadMap</span> <br />
                    <p>Imagine a roadmap is like a map for your project. It shows the big goals and the smaller steps you need to take to reach them.</p>
                    <ul>
                        <li><b>Roadmap = Project Map!</b> See big goals &amp; smaller steps.</li>
                        <li><b>Chunk It Down!</b> Break big tasks into smaller, manageable ones.</li>
                        <li><b>Prioritize!</b> Focus on tasks most important for your goals.</li>
                        <li><b>Be Flexible!</b> Adjust the plan as needed for challenges or opportunities.</li>
                        <li><b>Review Regularly!</b> Stay on track by checking progress &amp; updating the roadmap.</li>
                    </ul>
                </p>
            </div>

            {/* Render the roadmap content in Markdown format */}
            
        </div>
    );
}
