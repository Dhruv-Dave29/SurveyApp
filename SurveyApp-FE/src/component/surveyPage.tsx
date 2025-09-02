import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";


interface Question {
  id: number;
  title: string;
  description: string;
  type: "text" | "number";
}

interface Response {
  [key: number]: string;
}

const SurveyPage = () => {
const navigate = useNavigate();
const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [responses, setResponses] = useState<Response>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  

  useEffect(() => {
    fetch("http://localhost:4000/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setIsLoading(false);
      });
  }, []);


  {/* for Input component */}
  const handleChange = (id: number, value: string) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  {/* for Input component */}
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("http://localhost:4000/api/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(responses),
    });
    setSubmitted(true);
  };


  {/* for next step button component */}
  const nextStep = () => {

      if (!responses[currentQuestion.id]) {
    return; // Don't proceed if current question isn't answered
  }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  {/* for prev step component */}
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isLoading) {
    return (
      
      <div className="z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl text-muted-foreground font-semibold">Loading survey...</h2>
          <p className="text-muted-foreground">Please wait a moment</p>
        </div>
      </div>
      
    );
  }

  if (submitted) {
    return (
      
      <div className="z-10 max-w-lg mx-auto mt-10 p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Thank You!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <p className="text-muted-foreground">
                Your responses have been recorded successfully.
              </p>
            </div>
            <h3 className="text-xl font-semibold mb-4">Your Responses</h3>
            {questions.map((q) => (
              <div key={q.id} className="mb-4">
                <p className="font-medium">{q.title}</p>
                <p className="text-gray-600">{responses[q.id] || "Not answered"}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
      </div>
      
    );
  }

  if (questions.length === 0) {
    return (
      
      <div className="z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold">No questions available</h2>
          <p className="text-muted-foreground">Please check your connection</p>
        </div>
      </div>
      
    );
  }

  const progressValue = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];

  return (
    
      <div className="z-10 min-h-screen flex items-center justify-center py-12 px-4 ">
        <div className="w-full max-w-2xl space-y-8"> 
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground">Survey Form</h1>
            <p className="text-lg text-muted-foreground mt-4"> 
              Question {currentStep + 1} of {questions.length}
            </p>
          </div>
  
          <Progress value={progressValue} className="h-3 w-full" /> 
  
          <form onSubmit={handleSubmit}>
            <Card className="w-full md:w-2xl p-2"> 
              <CardHeader>
                <CardTitle className="text-2xl text-center">{currentQuestion.title}</CardTitle> 
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <p className="text-base mb-8 text-muted-foreground text-center">
                  {currentQuestion.description}
                </p>
                <div className="space-y-4">
                  <Label htmlFor={`question-${currentQuestion.id}`} className="text-lg"> 
                    Your answer
                  </Label>
                  <Input
                    id={`question-${currentQuestion.id}`}
                    type={currentQuestion.type}
                    value={responses[currentQuestion.id] || ""}
                    onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
                    className="text-center h-12 text-lg"
                  />
                    {!responses[currentQuestion.id] && (
                    <p className="text-red-500 text-sm">This field is required</p>
                    )}
                  
                  {/*validations*/}
                  {currentQuestion.title.toLowerCase().includes("annual income") && 
                  responses[currentQuestion.id] && 
                  (parseInt(responses[currentQuestion.id]) < 0) && (
                    <p className="text-red-500 text-sm">annual income mustbe a positive integer.</p>
                  )}

                  {currentQuestion.title.toLowerCase().includes("age") && 
                  responses[currentQuestion.id] && 
                  (parseInt(responses[currentQuestion.id]) < 0 || parseInt(responses[currentQuestion.id]) > 100) && (
                    <p className="text-red-500 text-sm">Age must be between 0 and 100</p>
                  )}


                </div>
  
                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    variant="outline"
                    className="h-10 px-6" 
                  >
                    Previous
                  </Button>
                  
                  {currentStep < questions.length - 1 ? (
                    <Button type="button" onClick={nextStep} className="h-10 px-8"
                    disabled={!responses[currentQuestion.id]}>
                      Next
                    </Button>
                  ) : (
                    <Button type="button" onClick={handleSubmit} className="h-10 px-8" disabled={!responses[currentQuestion.id]}> {/* Larger button */}
                      Submit
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </form>
          <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
          
        </div>
      </div>
      )
}

export default SurveyPage;