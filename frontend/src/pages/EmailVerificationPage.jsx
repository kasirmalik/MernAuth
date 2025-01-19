import  { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const EmailVerificationPage = () => {
    const [code, setCode] = useState(["","","","","",""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const isLoading = false;

     const handleChange = (index,value) => {
        const newCode = [...code];
        // handle paste content
        if (value.length > 1) {
           const pastedCode = value.slice(0,6).split('');
           for (let i = 0; i < 6; i++) {
               newCode[i] = pastedCode[i] || '';
           }
              setCode(newCode);
              // focus on the last non empty input or the first one
              const lastFilledIndex = newCode.findLastIndex((digit)=> digit !== '');
              const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
              inputRefs.current[focusIndex].focus();
            
        } else {
            newCode[index] = value;
            setCode(newCode);
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }

     };
     const handleKeyDown = (index,e) => {
            if (e.key === 'Backspace' && !code[index] && index > 0) {
                inputRefs.current[index - 1].focus();
            }
     };
        const handleSubmit = (e) => {
            e.preventDefault();
            const verificationCode = code.join('');
            alert(`Verifying ${verificationCode}`);
        }
     // auto submit the code if all inputs are filled
        useEffect(() => {
            if(code.every(digit => digit !== '')) {
                const verificationCode = code.join('');
                handleSubmit(new Event('submit'));
            }
        }, [code]);

  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y:-50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 w-full max-w-md bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-400 mb-6">Enter the 6-digit code sent to your email</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between ">
           {
            code.map((digit,index)=>(
                <input
                key={index}
                ref={(el) => inputRefs.current[index] = el}
                type="text"
                maxLength={6}
                value={digit}
                onChange={(e)=>handleChange(index,e.target.value)}
                onKeyDown={(e)=>handleKeyDown(index,e)}
                className="w-12 h-12 text-center bg-gray-700 rounded-lg text-2xl focus:outline-none font-bold text-white border-2 border-gray-600 focus:border-green-500"


                />
            ))
           }
                
          </div>
          
          
        </form>
        <motion.button

        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
        type='submit'
        disabled={isLoading || code.some((digit)=> !digit)}
        className='w-full py-3 px-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold rounded-lg shadow-lg hover:from-green-500 hover:to-emerald-600 transition duration-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:opacity-50 disabled:opacity-50'
        >
            {isLoading ? "verifying..." : "Verify"}
        </motion.button>
      </motion.div>
    </div>
  )
}

export default EmailVerificationPage
