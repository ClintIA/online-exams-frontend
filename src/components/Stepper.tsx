import { CheckIcon } from 'lucide-react'
import React from "react";

interface StepperProps {
    steps: string[]
    currentStep: number
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }: StepperProps) => {
    return (
        <nav className="flex mx-auto" aria-label="Progress">
            <ol role="list" className="flex items-center">
                {steps.map((step, index) => (
                    <li key={step} className={`relative ${index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                        {index < currentStep ? (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-primary" />
                                </div>
                                <div
                                    className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary"
                                >
                                    <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                    <span className="text-oxfordBlue sr-only">{step}</span>
                                </div>
                            </>
                        ) : index === currentStep ? (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-gray-200" />
                                </div>
                                <div
                                    className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-white"
                                    aria-current="step"
                                >
                                    <span className="h-2.5 w-2.5 rounded-full bg-oxfordBlue" aria-hidden="true" />
                                    <span className="text-oxfordBlue sr-only">{step}</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-gray-200" />
                                </div>
                                <div
                                    className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white"
                                >
                  <span
                      className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                      aria-hidden="true"
                  />
                                    <span className="sr-only">{step}</span>
                                </div>
                            </>
                        )}
                        <span className="absolute top-10 text-center text-sm font-medium text-oxfordBlue">
              {step}
            </span>
                    </li>
                ))}
            </ol>
        </nav>
    )
}
export default Stepper;
