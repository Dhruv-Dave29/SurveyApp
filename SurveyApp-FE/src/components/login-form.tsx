import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { userAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { type FormEvent } from "react"
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [Loading,setLoading] = useState(Boolean)
  const [error,setError] = useState('')


  const { signInUser} = userAuth();
  // console.log(session);

  const handleSignIn = async (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    setLoading(true)
    try {
      const result = await signInUser({email, password})
      if(result.success){
        navigate('/dashboard')
      }
      
    }
    catch (err){
        setError("an error occurred")
      }finally{
        setLoading(false);
      }
  }

  return (
    <div className={cn(" flex flex-col gap-6", className)} {...props}>
      <Card className="z-10">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>

                
                <Input onChange={(e)=>setPassword(e.target.value)} id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-red-600 text-center pt-4">{error}</p>
                <Button type="submit" disabled={Loading} className="w-full">
                  Login
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
