function Logo() {
  return (
    <div className="flex items-center justify-center ">
      <img
        className="mr-2 h-8 w-8 rounded object-cover"
        src="https://aws-bucket-e-class.s3.eu-north-1.amazonaws.com/assets/images/logos/icon.jpg"
      ></img>
      <div className=" text-xl font-medium  tracking-wider ">EduSuit</div>
    </div>
  );
}

export default Logo;
