function Logo() {
  return (
    <div className="flex items-center justify-center ">
      <img
        className="h-14"
        src="https://aws-bucket-e-class.s3.eu-north-1.amazonaws.com/public/logo.png"
      ></img>
      <div className=" text-xl font-medium uppercase tracking-wider ">
        E-Class
      </div>
    </div>
  );
}

export default Logo;
