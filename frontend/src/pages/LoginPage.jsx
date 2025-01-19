import { useState } from "react";
import { Mail,Lock ,Loader } from "lucide-react";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Input from "../components/Input";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = false;

  const handleLogin = (e)=>{
    // login logic here
    e.preventDefault()
  }
  return (
    <motion.div 
    initial={{ opacity: 0, y:20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
              Welcome Back
          </h2>
          <form onSubmit={handleLogin}>
            <Input
            icon={Mail}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-center mt-6">
                <Link to="/forgot-password" className="text-sm mb-3 text-green-400 hover:underline">
                   Forgot Password?  
                </Link>
            </div>
            <motion.button 
                  className=' w-full py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold rounded-lg
                    shadow-lg hover:from-green-500 hover:to-emerald-600 transition duration-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900
                  '
                    whileHover={{scale:1.02}}
                    whileTap={{scale:0.98}}
                    type='submit'
                    disabled={isLoading}
                 >
                    {isLoading ? <Loader className="w-6 h-6 animate-spin  mx-auto" /> : "Login"}
                    
                </motion.button>
          </form>
      </div>
      <div className="flex justify-center bg-gray-900 bg-opacity-50 py-4 px-8">
        <p className="text-sm text-gray-400">
          Don't have an account? 
          <Link to="/signup" className="text-green-400 hover:underline"> Sign up</Link>
        </p>

      </div>
    </motion.div>
  )
}

export default LoginPage
