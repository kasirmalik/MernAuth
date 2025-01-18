
import { motion } from 'framer-motion';
import Input from '../components/Input';
import {Mail, User,Lock} from 'lucide-react';
import { useState } from 'react';


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

                <motion.button >
                    Sign Up
                </motion.button>
            </form>
        </div>
      
    </motion.div>
  )
}

export default SignUp
