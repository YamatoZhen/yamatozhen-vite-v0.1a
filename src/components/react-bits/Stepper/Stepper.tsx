import React, {
    useState,
    Children,
    useRef,
    useLayoutEffect,
    HTMLAttributes,
    ReactNode,
    JSX,
} from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

import "./Stepper.css";
import Button from "../../button/Button";
import { Icon } from "../../navigation_rail/NavigationRail";

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    initialStep?: number;
    onStepChange?: (step: number) => void;
    onFinalStepCompleted?: () => void;
    stepCircleContainerClassName?: string;
    stepContainerClassName?: string;
    contentClassName?: string;
    footerClassName?: string;
    backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    backButtonText?: string;
    nextButtonText?: string;
    nextButtonIcon?: string;
    lastNextButtonIcon?: string;
    lastNextButtonText?: string;
    disableStepIndicators?: boolean;
    renderStepIndicator?: (props: RenderStepIndicatorProps) => ReactNode;
}

interface RenderStepIndicatorProps {
    step: number;
    currentStep: number;
    onStepClick: (clicked: number) => void;
}

export default function Stepper({
    children,
    initialStep = 1,
    onStepChange = () => { },
    onFinalStepCompleted = () => { },
    stepCircleContainerClassName = "",
    stepContainerClassName = "",
    contentClassName = "",
    footerClassName = "",
    backButtonProps = {},
    nextButtonProps = {},
    backButtonText = "Back",
    nextButtonText = "Continue",
    disableStepIndicators = false,
    renderStepIndicator,
    nextButtonIcon="keyboard_arrow_right",
    lastNextButtonText="Complete",
    lastNextButtonIcon="send",
    ...rest
}: StepperProps) {
    const [currentStep, setCurrentStep] = useState<number>(initialStep);
    const [direction, setDirection] = useState<number>(0);
    const stepsArray = Children.toArray(children);
    const totalSteps = stepsArray.length;
    const isCompleted = currentStep > totalSteps;
    const isLastStep = currentStep === totalSteps;

    const updateStep = (newStep: number) => {
        setCurrentStep(newStep);
        if (newStep > totalSteps) {
            onFinalStepCompleted();
        } else {
            onStepChange(newStep);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setDirection(-1);
            updateStep(currentStep - 1);
        }
    };

    const handleNext = () => {
        if (!isLastStep) {
            setDirection(1);
            updateStep(currentStep + 1);
        }
    };

    const handleComplete = () => {
        setDirection(1);
        updateStep(totalSteps + 1);
    };

    return (
        <div className="outer-container" {...rest}>
            <div
                className={`step-circle-container ${stepCircleContainerClassName}`}
            >
                <div className={`step-indicator-row ${stepContainerClassName}`}>
                    {stepsArray.map((_, index) => {
                        const stepNumber = index + 1;
                        const isNotLastStep = index < totalSteps - 1;
                        return (
                            <React.Fragment key={stepNumber}>
                                {renderStepIndicator ? (
                                    renderStepIndicator({
                                        step: stepNumber,
                                        currentStep,
                                        onStepClick: (clicked) => {
                                            setDirection(clicked > currentStep ? 1 : -1);
                                            updateStep(clicked);
                                        },
                                    })
                                ) : (
                                    <StepIndicator
                                        step={stepNumber}
                                        disableStepIndicators={disableStepIndicators}
                                        currentStep={currentStep}
                                        onClickStep={(clicked) => {
                                            setDirection(clicked > currentStep ? 1 : -1);
                                            updateStep(clicked);
                                        }}
                                    />
                                )}
                                {isNotLastStep && (
                                    <StepConnector isComplete={currentStep > stepNumber} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                <StepContentWrapper
                    isCompleted={isCompleted}
                    currentStep={currentStep}
                    direction={direction}
                    className={`step-content-default ${contentClassName}`}
                >
                    {stepsArray[currentStep - 1]}
                </StepContentWrapper>
                {!isCompleted && (
                    <div className={`footer-container ${footerClassName}`}>
                        <div className={`footer-nav ${currentStep !== 1 ? "spread" : "end"}`}>
                            {currentStep !== 1 && (
                                <Button
                                    activeState="inactive"
                                    id={""}
                                    type={`text back-button ${currentStep === 1 ? "inactive" : ""}`}
                                    onClick={() => handleBack()}
                                    {...backButtonProps}
                                >
                                    {backButtonText}
                                </Button>
                            )}
                            <Button
                                activeState="inactive"
                                id={""}
                                type={"filled-alt label-icon next-button"}
                                onClick={isLastStep ? handleComplete : handleNext}
                                className=""
                                {...nextButtonProps}
                            >
                                <Icon iconName={isLastStep ? lastNextButtonIcon : nextButtonIcon} label={isLastStep ? lastNextButtonText : nextButtonText} />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

interface StepContentWrapperProps {
    isCompleted: boolean;
    currentStep: number;
    direction: number;
    children: ReactNode;
    className?: string;
}

function StepContentWrapper({
    isCompleted,
    currentStep,
    direction,
    children,
    className,
}: StepContentWrapperProps) {
    const [parentHeight, setParentHeight] = useState<number>(0);

    return (
        <motion.div
            className={className}
            style={{ position: "relative", overflow: "hidden" }}
            animate={{ height: isCompleted ? 0 : parentHeight }}
            transition={{ type: "spring", duration: 0.4 }}
        >
            <AnimatePresence initial={false} mode="sync" custom={direction}>
                {!isCompleted && (
                    <SlideTransition key={currentStep} direction={direction} onHeightReady={(h) => setParentHeight(h)}>
                        {children}
                    </SlideTransition>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

interface SlideTransitionProps {
    children: ReactNode;
    direction: number;
    onHeightReady: (h: number) => void;
}

function SlideTransition({ children, direction, onHeightReady }: SlideTransitionProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (containerRef.current) {
            onHeightReady(containerRef.current.offsetHeight);
        }
    }, [children, onHeightReady]);

    return (
        <motion.div
            ref={containerRef}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            style={{ position: "absolute", left: 0, right: 0, top: 0 }}
        >
            {children}
        </motion.div>
    );
}

const stepVariants: Variants = {
    enter: (dir: number) => ({
        x: dir >= 0 ? "100%" : "-100%", // <-- Slide in from right if going forward, from left if going back
        opacity: 0,
    }),
    center: {
        x: "0%",
        opacity: 1,
    },
    exit: (dir: number) => ({
        x: dir >= 0 ? "-50%" : "50%", // <-- Slide out to left if going forward, to right if going back
        opacity: 0,
    }),
};

interface StepProps {
    children: ReactNode;
}

export function Step({ children }: StepProps): JSX.Element {
    return <div className="step-default">{children}</div>;
}

interface StepIndicatorProps {
    step: number;
    currentStep: number;
    onClickStep: (step: number) => void;
    disableStepIndicators?: boolean;
}

function StepIndicator({
    step,
    currentStep,
    onClickStep,
    disableStepIndicators,
}: StepIndicatorProps) {
    const status =
        currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";

    const handleClick = () => {
        if (step !== currentStep && !disableStepIndicators) {
            onClickStep(step);
        }
    };

    return (
        <motion.div
            onClick={handleClick}
            className="step-indicator"
            animate={status}
            initial={false}
        >
            <motion.div
                variants={{
                    inactive: { scale: 1, backgroundColor: "var(--md-sys-color-surface-container-highest)", color: "var(--md-sys-color-on-surface)" },
                    active: { scale: 1, backgroundColor: "var(--md-sys-color-primary)", color: "var(--md-sys-color-on-primary)" },
                    complete: { scale: 1, backgroundColor: "var(--md-sys-color-primary)", color: "var(--md-sys-color-on-primary)" },
                }}
                transition={{ duration: 0.3 }}
                className="step-indicator-inner"
            >
                {status === "complete" ? (
                    <CheckIcon className="check-icon" />
                ) : status === "active" ? (
                    <div className="active-dot" />
                ) : (
                    <span className="step-number">{step}</span>
                )}
            </motion.div>
        </motion.div>
    );
}

interface StepConnectorProps {
    isComplete: boolean;
}

function StepConnector({ isComplete }: StepConnectorProps) {
    const lineVariants: Variants = {
        incomplete: { width: 0, backgroundColor: "transparent" },
        complete: { width: "100%", backgroundColor: "var(--md-sys-color-primary)" },
    };

    return (
        <div className="step-connector" style={{ backgroundColor: 'var(--md-sys-color-surface-container-highest)' }}>
            <motion.div
                className="step-connector-inner"
                variants={lineVariants}
                initial={false}
                animate={isComplete ? "complete" : "incomplete"}
                transition={{ duration: 0.4 }}
            />
        </div>
    );
}

interface CheckIconProps extends React.SVGProps<SVGSVGElement> { }

function CheckIcon(props: CheckIconProps) {
    return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.1, type: "tween", ease: "easeOut", duration: 0.3 }}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
            />
        </svg>
    );
}
