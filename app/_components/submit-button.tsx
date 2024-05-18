// import { useFormStatus } from "react-dom";
import { FiArrowRight } from 'react-icons/fi';


export default function SubmitButton({ 
    pending, submitMessage, submittingMessage, color = "primary" } : {
    pending: boolean, submitMessage: string, submittingMessage: string, color?: string
    }) {
 
    return (
        <button className={`btn btn-${color} mt-4 w-full`} disabled={pending} aria-disabled={pending}>
            {
                pending ?
                <span className={`text-${color} text-2xl flex flex-row items-base gap-2`}>
                    {/* <span className="loading loading-spinner loading-md"></span> */}
                    {submittingMessage}
                    <span className="loading loading-dots loading-sm"></span>
                </span>
                :
                <span className="w-full flex justify-between items-center">
                    {submitMessage}
                    <FiArrowRight className="h-5 w-5" />
                </span>
            }
        </button>
    );
}
