import React, {ReactNode} from 'react';
import {makeStyles} from '@material-ui/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ConfirmContactInfo from './Steps/Step2'
import EnterVisaInfo from './Steps/Step3'
import Header from "../../Layout/Body/Header";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginLeft: theme.spacing.unit * 10,
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
}));

function getSteps() {
    return ['確認地址', '確認個人信息', '輸入銀行卡信息'];
}

function getStepContent(step: number): ReactNode {
    switch (step) {
        case 0:
            return <div/>;
        case 1:
            return <ConfirmContactInfo/>;
        case 2:
            return <EnterVisaInfo/>;
        default:
            return 'Unknown step';
    }
}

function HorizontalLinearStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();


    function handleNext() {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    return (
        <div className={classes.root}>
            <Header title={'購物流程'}/>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: any = {};
                    const labelProps: any = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <Typography className={classes.instructions}>
                        All steps completed - you&apos;re finished
                    </Typography>
                ) : (
                    <>
                        <div className={classes.instructions}>{getStepContent(activeStep)}</div>
                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                            Back
                        </Button>
                        {activeStep !== steps.length - 1 && <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                        >
                            Next
                        </Button>}
                    </>
                )}
            </div>
        </div>
    );
}

export default HorizontalLinearStepper;