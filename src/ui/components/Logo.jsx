function Logo() {
  return (
    <div className="flex items-center justify-center ">
      <img
        className="h-14"
        src="https://aws-bucket-e-class.s3.eu-north-1.amazonaws.com/public/logo.png"
      ></img>
      <div className=" text-xl font-medium  tracking-wider ">EduSuit</div>
    </div>
  );
}

export default Logo;
