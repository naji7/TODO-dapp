import { useRouter } from 'next/router';

const NotFound = () =>{
    const router = useRouter();
    return(
        <div className="flex justify-center items-center">
            <div className="flex justify-center items-center flex-col">
            <img className="w-1/2" src="/pagenotfound.png" alt="" />
            <button onClick={()=>{
                router.push('/');
            }} className="bg-color-secondary px-9 py-3 rounded-md capitalize font-bold hover:opacity-80 ease-in duration-200">
                Go back to home
              </button>
            </div>
       
      </div>
    )
}

export default NotFound;