import { Check, X } from "lucide-react"

const PasswordCriteria = ({password})=>{
    const citeria = [
        {label:'At least 6 characters', met:password.length >= 6},
        {label:'Contains Upper Case letter', met:/[A-Z]/.test(password)},
        {label:'Contains lower Case letter', met:/[a-z]/.test(password)},
        {label:'Contains a number', met:/\d/.test(password)},
        {label:'Contains a Special charcter', met:/[^A-Zz-z0-9]/.test(password)},
    ]
    return (
        <div className="mt-2 space-y-1">
            {citeria.map((item,) => (
                <div key={item.label} className="flex items-center text-xs">
                    {item.met ? (
                        <Check className="size-4 text-green-500 mr-2"/>
                    ):(
                        <X className="size-4 text-gray-500 mr-2"/>
                    )};
                    <span className={item.met ? "text-green-500":"text-gray-400"}>{item.label}</span>
                </div>
            ))}
        </div>
    )
}

const PasswordStrengthMeter = ({password}) => {
    const getStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 6) strength += 1;
        if(pass.match(/[a-z]/)&& pass.match(/[A-Z]/)) strength++;
        if(pass.match(/\d/)) strength++;
        if(pass.match(/[^A-zA-Z\d]/)) strength++;
        return strength;


    };
    const strength = getStrength(password);
    const getColor = (strength) => {
        if(strength === 0) return 'bg-red-500';
        if(strength === 1) return 'bg-red-400';
        if(strength === 2) return 'bg-yellow-500';
        if(strength === 3) return 'bg-yellow-400';
        return 'bg-green-500';
    }


    const getStrengthText = (strength) => {
        if(strength === 0) return 'Very Weak';
        if(strength === 1) return 'Weak';
        if(strength === 2) return 'Medium';
        if(strength === 3) return 'Strong';
        return 'Very Strong';
    }
  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">Password Strength:</span>
        <span className="text-xs text-gray-400">{getStrengthText(strength)}</span>
      </div>
      <div className="flex space-x-1">
        {[...Array(4)].map((_, index)=>(
            <div 
            key={index}
            className={`h-1 w-/4 rounded-full transitions-colors duration-300 
                ${index < strength ? getColor(strength): "bg-gray-600"}
                `}
            ></div>
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  )
}

export default PasswordStrengthMeter
