import React from "react";

const Aboutpage=() => {
return (
    <div className="d-mwd flex border border-white rounded-lg justify-center mx-auto p-5 gap-5 md:flex-row flex-col ">
        <div>
        <h1 className="text-6xl ">Hello! I'm Joshua</h1>  
        <p className="text-lg text-justify">Welcome to my portfolio! I am a passionate developer with experience in building web applications using modern technologies. I enjoy creating user-friendly and visually appealing websites that provide a great user experience. Feel free to explore my projects and get in touch if you have any questions or opportunities!</p>
    </div>
    <img className="rounded-2xl " src="/assets/wall.jpg" alt="About Me" width={600} height={400} />
    </div>
);
}
export default Aboutpage;