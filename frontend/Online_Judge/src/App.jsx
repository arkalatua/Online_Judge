function App() {

  return (
    <>
     <div class="bg-slate-40 min-h-screen flex items-center">
   <div class="w-full">
     <h2 class="text-center text-blue-400 font-bold text-2xl uppercase mb-10">Fill out our form</h2>
     <div class="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
       <form action="">
         <div class="mb-5">
           <label for="firstName" class="block mb-2 font-bold text-gray-600">First Name</label>
           <input type="text" id="firstName" name="firstName" placeholder="Put in your first name" class="border border-gray-300 shadow p-3 w-full rounded mb-"/>
           <label for="lastName" class="block mb-2 font-bold text-gray-600">Last Name</label>
           <input type="text" id="lastName" name="lastName" placeholder="Put in your last name" class="border border-gray-300 shadow p-3 w-full rounded mb-"/>
         </div>

         <div class="mb-5">
           <label for="twitter" class="block mb-2 font-bold text-gray-600">Twitter</label>
           <input type="text" id="twitter" name="twitter" placeholder="Put in your fullname." class="border border-red-300 shadow p-3 w-full rounded mb-"/>
           <p class="text-sm text-red-400 mt-2">Twitter username is required</p>
         </div>

         <button class="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg">Submit</button>
       </form>
     </div>
   </div>
 </div>
    </>
  )

}

export default App
