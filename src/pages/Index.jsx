function Index() {
  return (
    <div className=" bg-gradient-to-tr from-sky-100 to-indigo-200">
      <div className=" flex  h-[80vh] justify-center">
        <div
          className=" flex h-full w-full justify-center bg-gradient-to-r 
             from-sky-300 to-indigo-400 clip-custom-1"
        >
          <div className="flex h-full w-full max-w-[1400px] flex-col ">
            <Nav />
            <div className=" relative flex h-[70%]  w-full items-center justify-around px-4 ">
              <div className="  max-w-[40%] text-white">
                <p className=" inline-block text-5xl font-bold leading-[112%] drop-shadow-md">
                  The Ultimate Tool for Class Hall Owners
                </p>
                <button
                  className=" mt-8 rounded bg-indigo-500
 px-8 py-4  text-xl font-medium shadow"
                >
                  Get Start
                </button>
              </div>

              <div className=" flex h-[32rem]">
                <img
                  className=" h-full object-cover"
                  src="https://png2.cleanpng.com/sh/b87f0dac0399e299638fb220eefd8d76/L0KzQYm4UcMxN5D8hJH0aYP2gLBuTgNmaaNogJ9ubnfsfra0jCB1cZ5uktN9aXBxPb32gBFtNaRqeeRsaD3ofrjwjvUud6F5RadsMEDnSYO4hMY2Opc7RqQ9OUO7SIq3UcU1O2Y6UaYAN0i6R4q1kP5o/kisspng-search-engine-optimization-local-search-engine-opt-5c00d921d652f6.2493889015435594578779.png"
                ></img>
              </div>
              {/* <div
                className=" absolute right-8 top-6 -z-10 flex aspect-square
                h-[30rem] items-center
              rounded-[3rem] "
              >
                <img
                  className=" h-full  object-cover"
                  src="https://cdni.iconscout.com/illustration/premium/thumb/big-data-analysis-3816898-3220037.png"
                ></img>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className=" mx-auto flex max-w-[1400px] flex-col gap-28">
        <div className="mt-28 flex w-full px-4 ">
          <div className=" flex w-full flex-wrap justify-around">
            <div
              className=" min-h-64 max-w-72 rounded-lg bg-gradient-to-tl from-sky-50
                 to-blue-100 p-8 py-12 drop-shadow-md"
            >
              <span
                className=" material-symbols-outlined relative flex w-full scale-[180%]  
                  items-center justify-center text-center text-rose-600"
              >
                design_services
                <div className="absolute -z-20 aspect-square h-8 rounded-full bg-rose-100"></div>
              </span>

              <p className=" mt-6 text-center text-2xl font-medium uppercase text-blue-600">
                Create
              </p>
              <div className=" flex h-full justify-center ">
                <p className=" mt-2 text-center text-lg text-slate-700">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
              </div>
            </div>

            <div className=" min-h-64 max-w-72 rounded-lg bg-indigo-50 p-8 py-12 drop-shadow-md">
              <span className=" material-symbols-outlined relative flex w-full scale-[180%]  items-center justify-center text-center text-rose-600">
                design_services
                <div className="absolute -z-20 aspect-square h-8 rounded-full bg-rose-100"></div>
              </span>

              <p className=" mt-6 text-center text-2xl font-medium uppercase text-blue-600">
                search
              </p>
              <div className=" flex h-full justify-center ">
                <p className=" mt-2 text-center text-lg text-slate-700">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
              </div>
            </div>

            <div
              className=" min-h-64 max-w-72 rounded-lg
                  bg-gradient-to-br from-sky-50 to-blue-100 p-8 py-12 drop-shadow-md"
            >
              <span
                className=" material-symbols-outlined relative flex w-full scale-[180%]
                    items-center justify-center text-center text-rose-600"
              >
                design_services
                <div className="absolute -z-20 aspect-square h-8 rounded-full bg-rose-100"></div>
              </span>

              <p className=" mt-6 text-center text-2xl font-medium uppercase text-blue-600">
                monitoring
              </p>
              <div className=" flex h-full justify-center ">
                <p className=" mt-2 text-center text-lg text-slate-700">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex w-full  justify-center px-4 text-slate-800  ">
          <div className=" flex w-full flex-wrap ">
            <div className=" basis-1/2 p-4">
              <div className=" flex min-w-[20rem]">
                <img
                  className=" object-cover"
                  src="https://png2.cleanpng.com/sh/b87f0dac0399e299638fb220eefd8d76/L0KzQYm4UcMxN5D8hJH0aYP2gLBuTgNmaaNogJ9ubnfsfra0jCB1cZ5uktN9aXBxPb32gBFtNaRqeeRsaD3ofrjwjvUud6F5RadsMEDnSYO4hMY2Opc7RqQ9OUO7SIq3UcU1O2Y6UaYAN0i6R4q1kP5o/kisspng-search-engine-optimization-local-search-engine-opt-5c00d921d652f6.2493889015435594578779.png"
                ></img>
              </div>
            </div>
            <div className=" flex basis-[50%] items-center border-t-4 border-blue-400  p-4">
              <div className=" w-full  ">
                <p className="  text-center text-4xl font-medium">What is Lorem Ipsum</p>
                <p className=" mt-8  px-4 text-xl leading-[140%]">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make a type specimen
                  book.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex w-full  justify-center px-4 text-slate-800  ">
          <div className=" flex w-full flex-wrap ">
            <div className=" flex basis-[50%] items-center  border-t-4 border-blue-400  p-4">
              <div className=" w-full  ">
                <p className="  text-center text-4xl font-medium">What is Lorem Ipsum</p>
                <p className=" mt-8  px-4 text-xl leading-[140%]">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make a type specimen
                  book.
                </p>
              </div>
            </div>
            <div className=" basis-1/2 p-4">
              <div className=" flex min-w-[20rem]">
                <img
                  className=" object-cover"
                  src="https://png2.cleanpng.com/sh/b87f0dac0399e299638fb220eefd8d76/L0KzQYm4UcMxN5D8hJH0aYP2gLBuTgNmaaNogJ9ubnfsfra0jCB1cZ5uktN9aXBxPb32gBFtNaRqeeRsaD3ofrjwjvUud6F5RadsMEDnSYO4hMY2Opc7RqQ9OUO7SIq3UcU1O2Y6UaYAN0i6R4q1kP5o/kisspng-search-engine-optimization-local-search-engine-opt-5c00d921d652f6.2493889015435594578779.png"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-24 h-40 w-full bg-gray-700"></div>
    </div>
  );
}

export default Index;

function Nav() {
  return (
    <div className=" flex h-20 w-full items-center justify-between px-4 ">
      <div>
        <p className="text-2xl font-bold text-slate-200">EduSuit</p>
      </div>
      <div className=" flex gap-2 font-medium">
        <a
          href="#"
          className="rounded-full border
         border-slate-200 px-8 py-3 text-slate-200"
        >
          Login
        </a>
        <a
          href="#"
          className="rounded-full border
           border-indigo-600 bg-indigo-600 px-8 py-3 text-slate-200"
        >
          Signup
        </a>
      </div>
    </div>
  );
}
