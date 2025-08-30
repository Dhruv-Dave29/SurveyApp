import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AuroraBackground } from "@/components/ui/aurora-background";
interface Question {
  id: number;
  title: string;
  description: string;
  type: "text" | "number";
}

interface Response {
  [key: number]: string;
}

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<Response>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (id: number, value: string) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:4000/api/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(responses),
    });
    setSubmitted(true);
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isLoading) {
    return (
      <AuroraBackground>
      <div className="z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl text-muted-foreground font-semibold">Loading survey...</h2>
          <p className="text-muted-foreground">Please wait a moment</p>
        </div>
      </div>
      </AuroraBackground>
    );
  }

  if (submitted) {
    return (
      <AuroraBackground>
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
      </div>
      </AuroraBackground>
    );
  }

  if (questions.length === 0) {
    return (
      <AuroraBackground>
      <div className="z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold">No questions available</h2>
          <p className="text-muted-foreground">Please check your connection</p>
        </div>
      </div>
      </AuroraBackground>
    );
  }

  const progressValue = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];

  return (
    <AuroraBackground>
      <div className="z-10 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl space-y-8"> {/* Increased max-width */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground">Survey Form</h1> {/* Larger text */}
            <p className="text-lg text-muted-foreground mt-4"> {/* Larger text */}
              Question {currentStep + 1} of {questions.length}
            </p>
          </div>
  
          <Progress value={progressValue} className="h-3 w-full" /> {/* Wider progress bar */}
  
          <form onSubmit={handleSubmit}>
            <Card className="w-full md:w-2xl p-2"> {/* Wider card with padding */}
              <CardHeader>
                <CardTitle className="text-2xl text-center">{currentQuestion.title}</CardTitle> {/* Larger text */}
              </CardHeader>
              <CardContent className="space-y-6 p-6"> {/* Increased padding */}
                <p className="text-base mb-8 text-muted-foreground text-center"> {/* Larger text */}
                  {currentQuestion.description}
                </p>
                <div className="space-y-4">
                  <Label htmlFor={`question-${currentQuestion.id}`} className="text-lg"> {/* Larger text */}
                    Your answer
                  </Label>
                  <Input
                    id={`question-${currentQuestion.id}`}
                    type={currentQuestion.type}
                    value={responses[currentQuestion.id] || ""}
                    onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
                    required
                    className="text-center h-12 text-lg" /* Larger input */
                  />
                </div>
  
                <div className="flex justify-between pt-6"> {/* Increased padding */}
                  <Button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    variant="outline"
                    className="h-10 px-6" /* Larger button */
                  >
                    Previous
                  </Button>
                  
                  {currentStep < questions.length - 1 ? (
                    <Button type="button" onClick={nextStep} className="h-10 px-8"> {/* Larger button */}
                      Next
                    </Button>
                  ) : (
                    <Button type="submit" className="h-10 px-8"> {/* Larger button */}
                      Submit
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </AuroraBackground>
  );
}

export default App;