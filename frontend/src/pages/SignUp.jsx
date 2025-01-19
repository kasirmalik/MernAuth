
import { motion } from 'framer-motion';
import Input from '../components/Input';
import {Mail, User,Lock} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';


const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = (e) => {
        e.preventDefault()
    }
  return (
    <motion.div
       initial={{opacity:0,y:20}}
       animate={{opacity:1,y:0}}
       transition={{duration:0.5}}
       className='max-w-md w-full bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'

    >
        <div className='p-8'>
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text' >
                Create Account
            </h2>

            <form onSubmit={handleSignUp}>
                <Input 
                icon={User}
                type='text'
                placeholder='full name'
                value={name}

                onChange={(e) => setName(e.target.value)}
                />
                <Input 
                icon={Mail}
                type='email'
                placeholder='email'
                value={email}

                onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                icon={Lock}
                type='password'
                placeholder='password'
                value={password}

                onChange={(e) => setPassword(e.target.value)}
                />
                {/* password strength meter */}
                <PasswordStrengthMeter password={password} />

                <motion.button 
                  className='mt5 w-full py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold rounded-lg
                    shadow-lg hover:from-green-500 hover:to-emerald-600 transition duration-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900
                  '
                    whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}
                    type='submit'
                 >
                    Sign Up
                    
                </motion.button>
            </form>
        </div>

        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex  text-center">
            <p className='text-gray-400 text-sm'>
                Already have an account? 
                
                <Link to='/login' className='text-green-500 hover:underline'>
                   Login
                </Link>
            </p>
        </div>
      
    </motion.div>
  )
}

export default SignUp
