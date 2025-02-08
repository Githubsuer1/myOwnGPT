import { useState } from 'react'
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import './App.css'
import Loader from './Loader';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.post('https://my-own-gpt.vercel.app/api/v1/gpt', { input });
      // console.log(response);
      
      if (!response) {
        console.log("No response");
        return;
      }
      setOutput(response.data);
      setInput("");
    } catch (error) {
      setOutput(error.response.data.error)
      setInput("");
      // console.log(error.response.data);
    } finally {
      setLoading(false); // End loading
    }
  };
  

  return (
    <div className='bg-gray-800 w-full h-screen flex flex-col gap-2.5 px-4 '>
      <h1 className='text-white text-center mt-2.5 p-2 font-bold bg-violet-600 rounded-full'>Welcome to MyGPT, feel free to ask...</h1>

      <div className='w-full h-screen flex flex-col items-center gap-3 relative'>

        <div className='output w-full text-white border-green-500 border-2 rounded p-3 overflow-auto'>
        {loading ? <Loader /> : <ReactMarkdown>{output}</ReactMarkdown> }
        </div>

        <form onSubmit={handleSubmit} className='h-16 mb-2 rounded-full w-full max-w-2xl bg-transparent border-2 border-green-500 flex gap-2 items-center px-4 sm:py-4'>
          <input type="text" 
            className='w-full text-green-500 text-sm sm:text-lg px-3 font-bold bg-transparent outline-none max-w-2xl rounded-full'
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            placeholder='How can i help you...'
          />
          <button type='submit' className='submit-btn bg-transparent px-3 py-1.5 sm:py-2.5 border-violet-700 text-white border-2 rounded-full'>Submit</button>
        </form>

      </div>
    </div>
  )
}
export default App

